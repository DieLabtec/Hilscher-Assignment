import React, {useEffect, useState} from 'react'
import {Line} from 'react-chartjs-2';




export default function HumidityGraph() {
    let ArrayOfHumidityValue = []
  
  React.useEffect(() => {
    fetch('http://localhost:5000/24Humidity')
      .then(results => results.json())
      .then(data => {
          for (let i = 0; i < 10; i++) {
    
              ArrayOfHumidityValue.push(data[i]["humidityMeasure"]);
            
          }
        
      });
  }, []);
    
  const [humidityForTheGraph, setFirstName] = React.useState(ArrayOfHumidityValue);
 

    return (

        <div>
        <Line
        width={730} height={250}
        data={{
          labels: [ 'Mark 1', 'Mark 2', 'Mark 3',
          'Mark 4', 'Mark 5', 'Mark 6', 'Mark 7', 'Mark 8',
          'Mark 9', 'Mark 10'],
 datasets: [
   {
     label: 'Humidity ',
     fill: false,
     lineTension: 0.5,
     backgroundColor: 'rgba(75,192,192,1)',
     borderColor: 'rgba(50,50,180,1)',
     borderWidth: 2,
     data: humidityForTheGraph,
   }
 ]
        }}
        options={{
          title:{
            display:true,
            text:'Humidity Graph',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
      </div>
    );
  }