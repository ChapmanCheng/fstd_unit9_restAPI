// Express
const express = require("express");
const router = express.Router();

// Modules
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

// Middleware
const userValidation = require("../expressMiddlewares/userValidation");
const authenticateUser = require("../expressMiddlewares/authenticateUser");

// db
const db = require("../db");
const { Courses, Users } = db.Model;

router
    .route("/users")
    .get(authenticateUser, (req, res) => {
        const user = req.currentUser;
        res.status(200).json(user);
    })
    .post(userValidation, async (req, res, next) => {
        const user = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: errorMessages });
        }

        user.password = bcrypt.hashSync(user.password.toString(), 10); // password encryption

        Users.create(user) // user contains "password", "firstName", "lastName", "email"
            .then(() => res.status(201).end())
            .catch(err => next(err));
    });

router
    .route("/courses")
    .get((req, res, next) =>
        Courses.findAll()
            .then(courses => res.json(courses))
            .catch(err => console.error(err))
    )

    .post(authenticateUser, (req, res, next) => {
        // req.body contains "title", "description", "userId", "estimatedTime" (allowNull), "materialsNeeded"(allowNull)
        Courses.create(req.body)
            .then(() => res.status(201).end())
            .catch(err => next(err));
    });

/**
 * * FOLLOWING LINKS REQUIRE AUTHENTICATION
 */

router
    .route("/courses/:id")
    .get((req, res, next) => {
        const { id } = req.params;
        Courses.findByPk(id)
            .then(course => res.json(course))
            .catch(err => next(err));
    })
    .put(authenticateUser, (req, res, next) => {
        const { id } = req.params;
        // req.body contains "title", "description", "userId", "estimatedTime" (allowNull), "materialsNeeded"(allowNull)
        Courses.findByPk(id)
            .then(course => course.update(req.body))
            .then(() => res.status(204).end())
            .catch(err => next(err));
    })
    .delete(authenticateUser, (req, res, next) => {
        const { id } = req.params;
        Courses.findByPk(id)
            .then(course => course.destroy())
            .then(() => res.status(204).end())
            .catch(err => next(err));
    });

module.exports = router;
