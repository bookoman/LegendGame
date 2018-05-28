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
var StickMoveModule = (function (_super) {
    __extends(StickMoveModule, _super);
    function StickMoveModule(parent) {
        var _this = _super.call(this) || this;
        _this.componentW = 400;
        _this.componentH = 400;
        _this.contain = new egret.Sprite();
        parent.addChild(_this.contain);
        var texture = RES.getRes("bg_png");
        _this._button = new eui.Image(texture);
        _this._button.x = _this.componentW - texture.textureWidth >> 1;
        _this._button.y = _this.componentW - texture.textureHeight >> 1;
        _this.contain.addChild(_this._button);
        texture = RES.getRes("bar_png");
        _this._thumb = new eui.Image(texture);
        _this._thumb.x = _this.componentW - texture.textureWidth >> 1;
        _this._thumb.y = _this.componentH - texture.textureHeight >> 1;
        _this.contain.addChild(_this._thumb);
        _this._touchArea = new eui.Rect(_this.componentW, _this.componentH, 0xd5d5d5);
        _this._touchArea.alpha = 0;
        _this.contain.addChild(_this._touchArea);
        _this._center = new eui.Rect(texture.textureWidth, texture.textureHeight);
        _this._center.x = _this._button.x;
        _this._center.y = _this._button.y;
        _this._InitX = _this._center.x + _this._center.width / 2;
        _this._InitY = _this._center.y + _this._center.height / 2;
        _this.touchId = -1;
        _this.radius = 150;
        _this._curPos = new egret.Point();
        _this._button.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
        _this._touchArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchDown, _this);
        return _this;
    }
    ///处理按钮的触摸事件回调
    StickMoveModule.prototype.onTouch = function (evt) {
        console.log("///////////////////////////");
    };
    StickMoveModule.prototype.Trigger = function (evt) {
        this.onTouchDown(evt);
    };
    StickMoveModule.prototype.onTouchDown = function (evt) {
        console.log("mouse down");
        if (this.touchId == -1) {
            this.touchId = evt.touchId;
            if (this._tweener != null) {
                // this._tweener.clear();
                this._tweener = null;
            }
            // fairygui.GRoot.inst.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY, this._curPos);
            var bx = this._curPos.x;
            var by = this._curPos.y;
            // this._button.selected = true;
            if (bx < 0)
                bx = 0;
            else if (bx > this._touchArea.width)
                bx = this._touchArea.width;
            // if (by > fairygui.GRoot.inst.height)
            //     by = fairygui.GRoot.inst.height;
            if (by > this.componentH)
                by = this.componentH;
            else if (by < this._touchArea.y)
                by = this._touchArea.y;
            this._lastStageX = bx;
            this._lastStageY = by;
            this._startStageX = bx;
            this._startStageY = by;
            this._center.visible = true;
            this._center.x = bx - this._center.width / 2;
            this._center.y = by - this._center.height / 2;
            this._button.x = bx - this._button.width / 2;
            this._button.y = by - this._button.height / 2;
            var deltaX = bx - this._InitX;
            var deltaY = by - this._InitY;
            var degrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            this._thumb.rotation = degrees + 90;
            this.contain.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchMove, this);
            this.contain.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.OnTouchUp, this);
        }
    };
    StickMoveModule.prototype.OnTouchUp = function (evt) {
        if (this.touchId == -1) {
            this.touchId = evt.touchId;
            if (this._tweener != null) {
                // this._tweener.clear();
                this._tweener = null;
            }
            // fairygui.GRoot.inst.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY, this._curPos);
            var bx = this._curPos.x;
            var by = this._curPos.y;
            // this._button.selected = true;
            if (bx < 0)
                bx = 0;
            else if (bx > this._touchArea.width)
                bx = this._touchArea.width;
            // if (by > fairygui.GRoot.inst.height)
            //     by = fairygui.GRoot.inst.height;
            if (by > this.componentH)
                by = this.componentH;
            else if (by < this._touchArea.y)
                by = this._touchArea.y;
            this._lastStageX = bx;
            this._lastStageY = by;
            this._startStageX = bx;
            this._startStageY = by;
            this._center.visible = true;
            this._center.x = bx - this._center.width / 2;
            this._center.y = by - this._center.height / 2;
            this._button.x = bx - this._button.width / 2;
            this._button.y = by - this._button.height / 2;
            var deltaX = bx - this._InitX;
            var deltaY = by - this._InitY;
            var degrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            this._thumb.rotation = degrees + 90;
            this.contain.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            this.contain.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.OnTouchUp, this);
        }
    };
    StickMoveModule.prototype.OnTouchMove = function (evt) {
        if (this.touchId != -1 && evt.touchId == this.touchId) {
            var bx = evt.stageX;
            var by = evt.stageY;
            console.log(bx, by);
            var moveX = bx - this._lastStageX;
            var moveY = by - this._lastStageY;
            this._lastStageX = bx;
            this._lastStageY = by;
            var buttonX = this._button.x + moveX;
            var buttonY = this._button.y + moveY;
            var offsetX = buttonX + this._button.width / 2 - this._startStageX;
            var offsetY = buttonY + this._button.height / 2 - this._startStageY;
            var rad = Math.atan2(offsetY, offsetX);
            var degree = rad * 180 / Math.PI;
            this._thumb.rotation = degree + 90;
            var maxX = this.radius * Math.cos(rad);
            var maxY = this.radius * Math.sin(rad);
            if (Math.abs(offsetX) > Math.abs(maxX))
                offsetX = maxX;
            if (Math.abs(offsetY) > Math.abs(maxY))
                offsetY = maxY;
            buttonX = this._startStageX + offsetX;
            buttonY = this._startStageY + offsetY;
            if (buttonX < 0)
                buttonX = 0;
            // if (buttonY > fairygui.GRoot.inst.height)
            //     buttonY = fairygui.GRoot.inst.height;
            if (buttonY > this.componentH)
                buttonY = this.componentH;
            this._button.x = buttonX - this._button.width / 2;
            this._button.y = buttonY - this._button.height / 2;
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