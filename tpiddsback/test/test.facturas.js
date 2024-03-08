
const request = require("supertest");
const app = require("../app");

describe("GET /api/facturas", () => {
  it("Devuelve todas las facturas con JSON", async () => {
    const res = await request(app)
      .get("/api/facturas")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id_factura: expect.any(Number),
          cliente_id: expect.any(Number),
          empleado_id: expect.any(Number),
          precio: expect.any(Number),
          pagada: expect.any(Boolean),
          fecha: expect.any(String),
          tipo_factura: expect.any(String),
          activo: expect.any(Boolean),
        }),
      ])
    );

  });
});

describe("GET /api/facturas/:id", () => {
  it("Devuelve un json con una sola factura", async () => {
    const res = await request(app)
    .get("/api/facturas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_factura: expect.any(Number),
        cliente_id: expect.any(Number),
        empleado_id: expect.any(Number),
        precio: expect.any(Number),
        pagada: expect.any(Boolean),
        fecha: expect.any(String),
        tipo_factura: expect.any(String),
        activo: expect.any(Boolean),
      })
    );
  });
});

describe("POST /api/facturas", () => {
  it("Agrega y devuelve la factura creada en la base de datos", async () => {
    const res = await request(app).post("/api/facturas").send({
        cliente_id: 2,
        empleado_id: 3,
        precio: Math.floor(Math.random() * 1000),
        pagada: false,
        fecha: new Date().toISOString(),
        tipo_factura: 'A',
    });
    


    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_factura: expect.any(Number),
        cliente_id: expect.any(Number),
        empleado_id: expect.any(Number),
        precio: expect.any(Number),
        pagada: expect.any(Boolean),
        fecha: expect.any(String),
        tipo_factura: expect.any(String),
        activo: expect.any(Boolean),
      })
    );
  });
});

describe("PUT /api/facturas/:id", () => {
  it("Devuelve status code 200 luego de modificar la factura con el id 1", async () => {
    const res = await request(app).put("/api/facturas/1").send({
        cliente_id: 4,
        empleado_id: 3,
        pagada: true
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/facturas/:id", () => {
  it("Devuelve status code 200 luego de borrar la factura 1", async () => {
    const res = await request(app).delete("/api/facturas/1");
    expect(res.statusCode).toEqual(200);
  });
});
