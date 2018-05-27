/*
* name;
*/
class LoginScene extends BaseScene{
    constructor(){
        super();
    }
    public enter():void
    {
        
		var loginViewMediator:LoginViewMediator = new LoginViewMediator("common");
		LayerManager.ins.addToLayer(loginViewMediator,LayerManager.UI_LAYER,false,false,false);
    }

    public leave():void
    {
        
    }
}