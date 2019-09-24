// Express
const express = require("express");
const router = express.Router();

// Modules
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// Middleware
const userValidation = require("../expressMiddlewares/userValidation");
const authenticateUser = require("../expressMiddlewares/authenticateUser");

// db
const db = require("../db");
const { Users } = db.Model;

// routes for "/api/users"
router
    .route("/")
    .get(authenticateUser, (req, res, next) => {
        const user = req.currentUser;
        const { id, firstName, lastName, emailAddress } = user;
        res.status(200).json({ id, firstName, lastName, emailAddress });
        })
    .post(userValidation, (req, res, next) => {
        const user = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: errorMessages });
        } else {
        user.password = bcrypt.hashSync(user.password.toString(), 10); // password encryption

        Users.create(user) // user contains "password", "firstName", "lastName", "email"
            .then(() => res.status(201).end())
            .catch(err => next(err));
        }
    });

module.exports = router;
