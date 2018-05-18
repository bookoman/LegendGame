/**
 * 
 */
class MapLayerVo {
	public data:Array<number>;
	public name:string;
	public width:number;
	public height:number;
	public cellX:number;
	public cellY:number;
	public constructor() {

	}
	public parse(layer):void
	{
		this.data = layer["data"];
		this.name = layer["name"];
		this.width = layer["width"];
		this.height = layer["height"];
		this.cellX = layer.properties["cellX"];
		this.cellY = layer.properties["cellY"];
	}
	
}