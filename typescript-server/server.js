var express = require("express");
var router = express.Router();
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/rotation", function (req, res) {
    var rotation = req.body.rotation; // Comes through as "0deg"
    io.emit("message", rotation);
    res.json("success");
});
var server = app.listen(3001, function () {
    return console.log("Listening on 3001");
});
var io = require("socket.io")(server, { cors: true });
var connected = true;
io.on("connection", function (socket) {
    console.log("user connected");
    // Let one client connect then disconnect all other sockets
    connected ? connected = false : socket.disconnect();
});
