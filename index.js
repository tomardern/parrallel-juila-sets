//npm install socket.io --msvs_version=2012 to install
var app = require('http').createServer();
var io = require('socket.io').listen(app, { log: false });
var fs = require('fs');

app.listen(8080);



counter = 0;
connections = [];
requester = {};


/* --------------------------------------------------
When a user connects to the socket.io
-----------------------------------------------------*/
io.sockets.on('connection', function (socket) {



  /* ----------------------------
  On Register
  ----------------------------*/
  socket.on('register', function (status, fn) {
      register(status,fn,this);
  });



  register = function(status,fn,socket) {

    //If we are registering
    if (status) {
      socket.number = "c" + counter++;
      connections.push(socket.number);

      console.log(socket.number + " Registered. " + connections.length + " connected");
    }

    //If we are disabling
    else if (socket.number.length) {
      connections.splice(connections.indexOf(socket.number),1);
      console.log(socket.number + " Unregistered. " + connections.length + " connected");
      socket.number = "";
    }

    //Do the required callback
    if (typeof fn == "function"){
      fn(socket.number);
    }

    //Tell the number of users how many are connected
    io.sockets.emit('connections', { total: connections.length });
  }


  /* ----------------------------
  On disconnect
  ----------------------------*/
  socket.on("disconnect", function(){
    register(false,null,this);
  });


  /* ----------------------------
  On Request to compute
  ----------------------------*/
  socket.on("request", function(data){
    requester = this;

    //TODO, calculate required start/end points

    //Now we need to sort out who gets what
    payload = {size: data.size, connections: {}, total: connections.length};
    for(i=0;i<connections.length;i++){
      payload.connections[connections[i]] = i;
    }


    //Send to all other sockets
    io.sockets.emit('compute', payload);

  });

  /* ----------------------------
  On data response
  ----------------------------*/
  socket.on("response", function(data){

    requester.emit("results", data);

  });







});