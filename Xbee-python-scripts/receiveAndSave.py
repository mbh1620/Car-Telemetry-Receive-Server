#Receive data and save into csv files

from digi.xbee.devices import XBeeDevice
import time
from csv import writer
import datetime
import sys

#Order of files and variables

#AMS - Accumulator
#CTRL - Ignore
#ECU
#INV
#KIST - Ignore and supply with own data

#Setup xbee config

device = XBeeDevice("/dev/cu.SLAB_USBtoUART", 115200)

device.open()

#Add callback for when xbee receives data transmission

def my_data_received_callback(xbee_message):
	address = xbee_message.remote_device.get_64bit_addr()
	data = xbee_message.data.decode("utf8")

	#Split message up using the ',' delimiter

	print("Received data frim %s: %s" % (address, data))

	time = str(datetime.datetime.now().time()).split('.')[0] + "." + str(datetime.datetime.now().time()).split('.')[1][0:3]

	message = data.split(",")
	

	#Save files based on a range of the data so [0]-[35] is AMS etc...

	print(message)

	#Data handling for AMS

	AMS_File = open("./public/AMS_Data.csv", "a")
	AMS_CSV_Writer = writer(AMS_File)
	AMS_array = message[0:34]
	AMS_array.append(time)
	AMS_CSV_Writer.writerow([i for i in AMS_array])
	AMS_File.close()

	#Data handling for ECU

	ECU_File = open("./public/ECU_Data.csv", "a")
	ECU_CSV_Writer = writer(ECU_File)
	ECU_array = message[35:49]
	ECU_array.append(time)
	ECU_CSV_Writer.writerow([i for i in ECU_array])
	ECU_File.close()

	#Data handling for INV

	INV_File = open("./public/INV_Data.csv", "a")
	INV_CSV_Writer = writer(INV_File)
	INV_array = message[50:96]
	INV_array.append(time)
	INV_CSV_Writer.writerow([i for i in INV_array])
	INV_File.close()

	#Data handling for positional data

	# POS_File = open("./public/POS_Data.csv", "a")

device.add_data_received_callback(my_data_received_callback)


while(True):
	time.sleep(0.01)
