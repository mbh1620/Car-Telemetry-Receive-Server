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
	num4 = str(datetime.datetime.now().time()).split('.')[0]
	csv_writer.writerow([num1,num2,num3,num4])
	
	f.close()
	time.sleep(0.05)
	

