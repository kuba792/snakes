const SCALE = 20;
const GAMESIZE = 400;

function setup(){
    createCanvas(GAMESIZE, GAMESIZE);
    snake = new Snake();
    food = new Food();
}

function draw(){
    background(51);
    snake.update();
    snake.show();
    food.show();
    if(snake.hitCorner()
    || snake.biteHisTail()){
        gameOver();
    }
    if(collision(snake, food)){
        console.log('omnom nom');
        snake.eat(food);
        // snake.speedUp();
    }
    frameRate(snake.speed);
}

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
    var again = confirm("Game Over, \ntry again?");
    snake.reset();
}