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
 * 地形
 */
var SceneTerrain = (function (_super) {
    __extends(SceneTerrain, _super);
    function SceneTerrain(gameCanvas) {
        var _this = _super.call(this) || this;
        //地图切块（上下左右各个方向）x方向显示个数
        _this.showCellX = 2;
        //地图切块（上下左右各个方向）y方向显示个数
        _this.showCellY = 2;
        /**单个图块 */
        _this.cells = null;
        //this.gameCanvase = new egret.RenderTexture();
        _this.scaleX = 0.05;
        _this.scaleY = 0.05;
        LayerManager.ins.addToLayer(_this, LayerManager.TIP_LAYER, false, false, false);
        _this.cells = new Array();
        return _this;
    }
    SceneTerrain.prototype.create = function (mapId, mw, mh, gw, gh, cellW, cellH) {
        this.mapId = mapId;
        this.mw = mw;
        this.mh = mh;
        this.gw = gw;
        this.gh = gh;
        this.cellW = cellW;
        this.cellH = cellH;
        this.mapLayerData = new MapLayerVo();
        this.builderLayerData = new MapLayerVo();
        this.maskLayerData = new MapLayerVo();
        var textLoader = new TextLoader();
        textLoader.load("resource/assets/outside/map/" + this.mapId + "/Legend.json", this.loadAllMapJsonComplete, this);
    };
    /**地图数据加载完成 */
    SceneTerrain.prototype.loadAllMapJsonComplete = function (data) {
        var _this = this;
        var jsonObj = JSON.parse(data);
        var layers = jsonObj["layers"];
        layers.forEach(function (layer) {
            if (layer["name"] == "background") {
                _this.mapLayerData.parse(layer);
            }
            else if (layer["name"] == "builder") {
                _this.builderLayerData.parse(layer);
            }
            else if (layer["name"] == "mask") {
                _this.maskLayerData.parse(layer);
            }
        });
        this.updateTerain();
    };
    SceneTerrain.prototype.updateTerain = function () {
        var mapSimpleLoader;
        var cellXs = this.mapLayerData.cellX;
        var cellYs = this.mapLayerData.cellY;
        for (var i = 0; i < cellYs; i++) {
            for (var j = 0; j < cellXs; j++) {
                mapSimpleLoader = new MapSimpleLoader(this, j, i, cellXs, cellYs, this.cellW, this.cellH);
                mapSimpleLoader.load(this.mapId);
            }
        }
    };
    SceneTerrain.prototype.onScroll = function (x, y) {
    };
    /**
     * 计算格子加载数组，人物脚下先加载，然后由上顺时针加载一圈格子，内圈向外圈加载
     */
    SceneTerrain.prototype.calShowCell = function (x, y) {
        this.cells.splice(0, this.cells.length);
        var cellX = Math.ceil(x / this.cellW);
        var cellY = Math.ceil(y / this.cellH);
        //加载个数
        var cellXs = this.showCellX * 2 + 1;
        var cellYs = this.showCellY * 2 + 1;
        var mapSimpleLoader;
        //圈数
        var circleSum = Math.max(this.showCellX, this.showCellY);
        for (var i = 1; i <= circleSum; i++) {
            if (this.showCellX >= i) {
            }
            if (this.showCellY <= i) {
            }
        }
        for (var i = 0; i < cellYs; i++) {
            for (var j = 0; j < cellXs; j++) {
                mapSimpleLoader = new MapSimpleLoader(this, cellXs, cellYs, i, j, this.cellW, this.cellH);
                mapSimpleLoader.load(this.mapId);
            }
        }
    };
    return SceneTerrain;
}(egret.Sprite));
__reflect(SceneTerrain.prototype, "SceneTerrain");
//# sourceMappingURL=SceneTerrain.js.map