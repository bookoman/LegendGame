/*
* 层管理器
* name;
*/
class LayerManager{
    /**背景地形 */
    public static BG_TERRAIN_LAYER:number = 0;
    /**远景 */
    public static BG_FAR_LAYER:number = 1;
    /**背景特效 */
    public static BG_EFFECT_LAYER:number = 2;
    /**角色层 */
    public static ROLE_LAYER:number = 3;
     /**近景 */
    public static BG_NEAR_LAYER:number = 4;
    /**特效层 */
    public static EFFECT_LAYER:number = 5;
    /**UI层 */
    public static UI_LAYER:number = 6;
    /**tip层 */
    public static TIP_LAYER:number = 7;

    private bgTerrainLayer:MyLayer = null;
    private bgPreLayer:MyLayer = null;
    private bgNearLayer:MyLayer = null;
    private bgEffectLayer:MyLayer = null;
    private roleLayer:MyLayer = null;
    private effectLayer:MyLayer = null;
    private uiLayer:MyLayer = null;
    private tipLayer:MyLayer = null;

    constructor(){

    }
    private static _ins:LayerManager = null;
    public static get ins():LayerManager{
        if(this._ins == null)
        {
            this._ins = new LayerManager();
        }
        return this._ins;
    }

    public init(main:eui.UILayer):void
    {
        this.bgTerrainLayer = new MyLayer();
        main.addChild(this.bgTerrainLayer);
        this.bgPreLayer = new MyLayer();
        main.addChild(this.bgPreLayer);
        this.bgEffectLayer = new MyLayer();
        main.addChild(this.bgEffectLayer);
        this.roleLayer = new MyLayer();
        main.addChild(this.roleLayer);
        this.bgNearLayer = new MyLayer();
        main.addChild(this.bgNearLayer);
        this.effectLayer = new MyLayer();
        main.addChild(this.effectLayer);
        this.uiLayer = new MyLayer();
        main.addChild(this.uiLayer);
        this.tipLayer = new MyLayer();
        main.addChild(this.tipLayer);
    }
    /**添加到对应层 */
    public addToLayer(view,layerId:number,isMask:boolean = false,isMany:boolean = false,isCenter:boolean = true):void
    {
        var layer:MyLayer = this.getLayer(layerId);
        if(isCenter)
        {
            view.x = GameConfig.STAGE_WIDTH - view.width >> 1;
            view.y = GameConfig.STAGE_HEIGHT - view.height >> 1;
        }
        layer.add(view,isMask,isMany);
    }
    /**从对应层移出显示对象 */
    public removeToLayer(view,layerId:number,isMask:boolean = false,isMany:boolean = false):void
    {
        var layer:MyLayer = this.getLayer(layerId);
        layer.remove(view,isMask,isMany);
    }

    public getLayer(layerId:number):MyLayer
    {
        switch(layerId)
        {
            case LayerManager.BG_TERRAIN_LAYER:
                return this.bgTerrainLayer;
            case LayerManager.BG_FAR_LAYER:
                return this.bgPreLayer;
            case LayerManager.BG_NEAR_LAYER:
                return this.bgNearLayer;
            case LayerManager.BG_EFFECT_LAYER:
                return this.bgEffectLayer;
            case LayerManager.ROLE_LAYER:
                return this.roleLayer;
            case LayerManager.EFFECT_LAYER:
                return this.effectLayer;
            case LayerManager.UI_LAYER:
                return this.uiLayer;
            case LayerManager.TIP_LAYER:
                return this.tipLayer;
        }
    }

}
/**
 * 自定义层级
 */
class MyLayer extends egret.Sprite{
    private maskCount:number = 0;
    private maskSprite:egret.Sprite = null;
    private viewObj:Object = {};
    private curView = null;
    constructor()
    {
        super();
    }

    public add(view,isMask:boolean = false,isMany:boolean = false):void
    {
        if(isMask)
        {
            if(this.maskSprite == null)
            {
                this.maskSprite = new egret.Sprite();      
                this.maskSprite.width = GameConfig.STAGE_WIDTH;
                this.maskSprite.height = GameConfig.STAGE_HEIGHT;
                // this.maskSprite.mouseEnabled = true;
                this.maskSprite.graphics.beginFill(0x000000);
                this.maskSprite.graphics.drawRect(0,0,GameConfig.STAGE_WIDTH,GameConfig.STAGE_HEIGHT);
                this.maskSprite.graphics.endFill();
                this.maskSprite.alpha = 0.5;
            }
            if(!this.maskSprite.parent)
            {
                this.addChild(this.maskSprite);
            }
            this.maskCount++;
        }

        if(isMany)
        {
            var keyClass:string = view.constructor.name;
            if(!this.viewObj[keyClass])
            {
                this.viewObj[keyClass] = [];
            }
            this.viewObj[keyClass].push(view);
        }
        else
        {
            if(this.curView && this.curView.parent)
            {
                this.curView.parent.removeChild(this.curView);
                this.curView = null;
            }
            this.curView = view;
        }
        this.addChild(view);
    }
    public remove(view,isMask:boolean = false,isMany:boolean = false):void    
    {
        if(isMask)
        {
            this.maskCount--;
            if(this.maskCount <= 0 && this.maskSprite)
            {
                if(this.maskSprite){
                    this.maskSprite.graphics.clear();
                    if(this.maskSprite.parent)
                    {
                        this.maskSprite.parent.removeChild(this.maskSprite);
                    }
                    this.maskSprite = null;
                }
            }
        }
        if(isMany)
        {
            var keyClass:string = view.constructor.name;
            if(this.viewObj[keyClass])
            {
                this.viewObj[keyClass].pop();
            }
        }
        else
        {
            if(this.curView && this.curView.constructor.name == view.constructor.name)
            {
                this.curView = null;
            }
        }
        if(view.parent)
        {
            view.parent.removeChild(view);
        }
    }
}   