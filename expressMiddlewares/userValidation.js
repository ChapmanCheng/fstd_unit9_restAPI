const { check } = require("express-validator");

/**
 * Name: userValidation
 * required module: express-validator.check()
 * Usage: for POST "/api/users" route
 * Check: user registration, contains {firstName, lastName, emailAddress, password}
 */
module.exports = [
    check("firstName")
        .not()
        .isEmpty()
        .withMessage("First Name missing"),
    check("lastName")
        .not()
        .isEmpty()
        .withMessage("Last Name missing"),
    check("emailAddress")
        .isEmail()
        .not()
        .isEmpty()
        .withMessage("Email missing"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password missing")
];
