import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({Condition1}) => {
  const navigate=useNavigate()
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        const sidebarOffsetTop = sidebar.offsetTop;
        const scrollY = window.scrollY;

        setIsFixed(scrollY > sidebarOffsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const HandleLogout=()=>{
    localStorage.removeItem('username')
    // localStorage.removeItem('id') 
    navigate('/')
  }

  return (
    <>
    <nav className="navbar navbar-expand-md navbar-dark text-white">
      <button className="navbar-toggler ml-auto bg-dark" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse bg-dark" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto col-12 d-lg-flex flex-lg-row justify-content-between">
          <li className="nav-item active">
            <a className="nav-link text-white" onClick={() => navigate("/Das")} href="#" style={{fontSize:'15px'}} >Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" onClick={() => navigate("/Add")} href="#" style={{fontSize:'15px'}}>Add Product</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" onClick={() => navigate("/Mod")} href="#" style={{fontSize:'15px'}}>Update</a>
          </li>
          <li className="nav-item dropdown">
            <a style={{ position: 'relative',fontSize:'15px' }} className="nav-link dropdown-toggle text-white" href="#"  role="button" data-toggle="dropdown" aria-expanded="false">
              Settings
            </a>
            <div className="dropdown-menu" style={{ position: 'absolute' }}>
              <a className="dropdown-item" onClick={()=>{Condition1('Pass')}} href="#" style={{fontSize:'15px'}}>Change Password</a>
              <a className="dropdown-item" onClick={()=>{Condition1('User')}} href="#" style={{fontSize:'15px'}}>Change Username</a>
              <a className="dropdown-item"  href="#" style={{fontSize:'15px'}} onClick={HandleLogout} >Logout</a>
              <div className="dropdown-divider"></div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" onClick={() => navigate("/Ord")} href="#" style={{fontSize:'15px'}}>Your Orders</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" onClick={() => navigate("/Cust")} href="#" style={{fontSize:'15px'}}>Customer Details</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" onClick={() => navigate("/Cupon")} href="#" style={{fontSize:'15px'}}>Add Coupon Code</a>
          </li>
        </ul>
      </div>
    </nav>
    </>
  
  );
};

export default Sidebar;


