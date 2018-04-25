class LoginViewMediator extends eui.Component {
	private inputAccount:eui.TextInput;
	private inputPWD:eui.TextInput;
	private btnLogin:eui.Button;
	public constructor() {
		super();
		this.skinName = "resource/skins/LoginViewSkin.exml";
	}
	protected createChildren()
	{
		super.createChildren();
		this.addEvents();
	}
	private addEvents():void{
		this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnLoginClick,this);
	}
	private removeEvent():void
	{
		this.btnLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnLoginClick,this);
	}

	private onBtnLoginClick(e:egret.TouchEvent):void{
		console.log("登录")
	}
}