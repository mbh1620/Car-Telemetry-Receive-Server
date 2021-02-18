# Receive Side Telemetry Server 


This is the repository which contains the code for the Node.js server to display the telemetrics received from the race car. This will be ran
on a Raspberry Pi. This Raspberry Pi will also run a script to receive data from a RF module which updates a .csv file. 

![photo1](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/NodeServer/public/flowdiagram.png)

The Node.js server then watches the .csv file to look for updates. When there is an update the server then sends out the updated data to any connected
clients using socket.io and updates their graphs to the latest data.

![photo2](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/NodeServer/public/Screenshot%202021-02-15%20at%2016.21.47.png)


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

# Desktop Application

![desktopgif](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/NodeServer/public/desktopgif.gif)

To install the Desktop Application go to releases and download 'TelemetryDesktopViewer.jar'. Move to desktop and right click and open. To allow data to be seen on graphs make sure that the server is running on the Raspberry pi. 

# IOS Application

To install the IOS application, you will only be able to do this on an apple computer with Xcode. Install the 'TelemetryApp' folder, and open the xcode project. You then might have to change the developer signings. You can then plug in the Ipad using lighting cable and then configure the settings at the top to use the Ipad that is plugged in. 

# Data

The table below shows what data will be shown on the graphs.



|   Sensors                     |   datatype    |   graph added  |
|-------------------------------|---------------|----------------|
|   accelerator pedal           |     int16     |<ul><li>   - [x] </li></ul>|
|   front brake pedal           |               |<ul><li>   - [ ] </li></ul>|       
|   rear brake pedal            |               |<ul><li>   - [ ] </li></ul>|
|   steering                    |               |<ul><li>   - [ ] </li></ul>|       
|                               |               |<ul><li>   - [ ] </li></ul>|       
|   left torque demand          |               |<ul><li>   - [ ] </li></ul>|       
|   right torque demand         |               |<ul><li>   - [ ] </li></ul>|
|   accelerometer x             |               |<ul><li>   - [ ] </li></ul>|
|   accelerometer y             |               |<ul><li>   - [ ] </li></ul>|
|   accelerometer z             |               |<ul><li>   - [ ] </li></ul>|
|                               |               |<ul><li>   - [ ] </li></ul>|
|   gyro yaw                    |               |<ul><li>   - [ ] </li></ul>|
|   gyro pitch                  |               |<ul><li>   - [ ] </li></ul>|
|   gyro roll                   |               |<ul><li>   - [ ] </li></ul>|
|                               |               |<ul><li>   - [ ] </li></ul>|
|   ECU state                   |               |<ul><li>   - [ ] </li></ul>|
|   vehicle dynamics duration   |               |<ul><li>   - [ ] </li></ul>|
|   fault code                  |               |<ul><li>   - [ ] </li></ul>|
|                               |               |                           |   
| Acumulator Management System  |    datatype   |       graph added         |
|-------------------------------|---------------|---------------------------|
|   Brick Average Voltage       |               |                           |        
|   Brick Voltage Range         |               |                           |
|   Brick Average Temperature   |               |                           |
|   Brick Temperature Range     |               |                           |
|   Accumulator Current         |               |                           |
|                               |               |                           |
|   Inverter Data               |     datatype  |       graph added         |
|-------------------------------|---------------|---------------------------|
|   mode of operation           |
|   power module error          |
|   system error 2              |
|   system error 1              |
|   system warning              |
|   status                      |
|   max available torque        |
|   ref torque                  |
|   Absolute Phase Current      |
|   Link Voltage DC             |
|   Current Iq                  |
|   Speed RPM                   |
|   Theta                       |
|   Current Id                  |
|   Mechanical Power            |
|   Motor Temp 1                |
|   Motor Temp 2                |
|   PCB Temp                    |
|   DCB Temp 1                  |
|   DCB Temp 2                  |
|   DCB Temp 3                  |
|   Heat Sink Temp              |
|   Hall Sector                 |


# Desktop Application

To install the Desktop Application go to releases and download 'Telemetry.app'. Move to desktop and right click and open.



