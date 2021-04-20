
'''
-----------------------------------------------
|                                             |
|       RF Receive Data Python Script         |
|                                             |
-----------------------------------------------

Script used to connect to the XBee RF module to receive
incoming data and to save to separate csv files.

'''


from digi.xbee.devices import XBeeDevice
import time
from csv import writer
import datetime
import sys

baud_rate = 115200
COM_port = "/dev/ttyUSB0"

if len(sys.argv) != 0:
    baud_rate = sys.argv[1]
    COM_port = sys.argv[2]
    print(baud_rate)
    print(COM_port)


#Order of the CSV files and data variables

'''
AMS - AMS_Data.csv
ECU - ECU_Data.csv
INV - INV_Data.csv
POS - POS_Data.csv

data vars  | csv index ranges
̅̅̅‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾‾‾
AMS        |  [0] - [34]
ECU        |  [35] - [49]
INV        |  [50] - [96]
POS        |  [97] - 

'''

#XBee setup and config

print("connecting to Xbee device at")
print(COM_port)

device = XBeeDevice("/dev/ttyUSB0", 115200) #COM port and Baud rate

device.open() #Open connection with the Xbee

device.set_parameter("AP", 1)
print("Connected to the Xbee Successfully!")
#Add a callback for when the XBee receives data
def my_data_received_callback(xbee_message):
    address = xbee_message.remote_device.get_64bit_addr()
    data = xbee_message.data.decode('utf8')
    #add a timestamp which will be appended to each of the files
    time = str(datetime.datetime.now().time()).split('.')[0] + "." + str(datetime.datetime.now().time()).split('.')[1][0:3]
    #Split the data up using the ',' delimiter
    message = data.split(",")

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

#Add the callback to the device

device.add_data_received_callback(my_data_received_callback)

while True:
    time.sleep(0.01)






    
