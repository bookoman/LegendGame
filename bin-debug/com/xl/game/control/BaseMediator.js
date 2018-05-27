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
var BaseMediator = (function (_super) {
    __extends(BaseMediator, _super);
    function BaseMediator(skinClass, moduleName) {
        var _this = _super.call(this) || this;
        _this.skinClass = skinClass;
        if (moduleName) {
            _this.moduleName = moduleName;
            var obj = ConfigManager.ins.getResJsonByName(moduleName);
            _this.loadingView = new LoadingUI();
            LayerManager.ins.addToLayer(_this.loadingView, LayerManager.TIP_LAYER, true, false, true);
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, _this.loadREsCompleted, _this);
            RES.loadConfig("resource/" + obj.url, "resource/");
        }
        else {
            _this.initSkin();
        }
        return _this;
    }
    BaseMediator.prototype.loadREsCompleted = function () {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadREsCompleted, this);
        //添加资源组加载完成事件
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //开始加载 preload 资源组
        RES.loadGroup(this.moduleName);
    };
    BaseMediator.prototype.onResourceLoadComplete = function () {
        //添加资源组加载完成事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        LayerManager.ins.removeToLyaer(this.loadingView, LayerManager.TIP_LAYER, true, false);
        this.initSkin();
    };
    BaseMediator.prototype.onResourceProgress = function () {
    };
    BaseMediator.prototype.initSkin = function () {
        this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
        this.skinName = this.skinClass;
    };
    BaseMediator.prototype.onSkinComplete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
        this.initView();
    };
    BaseMediator.prototype.initView = function () {
        this.addEvents();
    };
    BaseMediator.prototype.addEvents = function () {
    };
    BaseMediator.prototype.removeEvents = function () {
    };
    return BaseMediator;
}(eui.Component));
__reflect(BaseMediator.prototype, "BaseMediator");
//# sourceMappingURL=BaseMediator.js.map