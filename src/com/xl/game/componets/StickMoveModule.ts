
/**
 * 左下角虚拟手柄
 */
class StickMoveModule{
    
    private contain:egret.Sprite;
    private componentW:number = 400;
    private componentH:number = 400;
	private thumb:eui.Image;
    private touchArea:eui.Rect;
    private centerBg:eui.Image;
    private initX:number;
    private initY:number;
    private touchId:number;
    private radius:number;
    private curPos:egret.Point;
    private tweener:egret.Tween;
    private lastStageX;
    private lastStageY;
    private startStageX;
    private startStageY;
    
	public constructor(parent) {
        this.contain = new egret.Sprite();
        this.contain.x = 0;
        this.contain.y = GameConfig.STAGE_HEIGHT - this.componentH;
        parent.addChild(this.contain);

        var texture = RES.getRes("bg_png");
        this.centerBg = new eui.Image(texture);
        this.centerBg.width = texture.textureWidth;
        this.centerBg.height = texture.textureHeight;
        this.centerBg.anchorOffsetX = this.centerBg.width / 2;
        this.centerBg.anchorOffsetY = this.centerBg.height / 2;
        this.centerBg.x = this.componentW / 2;
        this.centerBg.y = this.componentH / 2;
        
        texture = RES.getRes("bar_png");
        this.thumb = new eui.Image(texture);
        this.thumb.width = texture.textureWidth;
        this.thumb.height = texture.textureHeight;
        this.thumb.anchorOffsetX = this.thumb.width / 2;
        this.thumb.anchorOffsetY = this.thumb.height / 2;
        this.thumb.x = this.componentW / 2;
        this.thumb.y = this.componentW / 2;
        this.thumb.visible = false;
        this.contain.addChild(this.thumb);
        
        this.contain.addChild(this.centerBg);
        this.touchArea = new eui.Rect(this.componentW,this.componentH,0xd5d5d5);
        this.touchArea.name = "stickTouch";
        this.touchArea.alpha = 0;
        this.contain.addChild(this.touchArea);
        
        this.initX = this.centerBg.x;
        this.initY = this.centerBg.y;
        this.touchId = -1;
        this.radius = 150;
        this.curPos = new egret.Point(this.initX, this.initY);

        this.touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
	}
    private Trigger(evt)
    {
        this.onTouchDown(evt);
    }
    private onTouchDown(evt) {
        // console.log("mouse down");
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
    }
    private OnTouchUp(evt)
    {
        // console.log("mouse up");
        if (this.touchId != -1 && evt.touchId == this.touchId) {
            this.touchId = -1;
            this.thumb.rotation = this.thumb.rotation + 180;
            this.centerBg.visible = false;
            
            this.tweener = egret.Tween.get(this.thumb, {
                                            loop: false,//设置循环播放
                                            onChange: null,//设置更新函数
                                            onChangeObj: this,//更新函数作用域
                                        });
            this.tweener.to({x: this.initX, y: this.initY}, 300)
                            .call(this.onTweenComplete, this, ["param1", {key: "key", value: 3}]);
            this.contain.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
            this.contain.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchUp, this);
        }
    }
    private onTweenComplete():void
    {
        this.tweener = null;
        // this.thumb.selected = false;
        this.thumb.rotation = 0;
        this.thumb.visible = false;
        this.centerBg.visible = true;
        this.centerBg.x = this.initX;
        this.centerBg.y = this.initY;


        GameDataManager.ins.playerData.directionX = 0;
        GameDataManager.ins.playerData.directionY = 0;
    }

    private OnTouchMove(evt):void
    {
        if(evt.target.name != "stickTouch")
        {
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
            
            if(this.thumb.rotation > 0 && this.thumb.rotation <= 90)
            {
                GameDataManager.ins.playerData.directionX = 1;
                GameDataManager.ins.playerData.directionY = -1;
            }
            else if(this.thumb.rotation > 90 && this.thumb.rotation <= 180)
            {
                GameDataManager.ins.playerData.directionX = 1;
                GameDataManager.ins.playerData.directionY = 1;
            }
            else if(this.thumb.rotation > -90 && this.thumb.rotation <= 0)
            {
                GameDataManager.ins.playerData.directionX = -1;
                GameDataManager.ins.playerData.directionY = -1;
            }
            else if(this.thumb.rotation > -180 && this.thumb.rotation <= -90){
                GameDataManager.ins.playerData.directionX = -1;
                GameDataManager.ins.playerData.directionY = 1;
            }
            var moveDisX:number = this.thumb.x - this.centerBg.x;
            var moveDisY:number = this.thumb.y - this.centerBg.y;
            var dis:number = Math.sqrt(moveDisX * moveDisX + moveDisY * moveDisY);
            var moveSpeedTimes:number = Math.abs(dis) / this.radius > 0.8 ? 2 : 1;
            //速度倍率 > 0.8 ? 2 : 1
            GameDataManager.ins.playerData.setMoveSpeed(moveSpeedTimes);
            // console.log(this.thumb.rotation,this.directionX,this.directionY,this.moveSpeedTimes);
           
            
        }
    }

}