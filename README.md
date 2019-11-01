# Newsletter Inbox API

<a href="https://ryan-newsletter-app.now.sh/">Live App</a>

## End points

NOTE: JWT/sessions have not yet been implemented, as such, endpoints to user:id are currently not included.

### Get All RSS URL's

Returns all URL's from the database (regardless of user)

- URL
  /urls
- Method:
  GET
  -Success Response:
  Code: 200
  Content: [url1, url2, url3...]

### Add URL to Database

Add's a URL to the Database

- URL
  /urls
- Method:
  POST
  -Success Response:
  Code: 200

### Add New User to Database

Adds a new user's data to the database

- URL
  /users
- Method:
  POST
  -Success Response:
  Code: 200

### Made With:

- Node.js
- Express.js
- PostgreSQL
- Knex.js
- Mocha
- Chai
- SuperTest
