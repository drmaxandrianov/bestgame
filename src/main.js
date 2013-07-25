var screenWidth = 640, screenHeight = 480;
var e = new JSCEngineCreator("pad", screenWidth, screenHeight);
e.objectAdd()
var Constants = {
    Warrior: {
        DEFAULT_LIFE: 100,
        DEFAULT_ARMOR: 100,
        DEFAULT_MELEE_DAMAGE: 100,
        DEFAULT_RANGE_DAMAGE: 100,
        DEFAULT_RANGE_ACCURACY: 1,
        DEFAULT_POS_X: 10,
        DEFAULT_POS_Y: 10,
        DEFAULT_ANGLE: 0,
        DEFAULT_BOUNDING_BOX_WIDTH: 10,
        DEFAULT_BOUNDING_BOX_HEIGHT: 10,
        DEFAULT_DRAW_RADIUS: 10
    }
};

/**
 * Create warrior instance.
 *
 * @param {{life: number, armor: number, meleeDamage: number, rangeDamage: number, rangeAccuracy: number, posX: number, posY: number}} desc description of the warrior
 * @constructor
 */
function Warrior(name, desc) {
    // Creation checks
    if (!name) {
        log.error("Can not create warrior without a name");
        return;
    }

    // Warrior parameters
    this.name = name;
    this.life = desc.life || Constants.Warrior.DEFAULT_LIFE;
    this.armor = desc.armor || Constants.Warrior.DEFAULT_ARMOR;
    this.meleeDamage = desc.meleeDamage || Constants.Warrior.DEFAULT_MELEE_DAMAGE;
    this.rangeDamage = desc.rangeDamage || Constants.Warrior.DEFAULT_RANGE_DAMAGE;
    this.rangeAccuracy = desc.rangeAccuracy || Constants.Warrior.DEFAULT_RANGE_ACCURACY;

    // Drawing parameters
    this.posX = desc.posX || Constants.Warrior.DEFAULT_POS_X;
    this.posY = desc.posY || Constants.Warrior.DEFAULT_POS_Y;

    // Static parameters
    this.angle = Constants.Warrior.DEFAULT_ANGLE;
    this.boundingBoxWidth = Constants.Warrior.DEFAULT_BOUNDING_BOX_WIDTH;
    this.boundingBoxHeight = Constants.Warrior.DEFAULT_BOUNDING_BOX_HEIGHT;

    // Warrior drawing
    this.onDraw = function (context, objData) {
        context.beginPath();
        context.arc(this.posX, this.posY, Constants.Warrior.DEFAULT_DRAW_RADIUS, 0, 2 * Math.PI, false);
        context.fillStyle = "green";
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = "blue";
        context.stroke();
        context.closePath();
    };

    this.onLeftClickUp = function () {
        log.info()
    }
}


var log = {
    // Private
    _logId: document.getElementById("log"),
    _log: function (type, message) {
        _logId.value = new Date() + " " + type + " " + message;
    },

    // Public
    error: function (message) {
        _log("ERROR", message);
    },
    info: function (message) {
        _log("INFO", message);
    },
    warning: function (message) {
        _log("WARN", message);
    }
};