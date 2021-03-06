# Full Stack JavaScript Techdegree v2 - REST API Project

Project: https://teamtreehouse.com/projects/rest-api

## Overview of the Provided Project Files

We've supplied the following files for you to use:

-   The `seed` folder contains a starting set of data for your database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
-   We've included a `.gitignore` file to ensure that the `node_modules` folder doesn't get pushed to your GitHub repo.
-   The `app.js` file configures Express to serve a simple REST API. We've also configured the `morgan` npm package to log HTTP requests/responses to the console. You'll update this file with the routes for the API. You'll update this file with the routes for the API.
-   The `nodemon.js` file configures the nodemon Node.js module, which we are using to run your REST API.
-   The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the project's dependencies.
-   The `RESTAPI.postman_collection.json` file is a collection of Postman requests that you can use to test and explore your REST API.

## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install

```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

```
# Exceed Expectations

1. "Add additional user email address validations to the POST /api/users route"

I have email vaidation in User db model -- "./db/models/User.js"
and as Express-validator middleware options --  "./expressMiddlewares/userValidation"
and it is used in "user.js" api route for /api/users -POST


2."Ensure that a user can only edit and delete their own courses"

I added a middleware -- checkSameUserId in /api/courses/:id -PUT & -DELETE
and the middleware module is in the "expressMiddlewares/checkSameUserId.js"


3.Update the Sequelize model queries for the Courses endpoint GET routes to filter out the following properties.

added exclusion in "./api/users.js" line 23
and in "./api/courses.js" line 22 and 48
```
