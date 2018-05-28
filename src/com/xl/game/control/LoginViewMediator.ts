class LoginViewMediator extends BaseMediator {
	private inputAccount:eui.TextInput;
	private inputPWD:eui.TextInput;
	private btnLogin:eui.Button;
	public constructor(modlueName?:string) {
		super("resource/skins/LoginViewSkin.exml",modlueName);
	}
	protected initView():void
	{
		super.initView();

		// var sign:SignMediator = new SignMediator("sign");

		var stickMove:StickMoveModule = new StickMoveModule(this);
	}
	protected addEvents():void{
		this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnLoginClick,this);
	}
	protected removeEvent():void
	{
		this.btnLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnLoginClick,this);
	}

	private onBtnLoginClick(e:egret.TouchEvent):void{
		console.log("登录");
		


		var obj = ConfigManager.ins.getResJsonByName("animation");
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.loadRESCompleteds,this);
		RES.loadConfig("resource/"+obj.url, "resource/");
		
	}
	private loadRESCompleteds()
	{
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.loadRESCompleteds,this);
		SceneMananger.ins.enter(SceneMananger.GAME_SCENE);   
	}
	
}