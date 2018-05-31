var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerData = (function () {
    function PlayerData() {
        /**速度 */
        this.moveSpeed = 0;
        /**方向X */
        this.directionX = 0;
        /**方向Y */
        this.directionY = 0;
        /**舞台Y居中 */
        this.isCenterX = false;
        /**舞台Y居中 */
        this.isCenterY = false;
        /**地图坐标点 */
        this.mapXYPoint = new egret.Point(0, 0);
    }
    PlayerData.prototype.setMoveSpeed = function (speedTimes) {
        this.moveSpeed = speedTimes * 3;
    };
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map