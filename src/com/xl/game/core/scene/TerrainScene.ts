/**
 * 地形
 */
class TerrainScene extends BaseScene{
	//地图宽
	public mapW:number;
	//地图高
	public mapH:number;
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
	private cellsDic:Dictionay = null;
	/**视框 */
	private viewPort:egret.Rectangle = null;
	/**显示图块矩形区域 */
	private showCellPort:egret.Rectangle = null;

	public mapId:string;

	
	public constructor(gameCanvas?:egret.Sprite) {
		super();
		//this.gameCanvase = new egret.RenderTexture();
		this.scaleX = 1;
		this.scaleY = 1;
		LayerManager.ins.addToLayer(this,LayerManager.BG_TERRAIN_LAYER,false,false,false);
		this.cellsDic = new Dictionay();

		this.viewPort = new egret.Rectangle(0,0,GameConfig.STAGE_WIDTH,GameConfig.STAGE_HEIGHT);
	}

	public create(mapId:string,mapW:number,mapH:number,gw:number,gh:number,cellW:number,cellH:number):void
	{
		this.mapId = mapId;
		this.mapW = mapW;
		this.mapH = mapH;
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
		this.updateTerain(RoleManager.ins.selfRole.x,RoleManager.ins.selfRole.y);
    }

	public updateTerain(rx:number,ry:number):void
	{
		this.calShowCell(rx,ry);
		var mapSimpleLoader:MapSimpleLoader;
		for (var key in this.cellsDic) {
			if (this.cellsDic.hasOwnProperty(key)) {
				mapSimpleLoader = this.cellsDic[key];
				mapSimpleLoader.load(this.mapId);
			}
		}
	}
	/**地图滚动 */
	public terainScroll(rx:number,ry:number):void
	{
		GameDataManager.ins.playerData.isCenterX = false;
		GameDataManager.ins.playerData.isCenterY = false;
		var mapX:number;
		var mapY:number;
		if(rx - this.viewPort.width / 2 < 0)
		{
			mapX = 0;
		}
		else if(rx + this.viewPort.width / 2 > this.mapW)
		{
			mapX = -(this.mapW - this.viewPort.width);
		}
		else
		{
			mapX = -(rx - this.viewPort.width / 2);
			GameDataManager.ins.playerData.isCenterX = true;
		}
		if(ry - this.viewPort.height / 2 < 0)
		{
			mapY = 0;
		}
		else if(ry + this.viewPort.height / 2 > this.mapH)
		{
			mapY = -(this.mapH - this.viewPort.height);
		}
		else
		{
			mapY = -(ry - this.viewPort.height / 2);
			GameDataManager.ins.playerData.isCenterY = true;
		}
		this.x = mapX;
		this.y = mapY;

		//计算是否更新地图
		if(this.showCellPort == null)
		{

			var scx:number = rx - this.cellW * this.showCellX - this.cellW / 2;
			var scy:number = ry - this.cellH * this.showCellX - this.cellH / 2;
			this.showCellPort = new egret.Rectangle(scx,scy,this.cellW * (this.showCellX + 1),this.cellH *(this.showCellY + 1));
		}
		
		if(rx > this.showCellPort.x && rx < this.showCellPort.x + this.showCellPort.width && ry > this.showCellPort.y && ry < this.showCellPort.y + this.showCellPort.height)
		{
			return;
		}
		else
		{
			this.showCellPort = null;
		}
		

		this.updateTerain(rx,ry);
	}
	/**移除远离图块 */
	private removeFarCell(centerCellX:number,centerCellY:number):void
	{
		var mapSimpleLoader:MapSimpleLoader;
		for (var key in this.cellsDic) {
			if (this.cellsDic.hasOwnProperty(key)) {
				mapSimpleLoader = this.cellsDic[key];
				if(mapSimpleLoader.cx < centerCellX - this.showCellX || mapSimpleLoader.cx > centerCellX + this.showCellX ||
				mapSimpleLoader.cy < centerCellY - this.showCellY || mapSimpleLoader.cy > centerCellY + this.showCellY)
				{
					this.cellsDic.deleteValue(mapSimpleLoader.key);
					mapSimpleLoader.dispose();
				}
			}
		}
	}
	/**
	 * 计算格子加载图块数组，人物脚下先加载，然后由上顺时针加载一圈格子图块，内圈向外圈加载
	 */
	private calShowCell(x:number,y:number):void
	{
		var centerCellX:number = Math.floor(x / this.cellW);
		var centerCellY:number = Math.floor(y / this.cellH);

		this.removeFarCell(centerCellX,centerCellY);
		//加载个数
		var cellXs:number = this.mapLayerData.cellX;
		var cellYs:number = this.mapLayerData.cellY;
		var mapSimpleLoader:MapSimpleLoader = new MapSimpleLoader(this,centerCellX,centerCellY,cellXs,cellYs,this.cellW,this.cellH);
		// this.cells.push(mapSimpleLoader);
		this.cellsDic.setValue(mapSimpleLoader.key,mapSimpleLoader);
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
				if(this.isOutOfMap(cellX * this.cellW,cellY * this.cellH))
				{
					continue;
				}
				var key:string = cellX + "_" + cellY;
				if(!this.cellsDic.getValue(key))
				{
					mapSimpleLoader = new MapSimpleLoader(this,cellX,cellY,cellXs,cellYs,this.cellW,this.cellH); 
					this.cellsDic.setValue(mapSimpleLoader.key,mapSimpleLoader);
				}
			}
		}
		// console.log(".............."+this.cellsDic.len);

	}
	/**超出地图边界 */
	public isOutOfMap(tx:number,ty:number):boolean
	{
		return tx < 0 || ty < 0 || tx > this.mapW || ty > this.mapH;
	}


	public dispose():void
	{
		
	}


	

}

