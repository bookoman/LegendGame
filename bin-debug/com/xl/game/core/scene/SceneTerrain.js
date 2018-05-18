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
        var cellX = this.mapLayerData.cellX;
        var cellY = this.mapLayerData.cellY;
        for (var i = 0; i < cellY; i++) {
            for (var j = 0; j < cellX; j++) {
                mapSimpleLoader = new MapSimpleLoader(this, cellX, cellY, this.cellW, this.cellH);
                var blockId = i * cellX + j + 1;
                // console.log("..."+blockId);
                mapSimpleLoader.load(this.mapId, blockId);
            }
        }
    };
    SceneTerrain.prototype.onScroll = function (x, y) {
    };
    SceneTerrain.prototype.calShowCell = function (x, y) {
        var cellX = Math.ceil(x / this.cellW);
        var cellY = y / this.cellH;
    };
    return SceneTerrain;
}(egret.Sprite));
__reflect(SceneTerrain.prototype, "SceneTerrain");
//# sourceMappingURL=SceneTerrain.js.map