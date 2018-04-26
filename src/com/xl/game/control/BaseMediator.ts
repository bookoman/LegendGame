class BaseMediator extends eui.Component{
	public skinClass:string;
	private resObj;
	private loadingView:LoadingUI;
	public constructor(skinClass:string,resObj?:Object) {
		super();
		this.skinClass = skinClass;
		if(resObj)
		{
			this.resObj = resObj;
			this.loadingView = new LoadingUI();
			LayerManager.ins.addToLayer(this.loadingView,LayerManager.TIP_LAYER,true,false,true);
			RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.loadREsCompleted,this);
			RES.loadConfig("resource/"+this.resObj.url, "resource/");
		}
		else
		{
			this.initSkin();
		}
	}
	private loadREsCompleted()
	{
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.loadREsCompleted,this);
		LayerManager.ins.removeToLyaer(this.loadingView,LayerManager.TIP_LAYER,true,false);
		this.initSkin();
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