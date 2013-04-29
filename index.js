//npm install socket.io --msvs_version=2012 to install
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app, { log: false });
var fs = require('fs');

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


counter = 0;
connections = [];

//When a user is connected
io.sockets.on('connection', function (socket) {

  socket.number = "c" + counter++;

  connections.push(socket.number);

  console.log(socket.number + " connected. Now " + connections.length + " are connected");


  socket.on("disconnect", function(){





    connections.splice(connections.indexOf(socket.number),1);


    console.log(socket.number + " disconnect. Total " + connections.length);


  });



 /*  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  }); */







});