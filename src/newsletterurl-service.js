const UrlService = {
  getAllUrls(knex) {
    return knex.select("*").from("newsletterurls");
  },
  insertUrl(knex, newUrl) {
    return knex
      .insert(newUrl)
      .into("newsletterurls")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  deleteUrl(knex, id) {
    return knex("newsletterurls")
      .where({ id })
      .delete();
  }
};

module.exports = UrlService;
