// ---------------------------------------------------------
// ----------------------- SETTINGS ------------------------
// ---------------------------------------------------------
var settings = {
    canvasWidth: 640,
    canvasHeight: 480,
    keysUpdateInterval: 1,
    playersAvatarId: 0,
    avatarTranslateSpeed: 1
};

// ---------------------------------------------------------
// -------------------- INITIALIZATION ---------------------
// ---------------------------------------------------------
var core = {
    canvas: null,
    context: null,
    isInitialized: false
};

window.onload = function () {
    core.canvas = document.getElementById("pad");
    core.canvas.width = settings.canvasWidth;
    core.canvas.height = settings.canvasHeight;
    core.context = core.canvas.getContext("2d");
    console.log("Initialization: onload canvas 2D context created");

    initializeGameObjects();
    core.isInitialized = true;
    console.log("Initialization: all game objects are initialized");
};

function initializeGameObjects() {
    gameObjects.avatars.push(new Avatar(0));
}

window.requestAnimFrame = (function () {
    console.log("Initialization: function requestAnimFrame updated");
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// ---------------------------------------------------------
// ----------------------- GAME LOOP -----------------------
// ---------------------------------------------------------
(function animationLoop() {
    requestAnimFrame(animationLoop);
    if (core.isInitialized) {
        render();
    }
})();

// ---------------------------------------------------------
// ---------------------- GAME OBJECTS ---------------------
// ---------------------------------------------------------
var gameObjects = {
    avatars: [],
    cursor: null
};

// ---------------------------------------------------------
// ------------------------- RENDER ------------------------
// ---------------------------------------------------------
function render() {
    // Clear screen
    core.context.clearRect(0, 0, settings.canvasWidth, settings.canvasHeight);

    // Render avatars
    gameObjects.avatars.forEach(function (avatar) {
        avatar.draw(core.context);
    });
}

// ---------------------------------------------------------
// ------------------ GAME OBJECT CLASSES ------------------
// ---------------------------------------------------------
function Avatar(id) {
    this.id = id;
    this.posX = 100;
    this.posY = 100;
    this.angle = 0;
}

Avatar.prototype.setPosition = function (posX, posY) {
    this.posX = posX;
    this.posY = posY;
};

Avatar.prototype.translate = function (diffX, diffY) {
    this.posX += diffX;
    this.posY += diffY;
};

Avatar.prototype.setRotation = function (angle) {
    this.angle = angle;
};

Avatar.prototype.rotate = function (diffAngle) {
    this.angle += diffAngle;
};

Avatar.prototype.draw = function (context) {
    context.beginPath();
    context.arc(this.posX, this.posY, 20, 0, 2 * Math.PI);
    context.stroke();
};

function Cursor() {

}

// ---------------------------------------------------------
// -------------------- KEYS PROCESSING --------------------
// ---------------------------------------------------------

var keyMap = {
    left: false,
    right: false,
    up: false,
    down: false
};

function isOnlyArrowKeyPressCorrector() {
    var numberOfPressedArrowKeys = 0;

    if (keyMap.left) numberOfPressedArrowKeys++;
    if (keyMap.right) numberOfPressedArrowKeys++;
    if (keyMap.up) numberOfPressedArrowKeys++;
    if (keyMap.down) numberOfPressedArrowKeys++;

    if (numberOfPressedArrowKeys <= 1) return 1;
    else return 1 / Math.sqrt(2);
}

setInterval(processKeys, settings.keysUpdateInterval);
function processKeys() {
    if (keyMap.left) {
        gameObjects.avatars[settings.playersAvatarId]
            .translate(-settings.avatarTranslateSpeed * isOnlyArrowKeyPressCorrector(), 0);
    }
    if (keyMap.right) {
        gameObjects.avatars[settings.playersAvatarId]
            .translate(settings.avatarTranslateSpeed * isOnlyArrowKeyPressCorrector(), 0);
    }
    if (keyMap.up) {
        gameObjects.avatars[settings.playersAvatarId]
            .translate(0, -settings.avatarTranslateSpeed * isOnlyArrowKeyPressCorrector());
    }
    if (keyMap.down) {
        gameObjects.avatars[settings.playersAvatarId]
            .translate(0, settings.avatarTranslateSpeed * isOnlyArrowKeyPressCorrector());
    }
}


document.onkeydown = function (event) {
    var keyCode;

    if (event == null) keyCode = window.event.keyCode;
    else keyCode = event.keyCode;

    switch (keyCode) {
        case 37:
            keyMap.left = true;
            break;
        case 39:
            keyMap.right = true;
            break;
        case 38:
            keyMap.up = true;
            break;
        case 40:
            keyMap.down = true;
            break;
        default:
            break;
    }
};

document.onkeyup = function (event) {
    var keyCode;

    if (event == null) keyCode = window.event.keyCode;
    else keyCode = event.keyCode;

    switch (keyCode) {
        case 37:
            keyMap.left = false;
            break;
        case 39:
            keyMap.right = false;
            break;
        case 38:
            keyMap.up = false;
            break;
        case 40:
            keyMap.down = false;
            break;
        default:
            break;
    }
};