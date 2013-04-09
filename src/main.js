var core = {
    canvas: null,
    context: null
};

window.onload =function () {
    core.canvas = document.getElementById("pad");
    core.context = core.canvas.getContext("2d");
};