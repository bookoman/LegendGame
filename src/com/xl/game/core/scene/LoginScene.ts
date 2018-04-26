/*
* name;
*/
class LoginScene extends BaseScene{
    constructor(){
        super();
    }
    public enter():void
    {
        var obj = ConfigManager.ins.getResJsonByName("common");
		var loginViewMediator:LoginViewMediator = new LoginViewMediator(obj);
		LayerManager.ins.addToLayer(loginViewMediator,LayerManager.UI_LAYER,false,false,false);
    }

    public leave():void
    {
        
    }
}