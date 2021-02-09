/**
 * Sample Skeleton for 'TelemetryDesktopViewerFXML.fxml' Controller Class
 */



import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import static java.lang.Float.parseFloat;
import java.net.URI;
import java.net.URL;
import java.util.Date;
import java.util.ResourceBundle;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.XYChart;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.text.Text;
import javafx.scene.paint.Color;
import javafx.scene.web.WebView;
import java.text.SimpleDateFormat;

import telemetrydesktopviewer.basic.*;


public class TelemetryDesktopViewerFXMLController{
    
    BasicExample connection;
    public boolean isConnected = false;
    public Socket socket;
    XYChart.Series series;
    public int count = 0;
    

    @FXML // ResourceBundle that was given to the FXMLLoader
    private ResourceBundle resources;

    @FXML // URL location of the FXML file that was given to the FXMLLoader
    private URL location;

    @FXML // fx:id="host_port_input"
    private TextField host_port_input; // Value injected by FXMLLoader

    @FXML // fx:id="host_ip_input"
    private TextField host_ip_input; // Value injected by FXMLLoader

    @FXML // fx:id="connect_to_server_button"
    private Button connect_to_server_button; // Value injected by FXMLLoader
    
    @FXML // fx:id="status_label_server"
    private Label status_label_server; // Value injected by FXMLLoader
    
    @FXML // fx:id="speed_chart"
    private LineChart<?, ?> speed_chart; // Value injected by FXMLLoader
    
    @FXML // fx:id="mapView"
    private WebView mapView; // Value injected by FXMLLoader

    @FXML
    void on_connect_pressed(ActionEvent event) throws Exception {
        //On button pressed connect to the server using the Socket.io Client
        String url = host_ip_input.getText();
        String port = host_port_input.getText();
        
        if(!isConnected){
            //Connect
        String uri = "http://" + url + ":"+port;
        System.out.println(uri);
        connectSocket(uri);
        } else if (isConnected){
            //Disconnect
            socketDisconnect();
        }
        
        
        //If connection is successful then change label to connected
        
        
        //status_label_server.setTextFill(Color.GREEN);
    }
    
    void connectSocket(String url){
        URI uri = URI.create(url);
        IO.Options options = new IO.Options();
       
                
        socket = IO.socket(uri, options);
        socket.connect();
        
        
        socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {
            @Override
            public void call(Object... args){
                System.out.println(socket.id());
                System.out.println("connected to" + uri);
                Platform.runLater(new Runnable(){
                    @Override
                    public void run(){
                        status_label_server.setText("Successfully Connected");
                        status_label_server.setTextFill(Color.web("#00a82d", 1.0));
                        connect_to_server_button.setText("Disconnect");
                        isConnected = true;
                        
                    }
                });
//                status_label_server.setText("Successfully Connected");
            }
        });
        
        socket.on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {
            @Override
            public void call(Object... args){
                System.out.println("Disconnected");
                isConnected = false;
                Platform.runLater(new Runnable(){
                    @Override
                    public void run(){
                        status_label_server.setText("Not Connected");
                        connect_to_server_button.setText("Connect to Server");
                        status_label_server.setTextFill(Color.RED);
                        isConnected = false;
                        
                    }
                });
            }
        });
        
        socket.on("primary-data", new Emitter.Listener(){
            @Override
            public void call(Object... args){
                System.out.println("newData");
                System.out.println(args[0]);
                Platform.runLater(new Runnable(){
                    @Override
                    public void run(){
                        updateSpeedChart(args);
                    }
                });
            }
        });
    }
    
    void socketDisconnect(){
        socket.disconnect();
    }
    
    void updateSpeedChart(Object... args){
        System.out.println(args[0].toString());
        String data = args[0].toString();
        data = data.substring(9);
        String newdata[] = data.split(",");
        System.out.println(newdata[0]);
        final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH:mm:ss:ms");
        Date now = new Date();
        
        series.getData().add(new XYChart.Data(String.valueOf(count),parseFloat(newdata[0])));
        count += 1;
        if(count > 50){
             series.getData().remove(0);
        }
    }

    @FXML // This method is called by the FXMLLoader when initialization is complete
    void initialize() {
        assert host_port_input != null : "fx:id=\"host_port_input\" was not injected: check your FXML file 'TelemetryDesktopViewerFXML.fxml'.";
        assert host_ip_input != null : "fx:id=\"host_ip_input\" was not injected: check your FXML file 'TelemetryDesktopViewerFXML.fxml'.";
        assert connect_to_server_button != null : "fx:id=\"connect_to_server_button\" was not injected: check your FXML file 'TelemetryDesktopViewerFXML.fxml'.";
        
        assert status_label_server != null : "fx:id=\"status_label_server\" was not injected: check your FXML file 'TelemetryDesktopViewerFXML.fxml'.";
        assert speed_chart != null : "fx:id=\"speed_chart\" was not injected: check your FXML file 'TelemetryDesktopViewerFXML.fxml'.";
        assert mapView != null : "fx:id=\"mapView\" was not injected: check your FXML file 'TelemetryDesktopViewerFXML.fxml'.";
        
        series = new XYChart.Series<>();
        speed_chart.getData().add(series);
        
    }
}
