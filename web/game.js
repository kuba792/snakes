const SCALE = 20;
const GAMESIZE = 400;

var socket = io();
var playerName = '';

var snake;
var oponent;

function setup(){
    playerName = prompt("What's your name?", "player");
    socket.emit('myName', playerName);
    createCanvas(GAMESIZE, GAMESIZE);
    snake = new Snake(255);
    oponent = new Snake(200);
    food = new Food();
    food.setPosition(50,50);
}

function draw(){

    socket.on('new_player', function(){
        snake.reset();
    });

    background(51);

    snake.update();

    snake.show();    
    oponent.show();

    food.show();
    if(snake.hitCorner()
    || snake.biteHisTail()){
        gameOver();
    }
    if(collision(snake, food)){
        snake.eat(food);
    }
    frameRate(snake.speed);
}

socket.on('oponent_position', function(data){
    oponent.importFromJSON(data.position);
});

socket.on('food_new_position', function(data){
    food.setPosition(data[0], data[1]);
    console.log('nom');
});

function keyPressed(){
    switch(keyCode){
        case UP_ARROW:
            if(snake.moveDirection != 'down'){
                snake.dir(0,-1);
                snake.moveDirection = 'up';
            }
            break;
        case LEFT_ARROW:
            if(snake.moveDirection != 'right'){
                snake.dir(-1,0);
                snake.moveDirection = 'left';
            }
            break;
        case RIGHT_ARROW:
            if(snake.moveDirection != 'left'){
                snake.dir(1,0);
                snake.moveDirection = 'right';
            }
            break;
        case DOWN_ARROW:
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