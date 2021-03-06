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
var Start = (function (_super) {
    __extends(Start, _super);
    function Start() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/Start.exml";
        _this.animate();
        return _this;
    }
    Start.prototype.animate = function () {
        var _this = this;
        var gameStartEvent = new MainEvent(MainEvent.GameStart);
        // 点击开始
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(gameStartEvent);
        }, this);
    };
    return Start;
}(eui.Component));
__reflect(Start.prototype, "Start");
