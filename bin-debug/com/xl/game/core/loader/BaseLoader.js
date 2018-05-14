var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseLoader = (function () {
    function BaseLoader() {
    }
    BaseLoader.prototype.load = function (url, method, proto) {
    };
    return BaseLoader;
}());
__reflect(BaseLoader.prototype, "BaseLoader");
//# sourceMappingURL=BaseLoader.js.map