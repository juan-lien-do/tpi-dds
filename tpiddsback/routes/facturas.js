const express = require('express');
const router = express.Router();

const db = require('../orm/sequelize_init');

const facturasService = require('../models/facturas');
const { ValidationError, Op } = require('sequelize');
const clientes = require('../models/clientes');

// GET ALL
router.get('/', async (req, res) => {
    let where = {
    };
    // suponiendo que envian un tipo de factura, vamos a establecer que queremos buscar ese tipo de factura
    if(req.query.tipo_factura) where.tipo_factura = req.query.tipo_factura
    if(req.query.cliente) {
        // suponiendo que envian un cliente por la request, vamos a buscar los clientes que
        let c = await clientes.findAll({
            where: {
                [Op.or]: {
                    Nombre: {
                        [Op.like]: `%${req.query.cliente}%`
                    },
                    Apellido: {
                        [Op.like]: `%${req.query.cliente}%`
                    }
                }
            }
        });
        where.cliente_id = c.map(cl => cl.IdCliente);
    }
    // esto llama al servicio/modelo con el parametro where y manda la respuesta
    return res.status(200).json(await facturasService.findAll({
        where: where
    }));
});


// GET BY ID
router.get('/:id', async (req, res) => {
    return res.status(200).json(await facturasService.findOne({
        where: {
            id_factura: req.params.id,
            activo: true
        }
    }));
});

// POST
router.post('/', async (req, res) => {
    try {
        
        let nueva_factura = await facturasService.create(
            req.body
        );
        console.log(nueva_factura);
        return res.status(200).json(nueva_factura);

    } catch(err) {

        if (err instanceof ValidationError) {
          
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json(messages);

        } else throw err;

    }
});

// PUT

router.put('/:id', async (req, res) => {
    try {
        // aca buscamos el cliente a modificar
        let factura_editar = await facturasService.findOne({
            where: {
                id_factura: req.params.id
            }
        });

        factura_editar.cliente_id = req.body.cliente_id ?? factura_editar.cliente_id;
        factura_editar.empleado_id = req.body.empleado_id ?? factura_editar.empleado_id;
        factura_editar.pagada = req.body.pagada ?? factura_editar.pagada;
        factura_editar.tipo_factura = req.body.tipo_factura ?? factura_editar.tipo_factura;


        await factura_editar.save();

        return res.json(factura_editar);

    } catch(err) {
        if(err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ': ' + x.message + '\n');
            res.status(400).json(messages);
        }else throw err;
    }
});


// DELETE
router.delete('/:id', async (req, res) => {
    //buscar por id

    let factura_borrar = await facturasService.findOne({
        where: {
            id_factura: req.params.id,
            activo: true,
        }
    });
    if(!factura_borrar) return res.status(400).json({
        message: 'Factura no encontrada para eliminar'
    });

    factura_borrar.activo = false;

    // guardar borrado logico
    if(await factura_borrar.save()) return res.status(200).json({
        message: 'Factura eliminada correctamente'
    });

    return res.status(400).json({
        message: 'Error al intentar eliminar la factura'
    });
});

module.exports = router;