var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextureUtil = (function () {
    function TextureUtil() {
        this.texture = new egret.Texture();
    }
    Object.defineProperty(TextureUtil, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new TextureUtil();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    TextureUtil.prototype.bitmapdataToBitmap = function (bmd) {
        var bitmap = new egret.Bitmap();
        this.texture._setBitmapData(bmd);
        bitmap.$setTexture(this.texture);
        return bitmap;
    };
    TextureUtil._ins = null;
    return TextureUtil;
}());
__reflect(TextureUtil.prototype, "TextureUtil");
//# sourceMappingURL=TextureUtil.js.map