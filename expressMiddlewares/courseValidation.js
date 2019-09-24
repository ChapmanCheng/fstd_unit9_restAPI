const { check } = require("express-validator");

/**
 * Name: courseValidation
 * required module: express-validator.check()
 * Usage: for POST "/api/courses" route
 * Check: courseUpdate, contains {title, description, userId}
 */
module.exports = [
    check("title")
        .not()
        .isEmpty()
        .withMessage("Title is missing"),
    check("description")
        .not()
        .isEmpty()
        .withMessage("Description is missing"),
    check("userId")
        .isInt()
        .withMessage("Provide user Id")
];
