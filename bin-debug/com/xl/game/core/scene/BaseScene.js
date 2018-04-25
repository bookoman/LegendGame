var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* name;
*/
var BaseScene = (function () {
    function BaseScene() {
    }
    BaseScene.prototype.enter = function () {
    };
    BaseScene.prototype.leave = function () {
    };
    return BaseScene;
}());
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map