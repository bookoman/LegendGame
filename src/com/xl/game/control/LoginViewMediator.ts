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
		console.log("login.....",RES.getRes("bg_jpg"));
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
		SceneMananger.ins.enter(SceneMananger.GAME_SCENE);
	}
}