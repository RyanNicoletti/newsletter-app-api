const { PORT, DATABASE_URL } = require("./config");
const knex = require("knex");
const app = require("./app");

const db = knex({ client: "pg", connection: DATABASE_URL });

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

// UrlService.insertUrl(db, rssurls).then(urls => {
//   console.log(urls);
// });

// why does code above insert entire array of objects into the table
// but only logs rssurls[0]
