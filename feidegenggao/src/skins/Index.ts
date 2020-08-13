/**
 * 游戏开始皮肤
 */

class Index extends eui.Component  {
    public gameStart: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/Index.exml";
        this.event();
    }

    private event() {
        // 点击按钮-“点击开始”触发
        const StartEvent:MainEvent = new MainEvent(MainEvent.GameStart);
        this.gameStart.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(StartEvent);
        }, this);
    }
}