var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* 场景管理器
*/
var SceneMananger = (function () {
    function SceneMananger() {
        this.curScene = null;
        var time = new egret.Timer(1000);
        time.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        // time.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        time.start();
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
        }
    };
    SceneMananger.prototype.timerFunc = function () {
        console.log("........");
    };
    SceneMananger.prototype.timerComFunc = function () {
        console.log("======");
    };
    SceneMananger.PRE_LOAD_SCENE = 1;
    SceneMananger.LOGIN_SCENE = 2;
    SceneMananger.GAME_SCENE = 3;
    SceneMananger._ins = null;
    return SceneMananger;
}());
__reflect(SceneMananger.prototype, "SceneMananger");
//# sourceMappingURL=SceneMananger.js.map