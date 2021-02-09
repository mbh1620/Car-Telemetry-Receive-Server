/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package telemetrydesktopviewer.basic;
import io.socket.client.SocketIOException;
import io.socket.client.IO;

import io.socket.client.Socket;
import io.socket.client.Ack;
import io.socket.client.On;
import io.socket.emitter.Emitter;
import java.net.URI;
import javafx.scene.control.Label;
import telemetrydesktopviewer.*;


/**
 *
 * @author Matt
 */
public class BasicExample{
    
    //TelemetryDesktopViewerFXMLController the_controller;
    private boolean isConnectedBool = false;
    
    public BasicExample(String url) throws Exception {
        
        
    }
    
    public boolean isConnected(){
        return isConnectedBool;
    }
}
