/*
* name;
*/
class GameScene extends BaseScene{
    
    constructor(){
        super();
    }
    public enter():void
    {
        var resObj = ConfigManager.ins.getResJsonByName("game");
        var gameViewMediator:GameMediator = new GameMediator(resObj);
        LayerManager.ins.addToLayer(gameViewMediator,LayerManager.UI_LAYER,false,false,false);
    }

    public leave():void
    {
        super.leave();
    }
}