function BulletObject(avatarId, posX, posY, angle, speed) {
    this.owner = avatarId;
    this.posX = posX;
    this.posY = posY;
    this.angle = angle;
    this.speed = speed;
}

BulletObject.prototype.calculate = function () {
    this.posX += Math.cos(this.angle) * this.speed;
    this.posY += Math.sin(this.angle) * this.speed;
};

BulletObject.prototype.draw = function (context) {
    context.beginPath();
    context.arc(this.posX, this.posY, 3, 0, 2 * Math.PI);
    context.stroke();
};


function BulletsCollectionObject() {
    this.bullets = [];
}

BulletsCollectionObject.prototype.addBullet = function (avatarId, posX, posY, angle, speed) {
    this.bullets.push(new BulletObject(avatarId, posX, posY, angle, speed));
};

BulletsCollectionObject.prototype.calculate = function () {
    this.bullets.forEach(function (bullet, i) {
        bullet.calculate();
        if ((bullet.posX < 0 || bullet.posX > core.canvas.width)
            || (bullet.posY < 0 || bullet.posY > core.canvas.height)) {
            this.splice(i, 1);
        }
    }, this.bullets);
};

BulletsCollectionObject.prototype.draw = function (context) {
    this.bullets.forEach(function (bullet) {
        bullet.draw(context);
    })
};

BulletsCollectionObject.prototype.shoot = function (mouseX, mouseY, angleNoise) {
    var avatar = gameObjects.avatars[0];
    var avX = avatar.posX;
    var avY = avatar.posY;
    var randomAngleNoise = angleNoise * (Math.random() - 0.5);
    this.bullets.push(new BulletObject(
        0, avX, avY,
        getAngle(avX, avY, mouseX, mouseY) + randomAngleNoise,
        settings.bulletTranslateSpeed)
    );
};

function getAngle(x0, y0, x1, y1) {
    var dX = x0 - x1;
    var dY = y0 - y1;
    if (dY >= 0) {
        return Math.PI / 2 + Math.atan2(dX, -dY);
    } else {
        return -(Math.PI / 2 + Math.atan2(dX, dY));
    }
}