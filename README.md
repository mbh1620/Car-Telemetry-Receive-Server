# Receive Side Telemetry Server 
[![Node.js CI](https://github.com/mbh1620/Car-Telemetry-Receive-Server/actions/workflows/test.yml/badge.svg)](https://github.com/mbh1620/Car-Telemetry-Receive-Server/actions/workflows/test.yml)

![first](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/NodeServer/public/ECUData.jpeg)

This is the repository which contains the code for the Node.js server to display the telemetrics received from the race car. This will be ran
on a Raspberry Pi. This Raspberry Pi will also run a script to receive data from a RF module which updates a .csv file. 

![photo1](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/NodeServer/public/flowdiagram.png)

The Node.js server then watches the .csv file to look for updates. When there is an update the server then sends out the updated data to any connected
clients using socket.io and updates their graphs to the latest data.

![photo2](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/NodeServer/public/Screenshot%202021-02-15%20at%2016.21.47.png)


The test.py file is used to create random data and save to the data.csv file for testing the server against some randomly continuously updating 
data.

# Update: DB and Historical Data viewing

![photo3](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/NodeServer/public/track.png)

Data Can be uploaded to a db and then loaded back in to be viewed.

## Things to add:

- A data scroller to show where the car was at a certain point in time.
- A scroller for the graphs

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

The data is sorted into the same order as the CANbus code sections:

- [AMS data structure](./dataStructure/AMS_data.md)
- CNTRL
- ECU
- [INV](./dataStructure/INV_data.md)
- KIST



