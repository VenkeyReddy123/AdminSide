import React, { useEffect, useState } from 'react';
import MoneyLineChart from './LineGraph';
import LineGraph from './LineGraph';


const App1 = ({ data,data2 }) => {
   

    return (
        <div className=' ' style={{overflow:'hidden'}}>
           <span className=' mb-2  col-12  '>Last 7Day's Earnings</span>
           <div className='' style={{height:'650px',width:'100%'}}>
                <LineGraph data10={data} data11={data2}/>
           </div>
           {/* <div className='d-none d-lg-block d-xl-none col-11' style={{height:'500px',width:'95%'}}>
                <LineGraph data10={data} data11={data2}/>
           </div> */}
           {/* <div className='d-block  d-sm-none p-4 card ' style={{height:'530px',width:'100%'}}>
                <LineGraph data10={data} data11={data2}/>
           </div>
          
           <div className='d-none  d-sm-block d-md-none   ' style={{height:'550px',width:'100%'}}>
                <LineGraph data10={data} data11={data2}/>
           </div> */}
           {/* small */}
           
           {/* <div className='d-block  d-sm-none col-12' style={{height:'450px',width:'100%'}}>
                <LineGraph data10={data} data11={data2}/>
           </div> */}
          
        </div>
    );
};

export default App1;

