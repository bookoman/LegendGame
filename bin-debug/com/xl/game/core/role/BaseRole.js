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
        _this.animation = new dragonBones.Animation();
        return _this;
    }
    BaseRole.prototype.playAni = function (aniName) {
        if (this.isLoaded) {
        }
        else {
            var resObj = ConfigManager.ins.getResJsonByName("animation");
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadRESCompleted, this);
            RES.loadConfig("resource/" + resObj.url, "resource/");
            // RES.getResByUrl("resource/"+resObj.url,this.loadREsCompleted,this,RES.ResourceItem.TYPE_JSON);
        }
    };
    BaseRole.prototype.loadRESCompleted = function (e) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadRESCompleted, this);
        //添加资源组加载完成事件
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //开始加载 preload 资源组
        RES.loadGroup("role" + this.roleID);
    };
    BaseRole.prototype.onResourceLoadComplete = function () {
        //添加资源组加载完成事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        var url = "resource/assets/outside/ani/role/role" + this.roleID + "/" + this.roleID + ".png";
        console.log(".....", url, RES.getRes(url));
    };
    BaseRole.prototype.onResourceProgress = function () {
    };
    return BaseRole;
}(egret.Sprite));
__reflect(BaseRole.prototype, "BaseRole");
//# sourceMappingURL=BaseRole.js.map