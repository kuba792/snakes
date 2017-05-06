var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const SCALE = 15;
const GAMESIZE = 700;

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
    var playerPoints = 0;
    
    socket.on('myName', function(name){
        playerName = name;
        console.log(playerName + ' connected..');
        console.log('generating new food: ');
        io.emit('food_new_position', getRandPosition());
        socket.broadcast.emit('new_player',
            {
                playerName: playerName
            }
        );
    });

    socket.on('snake_move', function(position){
        socket.broadcast.emit( 'oponent_position',
            {
                playerName: playerName,
                position: position
            }
        );
    });

    socket.on('destroy_food', function(){
        console.log('generating new food: ');
        io.emit('food_new_position', getRandPosition());
    });

    socket.on('disconnect', function(){
        console.log(playerName + ' disconnected.');
    });

});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

function getRandPosition(){
    return [
        Math.floor( Math.random() * GAMESIZE/SCALE ) * SCALE,
        Math.floor( Math.random() * GAMESIZE/SCALE ) * SCALE
    ];
}