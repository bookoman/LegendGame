class BaseMediator extends eui.Component{
	public skinClass:string;
	private moduleName;
	private loadingView:LoadingUI;
	public constructor(skinClass:string,moduleName?:string) {
		super();
		this.skinClass = skinClass;
		if(moduleName)
		{
			this.moduleName = moduleName;
			this.loadingView = new LoadingUI();
			LayerManager.ins.addToLayer(this.loadingView,LayerManager.TIP_LAYER,false,false,true);
			var obj = ConfigManager.ins.getResJsonByName(moduleName);
			RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.loadRESCompleted,this);
			RES.loadConfig("resource/"+obj.url, "resource/");
		}
		else
		{
			this.initSkin();
		}
	}
	private loadRESCompleted()
	{
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.loadRESCompleted,this);
        //添加资源组加载完成事件
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //开始加载 preload 资源组
        RES.loadGroup(this.moduleName);
		
	}

	private onResourceLoadComplete():void
	{
		//添加资源组加载完成事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //添加资源组加载进度事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);	
		LayerManager.ins.removeToLayer(this.loadingView,LayerManager.UI_LAYER,true,false);
		this.initSkin();
	}
	private onResourceProgress():void
	{
		
	}

	private initSkin():void
	{
		this.addEventListener(eui.UIEvent.COMPLETE,this.onSkinComplete,this);
		this.skinName = this.skinClass;
	}
	private onSkinComplete():void
	{
		this.removeEventListener(eui.UIEvent.COMPLETE,this.onSkinComplete,this);
		this.initView();
	}
	
	protected initView():void
	{
		this.addEvents();
	}
	protected addEvents():void
	{	

	}
	protected removeEvents():void
	{

	}
}