// Configurar ORM sequelize


const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./.bd/datos.db",
});

module.exports = sequelize;
