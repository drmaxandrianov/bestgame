var screenWidth = 640, screenHeight = 480;
var e = new JSCEngineCreator("pad", screenWidth, screenHeight);
e.objectAdd()
var Constants = {
    Warior: {
        DEFAULT_LIFE: 100,
        DEFAULT_ARMOR: 100,
        DEFAULT_MELEE_DAMAGE: 100,
        DEFAULT_RANGE_DAMAGE: 100,
        DEFAULT_RANGE_ACCURACY: 1,
        DEFAULT_POS_X: 10,
        DEFAULT_POS_Y: 10,
        DEFAULT_ANGLE: 0,
        DEFAULT_BOUNDING_BOX_WIDTH: 10,
        DEFAULT_BOUNDING_BOX_HEIGHT: 10
    }
};

/**
 * Create warrior instance.
 *
 * @param {{life: number, armor: number, meleeDamage: number, rangeDamage: number, rangeAccuracy: number, posX: number, posY: number}} desc description of the warrior
 * @constructor
 */
function Warrior(desc) {
    // Warrior parameters
    this.life = desc.life || Constants.Warior.DEFAULT_LIFE;
    this.armor = desc.armor || Constants.Warior.DEFAULT_ARMOR;
    this.meleeDamage = desc.meleeDamage || Constants.Warior.DEFAULT_MELEE_DAMAGE;
    this.rangeDamage = desc.rangeDamage || Constants.Warior.DEFAULT_RANGE_DAMAGE;
    this.rangeAccuracy = desc.rangeAccuracy || Constants.Warior.DEFAULT_RANGE_ACCURACY;

    // Drawing parameters
    this.posX = desc.posX || Constants.Warior.DEFAULT_POS_X;
    this.posY = desc.posY || Constants.Warior.DEFAULT_POS_Y;
    this.angle = Constants.Warior.DEFAULT_BOUNDING_BOX_WIDTH;
    t



}