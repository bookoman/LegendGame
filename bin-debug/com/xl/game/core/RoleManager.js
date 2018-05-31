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
        this.selfRole.playAni(RoleAniName.STAND);
    };
    RoleManager.prototype.roleMove = function (dx, dy, moveSpeed) {
        if (dx == 0 && dy == 0) {
            //不移动不更新
            return;
        }
        var playerData = GameDataManager.ins.playerData;
        //场景
        var mapX = playerData.mapXYPoint.x + dx * moveSpeed;
        var mapY = playerData.mapXYPoint.y + dy * moveSpeed;
        var sceneMgr = SceneMananger.ins;
        var roleWidth = 50;
        var roleHeight = 100;
        if (mapX < roleWidth)
            mapX = roleWidth;
        else if (mapX > sceneMgr.mapW - roleWidth)
            mapX = sceneMgr.mapW - roleWidth;
        if (mapY < roleHeight)
            mapY = roleHeight;
        else if (mapY > sceneMgr.mapH - roleHeight)
            mapY = sceneMgr.mapH - roleHeight;
        playerData.mapXYPoint.x = mapX;
        playerData.mapXYPoint.y = mapY;
        if (sceneMgr.isOutOfMap(mapX, mapY)) {
            return;
        }
        sceneMgr.terainScroll(mapX, mapY);
        //角色
        var roleX = playerData.isCenterX ? GameConfig.STAGE_WIDTH / 2 : this.selfRole.x + dx * moveSpeed;
        var roleY = playerData.isCenterY ? GameConfig.STAGE_HEIGHT / 2 : this.selfRole.y + dy * moveSpeed;
        if (roleX < roleWidth)
            roleX = roleWidth;
        else if (roleX > GameConfig.STAGE_WIDTH - roleWidth)
            roleX = GameConfig.STAGE_WIDTH - roleWidth;
        if (roleY < roleHeight)
            roleY = roleHeight;
        else if (roleY > GameConfig.STAGE_HEIGHT)
            roleY = GameConfig.STAGE_HEIGHT;
        this.selfRole.x = roleX;
        this.selfRole.y = roleY;
    };
    RoleManager._ins = null;
    return RoleManager;
}());
__reflect(RoleManager.prototype, "RoleManager");
//# sourceMappingURL=RoleManager.js.map