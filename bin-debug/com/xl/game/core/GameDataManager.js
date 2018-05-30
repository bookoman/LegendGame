var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameDataManager = (function () {
    function GameDataManager() {
    }
    Object.defineProperty(GameDataManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new GameDataManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    GameDataManager.prototype.initData = function () {
        this.playerData = new PlayerData();
    };
    GameDataManager._ins = null;
    return GameDataManager;
}());
__reflect(GameDataManager.prototype, "GameDataManager");
//# sourceMappingURL=GameDataManager.js.map