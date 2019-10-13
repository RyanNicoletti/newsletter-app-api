const UsersService = {
  getAllusers(knex) {
    return knex.select("*").from("newsletter_users");
  },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("newsletter_users")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from("newsletter_users")
      .select("*")
      .where("id", id)
      .first();
  },
  deleteUser(knex, id) {
    return knex("newsletter-users")
      .where({ id })
      .delete();
  }
};

module.exports = UsersService;
