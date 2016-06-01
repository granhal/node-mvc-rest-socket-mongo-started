/**
 * Created by alberto on 1/6/16.
 */

exports = module.exports = function(io) {
    io.on('connection', function(socket) {
        
        //received data to front-end clients
        socket.on("receivedData", function(data){
            console.log(data);
        });
        
        //send data to front-end side
        socket.emit("sendData", {
            serverStatus: 'Server conected'
        });
    });
    
    console.log("socket example is loaded");
};