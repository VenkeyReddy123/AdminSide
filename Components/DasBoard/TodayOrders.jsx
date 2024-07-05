import React, { useState } from 'react'
import { Details } from './RiviewDetails'
import axios from 'axios'

const TodayOrders = () => {
    const Data=Details
    const Time=['10Min Ago','35Min Ago','55Min Ago','1Hour Ago','4Hours Ago','5Hours Ago']
    const [pw,setpw]=useState('')
    const[rpw,setrpw]=useState('')
    const [un,setun]=useState('')
    const[run,setrun]=useState('')
    const[Con1,setCon]=useState(false)
    const[Con2,setCon2]=useState(false)
    const Condition1=(val)=>{
    
      if(val==='User'){
        setCon2(!Con2)
      }
      else{
        setCon(!Con1)
      }
    }
    const Condition3=()=>{
      setCon(!Con1)
    }
    const Condition2=()=>{
      setCon2(!Con2)
    }
    
    const HandleUsername=(e)=>{
      e.preventDefault()
      if(un.length>1){
        if(un===run){
          const Data={
            'pk':Number(localStorage.getItem('id')),
            'password':localStorage.getItem('Password'),
            'username':un
          }
          console.log(Data)
         
  
          axios.patch("http://127.0.0.1:8000/UserDetails/",Data).then((d)=>{
              alert("Username Changed Sucessfully")
          }).catch((e)=>{
            alert('Please Try Again LAter ')
          })
      }
      else{
        alert('Password are not matched')
      }
      }
      Condition2()
      
       
    }
    
    const HandlePassword=(e)=>{
      e.preventDefault()
      if(pw.length>1){
        if(pw===rpw){
          const Data={
            'pk':Number(localStorage.getItem('id')),
            'password':pw
          }
          axios.patch("http://127.0.0.1:8000/UserDetails/",Data).then((d)=>{
              alert("Password CHanged Sucessfully")
          }).catch((e)=>{
            alert('Please Try Again LAter ')
          })
      }
      else{
        alert('Password are not matched')
      }
      }
      Condition3()
      
       
    }
  return (
    <>
      <div className='container-fluid' style={{ overflowX: 'hidden' }}>
  <div>
    <h1>Today Orders#6</h1>
    <h6>Total Amount:2340000</h6>
  </div>
  <div className='row overflow-auto'>
    <div className='col-12'>
      <table className=' table col-12 text-center flex-wrap p-3' style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th><h5>Order ID</h5></th>
            <th><h5>Product</h5></th>
            <th><h5>Quantities</h5></th>
            <th><h5>Payment Status</h5></th>
            <th><h5>Delivery Type</h5></th>
            <th><h5>Time</h5></th>
          </tr>
        </thead>
        <tbody>
          {Data.map((e, ind) => (
            <tr key={ind}>
              <td><h6 className='p-2 text-primary'>{e.order_id}</h6 ></td>
              <td><h5 className='d-flex flex-row justify-content-between'><img src={e.pimg} width={'70px'} alt="" srcset="" />{e.pname}</h5></td>
              <td><h6>{e.q_y}</h6></td>
              <td><h6 style={{ backgroundColor: e.p_s === 'Pending' || e.p_s === 'Paid' ? 'lightgreen' : 'red', borderRadius: '50px' }} className='p-0'>{e.p_s}</h6 ></td>
              <td><h6>{e.d_t}</h6></td>
              <td><h6>{Time[ind]}</h6 ></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  {Con1&&<>
      <div className='col-sm-5   card bg-primary' style={{position:'absolute',top:'105px',right:'10px',overflow:'hidden'}}>
          <h6 className='text-center mt-2'>Password Change</h6>
          <form onSubmit={HandlePassword}>
             <input type="password" onChange={(e)=>{setpw(e.target.value)}} placeholder='Enter New Password' className='form-control ml-2 mr-2 p-2 mb-2 mt-3' />
             <input type="password" onChange={(e)=>{setrpw(e.target.value)}} placeholder='Enter  AgainNew Password' className='form-control ml-2 mr-2 mb-2' />
            <div className='text-center mb-2'>
               <input type="submit" value={'Change Password'} className='btn btn-warning ' />
            </div>
          </form>
      </div>
     </>}
     {Con2&&<>
      <div className='col-sm-5   card bg-primary' style={{position:'absolute',top:'105px',right:'10px',overflow:'hidden'}}>
          <h6 className='text-center mt-2'>Username Change</h6>
          <form onSubmit={HandleUsername}>
             <input type="password" onChange={(e)=>{setun(e.target.value)}} placeholder='Enter New Username' className='form-control ml-2 mr-2 p-2 mb-2 mt-3' />
             <input type="password" onChange={(e)=>{setrun(e.target.value)}} placeholder='Enter  AgainNew Username' className='form-control ml-2 mr-2 mb-2' />
            <div className='text-center mb-2'>
               <input type="submit" value={'Change Username'} className='btn btn-warning ' />
            </div>
          </form>
      </div>
     </>}
</div>

    </>
  )
}

export default TodayOrders