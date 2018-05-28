class BaseRole extends egret.Sprite{
	private animation:dragonBones.Animation;
	private roleID:string;
	public isLoaded:boolean = false;
	private armatureDisplay:dragonBones.EgretArmatureDisplay;
	private aniName:string;
	
	public constructor(roleID:string) {
		super();
		this.roleID = roleID;
	}

	public playAni(aniName:string):void
	{
		this.aniName = aniName;
		if(this.isLoaded)
		{
			this.armatureDisplay.animation.play(aniName);
		}
		else
		{
			//添加资源组加载完成事件
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			//添加资源组加载进度事件
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			//开始加载 preload 资源组
			RES.loadGroup("role"+this.roleID);
		}
	}
	
	private onResourceLoadComplete():void
	{
		//添加资源组加载完成事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);	
		//资源
		let dragonbonesData = RES.getRes(this.roleID+"_ske_json");
		let textureData = RES.getRes(this.roleID+"_tex_json");
		let texture = RES.getRes(this.roleID+"_tex_png");

		let egretFactory:dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
		egretFactory.parseDragonBonesData(dragonbonesData);
		egretFactory.parseTextureAtlasData(textureData,texture);

		this.armatureDisplay = egretFactory.buildArmatureDisplay("armatureName");
		this.armatureDisplay.x = 200;
		this.armatureDisplay.y = 300;
		this.armatureDisplay.scaleX = -0.5;
		this.armatureDisplay.scaleY = 0.5;
		
		this.addChild(this.armatureDisplay);
		LayerManager.ins.addToLayer(this,LayerManager.ROLE_LAYER,false,true,false);
		//回调播放动画
		this.isLoaded = true;
		this.playAni(this.aniName);

	}
	private onResourceProgress():void
	{
		
	}
}