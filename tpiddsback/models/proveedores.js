const sequelize = require("../orm/sequelize_init.js");
const { DataTypes, ValidationError } = require('sequelize');



const ProveedorFerreteria = sequelize.define('proveedores', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  //Sociedad Estatal Innovadora
  //Sociedad Anónima Exclusivas
  //Sociedad de Responsabilidad Protegida
  //Sociedad de Acciones Simplificadas
  //Sociedad Cooperativa Solidaria
  //Sociedad Individual Única
  //Sociedad en Comandita por Participación
  tipo: {
    type: DataTypes.STRING,
  },
  fecha_ingreso: {
    type: DataTypes.STRING
  },
  mail: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, { timestamps: false });


module.exports = ProveedorFerreteria;
