// Enemies our player must avoid
var Enemy = function(level) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = 0;
    this.y = getRndInteger(60, 240);
    this.speed = level * 30;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(this.x > 505) this.x = 0; //reset enemy location if out of screen

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {    
    this.x = 200;
    this.y = 450;
    this.speed = 50; // moving at 50 pixel per key up event
    this.sprite = 'images/char-cat-girl.png';//'images/char-cat-girl.png';
}

Player.prototype.update = function() {
    //maybe check for collision??
    if(checkCollision()){ 
        alert('game over!');
        restart = true;
    }
};

Player.prototype.render = function(dt) {
    if(this.y < 30) {
        //player reached goal, reset player position, increase level and add another enemy
        this.y = 450;
        level++;
        allEnemies.push(new Enemy(level));
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dt) {
    switch(dt) {
        case 'left':
            this.x -= this.speed;
            break;
        case 'right':
            this.x += this.speed;
            break;
        case 'up':
            this.y -= this.speed;
            break;        
        case 'down':
            this.y += this.speed;
            break;
    }
};

function checkCollision() {
    //we need to check if player rectangle overlap with enemy rectangles
    for(let enemy of allEnemies) {
        if(rectangleOverlap(player.x - 15, player.y - 15, player.x + 15, player.y + 15,
            enemy.x - 25, enemy.y - 15, enemy.x + 25, enemy.y + 15)) {
                console.log('collision');
                return true; 
        }
    }
    return false;
}

//l1 represents top left of first rectangle, r1 represents bottom right of first rectangle
function rectangleOverlap(l1x, l1y, r1x, r1y, l2x, l2y, r2x, r2y) {
    //console.log(`(${l1x}, ${l1y}, ${r1x}, ${r1y})  (${l2x}, ${l2y}, ${r2x}, ${r2y})`);
    // If one rectangle is on left side of other
    if (l1x > r2x || l2x > r1x) {
        return false;
    }

    // If one rectangle is above other
    if (l1y > r2y || l2y > r1y) {
        return false;
    }

    return true;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [new Enemy(1)];
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

