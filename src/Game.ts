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
        await this.loadResource()
        // this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            // await RES.loadConfig("resource/assets/common.res.json", "resource/");
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onLoaded,this); 
            RES.loadConfig("resource/all.res.json", "resource/");
            // await this.loadTheme();
            // await RES.loadGroup("module");
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private onLoaded(e):void{
        console.log("打印数据:"+e);
        RES.removeEventListener(RES.ResourceEvent.COMPLETE,this.onLoaded,this);
        
        // this.createGameScene();
    }

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
    
	private createGameScene():void{
		var loginViewMediator:LoginViewMediator = new LoginViewMediator();
		this.addChild(loginViewMediator);
	}
}