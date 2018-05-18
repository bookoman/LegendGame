var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图加载item
 */
var MapSimpleLoader = (function () {
    function MapSimpleLoader(canvas, cellX, cellY, cellW, cellH) {
        this.gameCanvas = canvas;
        this.cellX = cellX;
        this.cellY = cellY;
        this.cellW = cellW;
        this.cellH = cellH;
    }
    MapSimpleLoader.prototype.load = function (mapId, blockId) {
        this.blockId = blockId;
        if (this.imgLoader == null) {
            this.imgLoader = new ImageLoader();
        }
        this.imgLoader.load("resource/assets/outside/map/" + mapId + "/" + blockId + ".jpg", this.loadComplete, this);
        // console.log("resource/assets/outside/map/"+mapId + "/"+blockId+".jpg");
    };
    MapSimpleLoader.prototype.loadComplete = function (data) {
        var cx = (this.blockId - 1) % this.cellX;
        var cy = Math.ceil(this.blockId / this.cellX);
        cy = cy == 0 ? 0 : cy - 1;
        var tx = cx * this.cellW;
        var ty = cy * this.cellH;
        if (this.blockId == 21) {
            console.log("坐标", tx, ty);
        }
        var bitmap = TextureUtil.ins.bitmapdataToBitmap(data);
        bitmap.x = tx;
        bitmap.y = ty;
        this.gameCanvas.addChild(bitmap);
        // console.log("坐标",tx,ty);
    };
    MapSimpleLoader.prototype.dispose = function () {
    };
    return MapSimpleLoader;
}());
__reflect(MapSimpleLoader.prototype, "MapSimpleLoader");
//# sourceMappingURL=MapSimpleLoader.js.map