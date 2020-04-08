class Panel extends eui.Component  {
    private down: eui.Image; 
    private score: eui.Label;
    private grade: eui.Label;
    private lianji: eui.Label;

    public constructor() {
        super();
        this.skinName = "resource/eui_skins/Panel.exml";
        this.width = 320;
        //this.animate();
    }

    private animate() {
        const gameStartEvent:MainEvent = new MainEvent(MainEvent.GameStart);
        
        // 点击开始
        this.down.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(gameStartEvent);
        }, this);
    }
}