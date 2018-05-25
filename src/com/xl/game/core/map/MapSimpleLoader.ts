/**
 * 地图加载item
 */
class MapSimpleLoader{
	private imgLoader:ImageLoader;
	private gameCanvas:egret.Sprite;
	private cx:number
	private cy:number
	private cellXs:number;
	private cellYs:number;
	private cellW:number;
	private cellH:number;
	
	public constructor(canvas:egret.Sprite,cx:number,cy:number,cellXs:number,cellYs:number,cellW:number,cellH:number) {
		this.gameCanvas = canvas;
		this.cx = cx;
		this.cy = cy;
		this.cellXs = cellXs;
		this.cellYs= cellYs;
		this.cellW = cellW;
		this.cellH = cellH;
	}
	public load(mapId:string):void
	{
		var blockId:number = this.cy * this.cellXs +  this.cx + 1;
		
		if(this.imgLoader == null)
		{
			this.imgLoader = new ImageLoader();
		}
		this.imgLoader.load("resource/assets/outside/map/"+mapId + "/"+blockId+".jpg",this.loadComplete,this);
		// console.log("resource/assets/outside/map/"+mapId + "/"+blockId+".jpg");
	}

	private loadComplete(data):void{
		//var cx:number = (this.blockId - 1) % this.cellXs;
		//var cy:number = Math.ceil(this.blockId / this.cellXs);
		//cy = cy == 0 ? 0 : cy - 1;

		var tx:number = this.cx * this.cellW;
		var ty:number = this.cy * this.cellH;
		// console.log(tx,ty);

		var bitmap:egret.Bitmap = TextureUtil.ins.bitmapdataToBitmap(data);
		bitmap.x = tx;
		bitmap.y = ty;
		this.gameCanvas.addChild(bitmap);
		// console.log("坐标",tx,ty);

	}

	public dispose():void{
		
	}

}