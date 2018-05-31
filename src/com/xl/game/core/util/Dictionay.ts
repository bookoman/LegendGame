class Dictionay {
	public dic:Object;
	public constructor() {
		this.dic = {};
	}
	public setValue(key:string,value:any):void
	{
		this.dic[key] = value;
	}

	public getValue(key:string):any{
		return this.dic[key];
	}

	public deleteValue(key:string):void
	{
		delete this.dic[key];
	}
	/**是否有此属性 */
	public hasProperty(key:string):boolean
	{
		return this.dic.hasOwnProperty(key);
	}

	public get len():number{
		var l:number = 0;
		for(var key in this.dic) {
			l++;
		}
		return l;
	}

	
}