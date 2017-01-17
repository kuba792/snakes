const SCALE = 20;
const GAMESIZE = 400;

function setup(){
    createCanvas(GAMESIZE, GAMESIZE);
    snake = new Snake();
    food = new Food();
}

function draw(){
    background(51);
    // snake.update();
    snake.show(SCALE);
    food.show();

    if(snake.x === food.x && snake.y === food.y){
        console.log('omnomnom');
    }
}

function keyPressed(){
    switch(keyCode){
        case UP_ARROW:
            snake.dir(0,-1);
            break;
        case LEFT_ARROW:
            snake.dir(-1,0);
            break;
        case RIGHT_ARROW:
            snake.dir(1,0);
            break;
        case DOWN_ARROW:
            snake.dir(0,1);
            break;
    }
}