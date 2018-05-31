/**
 * 地图加载item
 */
class MapSimpleLoader{
	public key:string;
	private imgLoader:ImageLoader;
	private gameCanvas:egret.Sprite;
	public cx:number
	public cy:number
	private cellXs:number;
	private cellYs:number;
	private cellW:number;
	private cellH:number;
	private bitmap:egret.Bitmap = null;
	private texture:egret.Texture;
	
	public constructor(canvas:egret.Sprite,cx:number,cy:number,cellXs:number,cellYs:number,cellW:number,cellH:number) {
		this.gameCanvas = canvas;
		this.cx = cx;
		this.cy = cy;
		this.cellXs = cellXs;
		this.cellYs= cellYs;
		this.cellW = cellW;
		this.cellH = cellH;
		this.key = cx + "_"+ cy;

		this.bitmap = new egret.Bitmap();
		this.texture = new egret.Texture();
	}
	public load(mapId:string):void
	{
		if(this.imgLoader == null)
		{
			var blockId:number = this.cy * this.cellXs +  this.cx + 1;
			this.imgLoader = new ImageLoader();
			this.imgLoader.load("resource/assets/outside/map/"+mapId + "/"+blockId+".jpg",this.loadComplete,this);
		}
	}

	private loadComplete(data):void{
		
		var tx:number = this.cx * this.cellW;
		var ty:number = this.cy * this.cellH;
		
		this.texture._setBitmapData(data);
		this.bitmap.$setTexture(this.texture);
		this.bitmap.x = tx;
		this.bitmap.y = ty;
		this.gameCanvas.addChild(this.bitmap);
		
	}

	public dispose():void{
		if(this.bitmap)
		{
			if(this.bitmap.parent)
			{
				this.bitmap.parent.removeChild(this.bitmap);
			}
			// this.bitmap = null;
		}
		// this.texture = null;
		// this.imgLoader = null;
	}

}