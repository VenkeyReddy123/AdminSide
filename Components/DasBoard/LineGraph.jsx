// import React from 'react';
// import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

// const LineGraph = ({data10,data11}) => {
//   console.log(data10)
  
//   return (
//     <div className='col-12' style={{height:'400px'}}>
//       <VictoryChart theme={VictoryTheme.material}>
//         <VictoryLine
//           style={{
//             data: { stroke: 'red' },
//           }}
//           data={data10}
//         />
//         <VictoryLine
//           style={{
//             data: { stroke: 'blue' },
//           }}
//           data={data11}
//         />
//       </VictoryChart>
//     </div>
//   );
// };



import React from 'react';
import Plot from 'react-plotly.js';

const LineGraph = ({ data10, data11 }) => {
  const trace1 = {
    x: data10.map(item => item.x),
    y: data10.map(item => item.y),
    type: 'scatter',
    mode: 'lines',
    name: `${data10[0]&&data10[0].x.slice(0,7)}-${data10[0]&&data10[data10.length-1].x.slice(0,7)}`,
    line: { color: 'blue' }
  };

  const trace2 = {
    x: data11.map(item => item.x),
    y: data11.map(item => item.y),
    type: 'scatter',
    mode: 'lines',
    name: `${data10[0]&&data10[0].x.slice(10,data10[0].x.length)}-${data10[0]&&data10[data10.length-1].x.slice(10,data10[data10.length-1].x.length)}`,
    line: { color: 'red' }
  };
  return (
   
    <Plot
    className=''
    data={[trace1, trace2]}
  
    style={{ width: '95%', height: '90%' }}
    config={{ displayModeBar: false, responsive: true }}
  />
  
  

  );
};

export default LineGraph;






// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const LineGraph = ({ data10, data11 }) => {
//   return (
//     <div className='col-12' style={{ height: '400px' }}>
//       <ResponsiveContainer>
//         <div>
//           <LineChart data={data10}>
//             <XAxis dataKey="x" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="y" stroke="blue" name="Data 1" />
//           </LineChart>
//         </div>
//         <div>
//           <LineChart data={data11}>
//             <XAxis dataKey="x" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="y" stroke="red" name="Data 2" />
//           </LineChart>
//         </div>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LineGraph;


