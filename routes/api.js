const express = require("express");
const router = express.Router();

router
    .route("/users")
    .get((req, res) => res.status(200).json())
    .post((req, res) => {
        res.status(201).json();
        // TODO - set Location header to "/", no content
    });

router
    .route("/courses")
    .get((req, res) => res.send(/** 200 returns list of courses */))
    .post((req, res) =>
        res.send(/** returns nothing, creates courses, header to URI of the course*/)
    );

router.route("/courses/:id");
// .get((req, res))
// .put((req, res))
// .delete((req, res));

module.exports = router;
