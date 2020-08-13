/**
 * 游戏开始皮肤
 */
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
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/Index.exml";
        _this.event();
        return _this;
    }
    Index.prototype.event = function () {
        var _this = this;
        // 点击按钮-“点击开始”触发
        var StartEvent = new MainEvent(MainEvent.GameStart);
        this.gameStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(StartEvent);
        }, this);
    };
    return Index;
}(eui.Component));
__reflect(Index.prototype, "Index");
