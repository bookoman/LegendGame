class GameMediator extends BaseMediator{
	private stickMove:StickMoveModule;
	public constructor(modlueName?:string) {
		super("resource/skins/GameViewSkin.exml",modlueName);
	}

	protected initView():void
	{
		super.initView();
		console.log("game.....",RES.getRes("border_png"));
		this.stickMove = new StickMoveModule(this,this.updateStickMove);
		

	}

	public updateStickMove():void
	{
		RoleManager.ins.roleMove(this.stickMove.directionX,this.stickMove.directionY,this.stickMove.moveSpeedTimes);
	}
	

	protected addEvents():void{
		
	}
	protected removeEvents():void{

	}
}