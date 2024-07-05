import React, { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { useEffect } from 'react';
import { VictoryPie, VictoryLabel } from 'victory';

const CircleProgressBar = ({ percentage, color,text }) => {
  return (
    <>
    <div className='d-none d-md-block' style={{ width: '50%', height: '45%' }}>
      <CircularProgressbar
        value={percentage}
        text={text}
        styles={buildStyles({
          pathColor: color,
          trailColor: '#d6d6d6',
          textSize: '10px',
        })}
      />
     </div>
     <div className='d-block d-md-none mt-2' style={{ width: '100%', height: '100%' }}>
      <CircularProgressbar
        value={percentage}
        text={text}
        
        styles={buildStyles({
          pathColor: color,
          trailColor: '#d6d6d6',
          textSize: '10px',
          
        })}
      />
     </div>
    </>
     
  );
};











const PaymentStatusPieChart = () => {
    const [PaymentDone, SetPaymentDone] = useState(0)
    const [PaymentNotDone, SetPaymentNotDone] = useState(0)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/LCODetails/").then((d) => {
            const PayDone = []
            const PayNot = []
            const Data = d.data.filter((e) => {
                return e.Order_Id.username === Number(localStorage.getItem('id'));
            });
            const FilterData = Data.filter((e) => {
                return e.Order_Id.OrderCancel === 'No'
            })
            FilterData.forEach((e) => {
            
                if (e.Order_Id.Payment_Status.toLowerCase().includes('Compl'.toLowerCase())) {
                    PayDone.unshift(e)
                } else {
                    PayNot.unshift(e)
                }
            })

            if ((Math.trunc((PayDone.length / FilterData.length) * 100) + Math.trunc((PayNot.length / FilterData.length) * 100)) === 100) {
                const data = [
                    { x: `${Math.trunc((PayDone.length / FilterData.length) * 100)}% Complete`, y: 70, color: '#3182CE' }, // Blue color for 'Done' status
                    { x: `${Math.trunc((PayNot.length / FilterData.length) * 100)}% Pending`, y: 30, color: '#E53E3E' }, // Red color for 'Incomplete' status
                ];
                SetPaymentDone(Math.trunc((PayDone.length / FilterData.length) * 100))
                
                SetPaymentNotDone(Math.trunc((PayNot.length / FilterData.length) * 100))
                
            } else {
                const data = [
                    { x: `${Math.trunc((PayDone.length / FilterData.length) * 100)}% Complete`, y: 70, color: '#3182CE' }, // Blue color for 'Done' status
                    { x: `${Math.trunc((PayNot.length / FilterData.length) * 100) + 1}% Pending`, y: 30, color: '#E53E3E' }, // Red color for 'Incomplete' status
                ];
                
                SetPaymentDone(Math.trunc((PayDone.length / FilterData.length) * 100))
                SetPaymentNotDone(Math.trunc(((PayNot.length / FilterData.length) * 100)+(1)))
                
            }
       

        })
    },[])


    return (
        <>
          <small className='text-success p-2' style={{fontWeight:'bold',fontFamily:'initial'}}>Payment Status</small>
            <div className='col-12 p-4 col-sm-12 d-flex flex-column d-sm-flex flex-sm-row justify-content-around '>
                 {<><div className='col-6d mr-2 ml-2'><CircleProgressBar percentage={PaymentNotDone} text={`${PaymentNotDone}% Pending`} color="#ff0000" /> {/* Pending */}</div></>}
                  {<div  className='col-6d ml-2 mr-2 '><CircleProgressBar percentage={PaymentDone} text={`${PaymentDone}% completed`} color="#0000ff" /></div>}
                
            </div>
        </>
    );
};

export default PaymentStatusPieChart;
