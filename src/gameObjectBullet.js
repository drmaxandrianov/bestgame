function Bullet(avatarId, posX, posY, angle, speed) {
    this.owner = avatarId;
    this.posX = posX;
    this.posY = posY;
    this.angle = angle;
    this.speed = speed;
}

Bullet.prototype.calculate = function() {
    this.posX += Math.cos(this.angle) * this.speed;
    this.posY += Math.sin(this.angle) * this.speed;
};

Bullet.prototype.draw = function (context) {
    context.beginPath();
    context.arc(this.posX, this.posY, 3, 0, 2 * Math.PI);
    context.stroke();
};



function Bullets() {
    this.bullets = [];
}

Bullets.prototype.addBullet = function(avatarId, posX, posY, angle, speed) {
    this.bullets.push(new Bullet(avatarId, posX, posY, angle, speed));
};

Bullets.prototype.calculate = function() {
    this.bullets.forEach(function(bullet, i) {
        bullet.calculate();
        if ((bullet.poxX < 0 || bullet.posX > core.canvas.width)
            || (bullet.poxY < 0 || bullet.posY > core.canvas.height)) {
            this.splice(i, 1);
        }
    }, this.bullets);
};

Bullets.prototype.draw = function(context) {
    this.bullets.forEach(function(bullet) {
        bullet.draw(context);
    })
};

Bullets.prototype.shoot = function(mouseX, mouseY) {
    var avatar = gameObjects.avatars[0];
    var avX = avatar.posX;
    var avY = avatar.posY;
    this.bullets.push(new Bullet(0, avX, avY, getAngle(avX, avY, mouseX, mouseY), settings.bulletTranslateSpeed));
};

function getAngle(x0, y0, x1, y1) {
    var dX = x0 - x1;
    var dY = y0 - y1;
    if (dY >= 0) {
        return Math.PI/2 + Math.atan2(dX, -dY);
    } else {
        return -(Math.PI/2 + Math.atan2(dX, dY));
    }
}