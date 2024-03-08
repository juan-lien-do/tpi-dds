const express = require("express");
const cors = require("cors");
require("./orm/sqlite_init"); // Crear base si no existe

// Crear servidor
const app = express();
app.use(cors());
app.use(express.json());


const empleados_router = require("./routes/empleados")
const clientes_router = require("./routes/clientes")
const detalles_facturas_router = require("./routes/detalles");
const facturas_router = require("./routes/facturas");
const proveedores_router = require("./routes/proveedores");
const productos_router = require("./routes/productos")

// Rutas
app.use("/api/empleados", empleados_router);
app.use("/api/clientes", clientes_router);
app.use("/api/facturas", facturas_router);
app.use("/api/detalles", detalles_facturas_router);
app.use("/api/proveedores", proveedores_router);;
app.use("/api/productos", productos_router);


// Levantar servidor
const port = 8000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});

module.exports = app; // para testing