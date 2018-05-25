/*
* name;
*/
class GameScene extends BaseScene{
    
    constructor(){
        super();
    }
    public enter():void
    {
        var gameViewMediator:GameMediator = new GameMediator("game");
        LayerManager.ins.addToLayer(gameViewMediator,LayerManager.UI_LAYER,false,false,false);

        SceneMananger.ins.initGameScene("1");
    }

    public leave():void
    {
        super.leave();
    }
}