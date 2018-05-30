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
        _this.cellsDic = null;
        /**视框 */
        _this.viewPort = null;
        /**显示图块矩形区域 */
        _this.showCellPort = null;
        //this.gameCanvase = new egret.RenderTexture();
        _this.scaleX = 1;
        _this.scaleY = 1;
        LayerManager.ins.addToLayer(_this, LayerManager.BG_TERRAIN_LAYER, false, false, false);
        _this.cellsDic = new Dictionay();
        _this.viewPort = new egret.Rectangle(0, 0, GameConfig.STAGE_WIDTH, GameConfig.STAGE_HEIGHT);
        return _this;
    }
    TerrainScene.prototype.create = function (mapId, mapW, mapH, gw, gh, cellW, cellH) {
        this.mapId = mapId;
        this.mapW = mapW;
        this.mapH = mapH;
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
        this.calShowCell(rx, ry);
        var mapSimpleLoader;
        for (var key in this.cellsDic) {
            if (this.cellsDic.hasOwnProperty(key)) {
                mapSimpleLoader = this.cellsDic[key];
                mapSimpleLoader.load(this.mapId);
            }
        }
    };
    /**地图滚动 */
    TerrainScene.prototype.terainScroll = function (rx, ry) {
        GameDataManager.ins.playerData.isCenterX = false;
        GameDataManager.ins.playerData.isCenterY = false;
        var mapX;
        var mapY;
        if (rx - this.viewPort.width / 2 < 0) {
            mapX = 0;
        }
        else if (rx + this.viewPort.width / 2 > this.mapW) {
            mapX = -(this.mapW - this.viewPort.width);
        }
        else {
            mapX = -(rx - this.viewPort.width / 2);
            GameDataManager.ins.playerData.isCenterX = true;
        }
        if (ry - this.viewPort.height / 2 < 0) {
            mapY = 0;
        }
        else if (ry + this.viewPort.height / 2 > this.mapH) {
            mapY = -(this.mapH - this.viewPort.height);
        }
        else {
            mapY = -(ry - this.viewPort.height / 2);
            GameDataManager.ins.playerData.isCenterY = true;
        }
        this.x = mapX;
        this.y = mapY;
        //计算是否更新地图
        if (this.showCellPort == null) {
            var scx = rx - this.cellW * this.showCellX - this.cellW / 2;
            var scy = ry - this.cellH * this.showCellX - this.cellH / 2;
            this.showCellPort = new egret.Rectangle(scx, scy, this.cellW * (this.showCellX + 1), this.cellH * (this.showCellY + 1));
        }
        if (rx > this.showCellPort.x && rx < this.showCellPort.x + this.showCellPort.width && ry > this.showCellPort.y && ry < this.showCellPort.y + this.showCellPort.height) {
            return;
        }
        else {
            this.showCellPort = null;
        }
        this.updateTerain(rx, ry);
    };
    /**移除远离图块 */
    TerrainScene.prototype.removeFarCell = function (centerCellX, centerCellY) {
        var mapSimpleLoader;
        for (var key in this.cellsDic) {
            if (this.cellsDic.hasOwnProperty(key)) {
                mapSimpleLoader = this.cellsDic[key];
                if (mapSimpleLoader.cx < centerCellX - this.showCellX || mapSimpleLoader.cx > centerCellX + this.showCellX ||
                    mapSimpleLoader.cy < centerCellY - this.showCellY || mapSimpleLoader.cy > centerCellY + this.showCellY) {
                    this.cellsDic.deleteValue(mapSimpleLoader.key);
                    mapSimpleLoader.dispose();
                }
            }
        }
    };
    /**
     * 计算格子加载图块数组，人物脚下先加载，然后由上顺时针加载一圈格子图块，内圈向外圈加载
     */
    TerrainScene.prototype.calShowCell = function (x, y) {
        var centerCellX = Math.floor(x / this.cellW);
        var centerCellY = Math.floor(y / this.cellH);
        this.removeFarCell(centerCellX, centerCellY);
        //加载个数
        var cellXs = this.mapLayerData.cellX;
        var cellYs = this.mapLayerData.cellY;
        var mapSimpleLoader = new MapSimpleLoader(this, centerCellX, centerCellY, cellXs, cellYs, this.cellW, this.cellH);
        // this.cells.push(mapSimpleLoader);
        this.cellsDic.setValue(mapSimpleLoader.key, mapSimpleLoader);
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
                var key = cellX + "_" + cellY;
                if (!this.cellsDic.getValue(key)) {
                    mapSimpleLoader = new MapSimpleLoader(this, cellX, cellY, cellXs, cellYs, this.cellW, this.cellH);
                    this.cellsDic.setValue(mapSimpleLoader.key, mapSimpleLoader);
                }
            }
        }
        // console.log(".............."+this.cellsDic.len);
    };
    /**超出地图边界 */
    TerrainScene.prototype.isOutOfMap = function (tx, ty) {
        return tx < 0 || ty < 0 || tx > this.mapW || ty > this.mapH;
    };
    TerrainScene.prototype.dispose = function () {
    };
    return TerrainScene;
}(BaseScene));
__reflect(TerrainScene.prototype, "TerrainScene");
//# sourceMappingURL=TerrainScene.js.map