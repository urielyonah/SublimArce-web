import React from "react";
import Sidebar from './Sidebar';

function Clientes(){
    return(
        <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <Sidebar />
        </div>
        <div className='col-auto'>
            Ya Pasamos pa!!!!
        </div>
      </div>
    </div>
    )
}

export default Clientes