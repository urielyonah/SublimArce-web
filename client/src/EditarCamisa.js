import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import  Axios  from "axios";


function EditarCamisa(){
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

    //const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/mshirt/${id}`)
        .then(res => {
            // Accede al primer elemento del array de resultados
            const cData = res.data[0];
            console.log('Datos obtenidos:', cData);
            setValues({
                modelo: cData.MODELO || '',
                talla: cData.TALLAS || '',
                color: cData.COLOR || '',
                precio: cData.PRECIO || '',
                descrip: cData.DESCRIPCION || '',
                stock: cData.stock || '',
                imagen: cData.IMAGEN || '',
            });
        })
        .catch(err => console.log(err));
    }, [id]);


    const handleUpdate = (event) =>{
        event.preventDefault();
        console.log('Valores actuales:', values);
        Axios.put(`http://localhost:3001/updateshirt/${id}`, values)
        .then(res => {
            console.log(res);
            navigate('/shirts')
        })
        .catch(err => console.log(err));
    }


    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Editar Camisa</h1>
                <form onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <label>Modelo:</label>
                        <input type="text" name="modelo" className='form-control' placeholder="Ingresa el modelo"
                        value={values.modelo} onChange={e => setValues({...values, modelo: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Talla:</label>
                        <input type="text" name="talla" className='form-control' placeholder="Ingresa la talla"
                        value={values.talla} onChange={e => setValues({...values, talla: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Color:</label>
                        <input type="text" name="color" className='form-control' placeholder="Ingresa el color"
                        value={values.color} onChange={e => setValues({...values, color: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Precio:</label>
                        <input type="number" name="precio" className='form-control' placeholder="Ingresa el precio"
                        value={values.precio} onChange={e => setValues({...values, precio: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Descripcion:</label>
                        <input type="text" name="descrip" className='form-control' placeholder="Ingresa la descripcion"
                        value={values.descrip} onChange={e => setValues({...values, descrip: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Stock:</label>
                        <input type="number" name="stock" className='form-control' placeholder="Ingresa el stock"
                        value={values.stock} onChange={e => setValues({...values, stock: e.target.value})} required/>
                    </div>
                    <div className='mb-2'>
                        <label>Imagen:</label>
                        <input type="text" name="imagen" className='form-control' placeholder="Ingresa la imagen"
                        value={values.imagen} onChange={e => setValues({...values, imagen: e.target.value})} required/>
                    </div>
                    <button className='btn btn-success'>Actualizar</button>
                    <Link to='/shirts' className='btn btn-primary ms-3'>Atras</Link>
                </form>
            </div>
        </div>
    )
}

export default EditarCamisa