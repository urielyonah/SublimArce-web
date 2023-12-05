const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


app.listen(3001, () => {
  console.log('listening on port 3001');
});
