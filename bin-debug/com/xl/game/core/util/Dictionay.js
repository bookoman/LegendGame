var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionay = (function () {
    function Dictionay() {
    }
    Dictionay.prototype.setValue = function (key, value) {
        this[key] = value;
    };
    Dictionay.prototype.getValue = function (key) {
        return this[key];
    };
    Dictionay.prototype.deleteValue = function (key) {
        delete this[key];
    };
    Object.defineProperty(Dictionay.prototype, "len", {
        get: function () {
            var l = 0;
            for (var key in this) {
                l++;
            }
            return l;
        },
        enumerable: true,
        configurable: true
    });
    return Dictionay;
}());
__reflect(Dictionay.prototype, "Dictionay");
//# sourceMappingURL=Dictionay.js.map