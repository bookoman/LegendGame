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
    GameConfig.STAGE_WIDTH = 750;
    GameConfig.STAGE_HEIGHT = 1334;
    GameConfig.MAP_GRID_WIDTH = 60;
    GameConfig.MAP_GRID_HEIGHT = 80;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
/**角色动画枚举 */
var RoleAniIndex;
(function (RoleAniIndex) {
    RoleAniIndex[RoleAniIndex["STAND"] = 0] = "STAND";
    RoleAniIndex[RoleAniIndex["INJURED"] = 1] = "INJURED";
    RoleAniIndex[RoleAniIndex["DEATH"] = 2] = "DEATH";
    RoleAniIndex[RoleAniIndex["ATTACK"] = 3] = "ATTACK";
    RoleAniIndex[RoleAniIndex["MOVE"] = 4] = "MOVE";
    RoleAniIndex[RoleAniIndex["SKILL1"] = 5] = "SKILL1";
    RoleAniIndex[RoleAniIndex["SKILL2"] = 6] = "SKILL2";
    RoleAniIndex[RoleAniIndex["SKILL3"] = 7] = "SKILL3";
    RoleAniIndex[RoleAniIndex["SKILL4"] = 8] = "SKILL4";
})(RoleAniIndex || (RoleAniIndex = {}));
//# sourceMappingURL=GameConfig.js.map