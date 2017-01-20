var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile( __dirname + '/web/index.html' );
});

app.get('/snake.js', function(req, res){
  res.sendFile( __dirname + '/web/snake.js' );
});

app.get('/game.js', function(req, res){
  res.sendFile( __dirname + '/web/game.js' );
});

io.on('connection', function(socket){
    console.log('user connected..');

    socket.on('snake_move', function(positions){
        console.log(positions);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected.');
    });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});