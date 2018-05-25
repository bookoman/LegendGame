/**
 * 配置表管理
 */
class ConfigManager {
	public mapCofing:Object = {
        "1":{"mapID":"1","name":"主城","mw":10500,"mh":9440,"gw":60,"gh":80,"cellW":512,"cellH":512},
        "2":{"mapID":"2","name":"血缘","mw":10500,"mh":9440,"gw":60,"gh":80,"cellW":512,"cellH":512}
    }
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

	public getMapConfigById(id:string):any
	{
		return this.mapCofing[id];
	}


}