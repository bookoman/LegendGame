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
var TextLoader = (function (_super) {
    __extends(TextLoader, _super);
    function TextLoader() {
        return _super.call(this) || this;
    }
    TextLoader.prototype.load = function (url, method, proto) {
        this.url = url;
        this.proto = proto;
        this.method = method;
        if (this.urlLoader == null) {
            this.urlLoader = new egret.URLLoader();
        }
        this.urlLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleted, this);
        this.urlLoader.load(new egret.URLRequest(url));
    };
    TextLoader.prototype.loadCompleted = function (e) {
        this.urlLoader.removeEventListener(egret.Event.COMPLETE, this.loadCompleted, this);
        this.method.apply(this.proto, [this.urlLoader.data]);
    };
    return TextLoader;
}(BaseLoader));
__reflect(TextLoader.prototype, "TextLoader");
//# sourceMappingURL=TextLoader.js.map