import React, { useEffect, useState } from "react";
import Sidebar from './Sidebar';
import  Axios  from "axios";
import { Link } from "react-router-dom";


function Clientes(){
  const [data, setData] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/mclient')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[])

    return(
        <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <Sidebar />
        </div>
        <div className='col-auto flex-column d-flex'>
            <h1 className='text-center'>Lista de Clientes</h1>
            <div className='w-100 rounded bg-white border shadow p-4'>
            <div className='d-flex justify-content-end'>
              <Link className='btn btn-success'>Agregar +</Link>
            </div>
            <table className='table table-striped mx-auto'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CORREO</th>
                  <th>CONTRASEÑA</th>
                  <th>NOMBRE</th>
                  <th>TELEFONO</th>
                  <th>DIRECCION</th>
                  <th>ACCION</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((d, i)=> (
                    <tr key={i}>
                      <td>{d['ID-CLIENTE']}</td>
                      <td>{d.CORREO}</td>
                      <td>{d['CONTRASEÑA']}</td>
                      <td>{d.NOMBRE}</td>
                      <td>{d.TELEFONO}</td>
                      <td>{d.DIRECCION}</td>
                      <td>
                        <button className='btn btn-sm btn-primary me-2'>Editar</button>
                        <button className='btn btn-sm btn-danger'>Eliminar</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
           </table>
            </div>
          </div>
        </div>
    </div>
    )
}

export default Clientes