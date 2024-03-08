const express = require("express");
const router = express.Router();
const { ValidationError, Op } = require("sequelize");
const ProveedorFerreteria = require("../models/proveedores"); // Update the import

router.get("/", async function (req, res) {
  let where = {};
  if (req.query.nombre != undefined && req.query.nombre !== "") {
    where.nombre = {
      [Op.like]: "%" + req.query.nombre + "%",
    };
  }
  if (req.query.activo != undefined && req.query.activo !== "") {
    where.activo = req.query.activo === "true";
  }

  const data = await ProveedorFerreteria.findAll({
    attributes: ["id_proveedor", "nombre", "tipo", "fecha_ingreso", "mail", "telefono", "activo"], // Update the attribute names
    where,
  });
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const data = await ProveedorFerreteria.findAll({
    attributes: ["id_proveedor", "nombre", "tipo", "fecha_ingreso", "mail", "telefono", "activo"], // Update the attribute names
    where: { id_proveedor: req.params.id, activo: true }, // Update the field name
  });

  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "No se encontró el proveedor" });
});

router.post("/", async (req, res) => {
  try {
    const nuevoProveedor = {
      nombre: req.body.nombre,
      tipo: req.body.tipo, // Update the field name
      fecha_ingreso: req.body.fecha_ingreso, // Update the field name
      mail: req.body.mail,
      telefono: req.body.telefono,
    };
    const ProveedorCreado = await ProveedorFerreteria.create(nuevoProveedor);
    res.status(201).json(ProveedorCreado);
  } catch (error) {
    if (error instanceof ValidationError) {
      let messages = '';
      error.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      throw error;
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const proveedor = await ProveedorFerreteria.findOne({
      attributes: ["id_proveedor", "nombre", "tipo", "fecha_ingreso", "mail", "telefono"], // Update the attribute names
      where: { id_proveedor: req.params.id },
    });
    if (!proveedor) {
      res.status(404).json({ message: "Proveedor no encontrado" });
      return;
    }

    proveedor.nombre = req.body.nombre;
    proveedor.tipo = req.body.tipo; // Update the field name
    proveedor.fecha_ingreso = req.body.fecha_ingreso; // Update the field name
    proveedor.mail = req.body.mail;
    proveedor.telefono = req.body.telefono;
    await proveedor.save();
    res.sendStatus(200);
  } catch (error) {
    if (error instanceof ValidationError) {
      let messages = '';
      error.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      throw error;
    }
  }
});

router.delete("/:id", async (req, res) => {
  let proveedor_encontrado = await ProveedorFerreteria.findOne({
    where: {
      id_proveedor: req.params.id,
      activo: true,
    },
  });
  if (!proveedor_encontrado) return res.sendStatus(404);
  proveedor_encontrado.activo = false;

  if (await proveedor_encontrado.save()) res.sendStatus(204);
  else res.sendStatus(404);
});

module.exports = router;
