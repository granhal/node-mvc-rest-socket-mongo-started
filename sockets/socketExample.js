/**
 * Created by alberto on 1/6/16.
 */

exports = module.exports = function(io) {
    io.on('connection', function(socket) {
        socket.on("receivedData", function(data){
            console.log(data);
        });
        socket.emit("sendData", {
            serverStatus: 'Server conected'
        });
    });
    console.log("socket example is loaded");
};