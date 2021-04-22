from xbee import XBee
from serial import Serial


PORT = '/dev/ttyUSB0'
BAUD = 9600

ser = Serial(PORT, BAUD)

xbee = XBee(ser)

print(xbee.wait_read_frame())

ser.close()