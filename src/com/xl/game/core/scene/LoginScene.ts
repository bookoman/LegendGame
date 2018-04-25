/*
* name;
*/
class LoginScene extends BaseScene{
    constructor(){
        super();
    }
    public enter():void
    {
        new LoginViewMediator();
    }

    public leave():void
    {
        
    }
}