var screenWidth = 640, screenHeight = 480;
var e = new JSCEngineCreator("pad", screenWidth, screenHeight);

var Constants = {
    DEFAULT_LIFE: 100,
    DEFAULT_ARMOR: 100,
    DEFAULT_MELEE_DAMAGE: 100,
    DEFAULT_RANGE_DAMAGE: 100,
    DEFAULT_POS_X: 10,
    DEFAULT_POS_Y: 10
};

/**
 * Create warrior.
 *
 * @param {{life: number, armor: number, meleeDamage: number, rangeDamage: number, posX: number, posY: number}} desc description of the warrior
 * @constructor
 */
function Warrior(desc) {
    this.life = desc.life || Constants.DEFAULT_LIFE;

}