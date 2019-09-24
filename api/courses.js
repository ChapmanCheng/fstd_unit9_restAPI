// Express
const express = require("express");
const router = express.Router();

// Middleware
const authenticateUser = require("../expressMiddlewares/authenticateUser");
const checkSameUserId = require("../expressMiddlewares/checkSameUserId");

// db
const db = require("../db");
const { Courses } = db.Model;

// routes for "/api/courses"
router
    .route("/")
    .get((req, res, next) =>
        Courses.findAll()
            .then(courses => res.json(courses))
            .catch(err => console.error(err))
    )

    .post((req, res, next) => {
        // req.body contains "title", "description", "userId", "estimatedTime" (allowNull), "materialsNeeded"(allowNull)
        Courses.create(req.body)
            .then(() => res.status(201).end())
            .catch(err => next(err));
    });

router
    .route("/:id")
    .get((req, res, next) => {
        const { id } = req.params;
        Courses.findByPk(id)
            .then(course => res.json(course))
            .catch(err => next(err));
    })
    .put(authenticateUser, checkSameUserId, (req, res, next) => {
        const { id } = req.params;
        // req.body contains "title", "description", "userId", "estimatedTime" (allowNull), "materialsNeeded"(allowNull)
        Courses.findByPk(id)
            .then(course => course.update(req.body))
            .then(() => res.status(204).end())
            .catch(err => next(err));
    })
    .delete(authenticateUser, checkSameUserId, (req, res, next) => {
        const { id } = req.params;
        Courses.findByPk(id)
            .then(course => course.destroy())
            .then(() => res.status(204).end())
            .catch(err => next(err));
    });

module.exports = router;
