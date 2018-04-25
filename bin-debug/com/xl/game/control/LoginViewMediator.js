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
var LoginViewMediator = (function (_super) {
    __extends(LoginViewMediator, _super);
    function LoginViewMediator() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/LoginViewSkin.exml";
        return _this;
    }
    LoginViewMediator.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addEvents();
    };
    LoginViewMediator.prototype.addEvents = function () {
        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLoginClick, this);
    };
    LoginViewMediator.prototype.removeEvent = function () {
        this.btnLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLoginClick, this);
    };
    LoginViewMediator.prototype.onBtnLoginClick = function (e) {
        console.log("登录");
    };
    return LoginViewMediator;
}(eui.Component));
__reflect(LoginViewMediator.prototype, "LoginViewMediator");
//# sourceMappingURL=LoginViewMediator.js.map