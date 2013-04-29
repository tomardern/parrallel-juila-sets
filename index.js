//npm install socket.io --msvs_version=2012 to install
var app = require('http').createServer();
var io = require('socket.io').listen(app, { log: false });
var fs = require('fs');

app.listen(8080);



counter = 0;
connections = [];

/* --------------------------------------------------
When a user connects to the socket.io
-----------------------------------------------------*/
io.sockets.on('connection', function (socket) {


  /* ----------------------------
  On Register
  ----------------------------*/
  socket.on('register', function (name, fn) {

    socket.number = "c" + counter++;
    connections.push(socket.number);

    console.log(socket.number + " connected. Now " + connections.length + " are connected");

    fn(socket.number);

    //Tell the number of users how many are connected
    io.sockets.emit('connections', { total: connections.length });

  });


  /* ----------------------------
  On disconnect
  ----------------------------*/
  socket.on("disconnect", function(){

    connections.splice(connections.indexOf(socket.number),1);
    console.log(socket.number + " disconnect. Total " + connections.length);

    //Tell the number of users how many are connected
    io.sockets.emit('connections', { total: connections.length });
  });


  /* ----------------------------
  On Request to compute
  ----------------------------*/
  requester = {};
  socket.on("request", function(data){
    requester = this;

    //Send to all other sockets
    io.sockets.emit('compute', data);

  });




 /*  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  }); */



});