class PlayerData {
	/**速度 */
	public moveSpeed:number = 0;
	/**方向X */
	public directionX:number = 0;
	/**方向Y */
	public directionY:number = 0;
	/**舞台Y居中 */
	public isCenterX:boolean = false;
	/**舞台Y居中 */
	public isCenterY:boolean = false;
	/**地图坐标点 */
	public mapXYPoint:egret.Point = new egret.Point(0,0);
	/**网格X */
	public gridX:number = 0;
	/**网格Y */
	public gridY:number = 0;
	public constructor() {
	}

	public setMoveSpeed(speedTimes:number):void
	{
		this.moveSpeed = speedTimes * 10;
	}

	public setMapXYPoint(tx:number,ty:number):void
	{

	}
}