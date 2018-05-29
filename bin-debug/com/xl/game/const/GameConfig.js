var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* 游戏配置
*/
var GameConfig = (function () {
    function GameConfig() {
    }
    /**舞台大小 */
    GameConfig.STAGE_WIDTH = 1136;
    GameConfig.STAGE_HEIGHT = 640;
    GameConfig.MAP_GRID_WIDTH = 60;
    GameConfig.MAP_GRID_HEIGHT = 80;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
/**角色动画枚举 */
var RoleAniName = (function () {
    function RoleAniName() {
    }
    RoleAniName.STAND = "stand";
    RoleAniName.INJURED = "injured";
    RoleAniName.DEATH = "death";
    RoleAniName.ATTACK = "attack";
    RoleAniName.MOVE = "move";
    return RoleAniName;
}());
__reflect(RoleAniName.prototype, "RoleAniName");
//# sourceMappingURL=GameConfig.js.map