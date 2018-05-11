class SceneTerrain extends egret.Sprite{
	private static VIEW_EXTRA_RANGE:number = 512;// 视野冗余范围
	private _w:number;//地图宽度
	private _h:number;
	private _cw:number;//1个地图图片cell大小
	private _ch:number;
	private _cSideX:number;// cell X边长
	private _cSideY:number;// cell Y边长
	private _img:string;// 图片路径
	private _version:string;// 版本号
	
	private _viewWidth:number;// 视图大小
	private _viewHeight:number;// 视图大小
	
	private _centerCellX:number;// 中心点cell		
	private _centerCellY:number;// 中心点cell		
	private _lastCellX:number;// 上次cell位置
	private _lastCellY:number;// 上次cell位置
	private _mapImg:egret.ByteArray;
	private _mapMask:egret.ByteArray;
	private _mapBlock:egret.ByteArray;
	
	protected cellImgs:Object = new Object;
	//protected var cellImgs:Object = new Object;
	protected cellRecycleImgs:Array<MapSimpleLoader>;
	
	private _loaderBlock:Array<number>;
	private _loaderMask:Array<number>;
	
	public isMapReady:Boolean = false;// 地图是否准备好了
	public isBlockReady:Boolean = false;// 碰撞检测是否已经加载好了
	/**地形 */
	private _gameCanvas:egret.Sprite;
	public constructor(gameCanvas:egret.Sprite) {
		super();
		this._gameCanvas = gameCanvas;
	}

	

}