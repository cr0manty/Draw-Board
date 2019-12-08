module.exports = function (server) {
    const io = require("socket.io")(server);

    io.sockets.on('connection', function (socket) {
    });
};
