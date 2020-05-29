const express = require("express");
const App = express();
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
App.use(cors());



const server = http.createServer(App);
const io = socketIo(server);

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database_folder/sensors.db')
const Port = process.env.Port || 5000;
const Port2 = process.env.Port || 5100;




// when you get to the front end bind sensorStatus to a buttons that turns on and off the sensor

class Sensor{
    
    constructor(sensorID , serialNumber , model , sensorStatus = true , temp , humidity  ){
        this.sensorID = sensorID;
        this.serialNumber = serialNumber
        this.model = model;
        this.sensorStatus = sensorStatus;
        
    
    }

    sensorData(){
    console.log(
        this.sensorID,
        this.sensorStatus,
        this.serialNumber,
        this.model,)
    }

    DataFromSensor(){
        
            this.temp = Math.random(),
            this.humidity = Math.random()
     


    }

    

}

let sensor = new Sensor(1 ,112332 , 33221 , true);
let sensor2 = new Sensor(2 ,58236654 , 9125221 , true);
let sensor3 = new Sensor(3 , 22311547 , 7456123, true);



function changeSensorStatus (sensor){
    if(sensor.sensorStatus == true){
        sensor.sensorStatus = false;
    }
    else if (sensor.sensorStatus == false){
        sensor.sensorStatus =true;
    }
    console.log(sensor.sensorStatus)
}

App.put('localhost:5000/statusChanger', (req, res) => res.send(sensor.sensorStatus = false));




function passtoSetInterval(){
if (sensor.sensorStatus == true){
    sensor.DataFromSensor();
    console.log(sensor.humidity , sensor.temp);}
}

 setInterval(passtoSetInterval , 5000);

 function passtoSetInterval2(){
    if (sensor2.sensorStatus == true){
        sensor2.DataFromSensor();
        console.log(sensor2.humidity , sensor2.temp);}
    }

setInterval(passtoSetInterval2 , 5000);

function passtoSetInterval3(){
    if (sensor3.sensorStatus == true){
        sensor3.DataFromSensor();
        console.log(sensor3.humidity , sensor3.temp);}
    }

setInterval(passtoSetInterval3 , 5000);



App.get('/' , (req,res) => res.send('Hello Light'));




db.serialize(function() {


      let stmt = db.prepare("INSERT INTO sensor_data Values (?,?, ?)");
      let stmt2 = db.prepare("INSERT INTO sensor_measurement_temp Values (NULL, ?, ? , ?)");
      let stmt3 = db.prepare("INSERT INTO sensor_measurement_humidity Values (NULL, ?, ? , ?)");


      

        function pushTempIntoDB1(){
            if(sensor.sensorStatus == true){
                stmt2.run(sensor.sensorID , sensor.temp , Date.now())
            }
        }

        setInterval(pushTempIntoDB1 , 6000)

        function pushTempIntoDB2(){
            if(sensor2.sensorStatus == true){
                stmt2.run(sensor2.sensorID , sensor2.temp , Date.now())
            }
        }

        setInterval(pushTempIntoDB2 , 6000)

        function pushTempIntoDB3(){
            if (sensor3.sensorStatus == true){
                stmt2.run(sensor3.sensorStatus , sensor3.temp , Date.now())
            }
        }

        setInterval(pushTempIntoDB3 , 6000)



        function pushParamsfromSensorintoDB(){
            if (sensor.sensorStatus == true){
            stmt3.run(sensor.sensorID,sensor.humidity , Date.now())
            }
        }

        setInterval(pushParamsfromSensorintoDB, 6000);


        function pushParamsfromSensorintoDB2(){
            if (sensor2.sensorStatus == true){
            stmt3.run(sensor2.sensorID,sensor2.humidity , Date.now())
            }
        }

        setInterval(pushParamsfromSensorintoDB2, 6000);

        function pushParamsfromSensorintoDB3(){
            if (sensor3.sensorStatus == true){
            stmt3.run(sensor3.sensorID,sensor3.humidity , Date.now())
            }
            
        }

        setInterval(pushParamsfromSensorintoDB3, 6000);


        
      



});

let sensorData = [];








let hours24humidity = [];
 

var dateminusaday = Date.now() - 86400000;
console.log(Date.now());
console.log(dateminusaday);

db.each("SELECT * from sensor_measurement_humidity WHERE Date > "+dateminusaday+"  ",function(err, row) {
    
    
         hours24humidity.push(row)
        
    
    }
    
    
 )

 var temp24 = [];
 db.each("SELECT * from sensor_measurement_temp WHERE Date >"+dateminusaday+" ", function(err,row){
    temp24.push(row); 

 })


 





















db.each("SELECT * sensor_data", function(err, row) {
    sensorData.push(sensor);
    sensorData.push(sensor2);
    sensorData.push(sensor3);
});




App.get('/24humidity', (req,res) => res.send(hours24humidity))
App.get('/24temp', (req,res) => res.send(temp24))

App.get('/changeSensor1', (req, res) => res.send(changeSensorStatus(sensor)))
App.get('/changeSensor2', (req, res) => res.send(changeSensorStatus(sensor2)))
App.get('/changeSensor3', (req, res) => res.send(changeSensorStatus(sensor3)))

App.get('/sensors', (req, res) => res.send(sensorData))

App.get('/sensors/1', (req, res) => res.send(sensor))

App.get('/sensors/2', (req, res) => res.send(sensor2))

App.get('/sensors/3', (req, res) => res.send(sensor3))

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 5000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = [`Sensor1 temp:${sensor.temp} , humidity:${sensor.humidity}`, 
                    `Sensor2 temp:${sensor2.temp}, humidity:${sensor2.humidity}`,
                    `Sensor3 temp:${sensor3.temp}, humidity:${sensor3.humidity}`,
                    sensor.sensorStatus, 
                    sensor2.sensorStatus , 
                    sensor3.sensorStatus,
                    sensor.sensorID,
                     sensor2.sensorID , 
                     sensor3.sensorID,
                    sensor.serialNumber, 
                    sensor2.serialNumber , 
                    sensor3.serialNumber,
                    sensor.model , 
                    sensor2.model ,
                     sensor3.model,
                     sensor.temp,
                     sensor.humidity
                ];


console.log("Tuka sym")

  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};




server.listen(Port, () => console.log(`Listening on port ${Port}`))



