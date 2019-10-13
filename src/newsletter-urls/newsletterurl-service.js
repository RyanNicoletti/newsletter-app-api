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
  getByUserId(knex, user_ref_id) {
    return knex
      .from("newsletterurls")
      .select("*")
      .where("id", user_ref_id);
  },
  deleteUrl(knex, id) {
    return knex("newsletterurls")
      .where({ id })
      .delete();
  }
};

module.exports = UrlService;
