import React, { useRef, useState } from 'react';
import axios from 'axios';
import Sidebar from './Components/Sidebar';
import Navbar from './Navbar';
import Sidebar2 from './Components/SideBar2';
import Dsidebar from './Components/Dsidebar';
import Profile from './Components/Profile';
import { Catigories } from './Data.jsx'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const CouponCode = () => {
  const codeNameRef = useRef(null);
  const codeOffRef = useRef(null);
  const expireDateRef = useRef(null);
  const limitRef = useRef(null);
  const [Dtype, setDype] = useState('')
  const [Co, SetCO] = useState('')
  const [Des, SetDes] = useState('')
  const [CPOP, SetCPOP] = useState(false)
  const [COPOP, SetCOPOP] = useState(false)
  
  const [DPOP, SetDPOP] = useState(false)



  const handleSubmit = async () => {
    if (Dtype.includes('Dis')) {
      if (codeOffRef.current.value > 100) {
        SetCOPOP(true)
      }
    }

    const formData = {
      username: Number(localStorage.getItem('id')),
      Code_Name: codeNameRef.current.value,
      Discount_Type: Dtype,
      Code_Off: codeOffRef.current.value,
      ExpireDate: expireDateRef.current.value,
      Limit: limitRef.current.value,
      Condtion: Co,
      description: Des,
    };



    const Data = {
      'cname': codeNameRef.current.value
    }
    await axios.post('http://127.0.0.1:8000/AdminCuponCheckDetails/', Data).then(async (e) => {
      try {

        await axios.post('http://127.0.0.1:8000/CuponCodeDetails/', formData);
        window.location.reload()

      } catch (error) {

        console.error(error);
      }
    }).catch((e) => {
      SetCPOP(true)
    })


  };
  const navigate=useNavigate()
  const [pw, setpw] = useState('')
  const [rpw, setrpw] = useState('')
  const [un, setun] = useState('')
  const [run, setrun] = useState('')
  const [Con2, setCon2] = useState(false)
  const [Con1, setCon] = useState(false)
  const [Bottom, setBottom] = useState(false)


  const BottomClicked = (click) => {
    if (click) {
      setBottom(false)
      return
    }
    setBottom(!Bottom)

  }
  const [Show, setShow] = useState(false)
  const ShowSide2 = () => {
    setShow(!Show)
  }
  const [Pro, setPro] = useState(false)
  const ProF = () => {
    setPro(false)
  }

  return (
    <>
      <div className='' style={{ overflow: 'hidden' }}>
        <Navbar ShowSide2={ShowSide2} BottomClicked={BottomClicked} />
      </div>

      <div className=' container-fluid' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', overflow: 'hidden' }}>

        <div className='d-flex flex-row justify-content-center col-12 p-3 mt-5 '>
          <div className='card mt-auto mb-auto col-12 col-sm-10 col-md-12 col-lg-9 col-xl-8  shadow' style={{ height: '100%' }}>
            <small className='ml-auto mr-auto'>Create New Cupon</small>
            <form action="" className='row justify-content-centerss mod' onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()


            }}>
              <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
                <label htmlFor="fn" className=' ty'>Code Name<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className='form-control' ref={codeNameRef} maxLength={10} id='fn' name='fn' required />
              </div>
              <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
                <label htmlFor="fn" className='form-label  ty'>Discount Type <span style={{ color: 'red' }}>*</span></label>
                <select required className='form-control' onChange={(event) => {
                  const selectedValue = event.target.value;
                  setDype(selectedValue);

                }}>
                  <option value="">--------------</option>
                  <option value="Discount">Discount</option>
                  <option value="Fixed Amount">Fixed Amount</option>
                </select>
              </div>

              <div className='col-12 col-md-6 d-flex flex-column  mt-4'>

                {Dtype && Dtype.includes("Disc") ? <>
                  <label htmlFor="mn" className='form-label  ty'>Discount percentage <span style={{ color: 'red' }}>*</span></label>
                  <input type='number' className='form-control' ref={codeOffRef} id='ln' name='ln' min={0} max={99} required />

                </> : <>
                  <label htmlFor="mn" className='form-label  ty'>Discount Amount <span style={{ color: 'red' }}>*</span></label>
                  <input type='number' className='form-control' ref={codeOffRef} id='ln'  name='ln' required />

                </>}
              </div>

              <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
                <label htmlFor="mn" className='form-label  ty'>Expiry Date<span style={{ color: 'red' }}>*</span></label>
                <input type='datetime-local' className='form-control' ref={expireDateRef} placeholder='Enter Your mail' name='ml' id='ml' required />
              </div>

              <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
                <label htmlFor="mn" className='form-label  ty'>Limit<span style={{ color: 'red' }}>*</span></label>
                <input type="number" className='form-control' ref={limitRef} name="mn" id="mn" onChange={(e) => {

                }} required />
              </div>

              <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
                <label htmlFor="mn" className='form-label  ty'>Condtion<span style={{ color: 'red' }}>*</span></label>
                {/* <input type="password" className='form-control' placeholder='Enter password' name="pw" id="pw" required /> */}
                <select required className='form-control' onChange={(event) => {
                  const selectedValue = event.target.value;
                  SetCO(selectedValue)
                }}>
                  <option Value="" >--------------</option>
                  <option Value="All" >All</option>
                  {Catigories && Catigories.map((e) => {
                    return <option Value={e}>{e}</option>
                  })}
                </select>

              </div>
              <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
                <label htmlFor="mn" className='form-label  ty'>Description<span style={{ color: 'red' }}>*</span></label>
                <input type="text" className='form-control' onChange={(e) => { SetDes(e.target.value) }} name="rpw" id="rpw" required />
              </div><br></br>
              <div className='text-center mt-4 p-2 col-12'>
                <input type="submit" value="Create Cupon" className='btn text-light mb-2 mt-2 p-2 bg-danger' />
              </div>
            </form>
          </div>
        </div>

      </div>
      {Show && <>

        <div style={{ position: 'absolute', top: '0px', width: '100%' }}>
          <Sidebar2 ShowSide2={ShowSide2} />
        </div>
      </>}
      {Bottom&& <>
        <Modal show={Bottom} >
          <Modal.Header className=''>
         
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex flex-row justify-content-center'>
            <div className='p-1' onClick={()=>{
            setBottom(false)
            setPro(true)}}>
            <span className=' btext' style={{ fontSize: '15px',cursor:'pointer' }}><i class="fa-solid fa-user mr-2 mt-auto mb-auto "></i>Profile</span>
          </div>
          <div className='p-1 mb-2 ml-5 '>
          <span className=' btext' onClick={() => {
                                localStorage.removeItem('username')
                                navigate('/Login')
                            }} style={{ fontSize: '15px',cursor:'pointer' }}>  <i class="fa-solid fa-power-off  mr-2 mt-auto mb-auto  "></i>Logout</span>
          </div>
            </div>




          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {  setBottom(!Bottom) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>}
      {Pro && <>
        <div className='col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3 card' style={{ position: 'absolute', right: '10px', top: '0px' }}>
          <Profile ProF={ProF} />
        </div>
      </>}
      {CPOP && <>
        {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '50px', borderRadius: '30px' }}>
          <div className='shadow-lg p-3 bg-warning' style={{ borderRadius: '15px' }}>
            <div className='col-12 d-flex flex-row justify-content-end '>
              <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                SetCPOP(false)

              }} style={{ fontSize: '20px', borderRadius: '20px' }}></i>

            </div>
            <span className='text-dark ppop p-5'>This Code Name is Already is There</span>
          </div>
        </div> */}
        <Modal show={CPOP} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                    SetCPOP(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>This Code Name is Already is There</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { SetCPOP(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

      </>}
      {DPOP && <>
        {/* <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '50px', borderRadius: '30px' }}>
          <div className='shadow-lg p-3 bg-danger' style={{ borderRadius: '15px' }}>
            <div className='col-12 d-flex flex-row justify-content-end '>
              <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                SetDPOP(false)

              }} style={{ fontSize: '20px', borderRadius: '20px' }}></i>

            </div>
            <span className='text-white ppop p-5'>Please Select DisCount Type</span>
          </div>
        </div> */}
         <Modal show={DPOP} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                     SetDPOP(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>Please Select DisCount Type</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {  SetDPOP(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
      </>}
      {COPOP && <>
        <Modal show={COPOP} >
                    <Modal.Body>

                        <div className="form-group">

                            <div className='col-12 d-flex flex-row justify-content-end '>
                                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                                    SetCOPOP(false)
                                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                            </div>
                            <span className='text-dark  pw'>Please enter a discount value below 99</span>
                        </div>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {  SetCOPOP(false) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
      </>}
    </>
  );
};

export default CouponCode;
