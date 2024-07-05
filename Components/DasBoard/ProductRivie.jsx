import React, { useEffect, useState } from 'react'
import './Rivew.css'
import { Details } from './RiviewDetails'
import axios from 'axios'

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
  
  };
  return date.toLocaleString('en-US', options);
}



const ProductRivie = () => {
  const Data2=Details
  const [Data,setData]=useState([])
  useEffect(()=>{
        axios.get("http://127.0.0.1:8000/LCODetails/").then((d)=>{
          const TDate=new Date().toLocaleDateString()
           const filterData=d.data.filter((e)=>{
            const ODate=new Date(e.Order_Id.Date).toLocaleDateString()
            return String(ODate)===String(TDate)&& e.Order_Id.OrderCancel=='No'
           })
             setData(filterData)
             
        }).catch((e)=>{
            alert("pLease Try AGian")
        })
  },[])

  return (
    
    <>

        <div className='div ml-1'>
          <span className='btn btn-primary p-2 mb-2'>Today Orders</span>
        {Data&&Data.slice().reverse().slice().map(order => (
          <div key={order.order_id} className="admin-order-row">
            <div className="admin-order-row-scroll">
              <table className="admin-order-table">
                <thead>
                  <tr>
                    <th >Order ID</th>
                    <th>Customer Name</th>
                    <td>State</td>
                    <td>City</td>
                    <td>House</td>
                    <td>Road</td>
                    <th>Payment Status</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Actual_Price</th>
                    <th>Selling_Price</th>
                    <th>Cupon_Using</th>
                    <th>Delivery Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Delivary</th>
                  </tr>
                </thead>
                <tbody style={{background:'',color:''}} >
                <tr key={order.Order_Id.Order_Id} style={{overflowx:'auto'}}>
              <td>{order.Order_Id.Order_Id}</td>
              <td>{order.Custamer_Name.Custamer_Name}</td>
              <td style={{textWrap:'nowrap'}} >{JSON.parse(order.Adress).State}</td>
              <td>{order.City}</td>
              <td >Road:-{JSON.parse(order.Adress).Road}</td>
              <td style={{textWrap:'wrap'}} >House:-{JSON.parse(order.Adress).House}</td>
             
              <td  style={{textWrap:'nowrap'}}>{order.Order_Id.Payment_Status==='Compleate'?<><span className='bg-success btn p-1' style={{height:'max-content',fontWeight:'bold'}}>{order.Order_Id.Payment_Status}</span></>:<><span className='bg-danger btn  p-1' style={{height:'max-content',fontWeight:'bold'}}>{order.Order_Id.Payment_Status}</span><span><i class="fa-solid fa-check ml-2 text-dark btn btn-primary p-1"></i></span></>}</td>
              <td style={{fontSize:'15px',}}><span>{order.Order_Id.Product_Name.Product_Name}</span></td>
              <td style={{fontSize:'15px',}}><span>{order.Quantity}</span></td>
              <td style={{fontSize:'15px',}}><span>{order.Order_Id.Product_Name.Price}</span></td>
              <td style={{textWrap:'nowrap'}}>{order.Order_Id.Selling_Price}</td> 
              <td style={{textWrap:'nowrap'}}>{order.Order_Id.Code_Using==0?<>No</>:<>{order.Order_Id.Code_Using}</>}</td> 

              <td style={{textWrap:'nowrap'}}>{order.Order_Id.Delivary_Type}</td> 
              <td style={{textWrap:'nowrap'}}>{new Date(order.Order_Id.Date).toLocaleDateString()}</td>
               <td style={{textWrap:'nowrap'}}>{ new Date(order.Order_Id.Date).toLocaleTimeString()}</td>
               <td style={{textWrap:'nowrap'}}>{order.Order_Id.Delivary=='No'?<><span className='bg-danger btn p-1' >{order.Order_Id.Delivary}</span><i  class="fa-solid fa-check ml-2 text-dark btn btn-primary p-1"></i></>:<><span className='bg-success btn p-2'>{order.Order_Id.Delivary}</span></>}</td>
            </tr> 
                </tbody>
              </table>
            </div>
          </div>
        ))}
        </div>
    </>
  )
}

export default ProductRivie
