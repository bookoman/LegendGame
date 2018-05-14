class TextLoader extends BaseLoader{
	public urlLoader:egret.URLLoader;
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
		if(this.urlLoader == null)
		{
			this.urlLoader = new egret.URLLoader();
		}
		this.urlLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleted,this);
		this.urlLoader.load(new egret.URLRequest(url));
	}
	private loadCompleted(e):void{
        this.urlLoader.removeEventListener(egret.Event.COMPLETE,this.loadCompleted,this);
		
		this.method.apply(this.proto,[this.urlLoader.data]);
	}
}