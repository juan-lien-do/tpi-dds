const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../orm/sequelize_init');

const clientes = require('./clientes');
const empleados = require('./empleados');

const facturas = sequelize.define(
        'facturas',
        {
            id_factura: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            cliente_id: {
                type: DataTypes.INTEGER
            },
            empleado_id: {
                type: DataTypes.INTEGER
            },
            precio: {
                type: DataTypes.FLOAT
            },
            pagada: {
                type: DataTypes.BOOLEAN
            },
            fecha: {
                type: DataTypes.STRING, defaultValue: DataTypes.NOW 
            },
            tipo_factura: { 
                type: DataTypes.STRING
            },
            activo: {
                type: DataTypes.BOOLEAN,
                defaultValue: 1
            }
        },
    {
        timestamps: false,
    }
);
empleados.hasMany(facturas, {
    foreignKey: 'empleado_id'});
clientes.hasMany(facturas, {
    foreignKey: 'cliente_id'});


module.exports = facturas;