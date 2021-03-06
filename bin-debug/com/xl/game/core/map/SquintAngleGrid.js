var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* 地图斜视网格化
* 公式一：logic.x  = ( stage.x / TileWidth ) - ( logic.y & 1 ) * ( TileWidth / 2 );
*        logic.y = ( 2 * stage.y ) / TileHeigth;
* 公式二：stage.x = logic.x * TileWidth + ( logic.y & 1) * ( TileWidth / 2 );
*        stage.y = logic.y * TileHeigth / 2;
*/
var SquintAngleGrid = (function () {
    //初始化，设置地图网格横向纵向的数量及显示时大地图的范围
    /**
     *
     * @param mapWid 地图宽
     * @param mapHei 地图高
     */
    function SquintAngleGrid(mapWid, mapHei, gw, gh, isDrawGrid) {
        //地图宽
        this.mapWid = 0;
        //地图高
        this.mapHei = 0;
        this.mapGridAry = null;
        this.mapWid = mapWid; //地图的宽
        this.mapHei = mapHei; //地图的高
        this.isDrawGrid = isDrawGrid && isDrawGrid == true ? true : false;
        this.diamondW = gw;
        this.diamondH = gh;
        // this.initGrid();
    }
    SquintAngleGrid.prototype.initGrid = function () {
        this.mapGridAry = [];
        //格子坐标计算
        var gridXNum = Math.floor(this.mapWid / GameConfig.MAP_GRID_WIDTH);
        var gridYNum = Math.floor(this.mapHei / GameConfig.MAP_GRID_HEIGHT);
        //格子y方向个数计算公式，y = n + (n - 1)
        gridYNum = gridYNum + gridYNum - 1;
        var grid;
        for (var y = 0; y < gridYNum; y++) {
            for (var x = 0; x < gridXNum; x++) {
                grid = new MapGrid(x, y);
                grid.op = this.gridToViewPoint(x, y);
                //绘制格子
                if (this.isDrawGrid) {
                    grid.drawTitle();
                }
                this.mapGridAry.push(grid);
            }
        }
        this.mapGridAry.length;
    };
    //屏幕坐标转换成游戏格子坐标  
    /**
     *
     * @param x 舞台坐标x
     * @param y 舞台坐标y
     */
    SquintAngleGrid.prototype.getGx = function (x, y) {
        return (x / GameConfig.MAP_GRID_WIDTH) - (y & 1) * (GameConfig.MAP_GRID_WIDTH / 2);
    };
    /**
     *
     * @param x 舞台坐标x
     * @param y 舞台坐标y
     */
    SquintAngleGrid.prototype.getGy = function (x, y) {
        return (2 * y) / GameConfig.MAP_GRID_HEIGHT;
    };
    /**
     * 根据格子坐标得到舞台坐标（格子中心点）
     * @param gx
     * @param gy
     */
    SquintAngleGrid.prototype.gridToViewPoint = function (gx, gy) {
        var px = gx * GameConfig.MAP_GRID_WIDTH + (gy & 1) * (GameConfig.MAP_GRID_WIDTH / 2);
        var py = gy * GameConfig.MAP_GRID_HEIGHT / 2;
        return new egret.Point(px, py);
    };
    SquintAngleGrid.prototype.dispose = function () {
        this.mapGridAry.forEach(function (grid) {
            grid.clearDraw();
        });
        this.mapGridAry.splice(0, this.mapGridAry.length);
    };
    return SquintAngleGrid;
}());
__reflect(SquintAngleGrid.prototype, "SquintAngleGrid");
//# sourceMappingURL=SquintAngleGrid.js.map