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
module.exports = db;
