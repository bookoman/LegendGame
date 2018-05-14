class ImageLoader extends BaseLoader{
	private imgLoader:egret.ImageLoader;
	private method:Function;
	private proto:any;
	public constructor() {
		super();
	}
	public load(url:string,method:Function,proto:any):void
	{
		this.url = url;
		this.proto = proto;
		this.method = method;
		if(this.imgLoader == null)
		{
			this.imgLoader = new egret.ImageLoader();
		}
		this.imgLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleted,this);
		this.imgLoader.load(url);
	}
	private loadCompleted(e):void{
        this.imgLoader.removeEventListener(egret.Event.COMPLETE,this.loadCompleted,this);
		
		this.method.apply(this.proto,[this.imgLoader.data]);
	}
}