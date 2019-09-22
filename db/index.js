const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./fsjstd-restapi.db"
});

sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch(err => console.error("Unable to connect to the database: ", err));

const db = {
    sequelize,
    Sequelize,
    Model: {}
};

const Users = require("./models/User")(sequelize);
const Courses = require("./models/Course")(sequelize);

// Associations
Courses.belongsTo(Users, {
    foreignKey: {
        allowNull: true
    }
});
Users.hasMany(Courses, {
    foreignKey: {
        allowNull: true
    }
});

db.Model = { Users, Courses };

module.exports = db;
