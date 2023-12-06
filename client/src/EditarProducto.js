import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import  Axios  from "axios";


function EditarProducto(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        nombre: '',
        precio: '',
        descrip: '',
        stock: '',
        categoria: '',
        imagen: ''
    })

    //const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/mproduct/${id}`)
        .then(res => {
            // Accede al primer elemento del array de resultados
            const cData = res.data[0];
            console.log('Datos obtenidos:', cData);
            setValues({
                nombre: cData.NOMBRE || '',
                precio: cData.PRECIO || '',
                descrip: cData.DESCRIPCION || '',
                stock: cData.stock || '',
                categoria: cData.CATEGORIA || '',
                imagen: cData.IMAGEN || '',
            });
        })
        .catch(err => console.log(err));
    }, [id]);


    const handleUpdate = (event) =>{
        event.preventDefault();
        console.log('Valores actuales:', values);
        Axios.put(`http://localhost:3001/updateproduct/${id}`, values)
        .then(res => {
            console.log(res);
            navigate('/products')
        })
        .catch(err => console.log(err));
    }


    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Editar Camisa</h1>
                <form onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <label>Nomre:</label>
                        <input type="text" name="nombre" className='form-control' placeholder="Ingresa el nombre"
                        value={values.nombre} onChange={e => setValues({...values, nombre: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Precio:</label>
                        <input type="number" name="precio" className='form-control' placeholder="Ingresa el precio"
                        value={values.precio} onChange={e => setValues({...values, precio: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Descripcion:</label>
                        <input type="text" name="descrip" className='form-control' placeholder="Ingresa la descripcon"
                        value={values.descrip} onChange={e => setValues({...values, descrip: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Stock:</label>
                        <input type="number" name="stock" className='form-control' placeholder="Ingresa el stock"
                        value={values.stock} onChange={e => setValues({...values, stock: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>categoria:</label>
                        <input type="text" name="categoria" className='form-control' placeholder="Ingresa la categoria"
                        value={values.categoria} onChange={e => setValues({...values, categoria: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Imagen:</label>
                        <input type="text" name="imagen" className='form-control' placeholder="Ingresa la imagen"
                        value={values.imagen} onChange={e => setValues({...values, imagen: e.target.value})} required/>
                    </div>
                    <button className='btn btn-success'>Actualizar</button>
                    <Link to='/products' className='btn btn-primary ms-3'>Atras</Link>
                </form>
            </div>
        </div>
    )
}

export default EditarProducto