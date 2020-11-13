from tkinter import Tk, Label, Button, Entry, Frame, BOTH, LEFT, RIGHT, Text, END
import socketio


sio = socketio.Client()

@sio.event
def connect():
	print('Connection Established')

@sio.on("new-data")
def on_new_data(data):
	print("new data received")
	print(data)
	my_gui.data_view.insert(END, f"{data} \n")


class MyFirstGUI:
    def __init__(self, master):
        self.master = master
        master.title("Telemetry Data Viewer")

        self.geometry = master.geometry("1500x1000")

        self.label = Label(master, text="Telemetry")
        self.label.pack()

        self.frame1 = Frame(master)
        self.frame1.pack(fill=BOTH, expand=True)

        
        
        self.connect_button = Button(self.frame1, text="Connect", command=self.connect)
        self.connect_button.pack()

        self.label3 = Label(self.frame1, text="Enter Server Port Number")
        self.label3.pack(side=LEFT)

        self.port_entry = Entry(self.frame1)
       	self.port_entry.pack(side=LEFT)
      	
        self.label2 = Label(self.frame1, text="Enter Server Ip")
        self.label2.pack(side=LEFT)


        self.ip_entry = Entry(self.frame1)
        self.ip_entry.pack(side=LEFT)

        self.data_view = Text(self.frame1, height=50, width=100)
        self.data_view.pack()
        

        self.close_button = Button(master, text="Close", command=master.quit)
        self.close_button.pack()

    def greet(self):
        print("Greetings!")

    def connect(self):		#Connect to the socket server 
    	ip = self.ip_entry.get()
    	port = self.port_entry.get()
    	print(f"Connecting to server @{ip}:{port}")
    	sio.connect(f'http://localhost:8080')
    	

root = Tk()
my_gui = MyFirstGUI(root)
root.mainloop()
