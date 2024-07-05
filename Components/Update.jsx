import axios from "axios"
import React, { useEffect, useState } from "react"
import Navbar from "../Navbar"
import Sidebar2 from "./SideBar2"
import Dsidebar from "./Dsidebar"
import Profile from "./Profile"
import './Dash.css'
import { Catigories } from '../Data.jsx'
import { useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Update = () => {
    const [Data, setData] = useState([])
    const [Expired, setExpired] = useState([])

    const Paid = 'lightgreen'
    const Failed = 'pink'
    const [orders, setData2] = useState([])
    const [pw, setpw] = useState('')
    const [rpw, setrpw] = useState('')
    const [un, setun] = useState('')
    const [run, setrun] = useState('')
    const [Con2, setCon2] = useState(false)
    const [Con1, setCon] = useState(false)
    const [Bottom, setBottom] = useState(false)
    const [CEdit, SetCEdit] = useState(false)
    const [CPon, SetCPon] = useState({})
    const [N, setN] = useState(null)
    const [CO, SetCO] = useState(null)
    const [Dt, SetDt] = useState(null)
    const [L, SetL] = useState(null)
    const [ED, SetED] = useState(null)
    const [CON, SetCON] = useState('')
    const [Des, SetDes] = useState('')
    const [Pro, setPro] = useState(false)
    const [COPOP, SetCOPOP] = useState(false)
    const navigate=useNavigate()
    const ProF = () => {
        setPro(false)
    }
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/CuponCodeDetails/',).then((d) => {

            const TDate = new Date()
            const Filter = d.data.filter((e) => {
                const EDate = new Date(e.ExpireDate)
                if (TDate.getFullYear() < EDate.getFullYear() ||
                    (TDate.getFullYear() === EDate.getFullYear() && TDate.getMonth() < EDate.getMonth()) ||
                    (TDate.getFullYear() === EDate.getFullYear() && TDate.getMonth() === EDate.getMonth() && TDate.getDate() < EDate.getDate())) {

                    return e;
                } else {
                    return e.Expired = 'Yes'
                }


            })
            setData(Filter)




        })
    }, [])
    const [Show, setShow] = useState(false)
    const ShowSide2 = () => {
        setShow(!Show)
    }
    const BottomClicked = (click) => {
        if (click) {
            setBottom(false)
            return
        }
        setBottom(!Bottom)

    }
    const [Id, setId] = useState(null)

    const EditCupon = (e) => {
        setId(e.id)

        setN(e.Code_Name)
        SetCO(e.Code_Off)
        SetDt(e.Discount_Type)
        SetL(e.Limit)
        SetED(e.ExpireDate)
        SetCON(e.Condtion)
      
        SetDes(e.description)
        SetCEdit(true)
       

    }
    const handleSave = () => {
        if (Dt.includes('Dis')) {
            if (CO>99) {
              SetCOPOP(true)
              return
            }
          }
        const formData = {
            'pk': Id,
            "Code_Name": N,
            "Discount_Type": Dt,
            "Code_Off": CO,
            "ExpireDate": ED,
            "Limit": L,
            "Condtion": CON,
            "description": Des,
        };
        axios.patch("http://127.0.0.1:8000/CuponCodeDetails/", formData).then((d) => {
            window.location.reload()
        }).catch((e) => {

        })
    }
    const handleDelete = (e) => {
        const Data = {
            'pk': e.id
        }
        axios.delete("http://127.0.0.1:8000/CuponCodeDetails/", { data: Data }).then((d) => {
            window.location.reload()
        }).catch((e) => {

        })
    }
    return (
        <>
            <div className=' ' style={{ overflow: 'hidden' }} >
                <Navbar ShowSide2={ShowSide2} BottomClicked={BottomClicked} />
            </div>
            <div className="col-12 container-fluid     justify-content-around mt-1  row " style={{overflow:'hidden'}}>
                {Data && Data.map((e) => {
                    const tday=new Date()
                    const expirationDate = new Date(e.ExpireDate)
                    const differenceMs = expirationDate - tday
                    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24))
                    return (
                        <>

                            {/* <div className="ml-  col-11 col-md-6 mb-3">
                               
                            </div> */}
                            {/* <div classname='col-12 col-sm-6 col-md-4 ml-5 mod col-lg-3 ' style={{height:'200px'}}>
                            <div className={ `card `}>
                                    <div className="card-body">
                                        <h6 className="card-title text-dark"></h6>
                                        <p className="card-dark text-dark"><small className="dt text-dark">Discount Type:</small> <small className="sm">{e.Discount_Type.includes('Des') ? 'Discount %' : 'Amount'}</small></p>
                                        <p className="card-dark text-dark"><small className="dt text-dark">Discount Amount:</small> </p>
                                        <p className="card-dark text-dark"><small className="dt text-dark">ExpireDate:</small> <small className="sm">{new Date(e.ExpireDate).toLocaleDateString()}</small></p>
                                        {e.Expired && <small className="text-danger">Coupon Expired</small>}<br></br>
                                        {!e.Expired && <><small className="text-dark">Your Cupon Expired in {differenceDays} days</small></>}<br></br>
                                        <div className="btn-group" role="group">
                                            <button type="button" className="btn btn-outline-primary mr-2" onClick={() => {
                                                EditCupon(e)
                                            }}>Edit</button>
                                            <button type="button" className="btn btn-outline-danger" onClick={() => { handleDelete(e) }}>Delete</button>
                                        </div>

                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="card  col-12 col-sm-6 p-2   col-lg-5 d-flex flex-row " style={{height:'200px'}}>
                                 <div className={`col-4 card d-flex flex-column  align-items center${e.Expired ? '  expi'  : 'border-primary bg-prima  val'} `}>
                                     <small className="cof">Code Off </small>
                                     

                                </div>  
                            </div> */}
                            <div className="card  col-12 p-1  col-sm-11   col-md-5 col-lg-5 d-flex flex-row " style={{height:'270px'}}>
                                 <div className={`col-4   d-flex flex-column  align-items center${e.Expired?'expii': 'noexpii'} `} style={{height:'100%',width:'100%',backgroundColor:`${e.Expired?'lightcoral':'lightblue'}`}}>
                                     <small className="cof" >Code off </small>
                                     <small className="cof">{e.Discount_Type.includes('Dis') ? 'Discount ' : 'Amount'}</small>
                                     <small className="cof">{e.Code_Off} {e.Discount_Type.includes('Dis') ? '%' : 'Rupees'}</small>
                                </div>  
                                <div className="col-8 card p-1">
                                      <small className="">Code Name:-{e.Code_Name}</small>
                                      <small className="card-dark text-dark"><small className="dt text-dark">Discount Type:</small> <small className="sm">{e.Discount_Type.includes('Dis') ? 'Discount %' : 'Amount'}</small></small>
                                      <small className="card-dark text-dark"><small className="dt text-dark">ExpireDate:</small> <small className="sm">{new Date(e.ExpireDate).toLocaleDateString()}</small></small>
                                      <span>{e.Discount_Type.includes('Dis') ?<><small>Discount {e.Code_Off}%</small></>:<><small>Amount:-{e.Code_Off}Rupees</small></>}</span>
                                      <small >Limit:- {e.Limit}</small>
                                      <small>Condition:- {e.Condtion&&<>{e.Condtion}</>}</small>
                                      <small>Description:-{e.description&&<><small>{e.description}</small></>}</small>
                                      {!e.Expired && <><small className="text-dark">Your Cupon Expired in {differenceDays} days</small></>}
                                      
                                      {e.Expired && <small className="text-danger">Coupon Expired</small>}
                                     {!CEdit&&<> <div className="btn-group mt-auto mb-1" role="group">
                                            <button type="button" className="btn btn-outline-primary mr-2" onClick={() => {
                                                EditCupon(e)
                                            }}>Edit</button>
                                            <button type="button" className="btn btn-outline-danger" onClick={() => { handleDelete(e) }}>Delete</button>
                                        </div></>}
                                      
                                      
                                </div>
                            </div>
                        </>
                    )
                })}
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
                <div className='col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3 card' style={{ position: 'absolute', right: '15px', top: '0px' }}>
                    <Profile ProF={ProF} />
                </div>
            </>}
            {CEdit && <>
                
                 <div className=' container-fluid' style={{ position:'absolute',top:'10px', overflow: 'hidden' }}>

<div className='d-flex flex-row justify-content-center col-12 p-3 mt-5 '>
  <div className='card mt-auto mb-auto col-12 col-sm-10 col-md-12 col-lg-9 col-xl-8  shadow' style={{ height: '100%' }}>
  <div className='d-flex flex-row justify-content-end mt-2'>
            <i class="fa-solid fa-xmark text-white card text-dark p-1 btn " onClick={() => {
              SetCEdit(false)
            }} style={{ borderRadius: '100%' }}></i>
          </div>
    <form action="" className='row justify-content-centerss mod' onSubmit={(e) => {
      e.preventDefault()
       handleSave()


    }}>
      <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
        <label htmlFor="fn" className=' ty'>Code Name<span style={{ color: 'red' }}>*</span></label>
        <input type="text" className="form-control ml-2" id="codeName" value={N} maxLength={10} onChange={(e) => setN(e.target.value)} />
      </div>
      <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
        <label htmlFor="fn" className='form-label  ty'>Discount Type <span style={{ color: 'red' }}>*</span></label>
        <select  className='form-control' value={Dt} onChange={(event) => {
          const selectedValue = event.target.value;
          SetDt(selectedValue);

        }}>
          
          <option value="Discount">Discount</option>
          <option value="Fixed Amount">Fixed Amount</option>
        </select>
      </div>

      <div className='col-12 col-md-6 d-flex flex-column  mt-4'>

        {Dt && Dt.includes("Disc") ? <>
          <label htmlFor="mn" className='form-label  ty'>Discount percentage <span style={{ color: 'red' }}>*</span></label>
          <input type="number" className="form-control ml-2" maxLength={2} id="discountAmount" value={CO} min={0} max={99} onChange={(e) => SetCO(e.target.value)}  />

        </> : <>
          <label htmlFor="mn" className='form-label  ty'>Discount Amount <span style={{ color: 'red' }}>*</span></label>
          <input type="number" className="form-control ml-2" id="discountAmount" value={CO} onChange={(e) => SetCO(e.target.value)}  />

        </>}
      </div>

      <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
        <label htmlFor="mn" className='form-label  ty'>Expiry Date<span style={{ color: 'red' }}>*</span></label>
        <input type="date" className="form-control ml-2" id="expiryDate" value={ED} onChange={(e) => SetED(e.target.value)}  />
      </div>

      <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
        <label htmlFor="mn" className='form-label  ty'>Limit<span style={{ color: 'red' }}>*</span></label>
        <input type="number" className="form-control ml-2" id="limit" value={L} onChange={(e) => SetL(e.target.value)}  />
      </div>

      <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
        <label htmlFor="mn" className='form-label  ty'>Condtion<span style={{ color: 'red' }}>*</span></label>
        {/* <input type="password" className='form-control' placeholder='Enter password' name="pw" id="pw"  /> */}
        <select value={CON}  className='form-control' onChange={(event) => {
          const selectedValue = event.target.value;
          SetCON(selectedValue)
        }}>
          <option Value="All" >All</option>
          {Catigories && Catigories.map((e) => {
            return <option Value={e}>{e}</option>
          })}
        </select>

      </div>
      <div className='col-12 col-md-6 d-flex flex-column  mt-4'>
        <label htmlFor="mn" className='form-label  ty'>Description<span style={{ color: 'red' }}>*</span></label>
        <input type="text" className='form-control' value={Des} onChange={(e) => { SetDes(e.target.value) }} name="rpw" id="rpw"  />
      </div><br></br>
      <div className='text-center mt-4 p-2 col-12'>
        <input type="submit" value="Update Cupon" className='btn text-light mb-2 mt-2 p-2 bg-primary' />
      </div>
    </form>
  </div>
</div>

</div>

            </>}
            {COPOP && <>
        <div className='col-12 mb-3 d-flex flex-row justify-content-end' style={{ position: 'absolute', bottom: '50px', borderRadius: '30px' }}>
          <div className='shadow-lg p-3 bg-warning' style={{ borderRadius: '15px' }}>
            <div className='col-12 d-flex flex-row justify-content-end '>
              <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                SetCOPOP(false)

              }} style={{ fontSize: '20px', borderRadius: '20px' }}></i>

            </div>
            <span className='text-dark ppop p-5'>Please enter a discount value below 99</span>
          </div>
        </div>
      </>}

        </>
    )
}
export default Update