class Game extends eui.UILayer{
	public constructor() {
		super();
	}
	protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //游戏管理器初始化
        LayerManager.ins.init(this);
        ConfigManager.ins.init();


         //加载资源文件
        var loader:egret.URLLoader = new egret.URLLoader();
        var urlRequest:egret.URLRequest = new egret.URLRequest("resource/all.res.json");
        loader.load(urlRequest);
        loader.addEventListener(egret.Event.COMPLETE,this.loadAllResJsonComplete,this);
    }

    private loadAllResJsonComplete(e):void{
        var loader:egret.URLLoader = e.target;
        loader.removeEventListener(egret.Event.COMPLETE,this.loadAllResJsonComplete,this);
        var jsonObj = JSON.parse(loader.data);
        ConfigManager.ins.saveAllResJson(jsonObj.resources);

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        // this.loadTheme();
        SceneMananger.ins.enter(SceneMananger.LOGIN_SCENE);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
        
    }
    

    /**主题加载 */
    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/all.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }
	
}