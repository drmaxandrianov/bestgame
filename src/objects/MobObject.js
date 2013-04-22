function MobObject(id, translateSpeed, posX, posY) {
    this.id = id;
    this.translateSpeed = translateSpeed;
    this.posX = posX;
    this.posY = posY;
    this.angle = 0;
}

MobObject.prototype.rotateToPlayer = function (playerX, playerY) {
    var dX = this.posX - playerX;
    var dY = this.posY - playerY;
    if (dY >= 0) {
        this.angle = Math.PI / 2 + Math.atan2(dX, -dY);
    } else {
        this.angle = -(Math.PI / 2 + Math.atan2(dX, dY));
    }
};

MobObject.prototype.translateForward = function () {
    this.posX += Math.cos(this.angle) * this.translateSpeed;
    this.posY += Math.sin(this.angle) * this.translateSpeed;
};

MobObject.prototype.draw = function (context) {
    context.beginPath();
    context.arc(this.posX, this.posY, 10, Math.PI + this.angle + 0.5, Math.PI + this.angle - 0.5);
    context.stroke();
};


function MobsCollectionObject() {
    this.mobLastId = -1;
    this.mobs = [];
}

MobsCollectionObject.prototype.spawnMobOnEdge = function(screenWidth, screenHeight, translateSpeed) {
    var onLeftOrTopEdge = false;
    if (Math.random() > 0.5) {
        onLeftOrTopEdge = true;
    }

    var posX = screenWidth;
    var posY = screenHeight;

    if (Math.random() > 0.5) {
        // On left or right edge
        if (onLeftOrTopEdge) posX = 0;
        posY = Math.random() * screenHeight;

    } else {
        // On top of bottom edge
        posX = Math.random() * screenWidth;
        if (onLeftOrTopEdge) posY = 0;
    }

    this.mobLastId++;
    this.mobs.push(new MobObject(this.mobLastId, translateSpeed, posX, posY));
};

MobsCollectionObject.prototype.calculate = function(playerX, playerY) {
    this.mobs.forEach(function (mob) {
        mob.rotateToPlayer(playerX, playerY);
        mob.translateForward();
    });
};

MobsCollectionObject.prototype.draw = function(context) {
    this.mobs.forEach(function (mob) {
        mob.draw(context);
    });
};