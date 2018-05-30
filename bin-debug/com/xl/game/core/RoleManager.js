var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleManager = (function () {
    function RoleManager() {
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
        GameDataManager.ins.playerData.mapXYPoint.x = this.selfRole.x;
        GameDataManager.ins.playerData.mapXYPoint.y = this.selfRole.y;
        this.selfRole.playAni(RoleAniName.MOVE);
    };
    RoleManager.prototype.roleMove = function (dx, dy, moveSpeed) {
        var playerData = GameDataManager.ins.playerData;
        var tx = playerData.mapXYPoint.x + dx * moveSpeed;
        var ty = playerData.mapXYPoint.y + dy * moveSpeed;
        var sceneMgr = SceneMananger.ins;
        var roleWidth = 50;
        var roleHeight = 100;
        if (tx < roleWidth)
            tx = roleWidth;
        else if (tx > sceneMgr.mapW - roleWidth)
            tx = sceneMgr.mapW - roleWidth;
        if (ty < roleHeight)
            ty = roleHeight;
        else if (ty > sceneMgr.mapH - roleHeight)
            ty = sceneMgr.mapH - roleHeight;
        playerData.mapXYPoint.x = tx;
        playerData.mapXYPoint.y = ty;
        this.selfRole.x = playerData.isCenterX ? GameConfig.STAGE_WIDTH / 2 : this.selfRole.x + dx * moveSpeed;
        this.selfRole.y = playerData.isCenterY ? GameConfig.STAGE_HEIGHT / 2 : this.selfRole.y + dy * moveSpeed;
        //场景
        if (sceneMgr.isOutOfMap(tx, ty)) {
            return;
        }
        sceneMgr.terainScroll(tx, ty);
    };
    RoleManager._ins = null;
    return RoleManager;
}());
__reflect(RoleManager.prototype, "RoleManager");
//# sourceMappingURL=RoleManager.js.map