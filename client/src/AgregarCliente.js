import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import  Axios  from "axios";


function AgregarCliente(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
        password2: '',
        name: '',
        phone: '',
        address: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validación de contraseñas
        if (values.password !== values.password2) {
            alert("Las contraseñas no coinciden");
            return;
        }
        Axios.post('http://localhost:3001/addclient', values)
        .then(res => {
            console.log(res);
            navigate('/client')
        })
        .catch(err => console.log(err));
    }

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Agregar Cliente</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label>Correo</label>
                        <input type="email" name="email" className='form-control' placeholder="Ingresa un correo"
                        onChange={e => setValues({...values, email: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Contraseña</label>
                        <input type="password" name="password" className='form-control' placeholder="Ingresa una contraseña"
                        onChange={e => setValues({...values, password: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Confirmar contraseña:</label>
                        <input type="password" name="password2" className='form-control' placeholder="Confirma contraseña"
                        onChange={e => setValues({...values, password2: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Nombre:</label>
                        <input type="text" name="name" className='form-control' placeholder="Ingresa tu nombre"
                        onChange={e => setValues({...values, name: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Telefono:</label>
                        <input type="text" name="phone" className='form-control' placeholder="Ingresa tu telefono"
                        onChange={e => setValues({...values, phone: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Direccion:</label>
                        <input type="text" name="address" className='form-control' placeholder="Ingresa tu direccion"
                        onChange={e => setValues({...values, address: e.target.value})} required/>
                    </div>
                    <button className='btn btn-success'>Registrar</button>
                    <Link to='/client' className='btn btn-primary ms-3'>Atras</Link>
                </form>
            </div>
        </div>
    )
}

export default AgregarCliente