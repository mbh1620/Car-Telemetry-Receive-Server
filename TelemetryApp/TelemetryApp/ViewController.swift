//
//  ViewController.swift
//  TelemetryApp
//
//  Created by Matt Haywood on 14/10/2020.
//  Copyright © 2020 Matt Haywood. All rights reserved.
//

import UIKit
import SocketIO
import Charts

class ViewController: UIViewController, ChartViewDelegate {
    @IBOutlet weak var data_label: UILabel!
    @IBOutlet weak var LineChartView: BarLineChartViewBase!
    
    
    let manager = SocketManager(socketURL: URL(string:"http://localhost:8080")!,config: [.log(true), .compress])
    
    var socket:SocketIOClient!
    
    private func setSocketEvents() {
        self.socket.on("new-data") {data,ack in
            print(data);
        }
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.socket = manager.defaultSocket;
        self.setSocketEvents();
        self.socket.connect();
    }
}

