const express = require("express");
const router = express.Router();
const { ValidationError, Op } = require("sequelize");
const productos = require("../models/productos");



router.get("/", async (req, res) => {
    let where = {}
    if (req.query.nombre != undefined && req.query.nombre !== "") {
        where.nombre = {
          [Op.like]: "%" + req.query.nombre + "%",
        };
      }
      if (req.query.activo != undefined && req.query.activo !== "") {
        where.activo = req.query.activo === "true";
      }
    const data = await productos.findAll({
        attributes: ["id_producto", "nombre", "precio", "stock", "fecha_ingreso","proveedor_id", "activo"],
        where
    });
    res.json(data)
});

router.get("/:id", async (req, res) => {
    const data = await productos.findOne({
        attributes: ["id_producto", "nombre", "precio", "stock", "fecha_ingreso","proveedor_id", "activo"],
        where: {
            id_producto: req.params.id,
            activo: true
        }
    });
    res.json(data);
});

router.post("/", async (req, res) => {
    try {
        const nuevoProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        fecha_ingreso: req.body.fecha_ingreso,
        stock: req.body.stock,
        proveedor_id: req.body.proveedor_id,
        activo: req.body.activo
    }
    const productoCreado = await productos.create(nuevoProducto);
    res.status(201).json(productoCreado); // devuelve el registro agregado
    } catch (error) {
        if (error instanceof ValidationError) {
            // si son errores de validacion
            let messages = '';
            error.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({ message : messages });
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw error;
        }
    }
});

router.put("/:id", async (req, res) => {
    try {
        const producto = await productos.findOne({
        attributes: ["id_producto", "nombre", "precio", "stock", "fecha_ingreso","proveedor_id", "activo"],
        where: { id_producto: req.params.id },
        });
        if (!producto) {
        // si no existe
        res.status(404).json({ message: "Producto no encontrada" });
        return;
        }
        producto.nombre = req.body.nombre,
        producto.precio = req.body.precio,
        producto.fecha_ingreso = req.body.fecha_ingreso,
        producto.stock = req.body.stock,
        producto.proveedor_id = req.body.proveedor_id;
        await producto.save();
        res.status(200).json(producto);

    } catch (error) {
        if (error instanceof ValidationError) {
        // si son errores de validacion
        let messages = '';
        error.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
        res.status(400).json({ message : messages });
        } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw error;
        }
    }
});

router.delete("/:id", async (req, res) => {
    let producto_encontrado = await productos.findByPk( req.params.id);
    
    if(!producto_encontrado) return res.sendStatus(404);
    producto_encontrado.activo = !producto_encontrado.activo;

    if (await producto_encontrado.save()) res.sendStatus(204);
    else res.sendStatus(400);
});

module.exports = router;