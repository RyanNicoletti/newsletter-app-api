const UrlService = require("../src/newsletterurl-service");
const knex = require("knex");

describe(`articles service object`, function() {
  let db;
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
            {
              id: 9,
              title: "Weekend Reading",
              rssurl: "https://labnotes.org/rss/"
            }
          ];
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
