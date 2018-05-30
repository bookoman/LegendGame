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

		var sceneMgr:SceneMananger = SceneMananger.ins;
		var roleWidth = 50;
		var roleHeight = 100;
		if(tx < roleWidth)
			tx = roleWidth;
		else if(tx > sceneMgr.mapW - roleWidth)
			tx = sceneMgr.mapW - roleWidth;
		if(ty < roleHeight)
			ty = roleHeight;
		else if(ty > sceneMgr.mapH - roleHeight)
			ty = sceneMgr.mapH - roleHeight;
		
		playerData.mapXYPoint.x = tx;
		playerData.mapXYPoint.y = ty;
		
		this.selfRole.x = playerData.isCenterX ? GameConfig.STAGE_WIDTH / 2 : this.selfRole.x + dx * moveSpeed;
		this.selfRole.y = playerData.isCenterY ? GameConfig.STAGE_HEIGHT / 2 : this.selfRole.y + dy * moveSpeed;
		//场景
		if(sceneMgr.isOutOfMap(tx,ty))
		{
			return;
		}
		sceneMgr.terainScroll(tx,ty);

	}
}