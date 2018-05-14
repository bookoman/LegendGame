var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var MapLayerVo = (function () {
    function MapLayerVo() {
    }
    MapLayerVo.prototype.parse = function (layer) {
        this.data = layer["data"];
        this.name = layer["name"];
        this.width = layer["width"];
        this.height = layer["height"];
    };
    return MapLayerVo;
}());
__reflect(MapLayerVo.prototype, "MapLayerVo");
//# sourceMappingURL=MapLayerVo.js.map