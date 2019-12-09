var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
let port = 3000;
app.set('view engine', 'ejs');

http.listen(port, function () {
    console.log('Server running on port ' + port);
});

app.get('/', function (req, res) {
    res.render('index');
});

io.on('connection', function (socket) {
    socket.on('draw', function (data) {
        socket.broadcast.emit('draw', data);
    });

    socket.on('change_radius', function (data) {
        socket.broadcast.emit('change_radius', data);
    });

    socket.on('change_brush_color', function (data) {
        socket.broadcast.emit('change_brush_color', data);
    });

    socket.on('join', function () {
        socket.broadcast.emit('join');
    });

    socket.on('clear', function () {
        socket.broadcast.emit('clear');
    });

     socket.on('mouse_up', function () {
        socket.broadcast.emit('mouse_up');
    });
});

