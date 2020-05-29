import React from 'react';

import axios from 'axios';

export default class Humidity24Hours extends React.Component {
  state = {
    sensorHumidity: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/24humidity`)
      .then(res => {
        const sensorHumidity = res.data;
        this.setState({ sensorHumidity });
      })
  }

  render() {
    return (
      <div>
        <h1>Humidity measurements: last 24 hours</h1>
        <ul>
          { this.state.sensorHumidity.map(sensor => <li>Sensor ID: {sensor.sensorID} ,Mesurment ID: {sensor.mesuredhumidityID}, Measurement: {sensor.humidityMeasure}, Date (in miliseconds since UNIX time stamp): {sensor.Date}</li>)}
        </ul>
      </div>
    )
  }
}
