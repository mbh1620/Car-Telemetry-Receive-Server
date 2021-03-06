from tkinter import Tk, Label, Button, Entry, Frame, BOTH, LEFT, RIGHT, Text, END, TOP
import socketio
from matplotlib.backends.backend_tkagg import (
    FigureCanvasTkAgg, NavigationToolbar2Tk)
from matplotlib.backend_bases import key_press_handler
from matplotlib.figure import Figure
import matplotlib.dates as dates
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np
from datetime import datetime


sio = socketio.Client()

@sio.event
def connect():
    print('Connection Established')

@sio.event
def disconnect():
    print('Disconnected from Server')

@sio.on("new-data")
def on_new_data(data):
    print("new data received")
    print(data)
    my_gui.data_view.insert(END, f"{data} \n")
    my_gui.x_data.append(dates.date2num(datetime.strptime(data['data'][3],'%H:%M:%S')))
    my_gui.y_data.append(data['data'][2])
    my_gui.plot_update()


class MyFirstGUI:
    def __init__(self, master):



        self.x_data = []
        self.y_data = []

        self.fig=Figure(figsize=(5,4), dpi=100)
        t = np.arange(0, 3, .01)
        self.ax1 = self.fig.add_subplot(111) 
        self.line1, = self.ax1.plot(t, 2 * np.sin(2 * np.pi * t))

        self.anim = None

        self.canvas = FigureCanvasTkAgg(self.fig, master=master)  # A tk.DrawingArea.
        #self.canvas.draw()
        self.canvas.get_tk_widget().pack(side=TOP, fill=BOTH, expand=1)


        self.master = master
        master.title("Telemetry Data Viewer")

        self.geometry = master.geometry("1500x1000")

        self.label = Label(master, text="Telemetry")
        self.label.pack()

        self.frame1 = Frame(master)
        self.frame1.pack(fill=BOTH, expand=True)

        self.connect_button = Button(self.frame1, text="Connect", command=self.connect)
        self.connect_button.pack(side=LEFT)

        self.label3 = Label(self.frame1, text="Enter Server Port Number")
        self.label3.pack(side=LEFT)

        self.port_entry = Entry(self.frame1)
        self.port_entry.pack(side=LEFT)
        
        self.label2 = Label(self.frame1, text="Enter Server Ip")
        self.label2.pack(side=LEFT)

        self.connection_status = Label(self.frame1, text="Not Connected", fg="red")
        self.connection_status.pack(side=LEFT)

        self.ip_entry = Entry(self.frame1)
        self.ip_entry.pack(side=LEFT)

        self.data_view = Text(self.frame1, height=50, width=100)
        self.data_view.pack()

        self.close_button = Button(master, text="Close", command=master.quit)
        self.close_button.pack()

    def connect(self):      #Connect to the socket server 
        ip = self.ip_entry.get()
        port = self.port_entry.get()
        print(f"Connecting to server @{ip}:{port}")
        address = 'http://'+ip+":"+port
        print(address)
        sio.connect(address)
        self.connection_status.config(fg="green")
        self.connection_status.config(text=f"Connected to server@{ip}:{port}")
        self.connect_button.config(text="Disconnect", command=self.disconnect)
        self.data_view.insert(END, f"Connected to Node Server@{ip}:{port}\n")

    def disconnect(self):
        sio.disconnect()
        self.connect_button.config(text="Connect", command=self.connect)
        self.connection_status.config(fg="red", text="Not Connected")
        self.data_view.insert(END, f"Disconnected from server\n")

    def plot_update(self):
        #Functions for updating the matplotlib graphs
        
        self.line1.set_ydata(self.y_data)
        self.line1.set_xdata(self.x_data)
        self.fig.canvas.draw()


        

root = Tk()
my_gui = MyFirstGUI(root)
root.mainloop()
