import React from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



function Home() {
  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <Sidebar />
        </div>
        <div className='col-auto'>
            PAPU!!!!
        </div>
      </div>
    </div>
  );
}

export default Home;
