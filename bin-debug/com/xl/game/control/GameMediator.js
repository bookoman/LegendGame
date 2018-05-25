var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameMediator = (function (_super) {
    __extends(GameMediator, _super);
    function GameMediator(modlueName) {
        return _super.call(this, "resource/skins/GameViewSkin.exml", modlueName) || this;
    }
    GameMediator.prototype.initView = function () {
        _super.prototype.initView.call(this);
        console.log("game.....", RES.getRes("border_png"));
    };
    GameMediator.prototype.addEvents = function () {
    };
    GameMediator.prototype.removeEvents = function () {
    };
    return GameMediator;
}(BaseMediator));
__reflect(GameMediator.prototype, "GameMediator");
//# sourceMappingURL=GameMediator.js.map