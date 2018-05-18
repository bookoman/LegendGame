/**
 * 地图加载item
 */
class MapSimpleLoader{
	private imgLoader:ImageLoader;
	private gameCanvas:egret.Sprite;
	private blockId:number;
	private cellX:number;
	private cellY:number;
	private cellW:number;
	private cellH:number;
	
	public constructor(canvas:egret.Sprite,cellX:number,cellY:number,cellW:number,cellH:number) {
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
		var cx:number = (this.blockId - 1) % this.cellX;
		var cy:number = Math.ceil(this.blockId / this.cellX);
		cy = cy == 0 ? 0 : cy - 1;

		var tx:number = cx * this.cellW;
		var ty:number = cy * this.cellH;

		if(this.blockId == 21)
		{
			console.log("坐标",tx,ty);
		}
		var bitmap:egret.Bitmap = TextureUtil.ins.bitmapdataToBitmap(data);
		bitmap.x = tx;
		bitmap.y = ty;
		this.gameCanvas.addChild(bitmap);
		// console.log("坐标",tx,ty);

	}

	public dispose():void{
		
	}

}