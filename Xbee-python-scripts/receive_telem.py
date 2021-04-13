from digi.xbee.devices import XBeeDevice
import time
 

device = XBeeDevice("/dev/cu.SLAB_USBtoUART4", 115200)

device.open()

def my_data_received_callback(xbee_message):
	address = xbee_message.remote_device.get_64bit_addr()
	data = xbee_message.data.decode("utf8")
	print("Received data frim %s: %s" % (address, data))

device.add_data_received_callback(my_data_received_callback)

while True:
	time.sleep(0.01)
	