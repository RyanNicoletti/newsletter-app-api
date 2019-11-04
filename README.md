# Newsletter Inbox API

This is the REST API for the Newsletter Inbox application created with Node.js.

## Run the app

    npm run dev

# REST API

The REST API to the Newsletter Inbox app is described below.

Note: JWT/sessions have not yet been implemented, as such, endpoints to user:id are currently not included.

## Get a list of URL's to RSS feeds to be parsed into JSON

### Request

`GET /urls/`

A request is automatically made to this endpoint upon loging in. The newsletters corisponding to the parsed RSS feeds are then displayed to the user.

### Response

    HTTP/1.1 200 OK
    Date: Mon, 04 Nov 2019 19:53:23 GMT
    Status: 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: dependent on number of newsletters stored in users account
    []

## Add a new newsletter to the feed

User accounts are identified by user_ref_id. 'user_ref_id' is currently hardcorded as 1 as JWT have not been implemented yet, so any new newsletters that are posted at the time of writing this will be available for all users.

### Request

`POST /urls/`

### Response

    HTTP/1.1 201 Created
    Date: Mon, 04 Nov 2019 20:04:03 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Location: /urls/39
    Content-Length: 142

    {id: 39, rssurl: 'foobar', title: "Foo", user_ref_id: 1}

## Create a New User

Add a new user and their account information to the database.

### Request

`POST /users/`

### Response

    HTTP/1.1 201 Created
    Date: Mon, 04 Nov 2019 20:11:42 GMT
    Status: 201 Created
    Connection: keep-alive
    Content-Type: application/json; charset=utf-8
    Location: /users/32
    Content-Length: 31

    {id: 32, email: "testuser123"}

## Made With:

- Node.js
- Express.js
- PostgreSQL
- Knex.js
- Mocha
- Chai
- SuperTest
