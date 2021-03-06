const Sequelize = require("sequelize");
const { Model } = Sequelize;

module.exports = Userss = sequelize => {
	class Users extends Model {
		get fullName() {
			return `${this.firstName} ${this.lastName}`;
		}
		set fullName(name) {
			const [firstName, lastName] = name.split(" ");
			this.firstName = firstName;
			this.lastName = lastName;
		}
	}

	Users.init(
		{
			// attributes
			firstName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			emailAddress: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: { isEmail: { msg: "This is not an Email" } },
				unique: true
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			}
		},
		{ sequelize }
	);

	return Users;
};
