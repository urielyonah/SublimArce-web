import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


function EdirarCliente(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        address: ''
    })

    //const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/mclient/${id}`)
        .then(res => {
            // Accede al primer elemento del array de resultados
            const clientData = res.data[0];
            console.log('Datos obtenidos:', clientData);
            setValues({
                email: clientData.CORREO || '',
                password: clientData.CONTRASEÑA || '',
                name: clientData.NOMBRE || '',
                phone: clientData.TELEFONO || '',
                address: clientData.DIRECCION || ''
            });
        })
        .catch(err => console.log(err));
    }, [id]);


    const handleUpdate = (event) =>{
        event.preventDefault();
        console.log('Valores actuales:', values);
        Axios.put(`http://localhost:3001/updateclient/${id}`, values)
        .then(res => {
            console.log(res);
            navigate('/client')
        })
        .catch(err => console.log(err));
    }

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Editar Cliente</h1>
                <form onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <label>Correo</label>
                        <input type="email" name="email" className='form-control' placeholder="Ingresa un correo"
                         value={values.email} onChange={e => setValues({...values, email: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Contraseña</label>
                        <input type="password" name="password" className='form-control' placeholder="Ingresa una contraseña"
                         value={values.password} onChange={e => setValues({...values, password: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Confirmar contraseña:</label>
                        <input type="password" name="password2" className='form-control' placeholder="Confirma contraseña"
                        value={values.password2} onChange={e => setValues({...values, password2: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Nombre:</label>
                        <input type="text" name="name" className='form-control' placeholder="Ingresa tu nombre"
                        value={values.name} onChange={e => setValues({...values, name: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Telefono:</label>
                        <input type="text" name="phone" className='form-control' placeholder="Ingresa tu telefono"
                        value={values.phone} onChange={e => setValues({...values, phone: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Direccion:</label>
                        <input type="text" name="address" className='form-control' placeholder="Ingresa tu direccion"
                        value={values.address} onChange={e => setValues({...values, address: e.target.value})} required/>
                    </div>
                    <button className='btn btn-success'>Actualizar</button>
                    <Link to='/client' className='btn btn-primary ms-3'>Atras</Link>
                </form>
            </div>
        </div>
    )
}

export default EdirarCliente