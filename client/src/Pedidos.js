import React, { useEffect, useState } from "react";
import Sidebar from './Sidebar';
import  Axios  from "axios";
import { Link } from "react-router-dom";

function Pedidos(){
  const [data, setData] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/mpedidos')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[])

  const handleDelete = (id) =>{
    const confirm = window.confirm('¿Seguro que lo quieres eliminar?');
    if(confirm){
      Axios.delete(`http://localhost:3001/deletepedido/${id}`)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
    }
  }

    return(
        <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <Sidebar />
        </div>
        <div className='col-auto flex-column d-flex'>
            <h1 className='text-center'>Pedidos</h1>
            <div className='w-100 rounded bg-white border shadow p-4'>
            <table className='table table-striped mx-auto'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID-CAMISA-SERVICIO</th>
                  <th>ID-PRODUCTO</th>
                  <th>CANTIDAD</th>
                  <th>PRECIO</th>
                  <th>STATUS</th>
                  <th>ID-CLIENTE</th>
                  <th>ACCION</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((d, i)=> (
                    <tr key={i}>
                      <td>{d['ID-PEDIDOS']}</td>
                      <td>{d['ID-CAMISAS-SERVICIOS']}</td>
                      <td>{d['ID-PRODUCTOS']}</td>
                      <td>{d.CANTIDAD}</td>
                      <td>{d.PRECIO}</td>
                      <td>{d.STATUS}</td>
                      <td>{d['ID-CLIENTE']}</td>
                      <td>
                        <Link to={`/updatepedido/${d['ID-PEDIDOS']}`} className='btn btn-sm btn-primary me-2'>Editar</Link>
                        <button onClick={() => handleDelete(d['ID-PEDIDOS'])} className='btn btn-sm btn-danger'>Eliminar</button>
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

export default Pedidos