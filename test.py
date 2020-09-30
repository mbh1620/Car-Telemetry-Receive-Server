from csv import writer
import random 
import time
import datetime

while(True):

	f =  open("data.csv", "a")
	csv_writer = writer(f)
	num1 = random.randrange(50,120)
	num2 = random.randrange(50,120)
	num3 = random.randrange(50,120)
	num4 = str(datetime.datetime.now().time()).split('.')[0]
	csv_writer.writerow([num1,num2,num3,num4])
	
	f.close()
	time.sleep(0.05)
	

