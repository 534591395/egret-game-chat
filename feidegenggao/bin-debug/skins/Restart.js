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
/**
 * 重玩
 */
var Restarts = (function (_super) {
    __extends(Restarts, _super);
    function Restarts() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/Restart.exml";
        _this.event();
        return _this;
    }
    Restarts.prototype.event = function () {
        var _this = this;
        var RestartEvent = new MainEvent(MainEvent.Restart);
        /**点击按钮 `重玩` */
        this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(RestartEvent);
        }, this);
    };
    Object.defineProperty(Restarts.prototype, "nowDistance", {
        /**显示当前距离值 */
        set: function (number) {
            var str = number + '';
            var num = this.nowDistanceBox.width - 33 * str.length;
            for (var i = 0; i < str.length; i++) {
                var numBox = Util.createBitmapByName('imgMerger#number_yellow_' + str[i]);
                numBox.x = i * 33 + num;
                this.nowDistanceBox.addChild(numBox);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Restarts.prototype, "historyDistance", {
        /**显示历史最高距离值 */
        set: function (number) {
            var str = number + '';
            var num = this.historyDistanceBox.width - 13 * str.length;
            for (var i = 0; i < str.length; i++) {
                var numBox = Util.createBitmapByName('imgMerger#number_white_' + str[i]);
                numBox.x = i * 13 + num;
                this.historyDistanceBox.addChild(numBox);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Restarts;
}(eui.Component));
__reflect(Restarts.prototype, "Restarts");
