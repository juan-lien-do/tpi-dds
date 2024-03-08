const request = require("supertest");
const app = require("../app");

const nombres = ['Proveedor1', 'Ferreteria Nueva', 'Ferremax', 'FerreUltra', 'Ferreteria Juancho'];
const mails = ['pringles@gmail.com', 'notengomail@gmail.com', 'losclavitos3@gmail.com','pablitoclavounclavito@yahoo.com'];

const nuevoProveedor = {
  nombre: nombres[Math.floor(Math.random() * nombres.length)],
  tipo: "Sociedad anonima",
  fecha_ingreso: new Date().toISOString(),
  mail: "nousamos@lala.com",
  telefono: "1234567890"
}

const proveedorModificado = {
  id_proveedor: 1,
  nombre: nombres[Math.floor(Math.random() * nombres.length)],
  tipo: "SRL",
  fecha_ingreso: new Date().toISOString(),
  mail: mails[Math.floor(Math.random() * mails.length)],
  telefono: "123123"
}

describe("GET /api/proveedores", () => {
  it("Devuelve un JSON con todos los proveedores", async () => {
    const res = await request(app)
      .get("/api/proveedores")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
        id_proveedor: expect.any(Number),
        nombre: expect.any(String),
        tipo: expect.any(String),
        fecha_ingreso: expect.any(String),
        mail: expect.any(String),
        telefono: expect.any(String),
        activo: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("GET /api/proveedores/:id", () => {
  it("Devuelve un json con un solo proveedor", async () => {
    const res = await request(app)
      .get("/api/proveedores/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_proveedor: expect.any(Number),
        nombre: expect.any(String),
        tipo: expect.any(String),
        fecha_ingreso: expect.any(String),
        mail: expect.any(String),
        telefono: expect.any(String),
        activo: expect.any(Boolean),
      })
    );
  });
});

describe("POST /api/proveedores", () => {
  it("Agrega y devuelve el proveedor creado en la base de datos", async () => {
    const res = await request(app).post("/api/proveedores").send(nuevoProveedor);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_proveedor: expect.any(Number),
        nombre: expect.any(String),
        tipo: expect.any(String),
        fecha_ingreso: expect.any(String),
        mail: expect.any(String),
        telefono: expect.any(String),
        activo: expect.any(Boolean),
      })
    );
  });
});

describe("PUT /api/proveedores/:id", () => {
  it("Devuelve status code 200 luego de modificar el proveedor con el id 1", async () => {
    const res = await request(app).put("/api/proveedores/1").send(proveedorModificado);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/proveedores/:id", () => {
  it("Devuelve status code 204 luego de borrar el proveedor con el id 1", async () => {
    const res = await request(app).delete("/api/proveedores/1");
    expect(res.statusCode).toEqual(204);
  });
});