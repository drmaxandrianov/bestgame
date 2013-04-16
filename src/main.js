// ---------------------------------------------------------
// ----------------------- SETTINGS ------------------------
// ---------------------------------------------------------
var settings = {
    canvasWidth: 640,
    canvasHeight: 480,
    keysUpdateInterval: 1,
    physicsUpdateInterval: 1,
    playersAvatarId: 0,
    avatarTranslateSpeed: 1,
    bulletTranslateSpeed: 3
};

// ---------------------------------------------------------
// ---------------------- GAME OBJECTS ---------------------
// ---------------------------------------------------------
var gameObjects = {
    avatars: [],
    bullets: null
};

var gameControllers = {
    keysController: null,
    mouseController: null
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
    console.log("Initialization: on load canvas 2D context created");

    core.canvas.onmousedown = function (event) {
        event.preventDefault();
    };
    console.log("Initialization: prevent canvas selection with mouse");

    initializeGameObjects();
    console.log("Initialization: all game objects are initialized");
    initializeGameControllers();
    console.log("Initialization: all game controls are initialized");
    core.isInitialized = true;
};

function initializeGameObjects() {
    gameObjects.avatars.push(new Avatar(0));
    gameObjects.bullets = new Bullets();
}

function initializeGameControllers() {
    gameControllers.keysController = new KeyController(settings.keysUpdateInterval);
    gameControllers.keysController.defineKeyAction("left", function () {
        gameObjects.avatars[settings.playersAvatarId]
            .translate(-settings.avatarTranslateSpeed * gameControllers.keysController.diagonalMoveCorrector(), 0);
    });

    gameControllers.keysController.defineKeyAction("right", function () {
        gameObjects.avatars[settings.playersAvatarId]
            .translate(settings.avatarTranslateSpeed * gameControllers.keysController.diagonalMoveCorrector(), 0);
    });

    gameControllers.keysController.defineKeyAction("up", function () {
        gameObjects.avatars[settings.playersAvatarId]
            .translate(0, -settings.avatarTranslateSpeed * gameControllers.keysController.diagonalMoveCorrector());
    });

    gameControllers.keysController.defineKeyAction("down", function () {
        gameObjects.avatars[settings.playersAvatarId]
            .translate(0, settings.avatarTranslateSpeed * gameControllers.keysController.diagonalMoveCorrector());
    });

    gameControllers.mouseController = new MouseController();
    gameControllers.mouseController.defineClickAction(function (mouseX, mouseY) {
        gameObjects.bullets.shoot(event.offsetX, event.offsetY);
    });
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

(function physicsLoop() {
    setTimeout(physicsLoop, settings.physicsUpdateInterval);
    gameObjects.bullets.calculate();
})();

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

    // Render bullets
    gameObjects.bullets.draw(core.context);

    // Render cursor
    core.context.beginPath();
    core.context.arc(
        gameControllers.mouseController.getPositionX(),
        gameControllers.mouseController.getPositionY(),
        5, 0, 2 * Math.PI
    );
    core.context.stroke();
}