/*
* 场景管理器
*/
class SceneMananger{
    public static PRE_LOAD_SCENE:number = 1;
    public static LOGIN_SCENE:number = 2;
    public static GAME_SCENE:number = 3;
    public static TERRAIN_SCENE:number = 4;

    private curScene:BaseScene = null;
    private sceneTerrain:TerrainScene;
    constructor(){
        
    }
    private static _ins:SceneMananger = null;
    public static get ins():SceneMananger{
        if(this._ins == null)
        {
            this._ins = new SceneMananger();
        }
        return this._ins;
    }
    /**进入场景 */
    public enter(sceneId:number):void
    {
        if(this.curScene)
        {
            this.curScene.leave();
            this.curScene = null;
        }
        switch(sceneId)
        {
            case SceneMananger.PRE_LOAD_SCENE:
                this.curScene = new PreLoadScene();
                
                break;
            case SceneMananger.LOGIN_SCENE:
                this.curScene = new LoginScene();
                break;
            case SceneMananger.GAME_SCENE:
                this.sceneTerrain = new TerrainScene();
                this.curScene = new GameScene();
                break;
        }
        this.curScene.enter();
        
    }
    /**离开场景 */
    public leave():void
    {
        if(this.curScene)
        {
            this.curScene.leave();
            this.curScene = null;
            if(this.curScene as GameScene)
            {
                this.sceneTerrain.dispose();
                this.sceneTerrain = null;
            }
        }
        
    }
    /**
     * 初始化游戏场景
     */
    public initGameScene(mapID:string):void
    {
        var config:any = ConfigManager.ins.getMapConfigById(mapID);
        GameConfig.MAP_GRID_WIDTH = config.gw;
        GameConfig.MAP_GRID_HEIGHT = config.gh;
        this.sceneTerrain.create(config.mapID,config.mw,config.mh,config.gw,config.gh,config.cellW,config.cellH);

        RoleManager.ins.initRole("10000");

    }

}