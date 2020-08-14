/**
 * 游戏界面
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
var Pannels = (function (_super) {
    __extends(Pannels, _super);
    function Pannels() {
        var _this = _super.call(this) || this;
        /** 连击数 */
        _this._numberHit = 0;
        /** 倒计时 */
        _this._countNumber = 60;
        /** 往上跳的距离 */
        _this._numberDistance = 0;
        /**背景图片的y轴值 -832 */
        _this._bgY = -832;
        /**底部云层的Y轴值 */
        _this._cloudBottomBgY = 368;
        _this.cloudBottomBgYMin = 368;
        _this.cloudBottomBgYMax = 416;
        _this.skinName = "resource/skins/Pannel.exml";
        _this.event();
        // 给背景容器添加遮罩
        var rect = new egret.Rectangle(0, 0, 320, 480);
        _this.bgBox.mask = rect;
        return _this;
    }
    Pannels.prototype.event = function () {
    };
    Object.defineProperty(Pannels.prototype, "countNumber", {
        get: function () {
            return this._countNumber;
        },
        /**设置倒计时 */
        set: function (number) {
            this._countNumber = number;
            var str;
            if (number < 10) {
                str = '0' + number;
            }
            else {
                str = number + '';
            }
            this.countTimeLeft.source = 'number_blue_' + str[0];
            this.countTimeRight.source = 'number_blue_' + str[1];
            // 设置进度条宽度
            this.countDownBar.width = 294 * (number / 60);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pannels.prototype, "numberHit", {
        get: function () {
            return this._numberHit;
        },
        /**设置连击数 */
        set: function (number) {
            this._numberHit = number;
            var str = number + '';
            if (str.length === 1) {
                str = '00' + str;
            }
            if (str.length === 2) {
                str = '0' + str;
            }
            this.numberScoreOne.source = 'number_score_' + str[0];
            this.numberScoreTwo.source = 'number_score_' + str[1];
            this.numberScoreThree.source = 'number_score_' + str[2];
            // 设置进度条宽度
            this.scoreProgressBar.width = 48 * (number / 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pannels.prototype, "numberDistance", {
        get: function () {
            return this._numberDistance;
        },
        /**设置往上跳的距离 */
        set: function (number) {
            this._numberDistance = number;
            var str = number + '';
            if (str.length === 1) {
                str = '000' + str;
            }
            if (str.length === 2) {
                str = '00' + str;
            }
            if (str.length === 3) {
                str = '0' + str;
            }
            if (str.length === 4) {
                str = '' + str;
            }
            this.numberDistanceOne.source = 'number_distance_' + str[0];
            this.numberDistanceTwo.source = 'number_distance_' + str[1];
            this.numberDistanceThree.source = 'number_distance_' + str[2];
            this.numberDistanceFour.source = 'number_distance_' + str[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pannels.prototype, "bgY", {
        get: function () {
            return this._bgY;
        },
        /**设置背景图片的y轴 */
        set: function (number) {
            this.bg.y = number;
            this._bgY = this.bg.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pannels.prototype, "cloudBottomType", {
        /**底部云层有两种 :  默认: cloud_bottom_1, 点赞： cloud_bottom_2*/
        set: function (number) {
            this.cloudBottomBg.source = 'cloud_bottom_' + number;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pannels.prototype, "cloudBottomBgY", {
        get: function () {
            return this._cloudBottomBgY;
        },
        set: function (number) {
            this.cloudBottomBg.y = number;
            this._cloudBottomBgY = this.cloudBottomBg.y;
        },
        enumerable: true,
        configurable: true
    });
    return Pannels;
}(eui.Component));
__reflect(Pannels.prototype, "Pannels");
