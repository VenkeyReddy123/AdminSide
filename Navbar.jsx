
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ImageCropper from './ImageCropper'
import './Components/Dash.css'

const Navbar = ({ ShowSide2,BottomClicked }) => {
  const[Bottom,setBottom]=useState(false)
  const[PObj,SetPObj]=useState([])
  const Click = () => {
    ShowSide2()
  }
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/ProfileDetails/")
      .then((response) => {
        const filteredData = response.data.filter((item) => Number(localStorage.getItem('id')) === item.username.id);
         SetPObj(filteredData)
      })
      .catch((error) => {
       
      });
  }, []);
  return (
    <>
    
      <div className='d-flex flex-row justify-content-between p-1 shadow-sm' style={{overflow:'hidden',borderBottom:'2px solid black',position:''}}>
        <div className='d-flex flex-row'>
          <span className='text-danger p-1' style={{ fontWeight: 'bolder',fontFamily:'cursive' }}><span className='text-danger' style={{fontSize:'25px',fontFamily:'cursive'}}>D</span>ash<span className='text-danger' style={{fontSize:'25px',fontFamily:'cursive'}}>B</span>oard</span>
          <i className="fas fa-list text-dark btn  p-1 mt-auto mb-auto" onClick={() => { Click() }} style={{ fontSize: '25px' }}></i>
        </div>

        <div className='mr-3 d-flex flex-row'>
                   <div className='d-none d-md-block mt-auto mb-auto d-flex flex-row '>
                       
                   
                  
                      {PObj.length>0&&<><span className='untext'><small>{PObj[0].username.username}</small></span></>}  
                   </div>

                   <div className='d-flex flex-row'>
                       <i class="fa-solid fa-gear p-1 " onClick={()=>{
                        BottomClicked()
                       }} style={{fontSize:'30px',color:'black',cursor:'pointer'}}></i>       
                   </div>
        </div>
      </div>
     
     
      </>



  )
}

export default Navbar