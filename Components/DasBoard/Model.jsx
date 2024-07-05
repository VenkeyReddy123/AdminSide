import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';
import { style } from 'd3';
import { Border } from 'victory';

const OrdersChart = () => {
  const [data, setData] = useState(null);
  const [Smdata, setSmdata] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/LCODetails/");
        const FilterData = response.data.filter((e) => {
          return e.Order_Id.username === Number(localStorage.getItem('id'));
        });

        const date = new Date();
        let TooDay = [];
        let OnDay = [];
        let TwDay = [];
        let ThreDay = [];
        let FDay = [];
        let FiDay = [];
        let SDay = [];
        FilterData.forEach((e) => {

          if (new Date().toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
            TooDay.unshift(e);
          } else if (new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
            OnDay.unshift(e);
          } else if (new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
            TwDay.unshift(e);
          } else if (new Date(new Date().setDate(new Date().getDate() - 3)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
            ThreDay.unshift(e);
          } else if (new Date(new Date().setDate(new Date().getDate() - 4)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
            FDay.unshift(e);
          } else if (new Date(new Date().setDate(new Date().getDate() - 5)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No') {
            FiDay.unshift(e);
          } else if (new Date(new Date().setDate(new Date().getDate() - 6)).toLocaleDateString() === new Date(e.Order_Id.Date).toLocaleDateString() && e.Order_Id.OrderCancel == 'No' ) {
            SDay.unshift(e);
          }

        });

        const chartData = [
          { country: new Date().toLocaleDateString(), value: TooDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString(), value: OnDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString(), value: TwDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 3)).toLocaleDateString(), value: ThreDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 4)).toLocaleDateString(), value: FDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 5)).toLocaleDateString(), value: FiDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 6)).toLocaleDateString(), value: SDay.length },
        ];
        setData(chartData)
        const charSmalltData = [
          { country: new Date().getDate(), value: TooDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 1)).getDate(), value: OnDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 2)).getDate(), value: TwDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 3)).getDate(), value: ThreDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 4)).getDate(), value: FDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 5)).getDate(), value: FiDay.length },
          { country: new Date(new Date().setDate(new Date().getDate() - 6)).getDate(), value: SDay.length },
        ];
        setSmdata(charSmalltData)



        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='p-2' style={{ width: '100%', height: '450px', }}>
        <small className='text-primary h6' style={{ textAlign: 'center' }}>Orders Count Last 7 Days</small>
        {data &&

          <>

            <ResponsiveBar
              className='d-none d-md-block'
              data={Smdata}
              keys={['value']}
              indexBy="country"
              margin={{ top: 20, right: 0, bottom: 50, left: 20 }}
              padding={0.5}
              colors={'blue'}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 40,
                tickPadding: 0,
                tickRotation: 0,
                legend: 'Orders Dates',
                legendPosition: 'middle',
                legendOffset: 20,
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 10,
                tickRotation: 0,
                legend: 'Orders Count',
                legendPosition: 'middle',
                legendOffset: -10,
                tickValues: Array.from({ length: 11 }, (_, i) => i * 5),
              }}
              labelSkipWidth={10}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />


          </>
        }
      </div>
      
    </>

  );
};

export default OrdersChart;
