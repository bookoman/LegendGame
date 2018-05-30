var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图加载item
 */
var MapSimpleLoader = (function () {
    function MapSimpleLoader(canvas, cx, cy, cellXs, cellYs, cellW, cellH) {
        this.gameCanvas = canvas;
        this.cx = cx;
        this.cy = cy;
        this.cellXs = cellXs;
        this.cellYs = cellYs;
        this.cellW = cellW;
        this.cellH = cellH;
    }
    MapSimpleLoader.prototype.load = function (mapId) {
        var blockId = this.cy * this.cellXs + this.cx + 1;
        if (this.imgLoader == null) {
            this.imgLoader = new ImageLoader();
        }
        this.imgLoader.load("resource/assets/outside/map/" + mapId + "/" + blockId + ".jpg", this.loadComplete, this);
        // console.log("resource/assets/outside/map/"+mapId + "/"+blockId+".jpg");
    };
    MapSimpleLoader.prototype.loadComplete = function (data) {
        //var cx:number = (this.blockId - 1) % this.cellXs;
        //var cy:number = Math.ceil(this.blockId / this.cellXs);
        //cy = cy == 0 ? 0 : cy - 1;
        var tx = this.cx * this.cellW;
        var ty = this.cy * this.cellH;
        // console.log(tx,ty);
        this.bitmap = TextureUtil.ins.bitmapdataToBitmap(data);
        this.bitmap.x = tx;
        this.bitmap.y = ty;
        this.gameCanvas.addChild(this.bitmap);
        // console.log("坐标",tx,ty);
    };
    MapSimpleLoader.prototype.dispose = function () {
        if (this.bitmap) {
            if (this.bitmap.parent) {
                this.bitmap.parent.removeChild(this.bitmap);
            }
            this.bitmap = null;
        }
        this.imgLoader = null;
    };
    return MapSimpleLoader;
}());
__reflect(MapSimpleLoader.prototype, "MapSimpleLoader");
//# sourceMappingURL=MapSimpleLoader.js.map