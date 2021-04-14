from digi.xbee.devices import XBeeDevice
from digi.xbee.devices import RemoteXBeeDevice
from digi.xbee.models.address import XBee64BitAddress
import random as random
from datetime import datetime
import time
import obd
from obd import OBDStatus

"""
This file will be used to get information from the Ford using the OBD cable and then transmit this data
over the Xbee radio link back to the base station, ready to be viewed.
"""
#Setup XBEE Devices

device = XBeeDevice("/dev/cu.SLAB_USBtoUART", 115200)

device.open()

remote_device = RemoteXBeeDevice(device, XBee64BitAddress.from_hex_string("0013A20041D65519"))

#Setup OBD

obd.logger.setLevel(obd.logging.DEBUG)

connection = obd.OBD()

cmd = obd.commands.SPEED # select an OBD command (sensor)
cmd2 = obd.commands.RPM # select an OBD command (sensor)
throttle = obd.commands.THROTTLE_POS
fuel = obd.commands.FUEL_STATUS

while True:
	now = datetime.now()
	response = connection.query(cmd) # send the command, and parse the response
	response2 = connection.query(cmd2) # send the command, and parse the response
	throttle_res = connection.query(throttle)
	fuel_res = connection.query(fuel)
	string_to_send = ""
	for i in range(0,35):
		string_to_send += "1,"

	string_to_send += str(response).split(" ")[0] + ","
	string_to_send += str(response2).split(" ")[0] + ","
	string_to_send += str(throttle_res).split(" ")[0] + ","
	string_to_send += str(response).split(" ")[0] + ","
	for i in range(40,96):
		string_to_send += "1,"

	print(string_to_send)
	message = now.strftime(string_to_send)
	time.sleep(0.01)
	device.send_data_async(remote_device, message)
	#device.send_data_broadcast(message)

device.close()