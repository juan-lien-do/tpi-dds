// Importa las dependencias
const request = require("supertest");
const app = require("./app.js");

// test FACTURAS
describe("-----FACTURAS API Tests", () => {
  require("./test/test.facturas.js");
});

// test DETALLES
describe("-----DETALLES API Tests", () => {
  require("./test/test.detalles.js");
});
// test PRODUCTOS
describe("-----PRODUCTOS API Tests", () => {
  require("./test/test.productos.js");
});

// test EMPLEADOS
describe("-----EMPLEADOS API Tests", () => {
  require("./test/test.empleados.js");
});
// test PROVEEDORES
describe("-----PROVEEDORES API Tests", () => {
  require("./test/test.proveedores.js");
});

// test CLIENTES
describe("-----CLIENTES API Tests", () => {
  require("./test/test.clientes.js");
});