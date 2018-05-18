class TextureUtil {
	private static _ins:TextureUtil = null;
	// private bitmap:egret.Bitmap;
	private texture:egret.Texture;
	public constructor() {
		this.texture = new egret.Texture();
	}
	public static get ins():TextureUtil{
		if(this._ins == null)
		{
			this._ins = new TextureUtil();
		}
		return this._ins;
	}

	public bitmapdataToBitmap(bmd:egret.BitmapData):egret.Bitmap
	{
		var bitmap:egret.Bitmap = new egret.Bitmap();
		this.texture._setBitmapData(bmd);
		bitmap.$setTexture(this.texture);
		return bitmap;
	}

}