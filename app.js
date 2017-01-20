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
    var playerName = 'unknown';
    console.log('user connected..');

    socket.on('myName', function(name){
        playerName = name;
    })

    socket.on('snake_move', function(position){
        console.log({
                playerName: playerName,
                position: position
            });
        socket.broadcast.emit( 'oponent_position',
            {
                playerName: playerName,
                position: position
            }
        );
    });

    socket.on('disconnect', function(){
        console.log('user disconnected.');
    });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});