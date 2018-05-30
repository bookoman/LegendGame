class RoleManager {
	public selfRole:Role;
	public constructor() {
	}
	private static _ins:RoleManager = null;
	public static get ins():RoleManager
	{
		if(this._ins == null)
		{
			this._ins = new RoleManager();
		}
		return this._ins;
	}
	public initRole(roleID:string):void
	{
		this.selfRole = new Role(roleID);
		this.selfRole.x = 200;
		this.selfRole.y = 300;
		GameDataManager.ins.playerData.mapXYPoint.x = this.selfRole.x;
		GameDataManager.ins.playerData.mapXYPoint.y = this.selfRole.y;
		this.selfRole.playAni(RoleAniName.MOVE);

	}

	public roleMove(dx:number,dy:number,moveSpeed:number):void
	{
		var playerData = GameDataManager.ins.playerData;

		var tx:number = playerData.mapXYPoint.x + dx * moveSpeed;
		var ty:number = playerData.mapXYPoint.y + dy * moveSpeed;

		if(SceneMananger.ins.isOutOfMap(tx,ty))
		{
			return;
		}
		SceneMananger.ins.terainScroll(tx,ty);
		
		playerData.mapXYPoint.x = tx;
		playerData.mapXYPoint.y = ty;
		this.selfRole.x = playerData.isCenterX ? GameConfig.STAGE_WIDTH / 2 : tx;
		this.selfRole.y = playerData.isCenterY ? GameConfig.STAGE_HEIGHT /2 : ty;
		console.log(tx,ty);


	}
}