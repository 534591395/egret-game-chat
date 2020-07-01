class Restart extends eui.Component  {
    public restart: eui.Button;

    public constructor() {
        super();
        this.skinName = "resource/skins/Restart.exml";

        this.event();
    }

    private event() {
        const RestartEvent:MainEvent = new MainEvent(MainEvent.Restart);
        /**点击按钮'左边' */
        this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(RestartEvent);
        }, this);
    }
}