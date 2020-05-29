// import React, { useState, useEffect } from "react";
// import {Line} from 'react-chartjs-2';
// import openSocket from 'socket.io-client';
// import socketHelper from "./socketHelper.js"

 
 
// var something;
// var something2;



// export default class Chart extends React.Component {
  //  state = {
  //   labels: ['January', 'February', 'March',
  //            'April', 'May'],
  //   datasets: [
  //     {
  //       label: 'Rainfall',
  //       fill: false,
  //       lineTension: 0.5,
  //       backgroundColor: 'rgba(75,192,192,1)',
  //       borderColor: 'rgba(0,0,0,1)',
  //       borderWidth: 2,
  //       data: [10, 10, 80, 81, 56]
  //     }
  //   ]
  // }
  

//   componentDidMount(){
//     //var socket = openSocket("localhost:5000")
//     socketHelper.subscribe("FromAPI" , function(response){
//       var newDataSet = this.state.datasets
//        something = parseInt(response[15]);
//        something2 = parseInt(response[16])
//        newDataSet[0].data = [something , something2];
//       // newDataSet[6].push(something2, something)
      
      
//       // console.log(something , something2)
//       this.setState({datasets:newDataSet}) 
//     })

//   }
  


//   render() {

//     console.log(this.state);

    

//     return (
//       <div>
        
//         <Line
//           data={this.state}
//           options={{
//             title:{
//               display:true,
//               text:'Average Rainfall per month',
//               fontSize:20
//             },
//             legend:{
//               display:true,
//               position:'right'
//             }
//           }}
//         />
        
//       </div>
//     );
    
//   }
// }