var core = {
    canvas: null,
    context: null
};

window.onload =function () {
    core.canvas = document.getElementById("pad");
    core.context = core.canvas.getContext("2d");
};

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();


// usage:
// instead of setInterval(render, 16) ....

(function animloop(){
    requestAnimFrame(animloop);
    render();
})();
// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.