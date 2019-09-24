const auth = require("basic-auth");
const bcrypt = require("bcryptjs");

// db
const db = require("../db");
const { Users } = db.Model;

const authenticateUser = async (req, res, next) => {
	const cred = auth(req);
	if (cred) {
		const user = await Users.findOne({
			where: { emailAddress: cred.name }
		});
		if (user) {
			const authentication = bcrypt.compareSync(cred.pass, user.password);
			if (authentication) {
				req.currentUser = user;
				next();
			}
		}
	}
	res.status(401).end();
};

module.exports = authenticateUser;
