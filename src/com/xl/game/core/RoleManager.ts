class RoleManager {
	private selfRole:Role;
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

	public roleMove(x:number,y:number):void
	{
		if(SceneMananger.ins.isOutOfMap(x,y))
		{
			return;
		}
		this.selfRole.x = x;
		this.selfRole.y = y
	}
}