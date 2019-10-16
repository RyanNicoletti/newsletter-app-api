const path = require("path");
const express = require("express");
const UrlService = require("./newsletterurl-service.js");
const xss = require("xss");

const urlRouter = express.Router();
const jsonParser = express.json();

const serializeUrl = url => ({
  id: url.id,
  title: xss(url.title),
  rssurl: xss(url.rssurl),
  user_ref_id: url.user_ref_id
});

// ****** getallurls probably not needed for mvp******
urlRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    UrlService.getAllUrls(knexInstance)
      .then(urls => {
        res.json(urls);
      })
      .catch(next);
  })
  //   post article to db
  .post(jsonParser, (req, res, next) => {
    const { title, rssurl, user_ref_id } = req.body;
    const newUrl = { title, rssurl, user_ref_id };

    for (const [key, value] of Object.entries(newUrl)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { mssage: `Missing '${key}' in request body` } });
      }
    }

    UrlService.insertUrl(req.app.get("db"), newUrl)
      .then(url => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${url.id}`))
          .json(serializeUrl(url));
      })
      .catch(next);
  });

// gets all user urls by user ref id
urlRouter.route("/urls/:user_ref_id").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  UrlService.getByUserId(knexInstance, req.params.user_ref_id)
    .then(urls => {
      if (!urls) {
        return res
          .status(404)
          .json({ error: { message: `No articles exist` } });
      }
      res.json({
        id: urls.id,
        title: xss(urls.title),
        rssurl: xss(urls.rssurl),
        user_ref_id: urls.user_ref_id
      });
      res.json(article);
    })
    .catch(next);
});

urlRouter.route("/:url_id").delete((req, res, next) => {
  UrlService.deleteUrl(req.app.get("db"), req.params.url_id)
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

module.exports = urlRouter;
