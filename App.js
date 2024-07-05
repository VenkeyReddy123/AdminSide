
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import AddProducts from './Components/AddProducts';
import AdminPage from './Components/AdminPage';
import TodayOrders from './Components/DasBoard/TodayOrders';
import DashBoard from './Components/DashBoard';
import Sidebar from './Components/Sidebar';
import Login from './Login'
import SelectExample from './Select';
import UserReg from './UserReg'
import Modify from './Components/Modify';

import Delete from './Components/DasBoard/Delete';
import CustemorDetail from './Components/CustemorDetail';
import Orders from './Components/Orders';
import CuponCode from './CuponCode';
import Forget from './Forget';
import ImageCheck from './ImageCheck';
import PageCheking from './PageCheking';
import Update from './Components/Update'
import CancelOrders from './Components/DasBoard/CancelOrders';
import PaymentComponent from './Components/PaymentComponent.jsx'
import ExchangePage from './Components/ExchangePage.jsx';
import ReturnPage from './Components/ReturnPage.jsx';


function App() {
       const request=(localStorage.getItem('id')?true:false)    
      
  return (
    
   <>

       <BrowserRouter>
                <Routes>
                     
                       { request?<Route path='/' element={<DashBoard/>}/>:<Route path='/' element={<Login/>}></Route>}
                       <Route path='/Login' element={<Login/>}></Route>
                       <Route path='/Exchange' element={<ExchangePage/>}></Route>
                       <Route path='/Return' element={<ReturnPage/>}></Route>
                       <Route path='/Reg' element={<UserReg/>}/>
                       <Route path='/Mod' element={<Modify/>}/>
                       <Route path='/Delete' element={<Delete/>}/>
                       <Route path='/Das' element={<DashBoard/>}/>
                       <Route path='/Add' element={<AddProducts/>}/>
                       <Route path='/Cust' element={<CustemorDetail/>}/>
                       <Route path='/Ord' element={<Orders/>}/>
                       <Route path='/Cupon' element={<CuponCode/>}/>
                       <Route path='/For' element={<Forget/>}/>
                       <Route path='/Up' element={<Update/>}/>
                       <Route path='/Can' element={<CancelOrders/>}/>
                       
                </Routes>
       </BrowserRouter>            
    
 
      

   
   </>
  );
}

export default App;
