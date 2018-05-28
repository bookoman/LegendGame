
/**
 * 左下角虚拟手柄
 */
class StickMoveModule extends egret.EventDispatcher{
    public static JoystickMoving:string = "JoystickMoving";
    public static JoystickUp:string = "JoystickUp";
    private contain:egret.Sprite;
    private componentW:number = 400;
    private componentH:number = 400;
	private _button:eui.Image;
    private _thumb:eui.Image;
    private _touchArea:eui.Rect;
    private _center:eui.Rect;
    private _InitX:number;
    private _InitY:number;
    private touchId:number;
    private radius:number;
    private _curPos:egret.Point;

    private _tweener:egret.Tween;
    private _lastStageX;
    private _lastStageY;
    private _startStageX;
    private _startStageY;
	public constructor(parent) {
        super();
        
        this.contain = new egret.Sprite();
        parent.addChild(this.contain);

        var texture = RES.getRes("bg_png");

        this._button = new eui.Image(texture);
        this._button.x = this.componentW - texture.textureWidth >> 1;
        this._button.y = this.componentW - texture.textureHeight >> 1;
        this.contain.addChild(this._button);
        
        texture = RES.getRes("bar_png");
        this._thumb = new eui.Image(texture);
        this._thumb.x = this.componentW - texture.textureWidth >> 1;
        this._thumb.y = this.componentH - texture.textureHeight >> 1;
        this.contain.addChild(this._thumb);
        this._touchArea = new eui.Rect(this.componentW,this.componentH,0xd5d5d5);
        this._touchArea.alpha = 0;
        this.contain.addChild(this._touchArea);
        this._center = new eui.Rect(texture.textureWidth,texture.textureHeight);
        this._center.x = this._button.x;
        this._center.y = this._button.y;
        
        this._InitX = this._center.x + this._center.width / 2;
        this._InitY = this._center.y + this._center.height / 2;
        this.touchId = -1;
        this.radius = 150;
        this._curPos = new egret.Point();

        this._button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this._touchArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchDown, this);
	}
    ///处理按钮的触摸事件回调
    private onTouch(evt) {
        console.log("///////////////////////////");
    }
    private Trigger(evt)
    {
        this.onTouchDown(evt);
    }
    private onTouchDown(evt) {
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
            
            
            this.contain.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            this.contain.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.OnTouchUp, this);
        }
    }
    private OnTouchUp(evt)
    {
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
    }

    private OnTouchMove(evt):void
    {
        if (this.touchId != -1 && evt.touchId == this.touchId) {
            var bx = evt.stageX;
            var by = evt.stageY;
            console.log(bx,by);
            
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
    }

}