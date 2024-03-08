const express = require("express");
const router = express.Router();
const { ValidationError , Op } = require("sequelize");
const empleados = require("../models/empleados");

router.get("/", async (req, res) => {
  let where = {};
  if (req.query.apellido != undefined && req.query.apellido !== "") {
    where.Apellido = {
      [Op.like]: "%" + req.query.apellido + "%",
    };
  }
  if (req.query.activo != undefined && req.query.activo !== "") {
    where.Activo = req.query.activo === "true";
  }

  const data = await empleados.findAll({
    attributes: ["id_empleado", "nombre", "apellido", "fecha_nacimiento", "fecha_ingreso", "telefono", "salario", "activo"],
    where: where,
  });
  res.json(data)
});

router.get("/:id", async (req, res) => {
  const data = await empleados.findAll({
    attributes: ["id_empleado", "nombre", "apellido", "fecha_nacimiento", "fecha_ingreso", "telefono", "salario", "activo"],
    where: { id_empleado: req.params.id},
  });

  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "Empleado no encontrado" })
})

router.post("/", async (req, res) => {
  try {
      const nuevoEmpleado = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      fecha_nacimiento: req.body.fecha_nacimiento,
      fecha_ingreso: req.body.fecha_ingreso,
      telefono: req.body.telefono,
      salario: req.body.salario
    }

    const empleadoCreado = await empleados.create(nuevoEmpleado);
    res.status(201).json(empleadoCreado); // devuelve el registro agregado
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
    const empleado = await empleados.findOne({
      attributes: ["id_empleado", "nombre", "apellido", "fecha_nacimiento", "fecha_ingreso", "telefono", "salario"],
      where: { id_empleado: req.params.id },
    });
    if (!empleados) {
      // si no existe
      res.status(404).json({ message: "Vendedor no encontrado" });
      return;
    }

    empleado.nombre = req.body.nombre;
    empleado.apellido = req.body.apellido;
    empleado.fecha_nacimiento = req.body.fecha_nacimiento;
    empleado.fecha_ingreso = req.body.fecha_ingreso;
    empleado.telefono = req.body.telefono;
    empleado.salario = req.body.salario;
    await empleado.save();
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
  
  let empleado_encontrado = await empleados.findOne({
    where: {
      id_empleado: req.params.id,
      activo: 1
    }
  });
  if(!empleado_encontrado) return res.sendStatus(404);
  empleado_encontrado.activo = false;

  if (await empleado_encontrado.save()) res.sendStatus(204);
  else res.sendStatus(404);
});

module.exports = router;