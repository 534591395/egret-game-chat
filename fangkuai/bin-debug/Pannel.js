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
var Pannel = (function (_super) {
    __extends(Pannel, _super);
    function Pannel() {
        var _this = _super.call(this) || this;
        _this._score = 0;
        _this.skinName = "resource/skins/Pannel.exml";
        _this.event();
        // 给主容器添加一个矩形边框 
        var shp = new egret.Shape();
        shp.graphics.lineStyle(2, 0xffffff);
        shp.graphics.beginFill(0x000000, 1);
        shp.graphics.drawRect(0, 0, _this.scrollBox.width, _this.scrollBox.height);
        shp.graphics.endFill();
        _this.scrollBox.addChild(shp);
        return _this;
    }
    Pannel.prototype.event = function () {
        var _this = this;
        var LeftEvent = new MainEvent(MainEvent.Left);
        var RightEvent = new MainEvent(MainEvent.Right);
        var RotateShapeEvent = new MainEvent(MainEvent.RotateShape);
        /**点击按钮'左边' */
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(LeftEvent);
        }, this);
        /**点击按钮'右边' */
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(RightEvent);
        }, this);
        /**点击按钮'翻转' */
        this.rotateShapeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(RotateShapeEvent);
        }, this);
    };
    Object.defineProperty(Pannel.prototype, "score", {
        get: function () {
            return this._score;
        },
        /**设置分数 */
        set: function (score) {
            this._score = score;
            this.scoreLabel.text = this._score + '分';
        },
        enumerable: true,
        configurable: true
    });
    return Pannel;
}(eui.Component));
__reflect(Pannel.prototype, "Pannel");
