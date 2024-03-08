const request = require("supertest");
const app = require("../app");


// GET DETALLES
describe("GET /api/detalles", () => {
  it("Devuelve un JSON con todos los detalles de las facturas", async () => {
    const res = await request(app)
      .get("/api/detalles")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            id_detalle: expect.any(Number),
            producto_id: expect.any(Number),
            cantidad: expect.any(Number),
            precio: expect.any(Number),
            factura_id: expect.any(Number),
            activo: expect.any(Boolean),
        }),
      ])
    );
  });
});


// GET BY ID DETALLES
describe("GET /api/detalles/:id", () => {
  it("Devuelve un json con un solo detalle de factura", async () => {
    const res = await request(app)
    .get("/api/detalles/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_detalle: expect.any(Number),
        producto_id: expect.any(Number),
        cantidad: expect.any(Number),
        precio: expect.any(Number),
        factura_id: expect.any(Number),
        activo: expect.any(Boolean),
      })
    );
  });
});

// POST DETALLES
describe("POST /api/detalles", () => {
  it("Agrega y devuelve el detalle creado en la base de datos", async () => {
    const res = await request(app).post("/api/detalles").send({
        cantidad: 1,
        producto_id: 7,
        factura_id: 7,
        precio: null
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_detalle: expect.any(Number),
        producto_id: expect.any(Number),
        cantidad: expect.any(Number),
        precio: expect.any(Number),
        factura_id: expect.any(Number),
        activo: expect.any(Boolean),
      })
    );
  });
});

describe("PUT /api/detalles/:id", () => {
  it("Devuelve status code 200 luego de modificar el detalle con el id 1", async () => {
    const res = await request(app).put("/api/detalles/1").send({
        cantidad : 70,
        producto_id : 2
    });
    expect(res.statusCode).toEqual(201);
  });
});

describe("DELETE /api/detalles/:id", () => {
  it("Devuelve status code 204 luego de borrar el detalle con el id 1", async () => {
    const res = await request(app).delete("/api/detalles/1");
    expect(res.statusCode).toEqual(204);
  });
});