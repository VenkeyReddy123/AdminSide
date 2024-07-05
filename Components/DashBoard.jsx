import React, { useEffect, useState } from 'react';
import Model from './DasBoard/Model';
import Model2 from './DasBoard/Model2';
import ProductRivie from './DasBoard/ProductRivie';
import Sidebar from './Sidebar';
import axios from 'axios';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import Sidebar2 from './SideBar2';
import '../Sidebar.css'
import Dsidebar from './Dsidebar';
import { Bar } from 'react-chartjs-2'
// import PaymentBar from './DasBoard/PaymentBar';
import PaymentBar from './DasBoard/PaymentBar'
import './Dash.css'
import Count from './Count.jsx'
import Profile from './Profile.jsx';
import DataTable from './DataTable.jsx';
import RDataTable2 from './RDataTable.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Dashboard = () => {
  const [Pro, setPro] = useState(false)
  const [Show, setShow] = useState(false)
  const [Bottom, setBottom] = useState(false)
  const [OutofStack, SetOutOfStack] = useState(null)
  const [NotDelivary, setNotDelivary] = useState(null)
  const [NewOrders, setNewOrders] = useState(0)
  const [TOrdersList, SetTOrdersList] = useState([])
  const [TotalOders, setTotalOrders] = useState(null)
  const [TodayMoney, SetTodayMoney] = useState(0)
  const [LatestRating, SetLatestRating] = useState([])
  const [TotalMoney, SetTotalMoney] = useState(0)
  const navigate = useNavigate()


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/UserDetails/").then((d) => {
      const Data = d.data.filter((e) => {
        return e.username == localStorage.getItem('username')
      })
      try {
        const Obj = Data[0]
        localStorage.setItem('id', Obj.id)
      } catch {

      }

    })
    axios.get("http://127.0.0.1:8000/ProductDispalyView/")
      .then((response) => {
        const Filter = response.data.filter((e) => {
          return e.Product_Name.Stack <= 0
        })

        SetOutOfStack(Filter.length)

      })
      .catch((error) => {

      });
    // axios.get("http://127.0.0.1:8000/OrderDetails/")
    //   .then((response) => {
    //     setTotalOrders(response.data.length)
    //     
    //     let TodayMoney = 0
    //     let TotalMoney = 0

    //     const TDate = new Date().toLocaleDateString()
    //     const Filter = response.data.filter((e) => {
    //       const ODate = new Date(e.Date).toLocaleDateString()

    //       if (String(ODate) === String(TDate)) {
    //         TodayMoney += Number(e.Selling_Price)
    //         Arr.unshift(e)

    //       }
    //       TotalMoney += Number(e.Selling_Price)
    //       return e.Delivary === 'No'

    //     })

    //     SetTodayMoney(TodayMoney)
    //     SetTotalMoney(TotalMoney)
    //     setNewOrders(Arr.length)

    //     setNotDelivary(Filter.length)

    //   })
    //   .catch((error) => {

    //   });
    axios.get("http://127.0.0.1:8000/LCODetails/").then((response) => {
      const Filter = response.data.filter((e) => {
        return (
          e.Order_Id.OrderCancel == 'No'
        )
      })
      let TotalMoney = 0
      let TodayMoney = 0
      const Narr=[]
      const Arr = []
      const TDate = new Date().toLocaleDateString()
      const filter2 = Filter.filter((e) => {
        const ODate = new Date(e.Order_Id.Date).toLocaleDateString()

        if (String(ODate) === String(TDate)) {
          TodayMoney += Number(e.Order_Id.Selling_Price)
          Arr.unshift(e)

        }
        TotalMoney += Number(e.Selling_Price)
        if(e.Order_Id.Delivary === 'No'){
           Narr.unshift(e)

        }
        return e.Delivary === 'No'


      })


      SetTodayMoney(TodayMoney)
      SetTotalMoney(TotalMoney)
      setNewOrders(Arr.length)
      SetTOrdersList(Arr)
      setNotDelivary(Narr.length)



    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
    axios.get("http://127.0.0.1:8000/RatingDetails2/").then((d) => {
      SetLatestRating(d.data.slice().reverse().slice(0, 20))
    })

  }, [])

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
  const ProF = () => {
    setPro(false)
  }

  return (
    <>

      <div className='modd'>
        <Navbar ShowSide2={ShowSide2} BottomClicked={BottomClicked} />
      </div>
      <div style={{ overflow: 'hidden' }} className='  ' >
        <Count />
      </div>

      <div className='d-flex flex-column' style={{ overflow: 'hidden' }}>

        <div className='d-flex flex-column d-md-flex flex-md-row mod p-2 justify-content-between  '>
          <div style={{ background: '#F5F7FA', overflow: 'hidden' }} className=' col-md-5 p-4' >
            <Model />
          </div>
          <div className='col-md-6 p-4 card' style={{ overflowY: 'auto',height:'480px',scrollbarWidth:'none' }}>
            <span className='mb-2'>Toda'ys Orders</span>
            {TOrdersList && <><DataTable data={TOrdersList} /></>}
          </div>
        </div>
        <div className='d-flex flex-column d-md-flex flex-md-row mod p-2  justify-content-between '>
          <div style={{ background: '#F5F7FA', overflow: 'hidden' }} className='mt-5 col-md-5 p-4 '>
            <Model2 />
          </div>
          <div className='  col-md-6 p-4 ' style={{ overflowY: 'auto',height:'480px',scrollbarWidth:'none' }}>
            <span className='p-3 rtext'>Latest Ratings</span>
            {LatestRating && <><RDataTable2 data={LatestRating} /></>}
          </div>
        </div>

        <div className=' mod d-flex flx-column d-lg-flex flex-lg-row  p-3'>
          <div className='col-sm-12  col-md-12 col-lg-5 ' style={{ overflow: 'hidden', textAlign: 'center' }} >
            <PaymentBar />
          </div>
          <div className=' d-none  d-lg-flex flex-lg-row d- col-lg-7 mt-5'>
            <div className='col-12 col-sm-4  d-flex flex-row  bg-primary card mr-1 mt-1' style={{ height: '80px' }}>
                <div className='mt-auto mb-auto mr-2' style={{ fontSize: '30px' }}><i class="fa-solid fa-cart-shopping  " style={{color:'white'}}></i></div>
                <div className='d-flex flex-column mt-auto mb-auto '>
                  <small className='text-white'>{NewOrders && NewOrders} New Orders</small>
                  <small className='text-dark'  >Awaiting Processing</small>
              </div>
            </div>
            <div className='col-12 col-sm-4  d-flex flex-row  bg-danger card mr-1 mt-1' style={{ height: '80px' }}>
            <div className='mt-auto mb-auto mr-2 ' style={{ fontSize:'30px' }}><i class="fa-solid fa-sitemap text-warning" ></i></div>
              <div className='d-flex flex-column mt-auto mb-auto '>
                <small className='text-white'> {OutofStack && OutofStack} Products</small>
                <small className='text-dark ' >Out of stock</small>
              </div>
            </div>
            <div className='col-12 col-sm-4  d-flex flex-row  bg-warning card mr-1 mt-1' style={{ height: '80px' }}>
            <div className='mt-auto mb-auto mr-2' style={{ fontSize: '30px' }}><i class="fa-solid fa-truck text-info" ></i></div>
              <div className='d-flex flex-column mt-auto mb-auto'>
                <small className='text-white'>{NotDelivary && NotDelivary} Orders</small>
                <small className='text-dark '>Not Delivary</small>
              </div>
              </div>
          </div> 
        </div>
        <div className='col-12 col-md-12 p-4'>
        <div className='mod d-flex flex-column  d-sm-flex flex-sm-row d-lg-none'>
            <div className='col-12 col-sm-4  d-flex flex-row  bg-primary card mr-1 mt-2' style={{ height: '80px' }}>
                <div className='mt-auto mb-auto mr-2' style={{ fontSize: '30px' }}><i class="fa-solid fa-cart-shopping text-white"></i></div>
                <div className='d-flex flex-column mt-auto mb-auto '>
                  <small className='text-white'>{NewOrders && NewOrders} New Orders</small>
                  <small className='text-dark'  >Awaiting Processing</small>
              </div>
            </div>
            <div className='col-12 col-sm-4  d-flex flex-row  bg-danger card mr-1 mt-2' style={{ height: '80px' }}>
            <div className='mt-auto mb-auto mr-2 ' style={{ fontSize:'30px' }}><i class="fa-solid fa-sitemap text-white"></i></div>
              <div className='d-flex flex-column mt-auto mb-auto '>
                <small className='text-white'> {OutofStack && OutofStack} Products</small>
                <small className='text-dark ' >Out of stock</small>
              </div>
            </div>
            <div className='col-12 col-sm-4  d-flex flex-row mt-2  bg-warning card mr-1' style={{ height: '80px' }}>
            <div className='mt-auto mb-auto mr-2' style={{ fontSize: '30px' }}><i class="fa-solid fa-truck text-info"></i></div>
              <div className='d-flex flex-column mt-auto mb-auto'>
                <small className='text-white'>{NotDelivary && NotDelivary} Orders</small>
                <small className='text-dark '>Not Delivary</small>
              </div>
              </div>
          </div> 
        
        </div>
        
      </div>

      
      {Show && <>
        <div style={{ position: 'absolute', top: '0px', width: '100%',height:'100%', }}>
          <Sidebar2 ShowSide2={ShowSide2} />
        </div>
      </>}

      {/* {Bottom && <>
        <div className='col-7 col-sm-5 col-md-4 col-lg-3 ' style={{ position: 'absolute', top: '50px', right: '30px',backgroundColor:'lightgray',borderRadius:'10px' }} >
          <div className='d-flex flex-row justify-content-end' onClick={() => { setBottom(!Bottom) }}>
            <i class="fa-regular fa-circle-xmark p-2  h5 " style={{cursor:'pointer'}} ></i>

          </div>
          <div className='d-flex flex-row justify-content-center p-1' onClick={()=>{
            setBottom(false)
            setPro(true)}}>
            <span className=' btext' style={{ fontSize: '15px',cursor:'pointer' }}><i class="fa-solid fa-user mr-2 mt-auto mb-auto "></i>Profile</span>
          </div>
          <div className='d-flex flex-row justify-content-center p-1 mb-2 '>
          <span className=' btext' onClick={() => {
                                localStorage.removeItem('username')
                                navigate('/Login')
                            }} style={{ fontSize: '15px',cursor:'pointer' }}>  <i class="fa-solid fa-power-off  mr-2 mt-auto mb-auto  "></i>Logout</span>
          </div>
        </div>
      </>} */}
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
        <div className='col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3' style={{ position: 'absolute', right: '10px', top: '0px' }}>
          <Profile ProF={ProF} />
        </div>
      </>}

    </>
  );
};

export default Dashboard;
