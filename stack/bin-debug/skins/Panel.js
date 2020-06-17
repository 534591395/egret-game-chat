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
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/Panel.exml";
        _this.width = 320;
        _this.animate();
        return _this;
    }
    Panel.prototype.animate = function () {
        var _this = this;
        var downEvent = new MainEvent(MainEvent.Down);
        // 点击放木头
        this.down.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEvent(downEvent);
        }, this);
    };
    /**设置分数 */
    Panel.prototype.setScore = function (score) {
        this.score.text = score;
    };
    /**设置等级 */
    Panel.prototype.setlevel = function (level) {
        this.grade.text = level;
    };
    /**设置完美次数 */
    Panel.prototype.setPerfectOperation = function (num) {
        this.lianji.text = num;
    };
    return Panel;
}(eui.Component));
__reflect(Panel.prototype, "Panel");
