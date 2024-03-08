const sequelize = require("../orm/sequelize_init.js");
const { DataTypes } = require('sequelize');

const productos = require('./productos');
const facturas = require('./facturas');

const detalles = sequelize.define('detalles', {
    id_detalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    producto_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    factura_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio:{
      type: DataTypes.FLOAT
    }
    ,
    cantidad: {
      type: DataTypes.FLOAT,
      defaultValue: 1,
      allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
  }, { timestamps: false });
  
  productos.hasMany(detalles, {
    foreignKey: 'producto_id'
});
  facturas.hasMany(detalles,
    {
    foreignKey: 'factura_id'
    }
  )


  module.exports = detalles;