// ---------------------------------------------------------
// ----------------------- SETTINGS ------------------------
// ---------------------------------------------------------
var settings = {
    canvasWidth: 640,
    canvasHeight: 480,
    keysUpdateInterval: 1,
    playersAvatarId: 0,
    avatarTranslateSpeed: 1,
    bulletTranslateSpeed: 6
};

// ---------------------------------------------------------
// ---------------------- GAME OBJECTS ---------------------
// ---------------------------------------------------------
var gameObjects = {
    avatars: [],
    cursor: null,
    bullets: null
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

    core.canvas.onmousedown = function(event){
        event.preventDefault();
    };
    console.log("Initialization: prevent canvas selection with mouse");

    initializeGameObjects();
    core.isInitialized = true;
    console.log("Initialization: all game objects are initialized");
};

function initializeGameObjects() {
    gameObjects.avatars.push(new Avatar(0));
    gameObjects.cursor = new Cursor();
    gameObjects.bullets = new Bullets();
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
        gameObjects.bullets.calculate();
    }
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
    gameObjects.cursor.draw(core.context);
}