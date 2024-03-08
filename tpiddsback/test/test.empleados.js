const request = require("supertest");
const app = require("../app");

const nombres = ['Ana', 'Javier', 'Martina', 'Natalia', 'Matias'];
const apellidos = ['López', 'Fernández', 'Rodríguez', 'Quintana', 'Pereyra'];

const nuevoEmpleado = {
  nombre: "valen",
  apellido: "tina",
  fecha_nacimiento: "1988-06-25",
  fecha_ingreso: "2023-03-22",
  telefono: "444-123-4847",
  salario: 2500.00,
}

const empleadoModificado = {
  id_empleado: 1,
  nombre: nombres[Math.floor(Math.random() * nombres.length)],
  apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
  fecha_nacimiento: "1988-06-26",
  fecha_ingreso: "2023-03-23",
  telefono: "444-123-4847",
  salario: 2500.00,
}

describe("GET /api/empleados", () => {
  it("Devuelve un JSON con todos los empleados", async () => {
    const res = await request(app)
      .get("/api/empleados")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id_empleado: expect.any(Number),
          nombre: expect.any(String),
          apellido: expect.any(String),
          fecha_nacimiento: expect.any(String),
          fecha_ingreso: expect.any(String),
          telefono: expect.any(String),
          salario: expect.any(Number),
          activo: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("GET /api/empleados/:id", () => {
  it("Devuelve un json con un solo empleado", async () => {
    const res = await request(app)
      .get("/api/empleados/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_empleado: expect.any(Number),
        nombre: expect.any(String),
        apellido: expect.any(String),
        fecha_nacimiento: expect.any(String),
        fecha_ingreso: expect.any(String),
        telefono: expect.any(String),
        salario: expect.any(Number),
        activo: expect.any(Boolean),
      })
    );
  });
});

describe("POST /api/empleados", () => {
  it("Agrega y devuelve el empleado creado en la base de datos", async () => {
    const res = await request(app).post("/api/empleados").send(nuevoEmpleado);
    console.log(res);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_empleado: expect.any(Number),
        nombre: expect.any(String),
        apellido: expect.any(String),
        fecha_nacimiento: expect.any(String),
        fecha_ingreso: expect.any(String),
        telefono: expect.any(String),
        salario: expect.any(Number),
        activo: expect.any(Boolean),
      })
    );
  });
});

describe("PUT /api/empleados/:id", () => {
  it("Devuelve status code 200 luego de modificar el empleado con el id 1", async () => {
    const res = await request(app).put("/api/empleados/1").send(empleadoModificado);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/empleados/:id", () => {
  it("Devuelve status code 204 luego de borrar el empleado con el id 2", async () => {
    const res = await request(app).delete("/api/empleados/2");
    expect(res.statusCode).toEqual(204);
  });
});