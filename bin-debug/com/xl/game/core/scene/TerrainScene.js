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
        var _this = this;
        this.calShowCell(rx, ry);
        this.cells.forEach(function (mapSimpleLoader) {
            mapSimpleLoader.load(_this.mapId);
        });
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
            mapX = this.mapW - this.viewPort.width;
        }
        else {
            mapX = -(rx - this.viewPort.width / 2);
            GameDataManager.ins.playerData.isCenterX = true;
        }
        if (ry - this.viewPort.height / 2 < 0) {
            mapY = 0;
        }
        else if (ry + this.viewPort.height / 2 > this.mapH) {
            mapY = this.mapH - this.viewPort.height;
        }
        else {
            mapY = -(ry - this.viewPort.height / 2);
            GameDataManager.ins.playerData.isCenterY = true;
        }
        this.x = mapX;
        this.y = mapY;
        //计算是否更新地图
        if (this.cells.length > 0) {
            var leftX = rx - this.cellW * this.showCellX - this.cellW / 2 + this.viewPort.width / 2;
            var rightX = rx + this.cellW * this.showCellX + this.cellW / 2 - this.viewPort.width / 2;
            var upY = rx - this.cellH * this.showCellX - this.cellH / 2 + this.viewPort.height / 2;
            var downY = rx + this.cellH * this.showCellX + this.cellH / 2 - this.viewPort.height / 2;
            if (rx > leftX && rx < rightX && ry > upY && ry < downY) {
                return;
            }
        }
        this.updateTerain(rx, ry);
    };
    /**移除远离图块 */
    TerrainScene.prototype.removeFarCell = function (centerCellX, centerCellY) {
        var mapSimpleLoader;
        for (var i = 0; i < this.cells.length; i++) {
            mapSimpleLoader = this.cells[i];
            if (mapSimpleLoader.cx < centerCellX - this.showCellX || mapSimpleLoader.cx > centerCellX + this.showCellX ||
                mapSimpleLoader.cy < centerCellY - this.showCellY || mapSimpleLoader.cy > centerCellY + this.showCellY) {
                this.cells.splice(i, 1);
                mapSimpleLoader.dispose();
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
        return tx < 0 || ty < 0 || tx > this.mapW || ty > this.mapH;
    };
    TerrainScene.prototype.dispose = function () {
    };
    return TerrainScene;
}(BaseScene));
__reflect(TerrainScene.prototype, "TerrainScene");
//# sourceMappingURL=TerrainScene.js.map