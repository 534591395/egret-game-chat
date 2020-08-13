/**
 * 游戏界面
 */

class Pannels extends eui.Component  {
    /**人物 */
    public personBox: eui.Group;
    /** 背景图片 */
    public bg: eui.Image;
    /**底部云层 */
    public cloudBottomBg: eui.Image;
    /**放置云朵的容器 */
    public cloudBox: eui.Group;
    /**倒计时读条 */
    public countDownBar: eui.Image;
    /**倒计时数字显示-左边 */
    public countTimeLeft: eui.Image;
    /**倒计时数字显示-右边 */
    public countTimeRight: eui.Image;

    /**跳的距离-第一位 */
    public numberDistanceOne: eui.Image;
    /**跳的距离-第二位 */
    public numberDistanceTwo: eui.Image;
    /**跳的距离-第三位 */
    public numberDistanceThree: eui.Image;
    /**跳的距离-第四位 */
    public numberDistancFour: eui.Image;

    /** 连击数进度条 */
    public scoreProgressBar: eui.Image;
    /** 连击数-第一位 */
    public numberScoreOne: eui.Image;
    /** 连击数-第二位 */
    public numberScoreTwo: eui.Image;
    /** 连击数-第三位 */
    public numberScoreThree: eui.Image;

    /** 连击数 */
    private _numberHit = 0;

    /** 倒计时 */
    private _countNumber = 60;

    /** 往上跳的距离 */
    private _numberDistance = 0;
    

    /**背景图片的y轴值 -832 */
    private  _bgY = -832;

    /**底部云层的Y轴值 */
    private _cloudBottomBgY = 368;

    public cloudBottomBgYMin = 368;
    public cloudBottomBgYMax = 416;

    public constructor() {
        super();
        this.skinName = "resource/skins/Pannel.exml";
        this.event();
    }

    private event() {
        
    }

    public get countNumber() {
        return this._countNumber;
    }
    /**设置倒计时 */
    public set countNumber(number: number) {
        this._countNumber = number;
        let str;
        if (number < 10) {
            str = '0' + number;
        } else {
            str = number + '';
        }
        
        this.countTimeLeft.source = 'number_blue_'+ str[0];
        this.countTimeRight.source = 'number_blue_'+ str[1];
        // 设置进度条宽度
        this.countDownBar.width = 294 * (number/60);
    }

    public get numberHit() {
        return this._numberHit;
    }
    /**设置连击数 */
    public set numberHit(number: number) {
        this._numberHit = number;
        let str = number + '';
        if (str.length === 1) {
            str = '00' + str;
        }
        if (str.length === 2) {
            str = '0' + str;
        }

        this.numberScoreOne.source = 'number_score_'+ str[0];
        this.numberScoreTwo.source = 'number_score_'+ str[1];
        this.numberScoreThree.source = 'number_score_'+ str[2];
        // 设置进度条宽度
        this.scoreProgressBar.width = 48 * (number/10);
    }
    

    public get numberDistance() {
        return this._numberDistance;
    }

    /**设置往上跳的距离 */
    public set numberDistance(number: number) {
        this._numberDistance = number;
        let str = number + '';
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

        this.numberDistanceOne.source = 'number_distance_'+ str[0];
        this.numberDistanceTwo.source = 'number_distance_'+ str[1];
        this.numberDistanceThree.source = 'number_distance_'+ str[2];
        this.numberDistancFour.source = 'number_distance_'+ str[3];
    }


    public get bgY() {
        return this._bgY;
    }
    /**设置背景图片的y轴 */
    public set bgY(number: number) {
        this.bg.y -= number;
        this._bgY = this.bg.y;
        
    }
    
    /**底部云层有两种 :  默认: cloud_bottom_1, 点赞： cloud_bottom_2*/
    public set cloudBottomType(number: number) {
        this.cloudBottomBg.source = 'cloud_bottom_' + number;
    }

    public get cloudBottomBgY() {
        return this._cloudBottomBgY;
    }

    public set cloudBottomBgY(number: number) {
        this.cloudBottomBg.y = number;
        this._cloudBottomBgY = this.cloudBottomBg.y;
    }
}