// ---------------------------------------------------------
// ----------------------- SETTINGS ------------------------
// ---------------------------------------------------------
//noinspection JSUnusedGlobalSymbols
var settings = {

};

// ---------------------------------------------------------
// -------------------- INITIALIZATION ---------------------
// ---------------------------------------------------------
var core = {
    canvas: null,
    context: null
};

window.onload =function () {
    core.canvas = document.getElementById("pad");
    core.context = core.canvas.getContext("2d");
    console.log("Initialization: onload canvas 2D context created");
};

window.requestAnimFrame = (function(){
    console.log("Initialization: fucntion requestAnimFrame updated");
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

// ---------------------------------------------------------
// ----------------------- GAME LOOP -----------------------
// ---------------------------------------------------------
(function animationLoop(){
    requestAnimFrame(animationLoop);
    render();
})();

// ---------------------------------------------------------
// ------------------------- RENDER ------------------------
// ---------------------------------------------------------
function render() {

}

