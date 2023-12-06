import React, { useEffect, useState } from 'react';
import  Axios  from "axios";
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';


function Home() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/madmin')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[])

  const handleDelete = (id) =>{
    const confirm = window.confirm('¿Seguro que lo quieres eliminar?');
    if(confirm){
      Axios.delete(`http://localhost:3001/deleteadmin/${id}`)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
    }
  }
  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <Sidebar />
        </div>
        <div className='col-auto flex-column d-flex'>
            <h1 className='text-center'>Administradores</h1>
            <div className='w-100 rounded bg-white border shadow p-4'>
            <div className='d-flex justify-content-end'>
              <Link to='/createadmin' className='btn btn-success'>Agregar +</Link>
            </div>
            <table className='table table-striped mx-auto'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CORREO</th>
                  <th>CONTRASEÑA</th>
                  <th>NOMBRE</th>
                  <th>ACCION</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((d, i)=> (
                    <tr key={i}>
                      <td>{d['ID-ADMIN']}</td>
                      <td>{d.CORREO}</td>
                      <td>{d['CONTRASEÑA']}</td>
                      <td>{d.NOMBRE}</td>
                      <td>
                        <Link to={`/updateadmin/${d['ID-ADMIN']}`} className='btn btn-sm btn-primary me-2'>Editar</Link>
                        <button onClick={() => handleDelete(d['ID-ADMIN'])} className='btn btn-sm btn-danger'>Eliminar</button>
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
  );
}

export default Home;
