from csv import writer
import random 
import time
import datetime
import math


x = 0
while(True):
	x = x + 0.1
	f =  open("./public/data.csv", "a")
	
	csv_writer = writer(f)
	
	num1 = random.randrange(50,120)
	num2 = random.randrange(50,120)
	num3 = math.sin(x)
	
	num4 = str(datetime.datetime.now().time()).split('.')[0] + "." + str(datetime.datetime.now().time()).split('.')[1][0:3]
	print(num4)
	csv_writer.writerow([num1,num2,num3,num4])
	f.close()


	
	f1 = open("./public/ECU_data.csv", "a")
	csv_writer2 = writer(f1)
	num5 = random.randrange(50,120)
	num6 = random.randrange(50,120)
	num7 = math.tan(x)
	csv_writer2.writerow([num5,num6,num7,num4])
	f1.close()
	time.sleep(0.05)

