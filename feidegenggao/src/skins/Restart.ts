/**
 * 重玩
 */
class Restarts extends eui.Component  {
    private restart: eui.Image;
    private nowDistanceBox: eui.Group;
    private historyDistanceBox: eui.Group;

    public constructor() {
        super();
        this.skinName = "resource/skins/Restart.exml";

        this.event();
    }

    private event() {
        const RestartEvent:MainEvent = new MainEvent(MainEvent.Restart);
        /**点击按钮 `重玩` */
        this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(RestartEvent);
        }, this);
    }

    /**显示当前距离值 */
    public set nowDistance(number: number) {
        const str = number + '';
        const num = this.nowDistanceBox.width -  33 * str.length;
        for (let i = 0; i < str.length; i++) {
            let numBox = Util.createBitmapByName('imgMerger#number_yellow_' + str[i]);
            numBox.x = i * 33 + num;
            this.nowDistanceBox.addChild(numBox);
        }
    } 

    /**显示历史最高距离值 */
    public set historyDistance(number: number) {
        const str = number + '';
        const num = this.historyDistanceBox.width -  13 * str.length;
        for (let i = 0; i < str.length; i++) {
            let numBox = Util.createBitmapByName('imgMerger#number_white_' + str[i]);
            numBox.x = i * 13 + num;
            this.historyDistanceBox.addChild(numBox);
        }
    } 
}