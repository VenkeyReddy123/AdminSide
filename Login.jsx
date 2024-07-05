  import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const navigate = useNavigate()
  const Email = useRef(null)
  const Pass = useRef(null)
  const [UPop, SetUPop] = useState(false)
  const [PPop, setPPop] = useState(false)
  
  const Value = null
  const HanleSubmit = async () => {
    const Uname = Email.current.value
    const pass = Pass.current.value
    const Data = {
      "username": Uname,
      "password": pass
    }
    await axios.post("http://127.0.0.1:8000/CheckUserName/", Data).then(async (d) => {
      await axios.post("http://127.0.0.1:8000/UserCheck/", Data).then((d) => {
          if (d.data.Message) { 
             localStorage.setItem('username', Uname)
             localStorage.setItem('Password', pass)
             localStorage.setItem('id',Number(d.data.Message))
             navigate('/Das')

        }
        else {
          setPPop(true)
        }
      }).catch((e) => {

      })
    }).catch((e) => {
      SetUPop(true)
    })


  }
  return (
    <>
      <div className='container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh' }}>
       
        
        <form action="" className='card p-3 ' style={{borderRadius:'10px',boxShadow:'0px 5px 10px 15px lightgray'}} onSubmit={(event)=>{
                 event.preventDefault();
                 HanleSubmit();
              }}>
            <h6 className='ml-auto mr-auto ltext'>Login</h6>
           <div className=' mt-3'>
            <label htmlFor="" className='form-label text-dark latext'>username</label>
            <input type="text" required name="" id=""  ref={Email}  className='form-control ' style={{background:'rgb(0,0,0,0)',color:'black',fontSize:'16px'}}  placeholder='Enter valid username' />
          </div>
          <div className='mt-3 mb-2 '>
            <label htmlFor="" className='form-label text-dark latext'>Password</label>
            <input type="password" required name="" id="" ref={Pass}  style={{background:'rgb(0,0,0,0)',color:'black',fontSize:'16px'}} className='form-control' placeholder='Enter valid password' />
          </div>
          <div className='text-center mb-2'>
              <input type="submit" value="Login"  className='btn btn-primary mt-4' />
          </div>
          <div className='mx-3'>
            <h6 className='text-success  mb-2'>Don't have an account? <span style={{ cursor: 'pointer' }} className='text-dark' onClick={() => { navigate('/Reg') }}>Register here</span></h6>
            <h6 className='text-success  mb-2'>Reset Password?<span className='text-danger' style={{ cursor: 'pointer' }} onClick={() => { navigate('/For') }}>ForgetPassword</span></h6>
          </div>
           </form>
      </div>
      {UPop && <>
        <Modal show={UPop} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                    SetUPop(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>Please enter valid username</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { SetUPop(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
      </>}
      {PPop && <>
        <Modal show={PPop} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                    setPPop(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>please enter valid password</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setPPop(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
      </>}

    </>
  )
}

export default Login