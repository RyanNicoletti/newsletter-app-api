const UrlService = require("../src/newsletterurl-service");
const knex = require("knex");
const { makeUrlsArray } = require("./urls.fixtures");

describe(`articles service object`, function() {
  let db;
  let rssurls = makeUrlsArray();

  before(() => {
    db = knex({ client: "pg", connection: process.env.DB_URL });
  });

  before(() => db("newsletterurls").truncate());

  afterEach(() => db("newsletterurls").truncate());
  after(() => db.destroy());

  context(`Given 'newsletterurls' has data`, () => {
    beforeEach(() => {
      return db.into("newsletterurls").insert(rssurls);
    });

    it(`getAllUrls() resolves all articles from 'newsletterurls' table`, () => {
      return UrlService.getAllUrls(db).then(actual => {
        expect(actual).to.eql(rssurls);
      });
    });

    it(`deleteUrl() removes a url by id from 'newsletterurls' table`, () => {
      const urlId = 3;
      return UrlService.deleteUrl(db, urlId)
        .then(() => UrlService.getAllUrls(db))
        .then(allUrls => {
          let rssurls = makeUrlsArray();

          const expected = rssurls.filter(url => url.id !== urlId);
          expect(allUrls).to.eql(expected);
        });
    });
  });

  context(`given 'newsletterurl' table has no data`, () => {
    it(`getAllUrls() resolves an empty array`, () => {
      return UrlService.getAllUrls(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
    it(`insertUrl() inserts a new url and resolves the new url with an 'id'`, () => {
      const newUrl = { title: "new url", rssurl: "testurl" };
      return UrlService.insertUrl(db, newUrl).then(actual => {
        expect(actual).to.eql({
          id: 1,
          title: newUrl.title,
          rssurl: newUrl.rssurl
        });
      });
    });
  });
});
