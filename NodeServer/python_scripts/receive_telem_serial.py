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

BAUD_RATE = 9600
COM_PORT = '/dev/ttyUSB0'


ser = serial.Serial(COM_PORT, BAUD_RATE, timeout=0)

printing(f'connecting to Xbee at {COM_PORT} with {BAUD_RATE} baud rate')


while True:
	msg = ser.read(100)
	#print(ser.read(100)) #amount of bytes to read up to 256
	time = str(datetime.datetime.now().time()).split('.')[0] + "." + str(datetime.datetime.now().time()).split('.')[1][0:3]

	message = msg.split(",")

	#Now save data into the files based on the ranges shown in the table above
    #AMS Data being saved into the AMS_Data.csv file
    AMS_File = open("../public/AMS_Data.csv", "a")
    AMS_CSV_Writer = writer(AMS_File)
    AMS_array = message[0:34]
    AMS_array.append(time) #Append the time stamp to the end of the array
    AMS_CSV_Writer.writerow([i for i in AMS_array])
    AMS_File.close()

    #ECU Data being saved into the ECU_Data.csv file
    ECU_File = open("../public/ECU_Data.csv", "a")
    ECU_CSV_Writer = writer(ECU_File)
    ECU_array = message[35:49]
    ECU_array.append(time)
    ECU_CSV_Writer.writerow([i for i in ECU_array])
    ECU_File.close()

    #INV data being saved into the INV_Data.csv file

    INV_File = open("../public/INV_Data.csv", "a")
    INV_CSV_Writer = writer(INV_File)
    INV_array = message[50:96]
    INV_array.append(time)
    INV_CSV_Writer.writerow([i for i in INV_array])
    INV_File.close()

    #Need to add the POS and PRI data saving here!
