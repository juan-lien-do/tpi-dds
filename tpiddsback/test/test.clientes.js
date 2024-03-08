const request = require("supertest");
const app = require("../app");

const nombres = ['Aaron', 'Alejandro', 'Alejandra', 'Alexia', 'Alexis'];
const apellidos = ['Costa', 'Connor', 'Colon', 'Cano', 'Cabrera'];
const mails = ['maildeprueba1@gmail.com', 'maildeprueba2@gmail.com', 'maildeprueba3@gmail.com']

const nuevoCliente = {
  nombre: nombres[Math.floor(Math.random() * nombres.length)],
  apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
  fecha_alta: "new Date().toISOString()",
  fecha_nac: "new Date().toISOString()",
  telefono: "351509358",
  mail: apellidos[Math.floor(Math.random() * mails.length)],
}

const clienteModificado = { 
  IdCliente: 1,
  nombre: nombres[Math.floor(Math.random() * nombres.length)],
  apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
  fecha_alta: "new Date().toISOString()",
  fecha_nac: "new Date().toISOString()",
  telefono: "555-123-4567",
  mail: apellidos[Math.floor(Math.random() * mails.length)],
}

describe("GET /api/clientes", () => {
  it("Devuelve un JSON con todos los clientes", async () => {
    const res = await request(app)
      .get("/api/clientes?apellido=&activo=")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id_cliente: expect.any(Number),
          nombre: expect.any(String),
          apellido: expect.any(String),
          fecha_alta: expect.any(String),
          fecha_nac: expect.any(String),
          telefono: expect.any(String),
          mail: expect.any(String),
          activo: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("GET /api/clientes/:id", () => {
  it("Devuelve un json con un solo cliente", async () => {
    const res = await request(app)
      .get("/api/clientes/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_cliente: expect.any(Number),
        nombre: expect.any(String),
        apellido: expect.any(String),
        fecha_alta: expect.any(String),
        fecha_nac: expect.any(String),
        telefono: expect.any(String),
        mail: expect.any(String),
        activo: expect.any(Boolean),
      })
    );
  });
});

describe("POST /api/clientes", () => {
  it("Agrega y devuelve el cliente creado en la base de datos", async () => {
    const res = await request(app).post("/api/clientes").send(nuevoCliente);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_cliente: expect.any(Number),
        nombre: expect.any(String),
        apellido: expect.any(String),
        fecha_alta: expect.any(String),
        fecha_nac: expect.any(String),
        telefono: expect.any(String),
        mail: expect.any(String),
        activo: expect.any(Boolean),
      })
    );
  });
});

describe("PUT /api/clientes/:id", () => {
  it("Devuelve status code 200 luego de modificar el cliente con el id 1", async () => {
    const res = await request(app).put("/api/clientes/1").send(clienteModificado);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/clientes/:id", () => {
  it("Devuelve status code 204 luego de borrar el cliente con el id 1", async () => {
    const res = await request(app).delete("/api/clientes/1");
    expect(res.statusCode).toEqual(204);
  });
});