import React, { useEffect, useRef, useState } from 'react'
import { Details } from './DasBoard/RiviewDetails'
import Sidebar from './Sidebar'
import Navbar from '../Navbar'
import axios from 'axios'
import './Orders.css'
import Sidebar2 from './SideBar2'
import Dsidebar from './Dsidebar'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom'

const DataTable = ({data,Value}) => {
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [Pay, SetPay] = useState(null)
  const [Del, setDel] = useState(null)
  const[Pro,setPro]=useState(false)
  const containerRef=useRef(null)
  const ProF=()=>{
    setPro(false)
  }

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    
    
    if(searchTerm){
      const Value=searchTerm
      const filteredResults = data.filter(order =>{
        if (order.Custamer_Name.toLowerCase().includes(Value.toLowerCase()) ||
        String(order.Email).toLowerCase().includes(Value.toLowerCase()) ||
        String(order.Mobile_Number).toLowerCase().includes(String(Value))) {
        return order
      }
    });
      setFilteredData(filteredResults.slice().reverse());
    }else{
      setFilteredData(data.slice().reverse())
    }
    
  }, [searchTerm, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleScroll=(direction)=>{
     const container=containerRef.current
     if(!container) return 
     if(direction=='left'){
        container.scrollTo({
          left:container.scrollLeft-100 ,
          behavior:'smooth'
        })
     }else{
      container.scrollTo({
        left:container.scrollLeft+100,
        behavior:'smooth'

      })
     }
  }

  return (
    <div className="">
      <div className='d-flex flex-row justify-content-around'>
        <input type="text" className="col-8 col-md-6 mb-2 ml-auto mr-auto mt-auto mb-auto form-control" placeholder="Search by Id or Name" value={searchTerm} onChange={handleSearchChange} />
        <div className='d-none d-md-block'>
          <select className="" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select><small className='mt-auto mb-auto'>Select  Pages</small>
        </div>
      </div>
      <div className='d-flex flex-row col-12 mt-2'>
      <div className='d-block d-md-none ml-2'>
          <select className="" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select><small className='mt-auto mb-auto'>Select  Pages</small>
        </div>
        {!Value&&<>
          <ul className="pagination ml-auto  ">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul></>}
        </div>
        <div className='col-12 d-flex flex-row justify-content-end'>
                <div className=''>
                    <span className='btn btn-success mr-3' onClick={() => handleScroll('left')}   ><i class="fa-solid fa-angles-left"></i></span>
                    <span className='btn btn-warning ml-2' onClick={() => handleScroll('right')} ><i class="fa-solid fa-angles-right"></i></span>
                </div>
            </div>
     <div ref={containerRef} style={{overflow:'auto',scrollbarWidth:'2px'}}>
     <table className="table table-striped mt-2">
        <thead>
          <tr>
            <td><small>Customer Name</small></td>
            <td><small>Email</small></td>
            <td><small>Mobile_Number</small></td>
            <td><small>Join Date</small></td>
          
          </tr>
        </thead>
        <tbody>
          {currentItems.map((order, index) => (
            <tr >
              <td><small>{order.Custamer_Name}</small></td>
              <td><small>{order.Email}</small></td>
              <td><small>{order.Mobile_Number}</small></td>
              <td><small>{new Date(order.JoinDate).toLocaleDateString()}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
      <div className='d-flex flex-row col-12 mt-2'>
      <div className='ml-2'>
          <select className="" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select><small className='mt-auto mb-auto'>Select  Pages</small>
        </div>
        <ul className="pagination ml-auto  ">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
        </div>
    </div>
  );
};

const CustemorDetail = () => {
  const [pw, setpw] = useState('')
  const [rpw, setrpw] = useState('')
  const [un, setun] = useState('')
  const [run, setrun] = useState()
  const [Con1, setCon] = useState(false)
  const [orders, setOrders] = useState([])
  const [Bottom, setBottom] = useState(false)
  const [Refreshh, setRefresh] = useState([])
  const [Con2, setCon2] = useState(false)
  const navigate=useNavigate()
  const Data = Details


  const BottomClicked = (click) => {
    if (click) {
      setBottom(false)
      return
    }
    setBottom(!Bottom)

  }
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/LoginDetails/").then((d) => {
      const Filter = d.data
      setRefresh(Filter)
      setOrders(Filter)


    }).catch((e) => {
      alert('Please Try Again LAter ')
    })
  }, [])
  const [Show, setShow] = useState(false)
  const ShowSide2 = () => {
    setShow(!Show)
  }
  const HandleCustamer = (event) => {
    const Filter = Refreshh.filter((order) => {
      if (order.Custamer_Name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        String(order.Email).toLowerCase().includes(event.target.value.toLowerCase()) ||
        String(order.Mobile_Number).toLowerCase().includes(event.target.value)) {
        return order
      }
    })
    setOrders(Filter)
  }
  const[Pro,setPro]=useState(false)
  const ProF=()=>{
    setPro(false)
  }
  return (
    <>
      <div className=''>
        <Navbar ShowSide2={ShowSide2} BottomClicked={BottomClicked} />
      </div>
      <div className='text-center mod'>
        <h6 className='d-inline-block p-2 text-primary bg-dark mt-5 shadow' >Customer  Details</h6>
      </div>
      <div className="container py-4">
        <DataTable data={orders} Value={Pro} />
      </div>
      <div className='div ml-4 mt-5'>
       
        {/*  */}
       
      </div>

      {Show && <>

        <div style={{ position: 'absolute', top: '0px', width: '100%' }}>
          <Sidebar2 ShowSide2={ShowSide2}  />
        </div>
      </>}
      {Bottom && <>
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
      </>}
      {Pro&&<>
        <div className='col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3' style={{position:'absolute',right:'10px',top:'0px'}}>
          <Profile ProF={ProF}/>
      </div>
      </>}



    </>
  )
}

export default CustemorDetail