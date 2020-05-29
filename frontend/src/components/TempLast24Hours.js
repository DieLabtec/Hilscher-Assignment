import React from 'react';

import axios from 'axios';

export default class Temp24Hours extends React.Component {
  state = {
    sensorTemp: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/24temp`)
      .then(res => {
        const sensorTemp = res.data;
        this.setState({ sensorTemp });
      })
  }

  render() {
    return (
      <div>
        <h1>Temperature measurements: last 24 hours</h1>
        <ul>
          { this.state.sensorTemp.map(sensor => <li>Sensor ID: {sensor.sensorID} ,Mesurment ID: {sensor.mesuredtempID}, Measurement: {sensor.tempMeasure}, Date (in miliseconds since UNIX time stamp): {sensor.Date}</li>)}
        </ul>
      </div>
    )
  }
}
