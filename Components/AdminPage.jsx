import React from 'react'
import Sidebar from './Sidebar'
import DashBoard from './DashBoard'
import AddProducts from './AddProducts'
import Modify from './Modify'
import Orders from './Orders'
import CustemorDetail from './CustemorDetail'
import TodayOrders from './DasBoard/TodayOrders'

const AdminPage = () => {
  return (
    <>
      <div className='d-flex flex-column'>
           <div className=''>
              <Sidebar></Sidebar>
           </div>
           <div className=''  style={{width:'100%',height:'100%'}}>
               {/* <DashBoard></DashBoard> */}
               {/* <AddProducts/> */}
               <Modify/> 
               {/* <Orders/>   */}
               {/* <CustemorDetail/> */}
               {/* <TodayOrders/> */}
           </div>
      </div>
    </>
  )
}
// 
export default AdminPage