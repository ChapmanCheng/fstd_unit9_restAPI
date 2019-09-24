const Sequelize = require("sequelize");
const { Model } = Sequelize;

module.exports = Courses = sequelize => {
	class Courses extends Model {}

	Courses.init(
		{
			// attributes
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			estimatedTime: {
				type: Sequelize.STRING
			},
			materialsNeeded: {
				type: Sequelize.STRING
			},
			userId: {
				type: Sequelize.INTEGER
			}
		},
		{ sequelize }
	);

	return Courses;
};
