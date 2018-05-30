class GameMediator extends BaseMediator{
	private stickMove:StickMoveModule;
	public constructor(modlueName?:string) {
		super("resource/skins/GameViewSkin.exml",modlueName);
	}

	protected initView():void
	{
		super.initView();
		this.stickMove = new StickMoveModule(this);
		

	}
	

	protected addEvents():void{
		
	}
	protected removeEvents():void{

	}
}