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
/*
* name;
*/
var MapGrid = (function (_super) {
    __extends(MapGrid, _super);
    function MapGrid(px, py) {
        var _this = _super.call(this) || this;
        _this.px = px;
        _this.py = py;
        return _this;
    }
    MapGrid.prototype.drawTitle = function () {
        // var diamondWF:number = GameConfig.LINEUP_GRID_WIDTH / 2;
        // var diamondHF:number = GameConfig.LINEUP_GRID_HEIGHT / 2;
        // this.graphics.drawPoly(0,0,[0,-diamondHF,diamondWF,0,0,diamondHF,-diamondWF,0],"#00ff00","#ff0000");
        // var text:Laya.Label = new Laya.Label();
        // text.fontSize = 24;
        // text.text = this.px + "," + this.py;
        // text.width = 60;
        // text.height = 30;
        // this.addChild(text);
        // this.x = this.op.x + diamondWF;
        // this.y = this.op.y + diamondHF + GameConfig.MAP_INIT_Y + GameConfig.BATTLE_SCENE_OFFSET_Y;
        // LayerManager.ins.addToLayer(this,LayerManager.BG_LAYER,false,true,false);
    };
    MapGrid.prototype.clearDraw = function () {
        // this.removeSelf();
    };
    return MapGrid;
}(egret.Sprite));
__reflect(MapGrid.prototype, "MapGrid");
//# sourceMappingURL=MapGrid.js.map