# Receive Side Telemetry Server 


This is the repository which contains the code for the Node.js server to display the telemetrics received from the race car. This will be ran
on a Raspberry Pi. This Raspberry Pi will also run a script to receive data from a RF module which updates a .csv file. 

![photo1](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/public/flowdiagram.png)

The Node.js server then watches the .csv file to look for updates. When there is an update the server then sends out the updated data to any connected
clients using socket.io and updates their graphs to the latest data.

![photo2](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/public/screen.gif)


The test.py file is used to create random data and save to the data.csv file for testing the server against some randomly continuously updating 
data.

# To Run

To run this server you must have nodejs installed on the Raspberry Pi you would like to run on.

[Click here to see how to install node.js](https://www.w3schools.com/nodejs/nodejs_raspberrypi.asp)

clone this repository into a directory 
```
git clone https://github.com/mbh1620/Car-Telemetry-Receive-Server.git
```
Then cd into the repository
```
cd ./Car-Telemetry-Receive-Server
```
Then do node or nodejs app.js
```
node app.js
```
Then open a browser and type "localhost:8080"

or if you are on another device to the Raspberry Pi you must connect to the same network as the pi 
and then type the raspberry pi's ip number followed by ":8080"

```
localhost:8080
```
or
```
[raspberrypi ip number]:8080

```

The python script which updates the .csv file must update the file which is in the /public directory.

# Data

The table below shows what data will be shown on the graphs


|   Sensors                     |   datatype    |   graph added  |
|-------------------------------|---------------|----------------|
|   accelerator pedal           |     int16     |<ul><li>- [x] </li></ul>|
|   front brake pedal           |               |<ul><li>- [ ] </li></ul>|       
|   rear brake pedal            |               |<ul><li>- [ ] </li></ul>|
|   steering                    |               |<ul><li>- [ ] </li></ul>|       
|                               |               |<ul><li>- [ ] </li></ul>|       
|   left torque demand          |               |<ul><li>- [ ] </li></ul>|       
|   right torque demand         |               |       
|   accelerometer x             |               |
|   accelerometer y             |               |
|   accelerometer z             |               |
|                               |               |
|   gyro yaw                    |               |
|   gyro pitch                  |               |
|   gyro roll                   |               |
|                               |               |
|   ECU state                   |               |
|   vehicle dynamics duration   |               |
|   fault code                  |               |