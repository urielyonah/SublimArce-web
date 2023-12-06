import React, { useEffect, useState } from "react";
import Sidebar from './Sidebar';
import  Axios  from "axios";
import { Link } from "react-router-dom";

function Camisas(){
  const [data, setData] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/mshirts')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[])

  const handleDelete = (id) =>{
    const confirm = window.confirm('¿Seguro que lo quieres eliminar?');
    if(confirm){
      Axios.delete(`http://localhost:3001/deleteshirt/${id}`)
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
            <h1 className='text-center'>Camisas</h1>
            <div className='w-100 rounded bg-white border shadow p-4'>
            <div className='d-flex justify-content-end'>
              <Link to='/createshirt' className='btn btn-success'>Agregar +</Link>
            </div>
            <table className='table table-striped mx-auto'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>MODELO</th>
                  <th>TALLA</th>
                  <th>COLOR</th>
                  <th>PRECIO</th>
                  <th>DESCRIPCION</th>
                  <th>STOCK</th>
                  <th>ACCION</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((d, i)=> (
                    <tr key={i}>
                      <td>{d['ID-CAMISAS']}</td>
                      <td>{d.MODELO}</td>
                      <td>{d.TALLAS}</td>
                      <td>{d.COLOR}</td>
                      <td>{d.PRECIO}</td>
                      <td>{d.DESCRIPCION}</td>
                      <td>{d.stock}</td>
                      <td>
                        <Link to={`/updateshirt/${d['ID-CAMISAS']}`} className='btn btn-sm btn-primary me-2'>Editar</Link>
                        <button onClick={() => handleDelete(d['ID-CAMISAS'])} className='btn btn-sm btn-danger'>Eliminar</button>
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

export default Camisas