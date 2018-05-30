class GameDataManager
{
    public playerData:PlayerData
    constructor()
    {
        
    }
    private static _ins:GameDataManager = null;
    public static get ins():GameDataManager
    {
        if(this._ins == null)
        {
            this._ins = new GameDataManager();
        }
        return this._ins;
    }
    public initData():void
    {
        this.playerData = new PlayerData();
    }
}