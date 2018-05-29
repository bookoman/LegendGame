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
var BaseRole = (function (_super) {
    __extends(BaseRole, _super);
    function BaseRole(roleID) {
        var _this = _super.call(this) || this;
        _this.isLoaded = false;
        _this.roleID = roleID;
        return _this;
    }
    BaseRole.prototype.playAni = function (aniName) {
        this.aniName = aniName;
        if (this.isLoaded) {
            this.armatureDisplay.animation.play(aniName);
        }
        else {
            //添加资源组加载完成事件
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            //添加资源组加载进度事件
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            //开始加载 preload 资源组
            RES.loadGroup("role" + this.roleID);
        }
    };
    BaseRole.prototype.onResourceLoadComplete = function () {
        //添加资源组加载完成事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //资源
        var dragonbonesData = RES.getRes(this.roleID + "_ske_json");
        var textureData = RES.getRes(this.roleID + "_tex_json");
        var texture = RES.getRes(this.roleID + "_tex_png");
        var egretFactory = dragonBones.EgretFactory.factory;
        egretFactory.parseDragonBonesData(dragonbonesData);
        egretFactory.parseTextureAtlasData(textureData, texture);
        this.armatureDisplay = egretFactory.buildArmatureDisplay("armatureName");
        this.armatureDisplay.scaleX = -0.5;
        this.armatureDisplay.scaleY = 0.5;
        this.armatureDisplay.x = 0;
        this.armatureDisplay.y = 0;
        this.addChild(this.armatureDisplay);
        this.x = 200;
        this.y = 300;
        LayerManager.ins.addToLayer(this, LayerManager.ROLE_LAYER, false, true, false);
        //回调播放动画
        this.isLoaded = true;
        this.playAni(this.aniName);
    };
    BaseRole.prototype.onResourceProgress = function () {
    };
    return BaseRole;
}(egret.Sprite));
__reflect(BaseRole.prototype, "BaseRole");
//# sourceMappingURL=BaseRole.js.map