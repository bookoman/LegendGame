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
var SignMediator = (function (_super) {
    __extends(SignMediator, _super);
    function SignMediator(moduleName) {
        return _super.call(this, "resource/skins/SignViewSkin.exml", moduleName) || this;
    }
    SignMediator.prototype.initView = function () {
        _super.prototype.initView.call(this);
        // console.log("login.....",RES.getRes("10000_png"));
    };
    SignMediator.prototype.addEvents = function () {
    };
    SignMediator.prototype.removeEvent = function () {
    };
    return SignMediator;
}(BaseMediator));
__reflect(SignMediator.prototype, "SignMediator");
//# sourceMappingURL=SignMediator.js.map