// Express
const express = require("express");
const router = express.Router();

// Middleware
const bcrypt = require("bcryptjs");
const auth = require("basic-auth");

// db
const db = require("../db");
const { Courses, Users } = db.Model;

router.post("/users", async (req, res) => {
	const user = req.body;
	user.password = bcrypt.hashSync(user.password.toString(), 10); //
	// user contains "password", "firstName", "lastName", "email"
	Users.create(user)
		.then(() => res.status(201).end())
		.catch(err => console.error(err));
});

router.get("/courses", (req, res) =>
	Courses.findAll()
		.then(courses => res.json(courses))
		.catch(err => console.error(err))
);

router.get("/courses/:id", (req, res) => {
	const { id } = req.params;
	Courses.findByPk(id)
		.then(course => res.json(course))
		.catch(err => console.error(err));
});

/**
 * * FOLLOWING LINKS REQUIRE AUTHENTICATION
 */
// app.use((req, res, next) => {
//     const user = auth(req);
//     if (user) {
//     } else {
//         res.status(401).end();
//     }
// });
router.get("/users", (req, res) => res.status(200).json()); //TODO: need to return current authed user
router.post("/courses", (req, res) => {
	// req.body contains "title", "description", "userId", "estimatedTime" (allowNull), "materialsNeeded"(allowNull)
	Courses.create(req.body)
		.then(() => res.status(201).end())
		.catch(err => console.error(err));
});
router
	.route("/courses/:id")
	.put((req, res) => {
		const { id } = req.params;
		// req.body contains "title", "description", "userId", "estimatedTime" (allowNull), "materialsNeeded"(allowNull)
		Courses.findByPk(id)
			.then(course => course.update(req.body))
			.then(() => res.status(204).end())
			.catch(err => console.error(err));
	})
	.delete((req, res) => {
		const { id } = req.params;
		Courses.findByPk(id)
			.then(course => course.destroy())
			.then(() => res.status(204).end())
			.catch(err => console.error(err));
	});

module.exports = router;
