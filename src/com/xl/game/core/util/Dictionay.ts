class Dictionay {
	public constructor() {

	}
	public setValue(key:string,value:any):void
	{
		this[key] = value;
	}

	public getValue(key:string):any{
		return this[key];
	}

	public deleteValue(key:string):void
	{
		delete this[key];
	}

	public get len():number{
		var l:number = 0;
		for (var key in this) {
			l++;
		}
		return l;
	}
}