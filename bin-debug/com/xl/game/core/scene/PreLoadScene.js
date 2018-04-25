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
/*
* name;
*/
var PreLoadScene = (function (_super) {
    __extends(PreLoadScene, _super);
    function PreLoadScene() {
        return _super.call(this) || this;
    }
    PreLoadScene.prototype.enter = function () {
    };
    PreLoadScene.prototype.leave = function () {
    };
    return PreLoadScene;
}(BaseScene));
__reflect(PreLoadScene.prototype, "PreLoadScene");
//# sourceMappingURL=PreLoadScene.js.map