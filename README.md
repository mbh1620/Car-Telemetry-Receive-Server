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
git clone 
```
Then cd into the repository
```
cd 
```
Then do node or nodejs app.js
```
node app.js
``` 
