class Restart extends eui.Component  {
    private tip: eui.Label;
    private restartgame: eui.Label;


    public constructor() {
        super();
        this.skinName = "resource/eui_skins/Restart.exml";
        this.animate();
    }

    private animate() {
        const restartgameEvent:MainEvent = new MainEvent(MainEvent.Restartgame);
        // 点击重新开始
        this.restartgame.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(restartgameEvent);
        }, this);
    }
    
    /**设置提示文案 */
    public setTip(tip) {
        this.tip.text = tip;
    }

    
}