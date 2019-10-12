const { PORT, DB_URL } = require("./config");
const knex = require("knex");
const UrlService = require("./newsletterurl-service");
const app = require("./app");

const db = knex({ client: "pg", connection: DB_URL });

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

let rssurls = [
  {
    id: 1,
    title: "JavaScript Weekly",
    rssurl: "https://javascriptweekly.com/rss/1p20mcpp"
  },
  {
    id: 2,
    title: "React Newsletter",
    rssurl: "http://reactjsnewsletter.com/issues.rss"
  },
  {
    id: 3,
    title: "Node Weekly",
    rssurl: "https://nodeweekly.com/rss/1nn8a880"
  },
  {
    id: 4,
    title: "Frontend Focus",
    rssurl: "https://frontendfoc.us/rss/1alciije"
  },
  {
    id: 5,
    title: "React Status",
    rssurl: "https://react.statuscode.com/rss/1a03gjgd"
  },
  {
    id: 6,
    title: "Pony Foo Weekly",
    rssurl: "https://feeds.feedburner.com/ponyfooweekly"
  },
  {
    id: 7,
    title: "The History of The Web",
    rssurl: "https://thehistoryoftheweb.com/feed/"
  },
  {
    id: 8,
    title: "Weekly Programming Digest",
    rssurl: "https://feeds.feedburner.com/digest-programming"
  },
  { id: 9, title: "Weekend Reading", rssurl: "https://labnotes.org/rss/" }
];

// UrlService.insertUrl(db, rssurls).then(urls => {
//   console.log(urls);
// });

// why does code above insert entire array of objects into the table
// but only logs rssurls[0]
