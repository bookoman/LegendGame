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
        /**视框(舞台大小) */
        _this.viewPort = null;
        /**显示图块矩形区域 */
        _this.showCellPort = null;
        /**模糊地图 */
        _this.vagueMap = null;
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
        var imgLoader = new ImageLoader();
        imgLoader.load("resource/assets/outside/map/" + mapId + "/mini.jpg", this.vagueComplete, this);
    };
    TerrainScene.prototype.vagueComplete = function (data) {
        this.vagueMap = TextureUtil.ins.bitmapdataToBitmap(data);
        this.vagueMap.width = this.mapW;
        this.vagueMap.height = this.mapH;
        this.addChildAt(this.vagueMap, 0);
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
        this.calShowCellLoad(RoleManager.ins.selfRole.x, RoleManager.ins.selfRole.y);
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
            this.showCellPort = new egret.Rectangle(scx, scy, this.cellW * (this.showCellX * 2 + 1), this.cellH * (this.showCellY * 2 + 1));
        }
        var leftX = this.showCellPort.x + this.viewPort.width / 2;
        var rightX = this.showCellPort.x + this.showCellPort.width - this.viewPort.width / 2;
        var topY = this.showCellPort.y + this.viewPort.height / 2;
        var bottomY = this.showCellPort.y + this.showCellPort.height - this.viewPort.height / 2;
        if (rx > leftX && rx < rightX && ry > topY && ry < bottomY) {
            return;
        }
        else {
            this.showCellPort = null;
        }
        this.calShowCellLoad(rx, ry);
    };
    /**移除远离图块 */
    TerrainScene.prototype.removeFarCell = function (centerCellX, centerCellY) {
        var mapSimpleLoader;
        for (var key in this.cellsDic.dic) {
            if (this.cellsDic.hasProperty(key)) {
                mapSimpleLoader = this.cellsDic.getValue(key);
                if (mapSimpleLoader.cx < centerCellX - this.showCellX || mapSimpleLoader.cx > centerCellX + this.showCellX ||
                    mapSimpleLoader.cy < centerCellY - this.showCellY || mapSimpleLoader.cy > centerCellY + this.showCellY) {
                    mapSimpleLoader.dispose();
                    this.cellsDic.deleteValue(mapSimpleLoader.key);
                }
            }
        }
    };
    /**
     * 计算格子加载图块数组，人物脚下先加载，然后由上顺时针加载一圈格子图块，内圈向外圈加载
     */
    TerrainScene.prototype.calShowCellLoad = function (x, y) {
        var centerCellX = Math.floor(x / this.cellW);
        var centerCellY = Math.floor(y / this.cellH);
        this.removeFarCell(centerCellX, centerCellY);
        //加载个数
        var cellXs = this.mapLayerData.cellX;
        var cellYs = this.mapLayerData.cellY;
        var mapSimpleLoader;
        var key = centerCellX + "_" + centerCellY;
        if (!this.cellsDic.getValue(key)) {
            mapSimpleLoader = new MapSimpleLoader(this, centerCellX, centerCellY, cellXs, cellYs, this.cellW, this.cellH);
            mapSimpleLoader.load(this.mapId);
            this.cellsDic.setValue(mapSimpleLoader.key, mapSimpleLoader);
        }
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
                key = cellX + "_" + cellY;
                if (!this.cellsDic.getValue(key)) {
                    mapSimpleLoader = new MapSimpleLoader(this, cellX, cellY, cellXs, cellYs, this.cellW, this.cellH);
                    mapSimpleLoader.load(this.mapId);
                    this.cellsDic.setValue(mapSimpleLoader.key, mapSimpleLoader);
                }
            }
        }
        // console.log("子对象个数",this.numChildren,this.cellsDic.len);
    };
    /**超出地图边界 */
    TerrainScene.prototype.isOutOfMap = function (tx, ty) {
        return tx < 0 || ty < 0 || tx > this.mapW || ty > this.mapH;
    };
    /**销毁地图 */
    TerrainScene.prototype.dispose = function () {
        this.removeChildren();
        if (this.vagueMap) {
            if (this.vagueMap.parent)
                this.vagueMap.parent.removeChild(this.vagueMap);
        }
    };
    return TerrainScene;
}(BaseScene));
__reflect(TerrainScene.prototype, "TerrainScene");
//# sourceMappingURL=TerrainScene.js.map