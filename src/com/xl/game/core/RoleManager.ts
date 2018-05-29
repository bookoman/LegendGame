class RoleManager {
	private selfRole:Role;
	private roleSpeed:number = 2;
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
		this.selfRole.playAni(RoleAniName.MOVE);
	}

	public roleMove(dx:number,dy:number,speedTimes:number):void
	{
		var tx:number = this.selfRole.x + dx * this.roleSpeed * speedTimes;
		var ty:number = this.selfRole.y + dy * this.roleSpeed * speedTimes;

		// if(SceneMananger.ins.isOutOfMap(tx,ty))
		// {
		// 	return;
		// }
		this.selfRole.x = tx;
		this.selfRole.y = ty;
	}
}