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
		this.selfRole.playAni(RoleAniName.STAND);

	}

	public roleMove(dx:number,dy:number,moveSpeed:number):void
	{
		if(dx == 0 && dy == 0)
		{
			//不移动不更新
			return;
		}
		var playerData = GameDataManager.ins.playerData;
		//场景
		var mapX:number = playerData.mapXYPoint.x + dx * moveSpeed;
		var mapY:number = playerData.mapXYPoint.y + dy * moveSpeed;
		var sceneMgr:SceneMananger = SceneMananger.ins;
		var roleWidth = 50;
		var roleHeight = 100;
		if(mapX < roleWidth)
			mapX = roleWidth;
		else if(mapX > sceneMgr.mapW - roleWidth)
			mapX = sceneMgr.mapW - roleWidth;
		if(mapY < roleHeight)
			mapY = roleHeight;
		else if(mapY > sceneMgr.mapH - roleHeight)
			mapY = sceneMgr.mapH - roleHeight;
		
		playerData.mapXYPoint.x = mapX;
		playerData.mapXYPoint.y = mapY;
		
		if(sceneMgr.isOutOfMap(mapX,mapY))
		{
			return;
		}
		sceneMgr.terainScroll(mapX,mapY);

		//角色
		var roleX:number = playerData.isCenterX ? GameConfig.STAGE_WIDTH / 2 : this.selfRole.x + dx * moveSpeed;
		var roleY:number = playerData.isCenterY ? GameConfig.STAGE_HEIGHT / 2 : this.selfRole.y + dy * moveSpeed;
		if(roleX < roleWidth)
			roleX = roleWidth;
		else if(roleX > GameConfig.STAGE_WIDTH - roleWidth)
			roleX = GameConfig.STAGE_WIDTH - roleWidth;
		if(roleY < roleHeight)
			roleY = roleHeight;
		else if(roleY > GameConfig.STAGE_HEIGHT)
			roleY = GameConfig.STAGE_HEIGHT;
		this.selfRole.x = roleX;
		this.selfRole.y = roleY;
		

	}

	
}