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
        this.selfRole.playAni("stand");
    };
    RoleManager._ins = null;
    return RoleManager;
}());
__reflect(RoleManager.prototype, "RoleManager");
//# sourceMappingURL=RoleManager.js.map