from csv import writer
import random 
import time
import datetime
import math
import sys

cwd = ""

if len(sys.argv) == 2:
	cwd = sys.argv[1]
	print(cwd)

print("Testing Script started successfully")
x = 0
y = 0
z = 0
while(True):
	num = [None] * 120
	x = x + 0.1
	y += 1
	
	
	num[0] = random.randrange(50,120)
	num[1] = random.randrange(50,120)
	num[2] = math.sin(x)
	
	num[3] = str(datetime.datetime.now().time()).split('.')[0] + "." + str(datetime.datetime.now().time()).split('.')[1][0:3]
	
	#Simulate the position of the car to test the map view

	coordinates = [ [ -1.015307, 52.078795 ], [ -1.01262, 52.078936 ], [ -1.012135, 52.078918 ], [ -1.011762, 52.078842 ], [ -1.011519, 52.078743 ], [ -1.011229, 52.078536 ], [ -1.011046, 52.0783 ], [ -1.010898, 52.078003 ], [ -1.01069, 52.077499 ], [ -1.010477, 52.077004 ], [ -1.010353, 52.076457 ], [ -1.0103, 52.076113 ], [ -1.010229, 52.075279 ], [ -1.010199, 52.074567 ], [ -1.010152, 52.074289 ], [ -1.00998, 52.074029 ], [ -1.009655, 52.073666 ], [ -1.009518, 52.073459 ], [ -1.009524, 52.073303 ], [ -1.009584, 52.07312 ], [ -1.010045, 52.07237 ], [ -1.010075, 52.072068 ], [ -1.010004, 52.071852 ], [ -1.009838, 52.071668 ], [ -1.009382, 52.071277 ], [ -1.009276, 52.071097 ], [ -1.009264, 52.070885 ], [ -1.009341, 52.070692 ], [ -1.009619, 52.07048 ], [ -1.009974, 52.070324 ], [ -1.01046, 52.07015 ], [ -1.010838, 52.070013 ], [ -1.011105, 52.069853 ], [ -1.011412, 52.069537 ], [ -1.012016, 52.06884 ], [ -1.015337, 52.065083 ], [ -1.016426, 52.064041 ], [ -1.016734, 52.063786 ], [ -1.016982, 52.06365 ], [ -1.017272, 52.06356 ], [ -1.017574, 52.063513 ], [ -1.017852, 52.063527 ], [ -1.01816, 52.06357 ], [ -1.01842, 52.06364 ], [ -1.018651, 52.063753 ], [ -1.018847, 52.063933 ], [ -1.018906, 52.064003 ], [ -1.019202, 52.064399 ], [ -1.019533, 52.064753 ], [ -1.019888, 52.065045 ], [ -1.020131, 52.065224 ], [ -1.020403, 52.065408 ], [ -1.020883, 52.06571 ], [ -1.021954, 52.066497 ], [ -1.022061, 52.066539 ], [ -1.022209, 52.066549 ], [ -1.022356, 52.066506 ], [ -1.022806, 52.066256 ], [ -1.02296, 52.066223 ], [ -1.023114, 52.066233 ], [ -1.023244, 52.066266 ], [ -1.023428, 52.066374 ], [ -1.023623, 52.066497 ], [ -1.023866, 52.066695 ], [ -1.024043, 52.066907 ], [ -1.024168, 52.067124 ], [ -1.024274, 52.067369 ], [ -1.024286, 52.067468 ], [ -1.024256, 52.067567 ], [ -1.024168, 52.067661 ], [ -1.023955, 52.067869 ], [ -1.020687, 52.070489 ], [ -1.019953, 52.071069 ], [ -1.0198, 52.071178 ], [ -1.019533, 52.071286 ], [ -1.019214, 52.071333 ], [ -1.018953, 52.071338 ], [ -1.018592, 52.071319 ], [ -1.017586, 52.071225 ], [ -1.017254, 52.071201 ], [ -1.016911, 52.071192 ], [ -1.01652, 52.071225 ], [ -1.016165, 52.071281 ], [ -1.015846, 52.07139 ], [ -1.013762, 52.072408 ], [ -1.013626, 52.072464 ], [ -1.01346, 52.072516 ], [ -1.013289, 52.072526 ], [ -1.013159, 52.072497 ], [ -1.01304, 52.072431 ], [ -1.012969, 52.072356 ], [ -1.012614, 52.071592 ], [ -1.012507, 52.071484 ], [ -1.01236, 52.071418 ], [ -1.012188, 52.071413 ], [ -1.011998, 52.071465 ], [ -1.01188, 52.071559 ], [ -1.011803, 52.071658 ], [ -1.011655, 52.071908 ], [ -1.011537, 52.07212 ], [ -1.011448, 52.072328 ], [ -1.011401, 52.07253 ], [ -1.011371, 52.072743 ], [ -1.011395, 52.072964 ], [ -1.011466, 52.073063 ], [ -1.011649, 52.07319 ], [ -1.018403, 52.07698 ], [ -1.018586, 52.077051 ], [ -1.018841, 52.077131 ], [ -1.019154, 52.077159 ], [ -1.01948, 52.077136 ], [ -1.019811, 52.077037 ], [ -1.01993, 52.076947 ], [ -1.020013, 52.076815 ], [ -1.020149, 52.076127 ], [ -1.020226, 52.075986 ], [ -1.020391, 52.075872 ], [ -1.02064, 52.075797 ], [ -1.020912, 52.075773 ], [ -1.021214, 52.075821 ], [ -1.021427, 52.07591 ], [ -1.021557, 52.076014 ], [ -1.021658, 52.076136 ], [ -1.021676, 52.076268 ], [ -1.021634, 52.07641 ], [ -1.021469, 52.076641 ], [ -1.020599, 52.077701 ], [ -1.02032, 52.077904 ], [ -1.020048, 52.078074 ], [ -1.019657, 52.078281 ], [ -1.019338, 52.078418 ], [ -1.018935, 52.078522 ], [ -1.018586, 52.078592 ], [ -1.017846, 52.078649 ], [ -1.015349, 52.07879 ] ]

	if y % 10 == 0:
		#Increment z by 1
		z += 1

	if z >= len(coordinates):
		z = 0
	
	num[4] = coordinates[z][0]
	num[5] = coordinates[z][1]
	num[6] = num[3]

	for i in range(7,21):
		num[i] = random.randrange(1,50)

	num[21] = num[3]

	'''
	Inverter data

	RIGHT side

	0 - modeOfOperation
	1 - powerModuleError
	2 -	systemError2
	3 -	systemError1
	4 - systemWarning
	5 - status
	6 - maxAvailableTorque
	7 - refTorque
	8 - absolutePhaseCurrent
	9 - linkVoltageDC
	10 - currentIq
	11 - speedRPM
	12 - theta 
	13 - currentId
	14 - mechanicalPower
	15 - motorTemp1
	16 - motorTemp2
	17 - PCBTemp
	18 - DCBTemp1
	19 - DCBTemp2
	20 - DCBTemp3
	21 - heatSinkTemp
	22 - hallSector

	LEFT side

	23 - modeOfOperation
	24 - powerModuleError
	25 - systemError2
	26 - systemError1
	27 - systemWarning
	28 - status
	29 - maxAvailableTorque
	30 - refTorque
	31 - absolutePhaseCurrent
	32 - linkVoltageDC
	33 - currentIq
	34 - speedRPM
	35 - theta 
	36 - currentId
	37 - mechanicalPower
	38 - motorTemp1
	39 - motorTemp2
	40 - PCBTemp
	41 - DCBTemp1
	42 - DCBTemp2
	43 - DCBTemp3
	44 - heatSinkTemp
	45 - hallSector

	46 - Timestamp

	'''
	for i in range(22,68):
		num[i] = random.randrange(1,50)

	num[68] = num[3]

	'''
	Brick 1
	0 - brickVoltageAvg[0]
	1 - brickVoltageRange[0]
	2 - brickTempAvg[0]
	3 - brickTempRange[0]
	Brick 2
	4 - brickVoltageAvg[1]
	5 - brickVoltageRange[1]
	6 - brickTempAvg[1]
	7 - brickTempRange[1]
	Brick 3
	8 - brickVoltageAvg[2]
	9 - brickVoltageRange[2]
	10 - brickTempAvg[2]
	11 - brickTempRange[2]
	Brick 4
	12 - brickVoltageAvg[3]
	13 - brickVoltageRange[3]
	14 - brickTempAvg[3]
	15 - brickTempRange[3]
	Brick 5
	16 - brickVoltageAvg[4]
	17 - brickVoltageRange[4]
	18 - brickTempAvg[4]
	19 - brickTempRange[4]
	Brick 6
	20 - brickVoltageAvg[5]
	21 - brickVoltageRange[5]
	22 - brickTempAvg[5]
	23 - brickTempRange[5]
	Brick 7
	24 - brickVoltageAvg[6]
	25 - brickVoltageRange[6]
	26 - brickTempAvg[6]
	27 - brickTempRange[6]
	Brick 8
	28 - brickVoltageAvg[7]
	29 - brickVoltageRange[7]
	30 - brickTempAvg[7]
	31 - brickTempRange[7]

	32 - status(ignore)
	33 - accumulatorCurrent
	34 - warning(ignore)

	35 - timestamp

	'''
	for i in range(69,114):
		num[i] = random.randrange(45,50)

	num[114] = num[3]

	f =  open("./public/data.csv", "a")
	
	csv_writer = writer(f)

	csv_writer.writerow(num)
	f.close()

	sys.stdout.flush()

	time.sleep(0.05) #This is the fastest I can run the base station
	#time.sleep(0.25) #The Canbus test program delays by this much in each cycle



