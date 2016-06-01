/**
 * Created by alberto on 21/3/16.
 */

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
//methodOverride  = require("method-override"),
    path            = require('path'),
    http            = require('http'),
    mongoose        = require('mongoose'),
    socketio        = require('socket.io');

// Connection to DB with mongoose
mongoose.connect('mongodb://localhost/example', function(err, res) {
    if(err) throw err;
    console.log('connected to database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(methodOverride());

// Import Models and controllers
var userModel  = require('./models/userModel')(mongoose);
var userCtrl = require('./controllers/userCtrl');

app.use(express.static(path.resolve(__dirname, 'view')));

// API routes/views!
var apiRest = express.Router();

apiRest.route('/users')
    .get(userCtrl.findAll)
    .post(userCtrl.addUser);

apiRest.route('/user/:id')
    .get(userCtrl.findById)
    .put(userCtrl.updateUser)
    .delete(userCtrl.deleteUser);

app.use('/api', apiRest);

// Start server
var env = "dev";
var IP;

switch (env){
    case "dev":
        IP = "localhost";
        break;
    case "pro":
        IP = "0.0.0.0";
        break;
}
var server = http.createServer(app);
server.listen(process.env.PORT || 80, process.env.IP || IP, function() {
    var addr = server.address();
    console.log("server listening at", addr.address + ":" + addr.port);
});


//Example received and send data with socket.io
var io = socketio.listen(server);
var socketExample = require('./sockets/socketExample')(io);