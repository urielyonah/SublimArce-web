const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // Establecer el límite en 10 MB
  },
});

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'bf9oexmvjv7umifwuwdu-mysql.services.clever-cloud.com',
  user: 'utykxbwezjt44m3a',
  password: 'OCs10YTeZ47cnQ1Rwddp',
  database: 'bf9oexmvjv7umifwuwdu',
  charset: 'utf8',
});

const JWT_SECRET = 'secret_key'; // Debes reemplazarlo con una clave secreta más segura

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await getUserByEmail(email);
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Email incorrecto' });
    }

    if (user.CONTRASEÑA === password) {
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      console.log('Token generado:', token);
      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Inicio de sesión exitoso', token });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en la autenticación' });
  }
});

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ADMINISTRADORES WHERE CORREO = ?';

    db.query(sql, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

//MOSTRAR CLIENTES
app.get('/mclient', (req, res) => {
  db.query('SELECT * FROM CLIENTES', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//MOSTRAR PEDIDOS
app.get('/mpedidos', (req, res) => {
  db.query('SELECT * FROM PEDIDOS', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//MOSTRAR PRODUCTOS
app.get('/mproducts', (req, res) => {
  db.query('SELECT * FROM PRODUCTOS', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//MOSTRAR CAMISAS
app.get('/mshirts', (req, res) => {
  db.query('SELECT * FROM CAMISAS', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//MOSTRAR ADMINISTRADORES
app.get('/madmin', (req, res) => {
  db.query('SELECT * FROM ADMINISTRADORES', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//AGREGAR CLIENTE
app.post('/addclient', (req, res) => {
  const correo = req.body.email;
  const nombre = req.body.name;
  const contraseña = req.body.password;
  const telefono = req.body.phone;
  const direccion = req.body.address;

  const sql = `INSERT INTO CLIENTES (NOMBRE, CORREO, CONTRASEÑA, TELEFONO, DIRECCION) VALUES ('${nombre}', '${correo}', '${contraseña}','${telefono}','${direccion}')`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(results);
      console.log('Numero de registros insertados: ' + results.affectedRows);
      console.log(nombre, correo, contraseña, telefono, direccion);
    }
  });
});

// AGREGAR CAMISA
app.post('/addshirt', upload.single('imagen'), (req, res) => {
  const modelo = req.body.modelo;
  const talla = req.body.talla;
  const color = req.body.color;
  const precio = req.body.precio;
  const descripcion = req.body.descrip;
  const stock = req.body.stock;
  const imagen = req.file ? req.file.filename : null;

  if (imagen) {
    // Aquí puedes realizar acciones adicionales si hay un archivo adjunto.
    console.log('Nombre del archivo:', imagen);
  } else {
    console.log('No se adjuntó ningún archivo.');
  }

  const sql = `INSERT INTO CAMISAS (MODELO, TALLAS, COLOR, PRECIO, DESCRIPCION, stock, IMAGEN) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [modelo, talla, color, precio, descripcion, stock, imagen], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error al agregar la camisa' });
    } else {
      res.status(200).json(results);
      console.log('Número de registros insertados: ' + results.affectedRows);
    }
  });
});

// AGREGAR PRODUCTO
app.post('/addproduct', upload.single('imagen'), (req, res) => {
  const nombre = req.body.nombre;
  const precio = req.body.precio;
  const descripcion = req.body.descrip;
  const stock = req.body.stock;
  const categoria = req.body.categoria;
  const imagen = req.file ? req.file.filename : null;

  if (imagen) {
    console.log('Nombre del archivo:', imagen);
  } else {
    console.log('No se adjuntó ningún archivo.');
  }

  const sql = `INSERT INTO PRODUCTOS (NOMBRE, PRECIO, DESCRIPCION, stock, CATEGORIA, IMAGEN) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nombre, precio, descripcion, stock, categoria, imagen], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error al agregar el producto' });
    } else {
      res.status(200).json(results);
      console.log('Número de registros insertados: ' + results.affectedRows);
    }
  });
});


//AGREGAR ADMIN
app.post('/addadmin', (req, res) => {
  const correo = req.body.email;
  const contraseña = req.body.password;
  const nombre = req.body.name;

  const sql = `INSERT INTO ADMINISTRADORES (NOMBRE, CORREO, CONTRASEÑA) VALUES ('${nombre}', '${correo}', '${contraseña}')`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(results);
      console.log('Numero de registros insertados: ' + results.affectedRows);
      console.log(nombre, correo, contraseña);
    }
  });
});

//EDITAR CLIENTE
app.put('/updateclient/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  const sql = 'UPDATE CLIENTES SET CORREO = ?, CONTRASEÑA = ?, NOMBRE = ?, TELEFONO = ?, DIRECCION = ?  WHERE `ID-CLIENTE` = ?';
  db.query(sql, [datos.email, datos.password, datos.name, datos.phone, datos.address, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar los datos en la base de datos:', err);
      res.status(500).json({ mensaje: 'Error al actualizar el cliente en la base de datos' });
      return;
    } else {
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    }
  });
});

//EDITAR CAMISA
app.put('/updateshirt/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  const sql = 'UPDATE CAMISAS SET MODELO = ?, TALLAS = ?, COLOR = ?, PRECIO = ?, DESCRIPCION = ?, stock = ?, IMAGEN = ?  WHERE `ID-CAMISAS` = ?';
  db.query(sql, [datos.modelo, datos.talla, datos.color, datos.precio, datos.descrip, datos.stock, datos.imagen, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar los datos en la base de datos:', err);
      res.status(500).json({ mensaje: 'Error al actualizar la camisa en la base de datos' });
      return;
    } else {
      res.json({ mensaje: 'Camisa actualizado correctamente' });
    }
  });
});

//EDITAR PEDIDO
app.put('/updatepedido/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  const sql = 'UPDATE PEDIDOS SET `ID-CAMISAS-SERVICIOS` = ?, `ID-PRODUCTOS` = ?, CANTIDAD = ?, PRECIO = ?, STATUS = ?, `ID-CLIENTE` = ?  WHERE `ID-PEDIDOS` = ?';
  db.query(sql, [datos.idcamisa, datos.idproducto, datos.cantidad, datos.precio, datos.status, datos.idcliente, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar los datos en la base de datos:', err);
      res.status(500).json({ mensaje: 'Error al actualizar el pedido en la base de datos' });
      return;
    } else {
      res.json({ mensaje: 'Pedido actualizado correctamente' });
    }
  });
});

//EDITAR PRODUCTO
app.put('/updateproduct/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  const sql = 'UPDATE PRODUCTOS SET NOMBRE = ?, PRECIO = ?, DESCRIPCION = ?, stock = ?, CATEGORIA = ?, IMAGEN = ?  WHERE `ID-PRODUCTOS` = ?';
  db.query(sql, [datos.nombre, datos.precio, datos.descrip, datos.stock, datos.categoria, datos.imagen, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar los datos en la base de datos:', err);
      res.status(500).json({ mensaje: 'Error al actualizar el producto en la base de datos' });
      return;
    } else {
      res.json({ mensaje: 'Producto actualizado correctamente' });
    }
  });
});

//EDITAR ADMIN
app.put('/updateadmin/:id', (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  const sql = 'UPDATE ADMINISTRADORES SET CORREO = ?, CONTRASEÑA = ?, NOMBRE = ?  WHERE `ID-ADMIN` = ?';
  db.query(sql, [datos.email, datos.password, datos.name, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar los datos en la base de datos:', err);
      res.status(500).json({ mensaje: 'Error al actualizar el admin en la base de datos' });
      return;
    } else {
      res.json({ mensaje: 'Admin actualizado correctamente' });
    }
  });
});

//SELECCIONAR ADMIN A EDITAR
app.get('/madmin/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM ADMINISTRADORES WHERE `ID-ADMIN` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//SELECCIONAR CAMISA A EDITAR
app.get('/mshirt/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM CAMISAS WHERE `ID-CAMISAS` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//SELECCIONAR PEDIDOS A EDITAR
app.get('/mpedido/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM PEDIDOS WHERE `ID-PEDIDOS` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//SELECCIONAR PRODUCTO A EDITAR
app.get('/mproduct/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM PRODUCTOS WHERE `ID-PRODUCTOS` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//SELECCIONAR CLIENTE A EDITAR
app.get('/mclient/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM CLIENTES WHERE `ID-CLIENTE` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

//ELIMINAR CLIENTE
app.delete('/deleteclient/:id', (req, res) => {
  const id = req.params.id;
  // Primero, obtén los datos del cliente que estás a punto de eliminar
  db.query('SELECT * FROM CLIENTES WHERE `ID-CLIENTE` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      const clientData = results[0];
      // Ahora, elimina al cliente
      db.query('DELETE FROM CLIENTES WHERE `ID-CLIENTE` = ?', [id], (err, deleteResults) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error al eliminar el cliente' });
        } else {
          console.log('Cliente eliminado:', clientData);
          res.json({ message: 'Cliente eliminado correctamente', deletedClient: clientData });
        }
      });
    }
  });
});

//ELIMINAR ADMIN
app.delete('/deleteadmin/:id', (req, res) => {
  const id = req.params.id;
  // Primero, obtén los datos del admin que estás a punto de eliminar
  db.query('SELECT * FROM ADMINISTRADORES WHERE `ID-ADMIN` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      const adminData = results[0];
      // Ahora, elimina al admin
      db.query('DELETE FROM ADMINISTRADORES WHERE `ID-ADMIN` = ?', [id], (err, deleteResults) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error al eliminar el cliente' });
        } else {
          console.log('Cliente eliminado:', adminData);
          res.json({ message: 'Cliente eliminado correctamente', deletedAdmin: adminData });
        }
      });
    }
  });
});

//ELIMINAR CAMISA
app.delete('/deleteshirt/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM CAMISAS WHERE `ID-CAMISAS` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      const camisaData = results[0];
      // Ahora, elimina al admin
      db.query('DELETE FROM CAMISAS WHERE `ID-CAMISAS` = ?', [id], (err, deleteResults) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error al eliminar el camisa' });
        } else {
          console.log('Cliente eliminado:', camisaData);
          res.json({ message: 'Camisa eliminado correctamente', deletedcamisa: camisaData });
        }
      });
    }
  });
});

//ELIMINAR PEDIDO
app.delete('/deletepedido/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM PEDIDOS WHERE `ID-PEDIDOS` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      const pData = results[0];
      // Ahora, elimina al admin
      db.query('DELETE FROM PEDIDOS WHERE `ID-PEDIDOS` = ?', [id], (err, deleteResults) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error al eliminar el camisa' });
        } else {
          console.log('Pedido eliminado:', pData);
          res.json({ message: 'Pedido eliminado correctamente', deletedpedido: pData });
        }
      });
    }
  });
});

//ELIMINAR PRODUCTO
app.delete('/deleteproduct/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM PRODUCTOS WHERE `ID-PRODUCTOS` = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error en la consulta' });
    } else {
      const Data = results[0];
      // Ahora, elimina al admin
      db.query('DELETE FROM PRODUCTOS WHERE `ID-PRODUCTOS` = ?', [id], (err, deleteResults) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error al eliminar el producto' });
        } else {
          console.log('Producto eliminado:', Data);
          res.json({ message: 'producto eliminado correctamente', deletedProduct: Data });
        }
      });
    }
  });
});



app.listen(3001, () => {
  console.log('listening on port 3001');
});
