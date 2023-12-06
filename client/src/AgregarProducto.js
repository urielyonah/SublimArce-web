import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";


function AgregarProducto() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        nombre: '',
        precio: '',
        descrip: '',
        stock: '',
        categoria: '',
        imagen: ''
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nombre', values.nombre);
        formData.append('precio', values.precio);
        formData.append('descrip', values.descrip);
        formData.append('stock', values.stock);
        formData.append('categoria', values.categoria);
        formData.append('imagen', values.imagen[0]);
        Axios.post('http://localhost:3001/addproduct', formData)
            .then(res => {
                console.log(res);
                navigate('/products')
            })
            .catch(err => console.log(err));
    }



    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Agregar Producto</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" className='form-control' placeholder="Ingresa el nombre"
                            onChange={e => setValues({ ...values, nombre: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Precio:</label>
                        <input type="number" name="precio" className='form-control' placeholder="Ingresa el precio"
                            onChange={e => setValues({ ...values, precio: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Descripcion:</label>
                        <input type="text" name="descrip" className='form-control' placeholder="Imgresa la descripcion"
                            onChange={e => setValues({ ...values, descrip: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Stock:</label>
                        <input type="number" name="stock" className='form-control' placeholder="Ingresa el stock"
                            onChange={e => setValues({ ...values, stock: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Categoria:</label>
                        <input type="text" name="categoria" className='form-control' placeholder="Ingresa la categoria"
                            onChange={e => setValues({ ...values, categoria: e.target.value })} required />
                    </div>
                    <div className='mb-2'>
                        <label>Imagen:</label>
                        <input
                            type="file"
                            name="imagen"
                            className='form-control'
                            required
                        />
                    </div>
                    <button className='btn btn-success'>Registrar</button>
                    <Link to='/products' className='btn btn-primary ms-3'>Atras</Link>
                </form>
            </div>
        </div>
    )
}

export default AgregarProducto