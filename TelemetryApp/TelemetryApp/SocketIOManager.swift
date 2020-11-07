//
//  SocketIOManager.swift
//  TelemetryApp
//
//  Created by Matt Haywood on 14/10/2020.
//  Copyright © 2020 Matt Haywood. All rights reserved.
//

import SocketIO

class SocketIOManager: NSObject {
    static let sharedInstance = SocketIOManager()
    var socket = SocketIOClient(socketURL: URL(string: "https://192.168.0.4:8080"), config: SocketIOClientConfiguration.init(arrayLiteral: .log(true), .forcePolling(true)))

    override init() {
        super.init()

        socket.on("test") { dataArray, ack in
            print(dataArray)
        }

    }

    func establishConnection() {
        socket.connect()
    }

    func closeConnection() {
        socket.disconnect()
    }
}
