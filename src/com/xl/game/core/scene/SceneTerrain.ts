/**
 * 地形
 */
class SceneTerrain extends egret.Sprite{
	//地图宽
	private mw:number;
	//地图高
	private mh:number;
	//格子宽
	private gw:number;
	//格子高
	private gh:number;
	//地图切块宽
	private cellW:number;
	//地图切块高
	private cellH:number;
	//地图切块（上下左右各个方向）x方向显示个数
	private showCellX:number;
	//地图切块（上下左右各个方向）y方向显示个数
	private showCellY:number;
	//地图层数据
	private mapLayerData:MapLayerVo;
	//建筑数据
	private builderLayerData:MapLayerVo;
	//遮罩数据
	private maskLayerData:MapLayerVo;
	/**地形 */
	private gameCanvase:egret.RenderTexture;
	/**单个图块 */
	private cells:Array<MapSimpleLoader> = null;

	public mapId:string;
	public constructor(gameCanvas?:egret.Sprite) {
		super();
		//this.gameCanvase = new egret.RenderTexture();
		this.scaleX = 0.05;
		this.scaleY = 0.05;
		LayerManager.ins.addToLayer(this,LayerManager.TIP_LAYER,false,false,false);
		this.cells = new Array();
	}

	public create(mapId:string,mw:number,mh:number,gw:number,gh:number,cellW:number,cellH:number):void
	{
		this.mapId = mapId;
		this.mw = mw;
		this.mh = mh;
		this.gw = gw;
		this.gh = gh;
		this.cellW = cellW;
		this.cellH = cellH;

		this.mapLayerData = new MapLayerVo();
		this.builderLayerData = new MapLayerVo();
		this.maskLayerData = new MapLayerVo();

		var textLoader:BaseLoader = new TextLoader();
        textLoader.load("resource/assets/outside/map/"+this.mapId+"/Legend.json",this.loadAllMapJsonComplete,this);
	}
	/**地图数据加载完成 */
	private loadAllMapJsonComplete(data):void{
        var jsonObj:Object = JSON.parse(data);
		var layers:Array<Object> = jsonObj["layers"];
		layers.forEach(layer => {
			if(layer["name"] == "background")
			{
				this.mapLayerData.parse(layer);
			}
			else if(layer["name"] == "builder")
			{
				this.builderLayerData.parse(layer);
			}
			else if(layer["name"] == "mask")
			{
				this.maskLayerData.parse(layer);
			}
		});

		this.updateTerain();
    }

	public updateTerain():void
	{
		var mapSimpleLoader:MapSimpleLoader;
		var cellXs:number = this.mapLayerData.cellX;
		var cellYs:number = this.mapLayerData.cellY;
		
		for(var i = 0;i < cellYs;i++)
		{
			for(var j = 0;j < cellXs;j++)
			{
				mapSimpleLoader = new MapSimpleLoader(this,cellX,cellY,this.cellW,this.cellH);
				var blockId:number = i * cellX +  j + 1;
				// console.log("..."+blockId);
				mapSimpleLoader.load(this.mapId,blockId);
			}
		}
	}

	public onScroll(x:number,y:number):void
	{

	}
	private calShowCell(x:number,y:number):void
	{
		this.cells.splice(0,this.cells.length);

		var cellX:number = Math.ceil(x / this.cellW);
		var cellY:number = Math.ceil(y / this.cellH);
		

	}


	

	

}