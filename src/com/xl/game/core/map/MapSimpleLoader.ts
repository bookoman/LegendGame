/**
 * 地图加载item
 */
class MapSimpleLoader extends egret.Texture{
	private imgLoader:ImageLoader;
	private gameCanvas:egret.RenderTexture;
	private blockId:number;
	private cellX:number;
	private cellY:number;
	private cellW:number;
	private cellH:number;
	
	public constructor(canvas:egret.RenderTexture,cellX:number,cellY:number,cellW:number,cellH:number) {
		super();
		this.gameCanvas = canvas;
		this.cellX = cellX;
		this.cellY = cellY;
		this.cellW = cellW;
		this.cellH = cellH;
	}
	public load(mapId:string,blockId:number):void
	{
		this.blockId = blockId;
		if(this.imgLoader == null)
		{
			this.imgLoader = new ImageLoader();
		}
		this.imgLoader.load("resource/assets/outside/map/"+mapId + "/"+blockId+".jpg",this.loadComplete,this);
		// console.log("resource/assets/outside/map/"+mapId + "/"+blockId+".jpg");
	}

	private loadComplete(data):void{
		var cx:number = this.blockId % this.cellX;
		cx = cx == 0 ? 0 : cx - 1;
		var cy:number = this.blockId / this.cellY;
		cy = cy == 0 ? 0 : cy - 1;

		var tx:number = cx * this.cellW;
		var ty:number = cy * this.cellH;
		
		this.gameCanvas.drawToTexture(data,new egret.Rectangle(tx,ty,data.width,data.height));
	}

}