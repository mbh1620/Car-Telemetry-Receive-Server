# Receive Side Telemetry Server 

<object data="https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/public/flowdiagram.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/public/flowdiagram.pdf">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/public/flowdiagram.pdf">Download PDF</a>.</p>
    </embed>
</object>

![photo1](https://github.com/mbh1620/Car-Telemetry-Receive-Server/blob/master/public/frontimage.png)



This is the repository which contains the code for the Node.js server to display the telemetrics received from the race car. This will be ran
on a Raspberry Pi. This Raspberry Pi will also run a script to receive data from a RF module which updates a .csv file. 

The Node.js server then watches the .csv file to look for updates. When there is an update the server then sends out the updated data to any connected
clients using socket.io and updates their graphs to the latest data.

The test.py file is used to create random data and save to the data.csv file for testing the server against some randomly continuously updating 
data.
