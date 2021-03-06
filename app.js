var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*
 *  - inne kolory graczy
 *  - naprawić cofkę
 *  - ugryzienie w ogon
 *  - punktacja na bierząco
 */

const SCALE = 15;
const GAMESIZE = 675;

app.get('/', function(req, res){
  res.sendFile( __dirname + '/web/index.html' );
});

app.get('/snake.js', function(req, res){
  res.sendFile( __dirname + '/web/snake.js' );
});

app.get('/notify.js', function(req, res){
  res.sendFile( __dirname + '/web/notify.js' );
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
        socket.broadcast.emit('new_player', playerName);
    });

    socket.on('snake_move', function(position){
        socket.broadcast.emit( 'oponent_position',
            {
                playerName: playerName,
                position: position,
                playerPoints: playerPoints
            }
        );
    });

    socket.on('destroy_food', function(){
        console.log('generating new food: ');
        playerPoints++;
        io.emit('food_new_position', getRandPosition());
        console.log(playerName + ' scored, now ' + playerPoints)
    });

    socket.on('snake_die', function(){
        playerPoints = 0;
    });

    socket.on('disconnect', function(){
        // @TODO: if there are more players with the same name,
        // disconnect only one of them
        io.emit('player_disconnected', playerName);
        console.log(playerName + ' disconnected.');
    });

});

http.listen(80, function(){
  console.log('listening on *:80');
});

function getRandPosition(){
    return [
        Math.floor( Math.random() * GAMESIZE/SCALE ) * SCALE,
        Math.floor( Math.random() * GAMESIZE/SCALE ) * SCALE
    ];
}
