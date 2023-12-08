import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";


function AgregarCamisa() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        modelo: '',
        talla: '',
        color: '',
        precio: '',
        descrip: '',
        stock: '',
        imagen: ''
    })

    const [file, setFile] = useState(null)

    const selectHandler = e => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('modelo', values.modelo);
        formData.append('talla', values.talla);
        formData.append('color', values.color);
        formData.append('precio', values.precio);
        formData.append('descrip', values.descrip);
        formData.append('stock', values.stock);
        formData.append('imagen', file);
        Axios.post('http://localhost:3001/addshirt', formData)
            .then(res => {
                console.log(res);
                navigate('/shirts')
            })
            .catch(err => console.log(err));

        setFile(null)
    }



    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Agregar Camisa</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label>Modelo:</label>
                        <input type="text" name="modelo" className='form-control' placeholder="Ingresa el modelo"
                            onChange={e => setValues({ ...values, modelo: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Talla:</label>
                        <input type="text" name="talla" className='form-control' placeholder="Ingresa la talla"
                            onChange={e => setValues({ ...values, talla: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Color:</label>
                        <input type="text" name="color" className='form-control' placeholder="Imgresa el color"
                            onChange={e => setValues({ ...values, color: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Precio:</label>
                        <input type="number" name="precio" className='form-control' placeholder="Ingresa el precio"
                            onChange={e => setValues({ ...values, precio: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Descripcion:</label>
                        <input type="text" name="descrip" className='form-control' placeholder="Ingresa la descripcion"
                            onChange={e => setValues({ ...values, descrip: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Stock:</label>
                        <input type="number" name="stock" className='form-control' placeholder="Ingresa el stock"
                            onChange={e => setValues({ ...values, stock: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Imagen:</label>
                        <input
                            onChange={selectHandler}
                            type="file"
                            name="imagen"
                            className='form-control'
                            required
                        />
                    </div>
                    <button className='btn btn-success'>Registrar</button>
                    <Link to='/shirts' className='btn btn-primary ms-3'>Atras</Link>
                </form>
            </div>
        </div>
    )
}

export default AgregarCamisa