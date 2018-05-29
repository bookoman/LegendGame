var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleManager = (function () {
    function RoleManager() {
        this.roleSpeed = 2;
    }
    Object.defineProperty(RoleManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new RoleManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    RoleManager.prototype.initRole = function (roleID) {
        this.selfRole = new Role(roleID);
        this.selfRole.x = 200;
        this.selfRole.y = 300;
        this.selfRole.playAni(RoleAniName.MOVE);
    };
    RoleManager.prototype.roleMove = function (dx, dy, speedTimes) {
        var tx = this.selfRole.x + dx * this.roleSpeed * speedTimes;
        var ty = this.selfRole.y + dy * this.roleSpeed * speedTimes;
        if (SceneMananger.ins.isOutOfMap(tx, ty)) {
            return;
        }
        this.selfRole.x = tx;
        this.selfRole.y = ty;
        SceneMananger.ins.updateTerrain(tx, ty);
    };
    RoleManager._ins = null;
    return RoleManager;
}());
__reflect(RoleManager.prototype, "RoleManager");
//# sourceMappingURL=RoleManager.js.map