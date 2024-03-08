const express = require("express");
const router = express.Router();
const { ValidationError, Op } = require("sequelize");
const clientes = require("../models/clientes");

router.get("/", async (req, res) => {
  let where = {};
  if (req.query.apellido != undefined && req.query.apellido !== "") {
    where.apellido = {
      [Op.like]: "%" + req.query.apellido + "%",
    };
  }
  if (req.query.activo !== '') {
    where.activo = req.query.activo === "true";
  }

  const data = await clientes.findAll({
    attributes: ["id_cliente", "nombre", "apellido", "fecha_alta", "fecha_nac", "telefono", "mail", "activo"],
    where: where,
  });
  res.json(data)
});

router.get("/:id", async (req, res) => {
  const data = await clientes.findAll({
    attributes: ["id_cliente", "nombre", "apellido", "fecha_alta", "fecha_nac", "telefono", "mail", "activo"],
    where: { id_cliente: req.params.id},
  });

  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "Cliente no encontado" })
})

router.post("/", async (req, res) => {
  try {
    const nuevoCliente = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      fecha_alta: req.body.fecha_alta,
      fecha_nac: req.body.fecha_nac,
      telefono: req.body.telefono,
      mail: req.body.mail
    }
    const clienteCreado = await clientes.create(nuevoCliente);
    res.status(201).json(clienteCreado); // devuelve el registro agregado
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
    const cliente = await clientes.findOne({
      attributes: ["id_cliente", "nombre", "apellido", "fecha_alta", "fecha_nac", "telefono", "mail", "activo"],
      where: { id_cliente: req.params.id },
    });
    if (!cliente) {
      // si no existe
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }

    cliente.nombre = req.body.nombre;
    cliente.apellido = req.body.apellido;
    cliente.fecha_alta = req.body.fecha_alta;
    cliente.fecha_nac= req.body.fecha_nac;
    cliente.telefono = req.body.telefono;
    cliente.mail = req.body.mail;
    await cliente.save();
    res.sendStatus(200);

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
  let cliente_encontrado = await clientes.findOne({
    where: {
      id_cliente: req.params.id,
      activo: 1
    }
  });
  if(!cliente_encontrado) return res.sendStatus(404);

  cliente_encontrado.activo = 0;
  await cliente_encontrado.save();

  res.sendStatus(204);
});

module.exports = router;


