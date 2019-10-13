const path = require("path");
const express = require("express");
const xss = require("xss");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonParser = express.json();

const serializeUser = user => ({
  id: user.id,
  email: xss(user.email)
});

usersRouter.route("/users").post(jsonParser, (req, res, next) => {
  const { email, password } = req.body;
  const newUser = { email };

  if (!email) {
    return res
      .status(400)
      .json({ error: { message: `Missing '${email}' in request body` } });
  }
  newUser.password = password;
  UsersService.insertUser(req.app.get("db"), newUser)
    .then(user => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${user.id}`))
        .json(serializeUser(user));
    })
    .catch(next);
});

module.exports = usersRouter;
