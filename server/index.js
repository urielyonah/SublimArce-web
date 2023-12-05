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

app.listen(3001, () => {
  console.log('listening on port 3001');
});
