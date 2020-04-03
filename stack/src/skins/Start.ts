class Start extends eui.Component  {
    private btn: eui.Image; 

    public constructor() {
        super();
        this.skinName = "resource/eui_skins/Start.exml";
        this.animate();
    }

    private animate() {
        const gameStartEvent:MainEvent = new MainEvent(MainEvent.GameStart);
        
        // 点击开始
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(gameStartEvent);
        }, this);
    }
}