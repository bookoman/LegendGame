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
var TerrainScene = (function (_super) {
    __extends(TerrainScene, _super);
    function TerrainScene(gameCanvas) {
        var _this = _super.call(this) || this;
        //地图切块（上下左右各个方向）x方向显示个数
        _this.showCellX = 2;
        //地图切块（上下左右各个方向）y方向显示个数
        _this.showCellY = 2;
        /**单个图块 */
        _this.cells = null;
        //this.gameCanvase = new egret.RenderTexture();
        _this.scaleX = 1;
        _this.scaleY = 1;
        LayerManager.ins.addToLayer(_this, LayerManager.BG_TERRAIN_LAYER, false, false, false);
        _this.cells = new Array();
        return _this;
    }
    TerrainScene.prototype.create = function (mapId, mw, mh, gw, gh, cellW, cellH) {
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
    TerrainScene.prototype.loadAllMapJsonComplete = function (data) {
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
        this.updateTerain(RoleManager.ins.selfRole.x, RoleManager.ins.selfRole.y);
    };
    TerrainScene.prototype.updateTerain = function (rx, ry) {
        // var mapSimpleLoader:MapSimpleLoader;
        // var cellXs:number = this.mapLayerData.cellX;
        // var cellYs:number = this.mapLayerData.cellY;
        // for(var i = 0;i < cellYs;i++)
        // {
        // 	for(var j = 0;j < cellXs;j++)
        // 	{
        // 		mapSimpleLoader = new MapSimpleLoader(this,j , i ,cellXs,cellYs,this.cellW,this.cellH);
        // 		mapSimpleLoader.load(this.mapId);
        // 	}
        // } 
        var _this = this;
        this.calShowCell(rx, ry);
        this.cells.forEach(function (mapSimpleLoader) {
            mapSimpleLoader.load(_this.mapId);
        });
    };
    TerrainScene.prototype.onScroll = function (x, y) {
    };
    /**
     * 计算格子加载数组，人物脚下先加载，然后由上顺时针加载一圈格子，内圈向外圈加载
     */
    TerrainScene.prototype.calShowCell = function (x, y) {
        this.cells.splice(0, this.cells.length);
        var centerCellX = Math.floor(x / this.cellW);
        var centerCellY = Math.floor(y / this.cellH);
        //加载个数
        var cellXs = this.mapLayerData.cellX;
        var cellYs = this.mapLayerData.cellY;
        var mapSimpleLoader = new MapSimpleLoader(this, centerCellX, centerCellY, cellXs, cellYs, this.cellW, this.cellH);
        this.cells.push(mapSimpleLoader);
        //圈数
        var circleSum = Math.max(this.showCellX, this.showCellY);
        var cellX;
        var cellY;
        var edge = 1; //边个数
        var sum = 0; //一圈总数
        for (var i = 1; i <= circleSum; i++) {
            edge = edge + 2;
            sum = edge * 4 - 4;
            for (var j = 0; j < sum; j++) {
                if (j < edge) {
                    if (j == 0) {
                        cellX = centerCellX - Math.max(1, (edge - 1) / 2);
                        cellY = centerCellY - i * 1;
                    }
                    else {
                        cellX++;
                    }
                }
                else if (j < 2 * edge - 1) {
                    cellY++;
                }
                else if (j < 3 * edge - 2) {
                    cellX--;
                }
                else if (j < 4 * edge - 3) {
                    cellY--;
                }
                //超出显示边界判断
                if (cellX > this.showCellX + centerCellX || i > this.showCellY + centerCellY) {
                    continue;
                }
                //超出地图边界判断
                if (this.isOutOfMap(cellX * this.cellW, cellY * this.cellH)) {
                    continue;
                }
                mapSimpleLoader = new MapSimpleLoader(this, cellX, cellY, cellXs, cellYs, this.cellW, this.cellH);
                this.cells.push(mapSimpleLoader);
                // console.log(cellX,cellY);
            }
        }
    };
    /**超出地图边界 */
    TerrainScene.prototype.isOutOfMap = function (tx, ty) {
        return tx < 0 || ty < 0 || tx > this.mw || ty > this.mh;
    };
    TerrainScene.prototype.dispose = function () {
    };
    return TerrainScene;
}(BaseScene));
__reflect(TerrainScene.prototype, "TerrainScene");
//# sourceMappingURL=TerrainScene.js.map