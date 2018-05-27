var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 配置表管理
 */
var ConfigManager = (function () {
    function ConfigManager() {
        this.mapCofing = {
            "1": { "mapID": "1", "name": "主城", "mw": 10500, "mh": 9440, "gw": 60, "gh": 80, "cellW": 512, "cellH": 512 },
            "2": { "mapID": "2", "name": "血缘", "mw": 10500, "mh": 9440, "gw": 60, "gh": 80, "cellW": 512, "cellH": 512 }
        };
    }
    Object.defineProperty(ConfigManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new ConfigManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    ConfigManager.prototype.init = function () {
        this.allResJsonDic = {};
    };
    /**
     * 解析资源配置文件
     */
    ConfigManager.prototype.saveAllResJson = function (data) {
        var _this = this;
        data.forEach(function (resObj) {
            _this.allResJsonDic[resObj.name] = resObj;
        });
    };
    ConfigManager.prototype.getResJsonByName = function (name) {
        return this.allResJsonDic[name];
    };
    ConfigManager.prototype.getMapConfigById = function (id) {
        return this.mapCofing[id];
    };
    ConfigManager._ins = null;
    return ConfigManager;
}());
__reflect(ConfigManager.prototype, "ConfigManager");
//# sourceMappingURL=ConfigManager.js.map