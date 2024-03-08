const sequelize = require("../orm/sequelize_init.js");
const { DataTypes } = require('sequelize');

const clientes = sequelize.define('clientes', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_alta: {
    type: DataTypes.STRING
  },
  fecha_nac: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  mail: {
    type: DataTypes.STRING
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { timestamps: false });

module.exports = clientes;