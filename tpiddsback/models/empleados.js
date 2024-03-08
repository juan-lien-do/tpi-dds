const sequelize = require("../orm/sequelize_init.js");
const { DataTypes } = require('sequelize');

const empleados = sequelize.define('empleados', {
  id_empleado: {
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
  fecha_nacimiento: {
    type: DataTypes.STRING
  },
  fecha_ingreso: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  salario: {
    type: DataTypes.FLOAT
  },
  activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
  }
}, { timestamps: false });

module.exports = empleados;