class CommonUtil {
	public constructor() {
	}
	/**
	 * 一个数的N次幂
	 */
	public static calNumPow(num:number,pow:number):number{
		var result:number = num;
		for(var i = 0;i < pow;i++)
		{
			result = result * num;
		}
		return result;
	}
}