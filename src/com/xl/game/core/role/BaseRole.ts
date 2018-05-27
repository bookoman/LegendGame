class BaseRole extends egret.Sprite{
	private animation:dragonBones.Animation;
	private roleID:string;
	public isLoaded:boolean = false;
	
	public constructor(roleID:string) {
		super();
		this.roleID = roleID;
		this.animation = new dragonBones.Animation();
	}

	public playAni(aniName:string):void
	{
		if(this.isLoaded)
		{

		}
		else
		{
			var resObj = ConfigManager.ins.getResJsonByName("animation");
			RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.loadRESCompleted,this);
			RES.loadConfig("resource/"+resObj.url, "resource/assets");
			// RES.getResByUrl("resource/"+resObj.url,this.loadREsCompleted,this,RES.ResourceItem.TYPE_JSON);
		}
	}
	private loadRESCompleted(e)
	{
		var obj = RES.getRes("animation");
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.loadRESCompleted,this);
        //添加资源组加载完成事件
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //开始加载 preload 资源组
        RES.loadGroup("role"+this.roleID);
	}
	private onResourceLoadComplete():void
	{
		//添加资源组加载完成事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);	
		var url:string = "resource/assets/outside/ani/role/role"+this.roleID+"/"+this.roleID+".png";
		console.log(".....",url,RES.getRes(url));
	}
	private onResourceProgress():void
	{
		
	}
}