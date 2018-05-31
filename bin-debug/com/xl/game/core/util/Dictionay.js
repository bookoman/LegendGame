var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionay = (function () {
    function Dictionay() {
        this.dic = {};
    }
    Dictionay.prototype.setValue = function (key, value) {
        this.dic[key] = value;
    };
    Dictionay.prototype.getValue = function (key) {
        return this.dic[key];
    };
    Dictionay.prototype.deleteValue = function (key) {
        delete this.dic[key];
    };
    /**是否有此属性 */
    Dictionay.prototype.hasProperty = function (key) {
        return this.dic.hasOwnProperty(key);
    };
    Object.defineProperty(Dictionay.prototype, "len", {
        get: function () {
            var l = 0;
            for (var key in this.dic) {
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