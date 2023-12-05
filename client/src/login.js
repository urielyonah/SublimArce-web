import React, { useEffect } from 'react';
import Axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './App.css';


function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Verificar la presencia del token al cargar la página
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, []);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await Axios.post('http://localhost:3001/login', values);
        console.log('Respuesta del servidor:', response.data);
        // Almacenar el token en localStorage
        localStorage.setItem('token', response.data.token);
        const storedToken = localStorage.getItem('token');
        console.log('Token almacenado:', storedToken);
        navigate('/home');
    } catch (error) {
        console.error(error.response.data);
        alert('Credenciales incorrectas');
    }
};

  return (
    <div className='main vh-100'>
        <div className="header">
          <div className="left-section">
            <button className="btn_left-section"></button>
          </div>
          <div className="center-section">
            <h1>SublimArce</h1>
          </div>
          <div className="right-section">
            <ul>
              {/* Usamos Link en lugar de <a> para la navegación interna */}
              <li><a to="#">Administradores</a></li>
            </ul>
          </div>
        </div>
        <div className="box">
          <span className="borderline"></span>
          <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <div className="inputBox">
              <input
                onChange={handleInput}
                name='email'
                type="email"
                required />
              <span>Correo de usuario</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                onChange={handleInput}
                name='password'
                type="password"
                required />
              <span>Contraseña</span>
              <i></i>
            </div>
            <div className="links">
              <a to="#">Olvido la Contraseña</a>
            </div>
            <button>Login</button>
          </form>
        </div>
    </div>
  );
}

export default Login;
