//npm install socket.io --msvs_version=2012 to install
var app = require('http').createServer();
var io = require('socket.io').listen(app, { log: false });
var fs = require('fs');

app.listen(8080);



counter = 1;
connections = [];
initiator = {};
started = 0;
recieved = 0;

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
    initiator = this;

    //TODO, calculate required start/end points
    //So first, lets figure out start/end points

    started = new Date().getTime();

    //Loop though all the connections
    for(i=0;i < connections.length; i++){

      console.log(i);

      //Send to the socket required
      connections[i].socket.emit('compute',{
        size: data.size,
        start: 0, //Always start from 0 now
        end: data.size * data.size,
        client: i
      });


    }





  });

  /* ----------------------------
  On data response
  ----------------------------*/
  socket.on("response", function(data){
    initiator.emit("results", data);
    recieved++;


  });







});