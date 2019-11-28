"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const bodyParser = require("body-parser");

// Load Rotues
const userRoutes = require("./api/user");
const courseRoutes = require("./api/courses");

// load db
const db = require("./db/index");

// variable to enable global error logging
const enableGlobalErrorLogging =
    process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();

/**
 * * MIDDLEWARES
 */
app.use(morgan("dev")); // setup morgan which gives us http request logging
app.use(cors()); // setup cors
app.use(express.json()); // set body parser
// app.use(bodyParser.urlencoded({ extended: false })); //! deprecated

// setup a friendly greeting for the root route
app.get("/", (req, res) =>
    res.json({ message: "Welcome to the REST API project!" })
);

/**
 * * ROUTES
 */
app.use("/api/users/", userRoutes);
app.use("/api/courses/", courseRoutes);

// send 404 if no other route matched
app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    });
});

// setup a global error handler
app.use((err, req, res, next) => {
    if (enableGlobalErrorLogging) {
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }

    res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
    db.sequelize.sync();
    console.log(`Express server is listening on port ${server.address().port}`);
    console.log("cors enabled");
});
