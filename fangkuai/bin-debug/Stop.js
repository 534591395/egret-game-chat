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
var Stop = (function (_super) {
    __extends(Stop, _super);
    function Stop() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/Stop.exml";
        _this.event();
        return _this;
    }
    Stop.prototype.event = function () {
        var _this = this;
        var RestartEvent = new MainEvent(MainEvent.Restart);
        /**点击按钮'左边' */
        this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(RestartEvent);
        }, this);
    };
    return Stop;
}(eui.Component));
__reflect(Stop.prototype, "Stop");
