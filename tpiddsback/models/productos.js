const sequelize = require("../orm/sequelize_init.js");
const { DataTypes } = require('sequelize');

const Proveedor = require('./proveedores');

const producto = sequelize.define('productos', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER
    },
    fecha_ingreso: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER
    },
    proveedor_id: {
        type: DataTypes.INTEGER,
    },
    activo: {
        type: DataTypes.BOOLEAN
    },
}, { timestamps: false });


Proveedor.hasMany(producto, {
    foreignKey: 'proveedor_id',
});

module.exports = producto;