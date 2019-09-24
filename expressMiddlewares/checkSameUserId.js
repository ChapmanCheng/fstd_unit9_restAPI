const db = require("../db/index");
const { Users, Courses } = db.Model;

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const course = await Courses.findByPk(id);
    const user = await Users.findByPk(course.userId);

    if (user.id === req.currentUser.id) {
        next();
    } else {
        res.status(403).end();
    }
};
