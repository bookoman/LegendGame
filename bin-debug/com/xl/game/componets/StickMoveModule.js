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
 * 左下角虚拟手柄
 */
var StickMoveModule = (function (_super) {
    __extends(StickMoveModule, _super);
    function StickMoveModule(parent) {
        var _this = _super.call(this) || this;
        /**方向X */
        _this.directionX = 0;
        /**方向Y */
        _this.directionY = 0;
        /**速度倍率 > 0.8 ? 2 : 1  */
        _this.moveSpeedTimes = 0;
        _this.componentW = 400;
        _this.componentH = 400;
        _this.contain = new egret.Sprite();
        _this.contain.x = 0;
        _this.contain.y = GameConfig.STAGE_HEIGHT - _this.componentH;
        parent.addChild(_this.contain);
        var texture = RES.getRes("bg_png");
        _this.centerBg = new eui.Image(texture);
        _this.centerBg.width = texture.textureWidth;
        _this.centerBg.height = texture.textureHeight;
        _this.centerBg.anchorOffsetX = _this.centerBg.width / 2;
        _this.centerBg.anchorOffsetY = _this.centerBg.height / 2;
        _this.centerBg.x = _this.componentW / 2;
        _this.centerBg.y = _this.componentH / 2;
        texture = RES.getRes("bar_png");
        _this.thumb = new eui.Image(texture);
        _this.thumb.width = texture.textureWidth;
        _this.thumb.height = texture.textureHeight;
        _this.thumb.anchorOffsetX = _this.thumb.width / 2;
        _this.thumb.anchorOffsetY = _this.thumb.height / 2;
        _this.thumb.x = _this.componentW / 2;
        _this.thumb.y = _this.componentW / 2;
        _this.thumb.visible = false;
        _this.contain.addChild(_this.thumb);
        _this.contain.addChild(_this.centerBg);
        _this.touchArea = new eui.Rect(_this.componentW, _this.componentH, 0xd5d5d5);
        _this.touchArea.name = "stickTouch";
        _this.touchArea.alpha = 0;
        _this.contain.addChild(_this.touchArea);
        _this.initX = _this.centerBg.x;
        _this.initY = _this.centerBg.y;
        _this.touchId = -1;
        _this.radius = 150;
        _this.curPos = new egret.Point(_this.initX, _this.initY);
        _this.touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchDown, _this);
        return _this;
    }
    StickMoveModule.prototype.Trigger = function (evt) {
        this.onTouchDown(evt);
    };
    StickMoveModule.prototype.onTouchDown = function (evt) {
        console.log("mouse down");
        if (this.touchId == -1) {
            this.touchId = evt.touchId;
            if (this.tweener != null) {
                // this.tweener.clear();
                this.tweener = null;
            }
            var bx = evt.stageX - this.contain.x;
            var by = evt.stageY - this.contain.y;
            if (bx < 0)
                bx = 0;
            else if (bx > this.touchArea.width)
                bx = this.touchArea.width;
            if (by > this.touchArea.height)
                by = this.touchArea.height;
            else if (by < this.touchArea.y)
                by = this.touchArea.y;
            this.lastStageX = bx;
            this.lastStageY = by;
            this.startStageX = bx;
            this.startStageY = by;
            this.centerBg.visible = true;
            this.thumb.visible = true;
            this.centerBg.x = this.initX;
            this.centerBg.y = this.initY;
            this.thumb.x = bx;
            this.thumb.y = by;
            var deltaX = bx - this.initX;
            var deltaY = by - this.initY;
            var degrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            this.thumb.rotation = degrees + 90;
            this.contain.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            this.contain.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchUp, this);
        }
    };
    StickMoveModule.prototype.OnTouchUp = function (evt) {
        console.log("mouse up");
        if (this.touchId != -1 && evt.touchId == this.touchId) {
            this.touchId = -1;
            this.thumb.rotation = this.thumb.rotation + 180;
            this.centerBg.visible = false;
            this.tweener = egret.Tween.get(this.thumb, {
                loop: false,
                onChange: null,
                onChangeObj: this,
            });
            this.tweener.to({ x: this.initX, y: this.initY }, 300)
                .call(this.onTweenComplete, this, ["param1", { key: "key", value: 3 }]);
            this.contain.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            this.contain.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchUp, this);
            // this.dispatchEvent(JoystickModule.JoystickUp);
        }
    };
    StickMoveModule.prototype.onTweenComplete = function () {
        this.tweener = null;
        // this.thumb.selected = false;
        this.thumb.rotation = 0;
        this.thumb.visible = false;
        this.centerBg.visible = true;
        this.centerBg.x = this.initX;
        this.centerBg.y = this.initY;
    };
    StickMoveModule.prototype.OnTouchMove = function (evt) {
        if (evt.target.name != "stickTouch") {
            // this.OnTouchUp(evt);
            return;
        }
        if (this.touchId != -1 && evt.touchId == this.touchId) {
            var bx = evt.stageX - this.contain.x;
            var by = evt.stageY - this.contain.y;
            var moveX = bx - this.lastStageX;
            var moveY = by - this.lastStageY;
            this.lastStageX = bx;
            this.lastStageY = by;
            var buttonX = this.thumb.x + moveX;
            var buttonY = this.thumb.y + moveY;
            var offsetX = buttonX - this.startStageX;
            var offsetY = buttonY - this.startStageY;
            var rad = Math.atan2(offsetY, offsetX);
            var degree = rad * 180 / Math.PI;
            this.thumb.rotation = degree + 90;
            var maxX = this.radius * Math.cos(rad);
            var maxY = this.radius * Math.sin(rad);
            if (Math.abs(offsetX) > Math.abs(maxX))
                offsetX = maxX;
            if (Math.abs(offsetY) > Math.abs(maxY))
                offsetY = maxY;
            buttonX = this.startStageX + offsetX;
            buttonY = this.startStageY + offsetY;
            if (buttonX < 0)
                buttonX = 0;
            if (buttonY > this.componentH)
                buttonY = this.componentH;
            this.thumb.x = buttonX;
            this.thumb.y = buttonY;
            if (this.thumb.rotation > 0 && this.thumb.rotation <= 90) {
                this.directionX = 1;
                this.directionY = -1;
            }
            else if (this.thumb.rotation > 90 && this.thumb.rotation <= 180) {
                this.directionX = 1;
                this.directionY = 1;
            }
            else if (this.thumb.rotation > 180 && this.thumb.rotation < 270) {
                this.directionX = -1;
                this.directionY = -1;
            }
            else {
                this.directionX = -1;
                this.directionY = 1;
            }
            var moveDisX = this.thumb.x - this.centerBg.x;
            var moveDisY = this.thumb.y - this.centerBg.y;
            var dis = Math.sqrt(moveDisX * moveDisX + moveDisY * moveDisY);
            this.moveSpeedTimes = Math.abs(dis) / this.radius > 0.8 ? 2 : 1;
            // console.log(this.moveSpeedTimes);
            //派发拖动值
            // this.event(JoystickModule.JoystickMoving, degree);
        }
    };
    StickMoveModule.JoystickMoving = "JoystickMoving";
    StickMoveModule.JoystickUp = "JoystickUp";
    return StickMoveModule;
}(egret.EventDispatcher));
__reflect(StickMoveModule.prototype, "StickMoveModule");
//# sourceMappingURL=StickMoveModule.js.map