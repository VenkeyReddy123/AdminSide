import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Forget = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState(true)
    const [Otp, setOtp] = useState(false)
    const [Pass, setPass] = useState(false)
    const [em, setem] = useState('')
    const [otp, setotp] = useState(0)
    const [npw, setnpw] = useState('')
    const [napw, setnapw] = useState('')
    const [VAEPOP, SetVAEPOP] = useState(false)
    const [OTPSPOP, SetOTPSPOP] = useState(false)
    const [VAOTPPOP, SetVAOTPPOP] = useState(false)
    const [PWPOP, SETPOP] = useState(false)
    const [PSUPOP, SETPSUPOP] = useState(false)
    const [OtpWar, SetOtpWar] = useState(false)
    const HandleSendOtp = () => {
        axios.post('http://127.0.0.1:8000/UserOtpDetails/', { username: em })
            .then(response => {
                localStorage.setItem('otp', Number(response.data.Message))
                SetOTPSPOP(true)
                setemail(!email)
                setOtp(!otp)

            })
            .catch(error => {
                SetVAEPOP(true)
            });

    };
    const HandleRecivedOtp = () => {
        SetVAOTPPOP(false)
        SetOTPSPOP(false)
        SetVAEPOP(false)


        if (String(otp).length > 4 || String(otp).length < 4) {
            SetOtpWar(true)
            return
        }

        if (otp == Number(localStorage.getItem('otp'))) {
            setOtp(!Otp)
            setPass(!Pass)
        }
        else {
            SetVAOTPPOP(true)
        }

    }
    const HadnleAGinSendOtp = () => {
        SetOTPSPOP(false)
        axios.post('http://127.0.0.1:8000/UserOtpDetails/', { username: em })
            .then(response => {
                localStorage.setItem('otp', Number(response.data.Message))
                SetOTPSPOP(true)
            })
            .catch(error => {
                SetVAEPOP(true)
            });

    }
    const HandleChangePassword = () => {
        if (npw === napw) {
            const Data = {
                "username": em,
                "password": npw
            }
            axios.patch("http://127.0.0.1:8000/ForgetDetails/", Data).then((d) => {
                SetOTPSPOP(true)
                navigate("/")
            }).catch((e) => {
                alert('Please Try Again')
            })
        }
        else {
            SETPOP(true)
        }

    }
    return (
        <>
            <div className='container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
                {email &&

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        HandleSendOtp()


                    }} className='form-group text-center shadow-lg' style={{ background: 'light', borderRadius: '20px', maxWidth: '400px', width: '90%' }}>

                        <div className='mt-4 mx-3'>
                            <label htmlFor="ml" className='form-label text-warning'>Enter  username  <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className='form-control' onChange={(e) => { setem(e.target.value) }} placeholder='Enter Your username' name='ml' id='ml' required />
                        </div>
                        <span className='text-danger'>You Can Recive Otp Registed Email </span>


                        <div className='text-center mb-2'>
                            <input type="submit" value="Send Otp" className='btn btn-primary mt-2' />
                        </div>
                    </form>
                }
                {Otp && <div className='form-group text-center shadow-lg' style={{ borderRadius: '15px', maxWidth: '400px', width: '90%' }}>

                    <div className='mt-4 mx-3'>
                        <label htmlFor="ml" className='form-label text-warning'>Enter OTP<span style={{ color: 'red' }}>*</span></label>
                        <input type="number" className='form-control' onChange={(e) => { setotp(e.target.value) }} placeholder='Enter Your Otp' name='ml' id='ml' />
                    </div>
                    <span className='text-danger'>You Can Recive Otp Registed Email </span>


                    <div className='text-center mb-2'>
                        <button className='btn btn-primary mt-2' onClick={HandleRecivedOtp} >Submit Otp</button>
                    </div>
                    <div className=' mb-2'>
                        <button className='btn btn-warning mt-2' onClick={HadnleAGinSendOtp} >Resend Otp</button>
                    </div>
                </div>}






                {/* Password */}
                {Pass && <form onSubmit={(e) => {
                    e.preventDefault()
                    HandleChangePassword()


                }} className='form-group shadow-lg mt-2' style={{ borderRadius: '20px', maxWidth: '400px', width: '90%' }}>

                    <div className='mt-4 mx-3'>
                        <label htmlFor="ml" className='form-label text-warning'>Enter New Password  <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" onChange={(e) => { setnpw(e.target.value) }} className='form-control' placeholder='Enter New Password' name='ml' id='ml' required />
                    </div>

                    <div className='mt-4 mx-3'>
                        <label className='form-label text-warning' htmlFor="pw">Enter Again Password <span style={{ color: 'red' }}>*</span></label>
                        <input type="password" className='form-control' onChange={(e) => { setnapw(e.target.value) }} name="pw" required placeholder='Enter AGain Password' />
                    </div>

                    <div className='text-center mb-2'>
                        <input type="submit" value="ChangePassword" className='btn btn-primary mt-4' />
                    </div>
                </form>}
                {VAEPOP && <>
                    {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
                    <div className=' bg-success p-2' style={{ borderRadius: '15px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SetVAEPOP(false)

                            }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

                        </div>
                        <span className='text-white p-5 pw'>Enter Email is Not Registred</span>
                    </div>
                </div> */}
                    <Modal show={VAEPOP} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        SetVAEPOP(false)
                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-dark  pw'>Entered username is Not Registred</span>
                            </div>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { SetVAEPOP(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>}
                {OTPSPOP && <>
                    {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
                    <div className=' bg-dark p-2' style={{ borderRadius: '15px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SetOTPSPOP(false)

                            }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

                        </div>
                        <span className='text-white p-5 pw'>OTP sent successfully!</span>
                    </div>
                </div> */}
                    <Modal show={OTPSPOP} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        SetOTPSPOP(false)
                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-dark  pw'>OTP sent successfully!</span>
                            </div>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { SetOTPSPOP(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>}

                {VAOTPPOP && <>
                    {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
                    <div className=' bg-warning p-2' style={{ borderRadius: '15px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SetVAOTPPOP(false)

                            }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

                        </div>
                        <span className='text-white p-5 pw'>You Entred Wrong OTP Number</span>
                    </div>
                </div> */}
                    <Modal show={VAOTPPOP} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        SetVAOTPPOP(false)
                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-dark  pw'>You Entred Wrong OTP Number</span>
                            </div>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { SetVAOTPPOP(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>}
                {PWPOP && <>
                    {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
                    <div className=' bg-primary p-2' style={{ borderRadius: '15px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SETPOP(false)

                            }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

                        </div>
                        <span className='text-white p-5 pw'>Please Entre New Password And Again Password Same</span>
                    </div>
                </div> */}
                    <Modal show={PWPOP} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        SETPOP(false)
                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-dark  pw'>Please Entre New Password And Again Password Same</span>
                            </div>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { SETPOP(false) }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>}
                {PSUPOP && <>
                    {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
                    <div className=' bg-primary p-2' style={{ borderRadius: '15px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SETPSUPOP(false)

                            }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

                        </div>
                        <span className='text-white p-5 pw'>Password Changed Successfully!</span>
                    </div>
                </div> */}
                    <Modal show={PSUPOP} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                        SETPSUPOP(false)

                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-dark  pw'>Password Changed Successfully!</span>
                            </div>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {
                                SETPSUPOP(false)
                            }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>}
                {OtpWar && <>
                    {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', top: '10px', borderRadius: '30px' }}>
                    <div className=' bg-primary p-2' style={{ borderRadius: '15px' }}>
                        <div className='col-12 d-flex flex-row justify-content-end '>
                            <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                SetOtpWar(false)

                            }} style={{ fontSize: '20px', borderRadius: '15px' }}></i>

                        </div>
                        <span className='text-white p-5 pw'>Please enter 4 disgits of otp</span>
                    </div>
                </div> */}
                 <Modal show={OtpWar} >
                        <Modal.Body>

                            <div className="form-group">

                                <div className='col-12 d-flex flex-row justify-content-end '>
                                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                         SetOtpWar(false)

                                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                                </div>
                                <span className='text-dark  pw'>Please enter 4 disgits of otp</span>
                            </div>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {
                                SetOtpWar(false)
                            }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </>}


            </div>
        </>
    )
}

export default Forget