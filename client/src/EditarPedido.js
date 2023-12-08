import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import  Axios  from "axios";


function EditarPedido(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        idcamisa: '',
        idproducto: '',
        cantidad: '',
        precio: '',
        status: '',
        idcliente: '',
    })

    //const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/mpedido/${id}`)
        .then(res => {
            // Accede al primer elemento del array de resultados
            const cData = res.data[0];
            console.log('Datos obtenidos:', cData);
            setValues({
                idcamisa: cData['ID-CAMISAS-SERVICIOS'] || '',
                idproducto: cData['ID-PRODUCTOS'] || '',
                cantidad: cData.CANTIDAD || '',
                precio: cData.PRECIO || '',
                status: cData.STATUS || '',
                idcliente: cData['ID-CLIENTE'] || '',
            });
        })
        .catch(err => console.log(err));
    }, [id]);


    const handleUpdate = (event) =>{
        event.preventDefault();
        console.log('Valores actuales:', values);
        Axios.put(`http://localhost:3001/updatepedido/${id}`, values)
        .then(res => {
            console.log(res);
            navigate('/buys')
        })
        .catch(err => console.log(err));
    }


    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Editar Pedido</h1>
                <form onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <label>ID-Camisa:</label>
                        <input type="number" name="idcamisa" className='form-control' placeholder="Ingresa el modelo"
                        value={values.idcamisa} onChange={e => setValues({...values, idcamisa: e.target.value})} disabled/>
                    </div>
                    <div className='mb-2'>
                        <label>ID-producto:</label>
                        <input type="number" name="idproducto" className='form-control' placeholder="Ingresa la talla"
                        value={values.idproducto} onChange={e => setValues({...values, idproducto: e.target.value})} disabled/>
                    </div>
                    <div className='mb-2'>
                        <label>Cantidad:</label>
                        <input type="number" name="cantidad" className='form-control' placeholder="Ingresa el color"
                        value={values.cantidad} onChange={e => setValues({...values, cantidad: e.target.value})} disabled/>
                    </div>
                    <div className='mb-2'>
                        <label>Precio:</label>
                        <input type="number" name="precio" className='form-control' placeholder="Ingresa el precio"
                        value={values.precio} onChange={e => setValues({...values, precio: e.target.value})} disabled/>
                    </div>
                    <div className='mb-2'>
                        <label>Status:</label>
                        <select value={values.status} onChange={e => setValues({...values, status: e.target.value})} className='form-control'>
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="EN PROCESO">EN PROCESO</option>
                            <option value="PAGADO">PAGADO</option>
                            <option value="ENTREGADO">ENTREGADO</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label>ID-cliente:</label>
                        <input type="number" name="idcliente" className='form-control' placeholder="Ingresa el stock"
                        value={values.idcliente} onChange={e => setValues({...values, idcliente: e.target.value})} disabled/>
                    </div>
                    <button className='btn btn-success'>Actualizar</button>
                    <Link to='/buys' className='btn btn-primary ms-3'>Atras</Link>
                </form>
            </div>
        </div>
    )
}

export default EditarPedido