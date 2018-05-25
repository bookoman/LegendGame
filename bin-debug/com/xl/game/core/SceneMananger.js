var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* 场景管理器
*/
var SceneMananger = (function () {
    function SceneMananger() {
        this.curScene = null;
    }
    Object.defineProperty(SceneMananger, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new SceneMananger();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**进入场景 */
    SceneMananger.prototype.enter = function (sceneId) {
        if (this.curScene) {
            this.curScene.leave();
            this.curScene = null;
        }
        switch (sceneId) {
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
    };
    /**离开场景 */
    SceneMananger.prototype.leave = function () {
        if (this.curScene) {
            this.curScene.leave();
            this.curScene = null;
            if (this.curScene) {
                this.sceneTerrain.dispose();
                this.sceneTerrain = null;
            }
        }
    };
    /**
     * 初始化游戏场景
     */
    SceneMananger.prototype.initGameScene = function (mapID) {
        var config = ConfigManager.ins.getMapConfigById(mapID);
        GameConfig.MAP_GRID_WIDTH = config.gw;
        GameConfig.MAP_GRID_HEIGHT = config.gh;
        this.sceneTerrain.create(config.mapID, config.mw, config.mh, config.gw, config.gh, config.cellW, config.cellH);
        RoleManager.ins.initRole("10000");
    };
    SceneMananger.PRE_LOAD_SCENE = 1;
    SceneMananger.LOGIN_SCENE = 2;
    SceneMananger.GAME_SCENE = 3;
    SceneMananger.TERRAIN_SCENE = 4;
    SceneMananger._ins = null;
    return SceneMananger;
}());
__reflect(SceneMananger.prototype, "SceneMananger");
//# sourceMappingURL=SceneMananger.js.map