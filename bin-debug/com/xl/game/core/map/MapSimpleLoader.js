var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图加载item
 */
var MapSimpleLoader = (function () {
    function MapSimpleLoader(canvas, cx, cy, cellXs, cellYs, cellW, cellH) {
        this.bitmap = null;
        this.gameCanvas = canvas;
        this.cx = cx;
        this.cy = cy;
        this.cellXs = cellXs;
        this.cellYs = cellYs;
        this.cellW = cellW;
        this.cellH = cellH;
        this.key = cx + "_" + cy;
        this.bitmap = new egret.Bitmap();
        this.texture = new egret.Texture();
    }
    MapSimpleLoader.prototype.load = function (mapId) {
        if (this.imgLoader == null) {
            var blockId = this.cy * this.cellXs + this.cx + 1;
            this.imgLoader = new ImageLoader();
            this.imgLoader.load("resource/assets/outside/map/" + mapId + "/" + blockId + ".jpg", this.loadComplete, this);
        }
    };
    MapSimpleLoader.prototype.loadComplete = function (data) {
        var tx = this.cx * this.cellW;
        var ty = this.cy * this.cellH;
        this.texture._setBitmapData(data);
        this.bitmap.$setTexture(this.texture);
        this.bitmap.x = tx;
        this.bitmap.y = ty;
        this.gameCanvas.addChild(this.bitmap);
    };
    MapSimpleLoader.prototype.dispose = function () {
        if (this.bitmap) {
            if (this.bitmap.parent) {
                this.bitmap.parent.removeChild(this.bitmap);
            }
            // this.bitmap = null;
        }
        // this.texture = null;
        // this.imgLoader = null;
    };
    return MapSimpleLoader;
}());
__reflect(MapSimpleLoader.prototype, "MapSimpleLoader");
//# sourceMappingURL=MapSimpleLoader.js.map