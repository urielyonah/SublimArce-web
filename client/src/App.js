import React from 'react';
import Login from './login';
import Home from './home';
import Clientes from './Clientes';
import Camisas from './Camisas';
import Productos from './Productos';
import Pedidos from './Pedidos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/client' element={<Clientes/>}></Route>
        <Route path='/shirts' element={<Camisas/>}></Route>
        <Route path='/products' element={<Productos/>}></Route>
        <Route path='/buys' element={<Pedidos/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
