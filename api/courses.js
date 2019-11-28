// Express
const express = require("express");
const router = express.Router();

// Modules
const { validationResult } = require("express-validator");

// Middleware
const authenticateUser = require("../expressMiddlewares/authenticateUser");
const checkSameUserId = require("../expressMiddlewares/checkSameUserId");
const courseValidation = require("../expressMiddlewares/courseValidation");

const { checkNotNull } = require("../helpler");

// db
const db = require("../db");
const { Courses, Users } = db.Model;

// routes for "/api/courses"
router
    .route("/")
    .get((req, res, next) =>
        Courses.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [Users]
        })
            .then(courses => res.json(courses))
            .catch(err => next(err))
    )

    .post(authenticateUser, courseValidation, (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: errorMessages });
        } else {
            // req.body contains "title", "description", "userId", "estimatedTime" (allowNull), "materialsNeeded"(allowNull)
            Courses.create(req.body)
                .then(course =>
                    res
                        .status(201)
                        .location(`/courses/${course.dataValues.id}`)
                        .end()
                )
                .catch(err => next(err));
        }
    });

router
    .route("/:id")
    .get((req, res, next) => {
        const { id } = req.params;
        Courses.findByPk(id, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [Users]
        })
            .then(checkNotNull)
            .then(course => res.json(course))
            .catch(err => next(err));
    })
    .put(
        authenticateUser,
        courseValidation,
        checkSameUserId,
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(err => err.msg);
                return res.status(400).json({ errors: errorMessages });
            } else {
                const { id } = req.params;
                // req.body contains "title", "description", "userId", "estimatedTime" (allowNull), "materialsNeeded"(allowNull)
                Courses.findByPk(id)
                    .then(course => course.update(req.body))
                    .then(() => res.status(204).end())
                    .catch(err => next(err));
            }
        }
    )
    .delete(authenticateUser, checkSameUserId, (req, res, next) => {
        const { id } = req.params;
        Courses.findByPk(id)
            .then(course => course.destroy())
            .then(() => res.status(204).end())
            .catch(err => next(err));
    });

module.exports = router;
