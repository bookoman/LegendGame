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
	private showCellX:number = 2;
	//地图切块（上下左右各个方向）y方向显示个数
	private showCellY:number = 2;
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
		this.scaleX = 0.1;
		this.scaleY = 0.1;
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
		// var mapSimpleLoader:MapSimpleLoader;
		// var cellXs:number = this.mapLayerData.cellX;
		// var cellYs:number = this.mapLayerData.cellY;
		// for(var i = 0;i < cellYs;i++)
		// {
		// 	for(var j = 0;j < cellXs;j++)
		// 	{
		// 		mapSimpleLoader = new MapSimpleLoader(this,j , i ,cellXs,cellYs,this.cellW,this.cellH);
		// 		mapSimpleLoader.load(this.mapId);
		// 	}
		// } 

		this.calShowCell(2200,2200);
		this.cells.forEach(mapSimpleLoader => {
			mapSimpleLoader.load(this.mapId)
		});
	}

	public onScroll(x:number,y:number):void
	{
		
	}
	/**
	 * 计算格子加载数组，人物脚下先加载，然后由上顺时针加载一圈格子，内圈向外圈加载
	 */
	private calShowCell(x:number,y:number):void
	{
		this.cells.splice(0,this.cells.length);
		var centerCellX:number = Math.floor(x / this.cellW);
		var centerCellY:number = Math.floor(y / this.cellH);
		//加载个数
		var cellXs:number = this.mapLayerData.cellX;
		var cellYs:number = this.mapLayerData.cellY;
		var mapSimpleLoader:MapSimpleLoader = new MapSimpleLoader(this,centerCellX,centerCellY,cellXs,cellYs,this.cellW,this.cellH);
		this.cells.push(mapSimpleLoader);
		//圈数
		var circleSum:number = Math.max(this.showCellX,this.showCellY);
		var cellX:number;
		var cellY:number;
		var edge:number = 1;//边个数
		var sum:number = 0;//一圈总数
		for(var i = 1;i <= circleSum; i++)
		{
			
			edge = edge + 2;
			sum = edge * 4 - 4;
			for(var j = 0;j < sum; j++)
			{
				if(j < edge)
				{
					if(j == 0)
					{
						cellX = centerCellX - Math.max(1,(edge - 1) / 2);
						cellY = centerCellY - i * 1;
					}
					else
					{
						cellX++;
					}
				}
				else if(j < 2 * edge - 1)
				{
					cellY++;
				}
				else if(j < 3 * edge - 2)
				{
					cellX--;
				}
				else if(j < 4 * edge - 3)
				{
					cellY--;
				}
				//超出显示边界判断
				if(cellX > this.showCellX + centerCellX || i > this.showCellY + centerCellY)
				{
					continue;
				}
				//超出地图边界判断
				if(cellX < 0 || cellY < 0 || cellX * this.cellW > this.mw || cellY * this.cellH > this.mh)
				{
					continue;
				}

				mapSimpleLoader = new MapSimpleLoader(this,cellX,cellY,cellXs,cellYs,this.cellW,this.cellH); 
				this.cells.push(mapSimpleLoader);
				console.log(cellX,cellY);
			}
		}

	}





	

}

