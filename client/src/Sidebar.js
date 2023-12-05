import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './images/logo_si.png';
import './style.css'


function Sidebar() {
    const navigate = useNavigate();
    useEffect(() => {
        // Verificar la presencia del token al cargar la página
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const pageClient = () =>{
        navigate('/client');
    }
    const pageShirts = () =>{
        navigate('/shirts');
    }
    const pageProducts = () =>{
        navigate('/products');
    }
    const pageBuys = () =>{
        navigate('/buys');
    }

    return (
        <div className='bg-white sidebar p-2'>
            <div className='m-2 text-center'>
            <img className='logo mx-auto d-block' src={logo}/>
            </div>
            <hr className='text-dark' />
            <div className='list-group list-group-flush'>
                <a className='list-group-item py-2' onClick={pageClient}>
                    <i className='bi bi-people fs-5 me-3'></i>
                    <span >Clientes</span>
                </a>
                <a className='list-group-item py-2 ' onClick={pageShirts}>
                    <i className='bi bi-stack fs-5 me-3'></i>
                    <span >Camisas</span>
                </a>
                <a className='list-group-item py-2' onClick={pageProducts}>
                    <i className='bi bi-table fs-5 me-3'></i>
                    <span >Productos</span>
                </a>
                <a className='list-group-item py-2' onClick={pageBuys}>
                    <i className='bi bi-bag fs-5 me-3'></i>
                    <span >Pedidos</span>
                </a>
                <a className='list-group-item py-2' onClick={handleLogout}>
                    <i className='bi bi-power fs-5 me-3'></i>
                    <span >Cerrar Sesión</span>
                </a>
            </div>
        </div>
    )
}
export default Sidebar 