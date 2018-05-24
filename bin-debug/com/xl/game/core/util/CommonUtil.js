var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonUtil = (function () {
    function CommonUtil() {
    }
    /**
     * 一个数的N次幂
     */
    CommonUtil.calNumPow = function (num, pow) {
        var result = num;
        for (var i = 0; i < pow; i++) {
            result = result * num;
        }
        return result;
    };
    return CommonUtil;
}());
__reflect(CommonUtil.prototype, "CommonUtil");
//# sourceMappingURL=CommonUtil.js.map