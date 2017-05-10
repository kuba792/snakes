function Snake(color){

    this.x = 0;
    this.y = 0;

    this.color = color || getRandColor();

    this.speed = SCALE;

    this.xspeed = 1 * this.speed;
    this.yspeed = 0 * this.speed;

    this.segmentsCount = 0;
    this.tail = [];

    this.moveDirection = 'down';

    this.update = function(){
        this.tail.push([this.x, this.y]);
        this.tail.shift();
        this.x += this.xspeed;
        this.y += this.yspeed;

        socket.emit('snake_move', this.exportToJSON() );
    }

    this.exportToJSON = function(){
        return {
            x: this.x,
            y: this.y,
            tail: this.tail,
            segmentsCount: this.segmentsCount
        }
    }

    this.importFromJSON = function(data){
        this.x = data.x;
        this.y = data.y;
        this.tail = data.tail;
        this.segmentsCount = data.segmentsCount;
    }

    this.show = function(){
        fill(this.color);

        for(var i = 0; i <= this.segmentsCount-1; i++){
            rect(this.tail[i][0], this.tail[i][1], SCALE, SCALE);
        }

        rect(this.x, this.y, SCALE, SCALE);
    }

    this.hitCorner = function(){
        if(snake.x < 0 || snake.x >= GAMESIZE 
        || snake.y < 0 || snake.y >= GAMESIZE){
            return true;
        } else return false;
    }

    this.biteHisTail = function(){
        var headPosition = [this.x, this.y];
        return inArray(snake.tail, headPosition);
    }
    
    this.addTail = function(){
        this.tail.push([this.x, this.y]);
        this.segmentsCount++;
    }


    this.reset = function(){
        this.x = 0;
        this.y = 0;
        this.speed = SCALE;
        this.xspeed = 1 * this.speed;
        this.yspeed = 0 * this.speed;
        this.segmentsCount = 0;
        this.tail = [];
        this.moveDirection = 'down';
    }

    this.dir = function(x, y){
        this.xspeed = x * this.speed;
        this.yspeed = y * this.speed;
    }

    this.speedUp = function(){
        this.speed += 0.1;
    }

    this.eat = function(thing){
        thing.destroy();
        this.addTail();
    }
}

function Food(){

    this.show = function(){
        fill(255,0,0);
        rect(this.x, this.y, SCALE, SCALE);
    }

    this.destroy = function(){
        socket.emit('destroy_food');
    }

    this.setPosition = function(x,y){
        this.x = x;
        this.y = y;
    }
}

function getRandPosition(){
    return Math.floor( Math.random() * GAMESIZE/SCALE ) * SCALE;
}

function inArray(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i][0]=== obj.x 
        && a[i][1]=== obj.y) {
            return true;
        }
    }
    return false;
}

function getRandColor(){
    return parseInt(Math.floor(Math.random() * (250 - 70)) + 70);
}