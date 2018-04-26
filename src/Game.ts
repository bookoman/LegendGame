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

         //加载资源文件
        var loader:egret.URLLoader = new egret.URLLoader();
        var urlRequest:egret.URLRequest = new egret.URLRequest("resource/all.res.json");
        loader.load(urlRequest);
        loader.addEventListener(egret.Event.COMPLETE,this.loadAllResJsonComplete,this);
    }

    private resJsonDic:Object;
    private loadAllResJsonComplete(e):void{
        this.resJsonDic = {};
        var loader:egret.URLLoader = e.target;
        loader.removeEventListener(egret.Event.COMPLETE,this.loadAllResJsonComplete,this);
        var jsonObj = JSON.parse(loader.data);
        console.log(jsonObj);
        jsonObj.resources.forEach(resObj => {
            this.resJsonDic[resObj.name] = resObj.url;
        });

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

        await this.loadResource("common");
        this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource(resName:string) {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/"+this.resJsonDic[resName], "resource/");
            await RES.loadGroup(resName, 0, loadingView);
            this.stage.removeChild(loadingView);
            await this.loadTheme();
        }
        catch (e) {
            console.error(e);
        }
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