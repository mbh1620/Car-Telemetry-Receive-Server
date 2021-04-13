from digi.xbee.devices import XBeeDevice
from digi.xbee.devices import RemoteXBeeDevice
from digi.xbee.models.address import XBee64BitAddress
import random as random
from datetime import datetime
import time

device = XBeeDevice("/dev/cu.SLAB_USBtoUART", 115200)

device.open()

remote_device = RemoteXBeeDevice(device, XBee64BitAddress.from_hex_string("0013A20041D65519"))


while True:
	now = datetime.now()
	message = now.strftime("%H:%M:%S")
	time.sleep(0.01)
	device.send_data_async(remote_device, message)
	# device.send_data_broadcast(message)

device.close()

