/**
 * 配置表管理
 */
class ConfigManager {
	public allResJsonDic:Object;
	public constructor() {

	}
	private static _ins:ConfigManager = null;
	public static get ins():ConfigManager
	{
		if(this._ins == null)
		{
			this._ins = new ConfigManager();
		}
		return this._ins;
	}

	public init():void
	{
		this.allResJsonDic = {};
	}
	/**
	 * 解析资源配置文件
	 */
	public saveAllResJson(data):void{
		data.forEach(resObj => {
            this.allResJsonDic[resObj.name] = resObj;
        });
	}
	public getResJsonByName(name:string):any
	{
		return this.allResJsonDic[name];
	}


}