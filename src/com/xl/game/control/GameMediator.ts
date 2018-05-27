class GameMediator extends BaseMediator{
	public constructor(modlueName?:string) {
		super("resource/skins/GameViewSkin.exml",modlueName);
	}

	protected initView():void
	{
		super.initView();
		console.log("game.....",RES.getRes("border_png"));
	}

	protected addEvents():void{
		
	}
	protected removeEvents():void{

	}
}