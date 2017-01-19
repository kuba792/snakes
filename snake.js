function Snake(){

    this.x = 0;
    this.y = 0;

    this.speed = SCALE;

    this.xspeed = 0;
    this.yspeed = 1;

    this.segmentsCount = 0;
    this.tail = [];

    this.update = function(){
        this.tail.push(createVector(this.x, this.y));
        this.tail.shift();

        this.x += this.xspeed;
        this.y += this.yspeed;

        this.x = constrain(this.x, 0, GAMESIZE-SCALE);
        this.y = constrain(this.y, 0, GAMESIZE-SCALE);
    }

    this.show = function(SCALE){
        fill(255);

        for(var i = 0; i <= this.segmentsCount-1; i++){
            rect(this.tail[i].x, this.tail[i].y, SCALE, SCALE);
        }

        rect(this.x, this.y, SCALE, SCALE);
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

    this.addTail = function(){
        this.tail.push(createVector(this.x, this.y));
        this.segmentsCount++;
    }
}

function Food(x, y){
    this.x = x ? x:getRandPosition();
    this.y = y ? y:getRandPosition();

    this.show = function(){
        fill(255,0,0);
        rect(this.x, this.y, SCALE, SCALE);
    }

    this.destroy = function(){
        this.x = getRandPosition();
        this.y = getRandPosition();
    }
}

function getRandPosition(){
    return Math.floor( Math.random() * GAMESIZE/SCALE ) * SCALE;
}