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