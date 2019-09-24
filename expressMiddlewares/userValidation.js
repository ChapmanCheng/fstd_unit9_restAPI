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
        .not()
        .isEmpty()
        .withMessage("Email missing")
        .isEmail()
        .withMessage("This is not an email"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password missing")
];
