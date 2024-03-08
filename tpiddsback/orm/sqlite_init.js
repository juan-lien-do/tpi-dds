const db = require("aa-sqlite");

async function CrearBase() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.bd/datos.db");

  // tabla clientes
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'clientes'";
  res = await db.get(sql, []);

  if (res.contar <= 0) {
    await db.run(
      `CREATE table clientes( 
          id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          apellido TEXT,
          telefono TEXT,
          mail TEXT,
          fecha_nac DATE,
          fecha_alta DATE,          
          activo BOOLEAN NOT NULL DEFAULT 1
        )`
    );
  
    console.log("tabla clientes creada!");
  // poner clientes
    await db.run(`
      INSERT INTO clientes (nombre, apellido, telefono, mail, fecha_nac, fecha_alta)
      VALUES
        ('Juan', 'Liendo', '3525413678', 'therealboss@hotmail.com', '2002-12-10', '2023-03-18'),
        ('María', 'García', '6549871234', 'mariagarcia@email.com', '1995-06-25', '2023-03-18'),
        ('Pedro', 'Ramírez', '7894563210', 'pedroramirez@email.com', '1988-03-15', '2023-03-19'),
        ('Laura', 'Pérez', '2345678901', 'lauraperez@email.com', '1990-11-02', '2023-03-20'),
        ('Miguel', 'López', '1234567890', 'miguellopez@email.com', '1980-09-14', '2023-03-21'),
        ('Ana', 'Martínez', '9876543210', 'anamartinez@email.com', '1998-04-30', '2023-03-22'),
        ('Luis', 'Fernández', '5678901234', 'luisfernandez@email.com', '1987-12-08', '2023-03-23'),
        ('Sara', 'González', '4567890123', 'saragonzalez@email.com', '1993-02-18', '2023-03-24'),
        ('Eduardo', 'Ortega', '6789012345', 'eduardoortega@email.com', '1985-07-07', '2023-03-25'),
        ('Carmen', 'Sánchez', '3456789012', 'carmensanchez@email.com', '1989-10-19', '2023-03-26');
    `);
    
  }

  // tabla empleados
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'empleados'";
  res = await db.get(sql, []);

  if (res.contar <= 0) {
    await db.run(
      `CREATE table empleados( 
          id_empleado INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          apellido TEXT,
          fecha_nacimiento DATE,
          fecha_ingreso DATE,
          telefono TEXT,
          salario FLOAT,
          activo BOOLEAN NOT NULL DEFAULT 1
        )`
    );
  
    console.log("tabla empleados creada!");
  //ponerle empleados
    await db.run(`
      INSERT INTO empleados (nombre, apellido, telefono, fecha_nacimiento, fecha_ingreso, salario)
      VALUES
        ('Manuel', 'Rosas', '3525423678', '2002-12-11', '2023-03-18', 100.00),
        ('Laura', 'González', '6549871234', '1988-06-25', '2023-03-19', 100.00),
        ('Carlos', 'Martínez', '7894563210', '1990-03-15', '2023-03-20', 100.00),
        ('María', 'Sánchez', '2345678901', '1993-11-02', '2023-03-21', 100.00),
        ('Javier', 'López', '1234567890', '1985-09-14', '2023-03-22', 100.00),
        ('Ana', 'Fernández', '9876543210', '1992-04-30', '2023-03-23', 100.00),
        ('Luis', 'Ortega', '5678901234', '1991-12-08', '2023-03-24', 100.00),
        ('Sofía', 'Pérez', '4567890123', '1997-02-18', '2023-03-25', 100.00),
        ('Diego', 'Ramírez', '6789012345', '1989-07-07', '2023-03-26', 100.00),
        ('Natalia', 'Rodríguez', '3456789012', '1984-10-19', '2023-03-27', 100.00);
    `);
    
  }


  

//crear tabla de proveedores si no hay
  sql =
  "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'proveedores'";
res = await db.get(sql, []);
if (res.contar == 0 || res.contar == -1) {
    await db.run(
      `CREATE TABLE "proveedores" (
        "id_proveedor"	INTEGER,
        "nombre"	TEXT NOT NULL,
        "tipo"	TEXT NOT NULL,
        "fecha_ingreso"	DATE,
        "mail"	TEXT,
        "telefono"	TEXT,
        "activo"	BOOLEAN NOT NULL DEFAULT 1,
        PRIMARY KEY("id_proveedor" AUTOINCREMENT)
      );`
    );

console.log("tabla proveedores creada!");
//Ponerle proveedores
await db.run(
  `INSERT INTO proveedores (nombre, tipo, fecha_ingreso, mail, telefono, activo) VALUES
  ('Proveedor 1', 'SRL', '2023-01-15', 'proveedor1@example.com', '1234567890', 1),
  ('Proveedor 2', 'SA', '2022-11-20', 'proveedor2@example.com', '9876543210', 1),
  ('Proveedor 3', 'SRL', '2023-02-28', 'proveedor3@example.com', '5555555555', 1),
  ('Proveedor 4', 'SA', '2021-09-10', 'proveedor4@example.com', '1111111111', 0),
  ('Proveedor 5', 'SAS', '2020-12-05', 'proveedor5@example.com', '9999999999', 1),
  ('Proveedor 6', 'SA', '2023-03-08', 'proveedor6@example.com', '8888888888', 1),
  ('Proveedor 7', 'SRL', '2021-05-25', 'proveedor7@example.com', '7777777777', 0),
  ('Proveedor 8', 'SA', '2022-07-12', 'proveedor8@example.com', '6666666666', 1),
  ('Proveedor 9', 'SRL', '2020-04-15', 'proveedor9@example.com', '4444444444', 1),
  ('Proveedor 10', 'SCP', '2022-08-30', 'proveedor10@example.com', '3333333333', 0);
  `
);

}

  //tabla productos
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'productos'";
  res = await db.get(sql, []);
  if (res.contar <= 0) {
    await db.run(
      `CREATE table productos( 
          id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          precio REAL,
          fecha_ingreso DATE,
          stock INTEGER,
          proveedor_id INTEGER, 
          activo BOOLEAN NOT NULL DEFAULT 1,
          FOREIGN KEY (proveedor_id) REFERENCES proveedores(id_proveedor)
        )`
    );
  
    console.log("tabla productos creada!");
  // poner productos
    await db.run(`
      INSERT INTO productos (nombre, precio, fecha_ingreso, stock, proveedor_id)
      VALUES
        ('Destornillador TORX Proskit', 3300.00, '2023-02-03', 500, 5),
        ('Taladro Atornillador Inalambrico', 5000.00, '2023-02-23', 45, 4),
        ('Alcohol Isopropilico Delta', 7800.00, '2023-03-19', 150, 2),
        ('Tornillo autoperforante', 100.00, '2023-03-14', 3500, 3),
        ('Kit 4 Pinzas Bruzelas', 8300.00, '2023-03-24', 300, 7),
        ('Tester digital Multimetro Proskit', 17000.00, '2023-03-05', 450, 8),
        ('Estación de soldado', 83500.00, '2023-03-31', 200, 4),
        ('Estaño en pasta', 1500.00, '2023-04-16', 550, 2),
        ('Pasta térmica MX-4',5500.00, '2023-02-05', 375, 3),
        ('Destornillador plano', 3750.00, '2023-01-09', 200, 1)
    `);
      
  }

    //tabla facturas
    sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'facturas'";
    res = await db.get(sql, []);
    if (res.contar <= 0) {
      await db.run(
        `CREATE table facturas( 
            id_factura INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER NOT NULL,
            empleado_id INTEGER NOT NULL,
            precio FLOAT DEFAULT 0,
            fecha DATE DEFAULT CURRENT_TIMESTAMP,
            pagada BOOLEAN DEFAULT 0,
            tipo_factura TEXT NOT NULL DEFAULT 'A',
            activo BOOLEAN NOT NULL DEFAULT 1,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id_cliente)
            FOREIGN KEY (empleado_id) REFERENCES empleados(id_empleado)
          )`
      );
    
      console.log("tabla facturas creada!");
    // poner facturas
      await db.run(`
        INSERT INTO facturas (cliente_id, empleado_id, fecha, tipo_factura)
        VALUES
          (1, 1, '2023-02-03', 'A'),
          (2, 2, '2023-02-10', 'B'),
          (3, 3, '2023-02-17', 'C'),
          (4, 4, '2023-02-24', 'A'),
          (5, 5, '2023-03-03', 'B'),
          (6, 6, '2023-03-10', 'C'),
          (7, 7, '2023-03-17', 'A'),
          (8, 8, '2023-03-24', 'B'),
          (9, 9, '2023-03-31', 'C'),
          (10, 10, '2023-04-07', 'A');
      `);
        
    }

    // tabla detalles
    sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'detalles'";
    res = await db.get(sql, []);
    if (res.contar <= 0) {
      await db.run(
        `CREATE table detalles( 
            id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
            producto_id INTEGER NOT NULL,
            factura_id INTEGER NOT NULL,
            cantidad FLOAT NOT NULL,
            precio FLOAT,
            activo BOOLEAN NOT NULL DEFAULT 1,
            FOREIGN KEY (factura_id) REFERENCES facturas(id_factura) ON DELETE CASCADE,
            FOREIGN KEY (producto_id) REFERENCES productos(id_producto)
          )`
      );

      // regla 1 parte 1
      // este trigger actualiza el precio de las facturas y detalles
      // luego de una insercion
      await db.run(`
        CREATE TRIGGER insert_precio_facturas
        AFTER INSERT ON detalles
        BEGIN
          UPDATE detalles
          SET precio = (
            SELECT NEW.cantidad * productos.precio
            FROM productos
            WHERE NEW.producto_id = productos.id_producto
          )
          WHERE detalles.id_detalle = NEW.id_detalle;

          UPDATE facturas
          SET precio = (
            SELECT SUM(precio)
            FROM detalles
            WHERE detalles.factura_id = NEW.factura_id
          )
          WHERE facturas.id_factura = NEW.factura_id;
        END;
      `);

      // regla 1 bis
      // este trigger actualiza el precio de las facturas y detalles
      // luego de una update
      await db.run(`
        CREATE TRIGGER update_precio_facturas
        AFTER UPDATE ON detalles
        BEGIN
          UPDATE detalles
          SET precio = (
            SELECT NEW.cantidad * productos.precio
            FROM productos
            WHERE NEW.producto_id = productos.id_producto
          )
          WHERE detalles.id_detalle = NEW.id_detalle;
          UPDATE facturas
          SET precio = (
            SELECT SUM(precio)
            FROM detalles
            WHERE detalles.factura_id = NEW.factura_id
            AND detalles.activo = 1
          )
          WHERE facturas.id_factura = NEW.factura_id;
        END;
      `);
      
      //insertar detalles
      await db.run(`
        INSERT INTO detalles (producto_id, factura_id, cantidad)
        VALUES
        (1, 1, 3),
        (2, 1, 3),
        (3, 2, 12),
        (4, 2, 3),
        (5, 5, 3),
        (6, 6, 3),
        (7, 7, 3),
        (8, 8, 3),
        (9, 9, 3),
        (10, 10, 2);
      `);

    }
      
  // cerrar la base de datos para no molestar al resto de la ejecucion
  db.close();

}

CrearBase();

// exportar paquete con la funcion
module.exports = CrearBase;