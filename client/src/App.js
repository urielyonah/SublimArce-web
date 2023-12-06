import React from 'react';
import Login from './login';
import Home from './home';
import Camisas from './Camisas';
import Productos from './Productos';
import Pedidos from './Pedidos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clientes from './Clientes';
import AgregarCliente from './AgregarCliente';
import EditarCliente from './EditarCliente';
import AgregarAdmin from './AgregarAdmin';
import EditarAdmin from './EditarAdmin';
import AgregarCamisa from './AgregarCamisa';
import EditarCamisa from './EditarCamisa';
import AgregarProducto from './AgregarProducto';
import EditarProducto from './EditarProducto';






function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/createadmin' element={<AgregarAdmin/>}></Route>
        <Route path='/updateadmin/:id' element={<EditarAdmin/>}></Route>

        <Route path='/shirts' element={<Camisas/>}></Route>
        <Route path='/createshirt' element={<AgregarCamisa/>}></Route>
        <Route path='/updateshirt/:id' element={<EditarCamisa/>}></Route>

        <Route path='/products' element={<Productos/>}></Route>
        <Route path='/createproduct' element={<AgregarProducto/>}></Route>
        <Route path='/updateproduct/:id' element={<EditarProducto/>}></Route>

        <Route path='/buys' element={<Pedidos/>}></Route>
        
        <Route path='/client' element={<Clientes/>}></Route>
        <Route path='/createclient' element={<AgregarCliente/>}></Route>
        <Route path='/updateclient/:id' element={<EditarCliente/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
