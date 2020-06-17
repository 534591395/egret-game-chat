class Panel extends eui.Component  {
    private down: eui.Image; 
    private score: eui.Label;
    private grade: eui.Label;
    private lianji: eui.Label;
    public scrollareaLayer: eui.Group;

    public constructor() {
        super();
        this.skinName = "resource/eui_skins/Panel.exml";
        this.width = 320;
        this.animate();
    }

    private animate() {
        const downEvent:MainEvent = new MainEvent(MainEvent.Down);
        // 点击放木头
        this.down.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(downEvent);
        }, this);
    }
    
    /**设置分数 */
    public setScore(score) {
        this.score.text = score;
    }

    /**设置等级 */
    public setlevel(level) {
        this.grade.text = level;
    }

    /**设置完美次数 */
    public setPerfectOperation(num) {
        this.lianji.text = num;
    }
    
}