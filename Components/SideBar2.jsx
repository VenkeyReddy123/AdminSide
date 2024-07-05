import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './Dash.css'

const Sidebar2 = ({ Condition1, ShowSide2 }) => {
    const navigate = useNavigate()
    const [isFixed, setIsFixed] = useState(false);
    const [LPop, setLPop] = useState(false)

    const HandleLogout = () => {
        localStorage.removeItem('username')
        navigate('/')
    }
    const Click = () => {

        ShowSide2()
    }

    return (
        <>

            <div className=' col-6 col-md-4 col-lg-3 col-xl-3 d-flex flex-row justify-content-center card shadow-lg  ' style={{ height: '100%', position: 'fixed', background: 'white' }} >
                <div className='d-flex flex-row ' style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>

                    <div className='d-flex flex-column   p-2 ' >
                        <div style={{ position: 'absolute', top: '10px', right: '15px' }}>
                            <i class="fa-solid fa-xmark text-danger text-danger p-2  card" onClick={Click} style={{ borderRadius: '5px', cursor: 'pointer' }}></i>
                        </div>
                        <div className='d-flex flex-row mt-5 ' style={{ cursor: 'pointer' }} onClick={() => navigate("/Das")}>
                            <i class="fa-solid fa-chart-simple mt-4" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext mt-4 `} >DashBoard</small>
                        </div>
                        <div className='d-flex flex-row mt-5' style={{ cursor: 'pointer' }} onClick={() => {
                            if (localStorage.getItem('id')) {
                                navigate("/Add")
                            } else {
                                setLPop(true)
                            }
                        }}>

                            <i class="fa-solid fa-cart-plus mt-" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext mt- `} >Add</small>
                        </div>
                        <div className='d-flex flex-row mt-5' style={{ cursor: 'pointer' }} onClick={() => navigate("/Mod")}>

                            <i class="fa-solid fa-pen" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Update</small>
                        </div>
                        <div className='d-flex flex-row mt-5' style={{ cursor: 'pointer' }} onClick={() => navigate("/Ord")}>

                            <i class="fa-solid fa-layer-group" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Orders</small>
                        </div>
                        <div className='d-flex flex-row mt-5' style={{ cursor: 'pointer' }} onClick={() => navigate("/Exchange")}>

                            <i class="fa-solid fa-layer-group" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Exchange Orders</small>
                        </div>
                        <div className='d-flex flex-row mt-5' style={{ cursor: 'pointer' }} onClick={() => navigate("/Return")}>

                            <i class="fa-solid fa-layer-group" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Return Orders</small>
                        </div>
                        <div className='d-flex flex-row mt-5' style={{ cursor: 'pointer' }} onClick={() => navigate("/Can")}>

                            <i class="fa-regular fa-rectangle-xmark" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Cancel Orders</small>
                        </div>
                        <div className='d-flex flex-row mt-5' style={{ cursor: 'pointer' }} onClick={() => navigate("/Cust")}>
                            <i class="fa-solid fa-user-group" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Customer Details</small>
                        </div>
                        <div className='d-flex flex-row mt-5' style={{ cursor: 'pointer' }} onClick={() => navigate("/Cupon")}>
                            <i class="fa-solid fa-money-bill" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Add Cupon</small>
                        </div>
                        <div className='d-flex flex-row mt-5' style={{ cursor: 'pointer' }} onClick={() => { navigate("/Up") }}>
                            <i class="fa-solid fa-file-pen mt-1" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Update Cupon</small>
                        </div>
                        <div className='d-flex flex-row mt-5 mb-5' style={{ cursor: 'pointer' }} onClick={() => {
                            localStorage.removeItem('username')
                            navigate('/Login')
                        }}>
                            <i class="fa-solid fa-arrow-right-from-bracket mb-5" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext mb-5 `} >Logout</small>
                        </div>


                        {/* <div className='d-flex flex-row mt-5 ' style={{ cursor: 'pointer' }} >
                            <i class="fa-solid fa-shop" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Add Product</small>
                        </div>
                        <div className='d-flex flex-row mt-5 ' style={{ cursor: 'pointer' }} >
                            <i class="fa-solid fa-pen-fancy" style={{ fontSize: '15px' }}></i>
                            <small className={`ml-2 Dtext `} >Update</small>
                        </div>
                        <div className='d-flex flex-row   mt-5' style={{ cursor: 'pointer' }} >
                            <i class="fa-solid fa-layer-group mt-2 " style={{ fontSize: '15px' }}></i>
                            <small style={{ position: 'relative', fontSize: '15px' }} className={`   nav-link dropdown-toggle text-dark`} href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                Orders
                            </small>
                            <div className="dropdown-menu" style={{ position: 'absolute' }}>
                                <a className='ml-auto mr-auto  dropdown-item' onClick={() => navigate("/Ord")} style={{ fontSize: '12px' }}>Your Orders</a>
                                <a className="dropdown-item" onClick={() => navigate("/Can")} style={{ fontSize: '12px' }}>Canceled Orders</a>
                            </div>

                        </div>
                        <div className='d-flex flex-row   mt-5' style={{ cursor: 'pointer' }} onClick={() => navigate("/Cust")}>
                            <i class="fa-solid fa-users  " style={{ fontSize: '15px' }}></i>
                            <small className={`ml-1 Dtext `} >Customer Details</small>
                        </div>
                        <div className='d-flex flex-row   mt-5 ' style={{ cursor: 'pointer' }} >
                            <i class="fa-solid fa-money-bill mt-2  " style={{ fontSize: '15px' }}></i>
                            <small style={{ position: 'relative', fontSize: '15px' }} className={` Dtext  nav-link dropdown-toggle text-dark`} href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                Cupon Code
                            </small>
                            <div className="dropdown-menu" style={{ position: 'absolute' }}>
                                <a className="dropdown-item Dtext" onClick={() => navigate("/Cupon")} href="#" style={{ fontSize: '12px' }}>Add</a>
                                <a className="dropdown-item Dtext" onClick={() => { navigate("/Up") }} href="#" style={{ fontSize: '12px' }}>Update</a>
                            </div>

                        </div>
                        <div className='d-flex flex-row   mt-5'>
                            <i class="fa-solid fa-gear mt-2 " style={{ fontSize: '15px' }}></i>

                            <small style={{ position: 'relative', fontSize: '15px' }} className={` Dtext  nav-link dropdown-toggle text-dark `} href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                Settings
                            </small>
                            <div className="dropdown-menu" style={{ position: 'absolute' }}>

                                <a className="dropdown-item Dtext" onClick={() => {
                                    localStorage.removeItem('username')
                                    navigate('/Login')
                                }} href="#" style={{ fontSize: '15px' }}>Logout</a>
                                <div className="dropdown-divider"></div>
                            </div>
                        </div> */}

                    </div>




                </div>


            </div>
            {
                LPop && <>

                    <Modal show={LPop} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        setLPop(false)
                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-danger  pw'>Please Login</span>
                            </div>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setLPop(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
        </>

    );
};

export default Sidebar2;


