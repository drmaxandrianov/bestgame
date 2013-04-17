function MouseController() {
    this.isMouseDown = false;
    this.mouseX = 100;
    this.mouseY = 100;

    this.clickAction = this.passive;
    this.moveAction = this.passive;

    this.initialize();
}

MouseController.prototype.passive = function (mouseX, mouseY) {
    console.log("Passive action was performed (" + mouseX + ", "
        + mouseY + "). Add mouse click handler in MouseController.")
};

MouseController.prototype.defineClickAction = function(action) {
    this.clickAction = action;
};


MouseController.prototype.defineMoveAction = function(action) {
    this.moveAction = action;
};

MouseController.prototype.initialize = function() {
    var self = this;

    core.canvas.addEventListener("mousedown", function (event) {
        self.isMouseDown = true;
        self.mouseX = event.offsetX;
        self.mouseY = event.offsetY;
        self.clickAction(self.mouseX, self.mouseY);
    });

    window.addEventListener("mouseup", function (event) {
        self.isMouseDown = false;
    });

    core.canvas.addEventListener("mousemove", function (event) {
        self.mouseX = event.offsetX;
        self.mouseY = event.offsetY;
        self.moveAction(self.mouseX, self.mouseY);
    });

};

MouseController.prototype.getPositionX = function() {
    return this.mouseX;
};

MouseController.prototype.getPositionY = function() {
    return this.mouseY;
};