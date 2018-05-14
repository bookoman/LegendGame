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
/**
 * 地图加载item
 */
var MapSimpleLoader = (function (_super) {
    __extends(MapSimpleLoader, _super);
    function MapSimpleLoader(canvas, cellX, cellY, cellW, cellH) {
        var _this = _super.call(this) || this;
        _this.gameCanvas = canvas;
        _this.cellX = cellX;
        _this.cellY = cellY;
        _this.cellW = cellW;
        _this.cellH = cellH;
        return _this;
    }
    MapSimpleLoader.prototype.load = function (mapId, blockId) {
        this.blockId = blockId;
        if (this.imgLoader == null) {
            this.imgLoader = new ImageLoader();
        }
        this.imgLoader.load("resource/assets/outside/map/" + mapId + "/" + blockId + ".jpg", this.loadComplete, this);
        console.log("resource/assets/outside/map/" + mapId + "/" + blockId + ".jpg");
    };
    MapSimpleLoader.prototype.loadComplete = function (data) {
        var cx = this.blockId % this.cellX;
        cx = cx == 0 ? 0 : cx - 1;
        var cy = this.blockId / this.cellY;
        cy = cy == 0 ? 0 : cy - 1;
        var tx = cx * this.cellW;
        var ty = cy * this.cellH;
        this.gameCanvas.drawToTexture(data, new egret.Rectangle(tx, ty, data.width, data.height));
    };
    return MapSimpleLoader;
}(egret.Texture));
__reflect(MapSimpleLoader.prototype, "MapSimpleLoader");
//# sourceMappingURL=MapSimpleLoader.js.map