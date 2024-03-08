const express = require('express');
const router = express.Router();

const detalles = require('../models/detalles');
const { ValidationError, Op } = require('sequelize');
const detallesService = require('../services/detallesService');

// GET ALL
router.get('/', async (req, res) => {   
    return res.status(200)
        .json(await detallesService.getAll(req.query.factura_id));;
});

// GET BY ID

router.get('/:id', async (req, res) => {
    const dato = await detallesService.getById(req.params.id);
    if (dato != null) return res.status(200).json(dato);
    else return res.sendStatus(404);
});


// POST

router.post('/', async (req, res) => {
    try {
        return res.status(201)
        .json(await detallesService.create(req.body));

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
        return res.status(201)
        .json(await detallesService.update(req.params.id, req.body));

    } catch(err) {
        if(err instanceof ValidationError) {
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ': ' + x.message + '\n');
            res.status(400).json(messages);
        }else res.statusCode(404);
    }
});

// DELETE

router.delete('/:id', async (req, res) => {

    try{
        if(await detallesService.deleteById(req.params.id)){return res.sendStatus(204);}
        else return res.sendStatus(404);
        
    }catch(err){
        return res.sendStatus(400);
    }
});

module.exports = router;