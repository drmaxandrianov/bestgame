function Cursor() {
    this.isMouseDown = false;
    this.posX = 100;
    this.posY = 100;

    core.canvas.addEventListener("mousedown", function (event) {
        gameObjects.cursor.setIsMouseDown(true);
        gameObjects.cursor.posX = event.offsetX;
        gameObjects.cursor.posY = event.offsetY;
    });

    window.addEventListener("mouseup", function (event) {
        gameObjects.cursor.setIsMouseDown(false);
    });

    core.canvas.addEventListener("mousemove", function (event) {
        gameObjects.cursor.posX = event.offsetX;
        gameObjects.cursor.posY = event.offsetY;
    });
}

Cursor.prototype.setPosition = function (posX, posY) {
    this.posX = posX;
    this.posY = posY;
};

Cursor.prototype.translate = function (diffX, diffY) {
    this.posX += diffX;
    this.posY += diffY;
};

Cursor.prototype.setIsMouseDown = function (isDown) {
    this.isMouseDown = isDown;
};

Cursor.prototype.getIsMouseDown = function () {
    return this.isMouseDown;
};

Cursor.prototype.draw = function (context) {
    context.beginPath();
    context.arc(this.posX, this.posY, 5, 0, 2 * Math.PI);
    context.stroke();
};

