import React, { useState } from 'react'
import '../Sidebar.css'
import { useNavigate } from 'react-router-dom';
const Dsidebar = ({ Condition1 }) => {
     const navigate = useNavigate()
     const [ered, setered] = useState(false);
     const [Disply, setDisaply] = useState(false)
     const handleMouseEnter = () => {
          setered(true);
          setDisaply(true)
     };
     const handleMouseLeave = () => {
          setered(false);
          setDisaply(false)
     };
     return (
          <>
               <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className={`sidebar ${ered ? 'expanded' : ''}`}>

                    <div className='d-flex-column' style={{ overflow: 'hidden' }} >
                         <div className='d-flex flex-row  mt-3 ml-2 ' style={{ cursor: 'pointer' }} onClick={() => navigate("/Das")}>
                              <i class="fa-solid fa-gauge mt-2" style={{ fontSize: '20px' }}></i>
                              <span className={`${Disply ? 'd-block' : 'd-none'} ml-3 mt-2 Hov `} >DashBoard</span>
                         </div>
                         <div className='d-flex flex-row   mt-5  ml-2 ' style={{ cursor: 'pointer' }} onClick={() => navigate("/Add")} >
                              <i class="fa-solid fa-plus mt-2 " style={{ fontSize: '20px' }}></i>
                              <span className={`${Disply ? 'd-block' : 'd-none'} ml-3 mt-2 Hov `} >Add Products</span>
                         </div>
                         <div className='d-flex flex-row   mt-3 ml-2 ' style={{ cursor: 'pointer' }} onClick={() => navigate("/Mod")}>
                              <i class="fa-regular fa-pen-to-square mt-5" style={{ fontSize: '20px' }}></i>
                              <span className={`${Disply ? 'd-block' : 'd-none'} ml-3 mt-5 Hov `} >Update</span>
                         </div>
                         <div className='d-flex flex-row   mt-3 ml-2 ' style={{ cursor: 'pointer' }} onClick={() => navigate("/Exchange")}>
                              <i class="fa-regular fa-pen-to-square mt-5" style={{ fontSize: '20px' }}></i>
                              <span className={`${Disply ? 'd-block' : 'd-none'} ml-3 mt-5 Hov `} >Exchange</span>
                         </div>
                         <div className='d-flex flex-row   mt-3 ml-2 ' style={{ cursor: 'pointer' }}>
                              <i class="fa-solid fa-layer-group mt-5" style={{ fontSize: '20px' }}></i>
                              
                               <span style={{ position: 'relative', fontSize: '15px' }} className={` Hov mt-4 nav-link dropdown-toggle text-dark ${Disply ? 'd-block' : 'd-none'}`} href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                  Orders
                              </span>
                              <div className="dropdown-menu" style={{ position: 'absolute' }}>
                                   <a   className='ml-auto mr-auto mt-1 dropdown-item Hov'   onClick={() => navigate("/Ord")}  style={{ fontSize: '15px' }}>Your Orders</a>
                                   <a  className="dropdown-item Hov" onClick={() => navigate("/Can")} style={{ fontSize: '15px' }}>Canceled Orders</a>
                              </div>
                         </div>
                         <div className='d-flex flex-row   mt-3 ml-2 ' style={{ cursor: 'pointer' }} onClick={() => {
                              navigate("/Cust")
                         }}>
                              <i class="fa-solid fa-users mt-4" style={{ fontSize: '20px' }}></i>
                              <span className={`${Disply ? 'd-block' : 'd-none'} Hov ml-3 mt-4 `} >Customer  Details</span>
                         </div>
                         <div className='d-flex flex-row   mt-4 ml-2 ' style={{ cursor: 'pointer' }} >
                              <i class="fa-solid fa-money-bill mt-5 " style={{ fontSize: '20px' }}></i>
                              <span style={{ position: 'relative', fontSize: '15px' }} className={` Hov mt-4 nav-link dropdown-toggle text-dark ${Disply ? 'd-block' : 'd-none'}`} href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                  Cupon Code
                              </span>
                              <div className="dropdown-menu" style={{ position: 'absolute' }}>
                                   <a className="dropdown-item" onClick={() => navigate("/Cupon")}  href="#" style={{ fontSize: '15px' }}>Add</a>
                                   <a className="dropdown-item" onClick={() => { navigate("/Up")}} href="#" style={{ fontSize: '15px' }}>Update</a>
                              </div>

                         </div>
                         <div className='d-flex flex-row   mt-5 ml-2 '>
                              <i class="fa-solid fa-gear mt-4" style={{ fontSize: '20px' }}></i>
                              <span style={{ position: 'relative', fontSize: '15px' }} className={` Hov mt-3 nav-link dropdown-toggle text-dark ${Disply ? 'd-block' : 'd-none'}`} href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                   Settings
                              </span>
                              <div className="dropdown-menu" style={{ position: 'absolute' }}>
                                   {/* <a className="dropdown-item" onClick={() => { Condition1('Pass') }} href="#" style={{ fontSize: '15px' }}>Change Password</a>
                                   <a className="dropdown-item" onClick={() => { Condition1('User') }} href="#" style={{ fontSize: '15px' }}>Change Username</a> */}
                                   <a className="dropdown-item" onClick={() => {
                                        localStorage.removeItem('username')
                                        navigate('/Login')
                                   }} style={{ fontSize: '15px' }}>Logout</a>
                                   <div className="dropdown-divider"></div>
                              </div>
                         </div>

                    </div>



               </div>
          </>
     )
}

export default Dsidebar