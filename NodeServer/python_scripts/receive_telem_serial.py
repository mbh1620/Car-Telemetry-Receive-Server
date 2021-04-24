'''
-----------------------------------------------
|                                             |
|       RF Receive Data in AT module          |
|                                             |
-----------------------------------------------

script is used to receive serial data when the two
xbee modules are in Transparent mode AP = 0

'''
import serial
import time
from csv import writer
import datetime
import sys
import io

BAUD_RATE = 115200
COM_PORT = '/dev/ttyUSB0'

if sys.argv != None:
    if len(sys.argv) > 0:
        BAUD_RATE = sys.argv[1]
        COM_PORT = sys.argv[2]

ser = serial.Serial(COM_PORT, BAUD_RATE, timeout=0.05)

sio = io.TextIOWrapper(io.BufferedRWPair(ser,ser))

print(f'connecting to the XBee at {COM_PORT} with {BAUD_RATE} baud rate')

sys.stdout.flush()

while True:

    msg = sio.readline() #Read a line at a time. Default EOL character is \n
    time = str(datetime.datetime.now().time()).split('.')[0] + "." + str(datetime.datetime.now().time()).split('.')[1][0:3]
    
    if msg != "":
        print(msg)
        message = msg.split(',')

        #Now save data into files based on the ranges
        #AMS data being saved into the AMS_Data.csv file

        AMS_File = open('/home/pi/Desktop/Telem/Car-Telemetry-Receive-Server/NodeServer/public/AMS_Data.csv', 'a')
        AMS_CSV_Writer = writer(AMS_File)
        AMS_array = message[0:34]
        AMS_array.append(time) #append the time stamp to the end of the array
        AMS_CSV_Writer.writerow([i for i in AMS_array])
        AMS_File.close()

        #ECU data being saved into the ECU_Data.csv file

        ECU_File = open('/home/pi/Desktop/Telem/Car-Telemetry-Receive-Server/NodeServer/public/ECU_Data.csv', 'a')
        ECU_CSV_Writer = writer(ECU_File)
        ECU_array = message[35:49]
        ECU_array.append(time)
        ECU_CSV_Writer.writerow([i for i in ECU_array])
        ECU_File.close()

        #INV data being saved into the INV_Data.csv file

        INV_File = open('/home/pi/Desktop/Telem/Car-Telemetry-Receive-Server/NodeServer/public/INV_Data.csv', 'a')
        INV_CSV_Writer = writer(INV_File)
        INV_array = message[50:96]
        INV_array.append(time)
        INV_CSV_Writer.writerow([i for i in INV_array])
        INV_File.close()

        #Need to add the POS and PRI data saving here
        sys.stdout.flush()



