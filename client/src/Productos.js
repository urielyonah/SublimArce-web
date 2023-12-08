import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { Link } from "react-router-dom";

function Productos(){
  const [data, setData] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/mproducts')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[])

  const handleDelete = (id) =>{
    const confirm = window.confirm('¿Seguro que lo quieres eliminar?');
    if(confirm){
      Axios.delete(`http://localhost:3001/deleteproduct/${id}`)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
    }
  }

    return(
        <div className='container-fluid bg-secondary min-vh-100'>
      
        <div className='col-auto flex-column d-flex'>
            <h1 className='text-center'>Productos</h1>
            <div className='w-100 rounded bg-white border shadow p-4'>

            <div className='d-flex justify-content-start'>
              <Link to='/home' className='btn btn-success'>Regresar</Link>
            </div>

            <div className='d-flex justify-content-end'>
              <Link to='/createproduct' className='btn btn-success'>Agregar +</Link>
            </div>

            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>PRECIO</th>
                  <th>DESCRIPCION</th>
                  <th>STOCK</th>
                  <th>CATEGORIA</th>
                  <th>ACCION</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((d, i)=> (
                    <tr key={i}>
                      <td>{d['ID-PRODUCTOS']}</td>
                      <td>{d.NOMBRE}</td>
                      <td>{d.PRECIO}</td>
                      <td>{d.DESCRIPCION}</td>
                      <td>{d.stock}</td>
                      <td>{d.CATEGORIA}</td>
                      <td>
                        <Link to={`/updateproduct/${d['ID-PRODUCTOS']}`} className='btn btn-sm btn-primary me-2 mb-2'>Editar</Link>
                        <button onClick={() => handleDelete(d['ID-PRODUCTOS'])} className='btn btn-sm btn-danger'>Eliminar</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
           </table>
            </div>
          </div>
      </div>
    )
}

export default Productos