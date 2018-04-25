var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
* 层管理器
* name;
*/
var LayerManager = (function () {
    function LayerManager() {
        this.bgLayer = null;
        this.bgPreLayer = null;
        this.bgNearLayer = null;
        this.bgEffectLayer = null;
        this.roleLayer = null;
        this.effectLayer = null;
        this.uiLayer = null;
        this.tipLayer = null;
    }
    Object.defineProperty(LayerManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new LayerManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    LayerManager.prototype.init = function (main) {
        this.bgLayer = new MyLayer();
        main.addChild(this.bgLayer);
        this.bgPreLayer = new MyLayer();
        main.addChild(this.bgPreLayer);
        this.bgEffectLayer = new MyLayer();
        main.addChild(this.bgEffectLayer);
        this.roleLayer = new MyLayer();
        main.addChild(this.roleLayer);
        this.bgNearLayer = new MyLayer();
        main.addChild(this.bgNearLayer);
        this.effectLayer = new MyLayer();
        main.addChild(this.effectLayer);
        this.uiLayer = new MyLayer();
        main.addChild(this.uiLayer);
        this.tipLayer = new MyLayer();
        main.addChild(this.tipLayer);
    };
    /**添加到对应层 */
    LayerManager.prototype.addToLayer = function (view, layerId, isMask, isMany, isCenter) {
        if (isMask === void 0) { isMask = false; }
        if (isMany === void 0) { isMany = false; }
        if (isCenter === void 0) { isCenter = true; }
        var layer = this.getLayer(layerId);
        if (isCenter) {
            view.x = GameConfig.STAGE_WIDTH - view.width >> 1;
            view.y = GameConfig.STAGE_HEIGHT - view.height >> 1;
        }
        layer.add(view, isMask, isMany);
    };
    /**从对应层移出显示对象 */
    LayerManager.prototype.removeToLyaer = function (view, layerId, isMask, isMany) {
        if (isMask === void 0) { isMask = false; }
        if (isMany === void 0) { isMany = false; }
        var layer = this.getLayer(layerId);
        layer.remove(view, isMask, isMany);
    };
    LayerManager.prototype.getLayer = function (layerId) {
        switch (layerId) {
            case LayerManager.BG_LAYER:
                return this.bgLayer;
            case LayerManager.BG_FAR_LAYER:
                return this.bgPreLayer;
            case LayerManager.BG_NEAR_LAYER:
                return this.bgNearLayer;
            case LayerManager.BG_EFFECT_LAYER:
                return this.bgEffectLayer;
            case LayerManager.ROLE_LAYER:
                return this.roleLayer;
            case LayerManager.EFFECT_LAYER:
                return this.effectLayer;
            case LayerManager.UI_LAYER:
                return this.uiLayer;
            case LayerManager.TIP_LAYER:
                return this.tipLayer;
        }
    };
    /**背景 */
    LayerManager.BG_LAYER = 0;
    /**远景 */
    LayerManager.BG_FAR_LAYER = 1;
    /**背景特效 */
    LayerManager.BG_EFFECT_LAYER = 2;
    /**角色层 */
    LayerManager.ROLE_LAYER = 3;
    /**近景 */
    LayerManager.BG_NEAR_LAYER = 4;
    /**特效层 */
    LayerManager.EFFECT_LAYER = 5;
    /**UI层 */
    LayerManager.UI_LAYER = 6;
    /**tip层 */
    LayerManager.TIP_LAYER = 7;
    LayerManager._ins = null;
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
/**
 * 自定义层级
 */
var MyLayer = (function (_super) {
    __extends(MyLayer, _super);
    function MyLayer() {
        var _this = _super.call(this) || this;
        _this.maskCount = 0;
        _this.maskSprite = null;
        _this.viewObj = {};
        _this.curView = null;
        return _this;
    }
    MyLayer.prototype.add = function (view, isMask, isMany) {
        if (isMask === void 0) { isMask = false; }
        if (isMany === void 0) { isMany = false; }
        if (isMask) {
            if (this.maskSprite == null) {
                this.maskSprite = new egret.Sprite();
                this.maskSprite.width = GameConfig.STAGE_WIDTH;
                this.maskSprite.height = GameConfig.STAGE_HEIGHT;
                // this.maskSprite.mouseEnabled = true;
                this.maskSprite.graphics.beginFill(0x000000);
                this.maskSprite.graphics.drawRect(0, 0, GameConfig.STAGE_WIDTH, GameConfig.STAGE_HEIGHT);
                this.maskSprite.graphics.endFill();
                this.maskSprite.alpha = 0.5;
            }
            if (!this.maskSprite.parent) {
                this.addChild(this.maskSprite);
            }
            this.maskCount++;
        }
        if (isMany) {
            var keyClass = view.constructor.name;
            if (!this.viewObj[keyClass]) {
                this.viewObj[keyClass] = [];
            }
            this.viewObj[keyClass].push(view);
        }
        else {
            if (this.curView && this.curView.parent) {
                this.curView.parent.removeChild(this.curView);
                this.curView = null;
            }
            this.curView = view;
        }
        this.addChild(view);
    };
    MyLayer.prototype.remove = function (view, isMask, isMany) {
        if (isMask === void 0) { isMask = false; }
        if (isMany === void 0) { isMany = false; }
        if (isMask) {
            this.maskCount--;
            if (this.maskCount <= 0 && this.maskSprite) {
                if (this.maskSprite) {
                    this.maskSprite.graphics.clear();
                    if (this.maskSprite.parent) {
                        this.maskSprite.parent.removeChild(this.maskSprite);
                    }
                    this.maskSprite = null;
                }
            }
        }
        if (isMany) {
            var keyClass = view.constructor.name;
            if (this.viewObj[keyClass]) {
                this.viewObj[keyClass].pop();
            }
        }
        else {
            if (this.curView && this.curView.constructor.name == view.constructor.name) {
                this.curView = null;
            }
        }
        if (view.parent) {
            view.parent.removeChild(view);
        }
    };
    return MyLayer;
}(egret.Sprite));
__reflect(MyLayer.prototype, "MyLayer");
//# sourceMappingURL=LayerManager.js.map