function Snake(){
    this.x = 0;
    this.y = 0;

    this.scale = 10
    this.speed = 1;

    this.xspeed = 0;
    this.yspeed = 1;

    this.update = function(){
        this.x += this.xspeed;
        this.y += this.yspeed;

        this.x = constrain(this.x, 0, GAMESIZE-SCALE);
        this.y = constrain(this.y, 0, GAMESIZE-SCALE);
    }

    this.show = function(SCALE){
        fill(255);
        rect(this.x, this.y, SCALE, SCALE);
    }

    this.dir = function(x, y){
        this.xspeed = x * this.speed;
        this.yspeed = y * this.speed;
    }

    this.speedUp = function(){
        this.speed += 1;
    }
}

function Food(x, y){
    this.x = x ? x:getRandPosition();
    this.y = y ? y:getRandPosition();

    this.show = function(){
        fill(255,0,0);
        rect(this.x, this.y, SCALE, SCALE);
    }
}

function getRandPosition(){
    return constrain(
            Math.floor( 
                ( Math.random() * GAMESIZE ) + 1 
            )
        , 0, GAMESIZE-SCALE);
}