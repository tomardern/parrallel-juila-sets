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

      //Now store the socket in an array
      connections.push({
        num: socket.number,
        socket: socket
      });

      console.log(socket.number + " Registered. " + connections.length + " connected");
    }

    //If we are disabling, we need to remove the socket
    else if (socket.number.length) {

      //Remove the one from the array
      newConnections = [];
      for(i=0; i < connections.length; i++){
        if (connections[i].num != socket.number){
          newConnections.push(connections[i]);
        }
      }
      connections = newConnections;

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
    //So first, lets figure out start/end points
    console.log("-------------------------------");

    //Loop though all the connections
    for(i=0;i < connections.length; i++){
      //Size for each connected device
      each = ((data.size * data.size) / connections.length);

      //Starting point for this socket
      start = parseInt(i * each);
      end = parseInt(start + each);

      //Send to the socket required
      connections[i].socket.emit('compute',{
        size: data.size,
        start: start,
        end: end
      });


    }





  });

  /* ----------------------------
  On data response
  ----------------------------*/
  socket.on("response", function(data){

    requester.emit("results", data);

  });







});