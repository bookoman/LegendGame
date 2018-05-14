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

	public mapId:string;
	public constructor(gameCanvas?:egret.Sprite) {
		super();
		this.gameCanvase = new egret.RenderTexture();
		
		LayerManager.ins.addToLayer(new egret.Bitmap(this.gameCanvase),LayerManager.TIP_LAYER,false,false,false);
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
		var cellX:number = this.mapLayerData.width;
		var cellY:number = this.mapLayerData.height;
		for(var i = 0;i < 21;i++)
		{
			for(var j = 0;j < 19;j++)
			{
				mapSimpleLoader = new MapSimpleLoader(this.gameCanvase,cellX,cellY,this.cellW,this.cellH);
				mapSimpleLoader.load(this.mapId,(i+1)* (j+1));
			}
		}
	}

	

}