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
var ImageLoader = (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader() {
        return _super.call(this) || this;
    }
    ImageLoader.prototype.load = function (url, method, proto) {
        this.url = url;
        this.proto = proto;
        this.method = method;
        if (this.imgLoader == null) {
            this.imgLoader = new egret.ImageLoader();
        }
        this.imgLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleted, this);
        this.imgLoader.load(url);
    };
    ImageLoader.prototype.loadCompleted = function (e) {
        this.imgLoader.removeEventListener(egret.Event.COMPLETE, this.loadCompleted, this);
        this.method.apply(this.proto, [this.imgLoader.data]);
    };
    return ImageLoader;
}(BaseLoader));
__reflect(ImageLoader.prototype, "ImageLoader");
//# sourceMappingURL=ImageLoader.js.map