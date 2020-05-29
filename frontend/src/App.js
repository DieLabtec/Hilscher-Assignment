import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import TempLast24Hours from './components/TempLast24Hours'
import Humidity24Hours from './components/HumidityLast24Hours'
import HumidityGraph from "./components/HumidityGraph"
import TemperatureGraph from "./components/TempGraph24"
const ENDPOINT = "http://127.0.0.1:5000";





function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  function SensorHandle1(){
    axios.get(`http://localhost:5000/changeSensor1`)
  }

  function SensorHandle2(){
    axios.get(`http://localhost:5000/changeSensor2`)
  }

  function SensorHandle3(){
    axios.get(`http://localhost:5000/changeSensor3`)
  }

  function OnClick1(){
    SensorHandle1();
  };

  function OnClick2(){
    SensorHandle2();
  };

  function OnClick3(){
    SensorHandle3();
  };


 

  return (
  <>  


  <TemperatureGraph />
  <HumidityGraph />
  <p>
       {response[0]}
    </p>
    <p>
      {response[1]}
    </p>
    <p>
      {response[2]}
    </p>

    <table>
      <tbody>
      <tr>
        <th> Sensor1</th>
        <th> ID: {`${response[6]}`}</th>
        <th> SerialNumber:{`${response[9]}`} </th>
        <th> Model: {`${response[12]}`} </th>
        <th> Turned On: {`${response[3]}`}</th>
      </tr>

      <tr>
        <th> Sensor2</th>
        <th> ID:{`${response[7]}`}</th>
        <th> SerialNumber: {`${response[10]}`}</th>
        <th> Model:{`${response[13]}`}</th>
        <th> Turned On:{`${response[4]}`}</th>
      </tr>

      <tr>
        <th> Sensor3</th>
        <th> ID:{`${response[8]}`}</th>
        <th> SerialNumber:{`${response[11]}`}</th>
        <th> Model:{`${response[14]}`}</th>
        <th> Turned On:{`${response[5]}`}</th>
      </tr>
      </tbody>
    </table>
    
    <button type="button" onClick = {OnClick1}> Turn on/off Sensor1 </button>
    <button type="button" onClick = {OnClick2}> Turn on/off Sensor2 </button>
    <button type="button" onClick = {OnClick3}> Turn on/off Sensor3 </button>

    <table>
      <tbody>
        <tr>
          <th>
              <TempLast24Hours />            
            
          </th>
        </tr>


        <tr>
          <th>
          <Humidity24Hours />
          
          </th>
        </tr>


      </tbody>

    </table>

    
    </>
  );
}

export default App;
