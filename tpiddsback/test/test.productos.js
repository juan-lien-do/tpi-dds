const request = require("supertest");
const app = require("../app");

const nombres = ['Destornillador', 'TesterMultimetro', 'Estaño', 'Pinzas', 'Taladro'];

const nuevoProducto = {
  nombre: nombres[Math.floor(Math.random() * nombres.length)],
  precio: 2500.00,
  fecha_ingreso: new Date().toISOString(),
  stock: 100,
  activo: true,
  proveedor_id: 1,
}


const producto_modificado = {
  nombre: nombres[Math.floor(Math.random() * nombres.length)],
  precio: 2500.00,
  fecha_ingreso: new Date().toISOString(),
  stock: 100,
  activo: true,
  proveedor_id: 1,
}


// test route/productos GET
describe("GET /api/productos", () => {
  it("Devuelve un Json con todos los productos", async () => {
      const res = await request(app)
      .get("/api/productos")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id_producto: expect.any(Number),
          nombre: expect.any(String),
          precio: expect.any(Number),
          fecha_ingreso: expect.any(String),
          stock: expect.any(Number),
          activo: expect.any(Boolean),
          proveedor_id: expect.any(Number)
        }),
      ])
    );
  });
});


// test route/productos/:id GET
describe("GET /api/productos/:id", () => {
  it("Devuelve un json con un solo producto", async () => {
      const res = await request(app)
        .get("/api/productos/2");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id_producto: expect.any(Number),
          nombre: expect.any(String),
          precio: expect.any(Number),
          fecha_ingreso: expect.any(String),
          stock: expect.any(Number),
          activo: expect.any(Boolean),
          proveedor_id: expect.any(Number)
        })
      );
    });
  });

// test route/producto POST
describe("POST /api/productos", () => {
  it("Agrega y devuelve el producto creado en la base de datos", async () => {
      const res = await request(app).post("/api/productos").send(nuevoProducto);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          id_producto: expect.any(Number),
          nombre: expect.any(String),
          precio: expect.any(Number),
          fecha_ingreso: expect.any(String),
          stock: expect.any(Number),
          activo: expect.any(Boolean),
          proveedor_id: expect.any(Number)
        })
      );
    });
  });

// test route/productos/:id PUT
describe("PUT /api/productos/:id", () => {
  it("Devuelve status code 200 luego de modificar el producto con el id 1", async () => {
    const res = await request(app).put("/api/productos/3").send(producto_modificado);

    expect(res.statusCode).toEqual(200);
  });
});

// test route/producto/:id DELETE
describe("DELETE /api/producto/:id", () => {
  it("Devuelve status code 204 luego de borrar el producto con el id 2", async () => {
    const res = await request(app).delete("/api/productos/2");
    expect(res.statusCode).toEqual(204);
  });
});
