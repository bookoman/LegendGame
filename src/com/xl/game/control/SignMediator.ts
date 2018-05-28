class SignMediator extends BaseMediator{
	public constructor(moduleName?:string) {
		super("resource/skins/SignViewSkin.exml",moduleName);
	}

	protected initView():void
	{
		super.initView();
		// console.log("login.....",RES.getRes("10000_png"));
	}
	protected addEvents():void{

	}
	protected removeEvent():void
	{

	}

}