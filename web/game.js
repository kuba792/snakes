const SCALE = 15;
const GAMESIZE = 675;

var socket = io();
var playerName = '';

var snake;
var oponent = [];

var messageTxt = '';

function setup(){
    playerName = prompt("What's your name?", "player");
    $.notify("Hello " + playerName, "success");
    socket.emit('myName', playerName);
    addToScoreBoard(playerName);
    createCanvas(GAMESIZE, GAMESIZE);
    snake = new Snake(255);
    food = new Food();
}

function draw(){
    background(51);

    snake.update();
    snake.show();  

    for (var player in oponent) {
        oponent[player].show();
    }

    food.show();
    if(snake.hitCorner()
    || snake.biteHisTail()){
        gameOver();
    }
    if(collision(snake, food)){
        snake.eat(food);
        setScoreTable(++snake.points, playerName);
    }
    frameRate(snake.speed);
}

socket.on('oponent_position', function(data){
    if(oponent[data.playerName] === undefined){
        oponent[data.playerName] = new Snake();
    }
    var newOponent = oponent[data.playerName];
    if(newOponent.points !== data.playerPoints){
        setScoreTable(data.playerPoints, data.playerName);
    }
    newOponent.importFromJSON(data.position, data.playerPoints);
});

socket.on('food_new_position', function(data){
    food.setPosition(data[0], data[1]);
});

socket.on('new_player', function(playerName){
    $.notify(playerName + " joined the game.", 'info');
    oponent[playerName] = new Snake();
});

// @TODO: if there are more players with the same name,
// disconnect only one of them
socket.on('player_disconnected', function(playerName){
    delete oponent[playerName];
    removeFromScoreBoard(playerName);
    $.notify(playerName + " left the game.", 'error');
});

function keyPressed(){
    switch(keyCode){
        case UP_ARROW:
        case 87: // W
            if(snake.moveDirection != 'down'){
                snake.dir(0,-1);
                snake.moveDirection = 'up';
            }
            break;
        case LEFT_ARROW:
        case 65: // A
            if(snake.moveDirection != 'right'){
                snake.dir(-1,0);
                snake.moveDirection = 'left';
            }
            break;
        case RIGHT_ARROW:
        case 68: // D
            if(snake.moveDirection != 'left'){
                snake.dir(1,0);
                snake.moveDirection = 'right';
            }
            break;
        case DOWN_ARROW:
        case 83: // S
            if(snake.moveDirection != 'up'){
                snake.dir(0,1);
                snake.moveDirection = 'down';
            }
            break;
    }
}

function collision(object1, object2){
    distance = dist(object1.x, object1.y, object2.x, object2.y);
    return distance < SCALE;
}

function gameOver(){
    snake.reset();
}

function setScoreTable(points, playerName){
    if(!$("#"+playerName).length){
        addToScoreBoard(playerName);
    }
    $("#"+playerName).html('<strong>' + playerName + '</strong>' + ': ' + points);
    $("#"+playerName).val(points);
}

function addToScoreBoard(playerName){
    $("#score_list").append("<li id=" + playerName + ">" + '<strong>' + playerName + '</strong>' + ": 0</li>")
}

function removeFromScoreBoard(playerName){
    $("#"+playerName).remove();
}