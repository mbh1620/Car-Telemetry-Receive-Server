# Receive Side Telemetry Server 

This is the repository which contains the code for the Node.js server to display the telemetrics received from the race car. This will be ran
on a Raspberry Pi. This Raspberry Pi will also run a script to receive data from a RF module which also updates a .csv file. 

The Node.js server then watches the .csv file to look for updates. When there is an update the server then sends out the updated data to any connected
clients and updates their graphs to the latest data.