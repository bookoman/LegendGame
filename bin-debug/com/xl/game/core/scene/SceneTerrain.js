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
        _this.gameCanvase = new egret.RenderTexture();
        LayerManager.ins.addToLayer(new egret.Bitmap(_this.gameCanvase), LayerManager.TIP_LAYER, false, false, false);
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
        var cellX = this.mapLayerData.width;
        var cellY = this.mapLayerData.height;
        for (var i = 0; i < 21; i++) {
            for (var j = 0; j < 19; j++) {
                mapSimpleLoader = new MapSimpleLoader(this.gameCanvase, cellX, cellY, this.cellW, this.cellH);
                mapSimpleLoader.load(this.mapId, (i + 1) * (j + 1));
            }
        }
    };
    return SceneTerrain;
}(egret.Sprite));
__reflect(SceneTerrain.prototype, "SceneTerrain");
//# sourceMappingURL=SceneTerrain.js.map