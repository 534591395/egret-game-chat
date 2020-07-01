class Pannel extends eui.Component  {
    public scrollBox: eui.Group;
    public nextShapeBox: eui.Group;
    public leftBtn: eui.Button;
    public rotateShapeBtn: eui.Button;
    public rightBtn: eui.Button;
    public scoreLabel: eui.Label;

    private _score: number = 0;
    

    public constructor() {
        super();
        this.skinName = "resource/skins/Pannel.exml";
        this.event();

        // 给主容器添加一个矩形边框 
        const shp:egret.Shape = new egret.Shape();
        shp.graphics.lineStyle( 2, 0xffffff );
        shp.graphics.beginFill( 0x000000, 1);
        shp.graphics.drawRect( 0, 0, this.scrollBox.width, this.scrollBox.height);
        shp.graphics.endFill();
        this.scrollBox.addChild( shp );
    }

    private event() {
        const LeftEvent:MainEvent = new MainEvent(MainEvent.Left);
        const RightEvent:MainEvent = new MainEvent(MainEvent.Right);
        const RotateShapeEvent:MainEvent = new MainEvent(MainEvent.RotateShape);

        /**点击按钮'左边' */
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(LeftEvent);
        }, this);

        /**点击按钮'右边' */
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(RightEvent);
        }, this);

        /**点击按钮'翻转' */
        this.rotateShapeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEvent(RotateShapeEvent);
        }, this);
    }
    

    public get score(): number {
        return this._score;
    }
    
    /**设置分数 */
    public set score(score: number) {
        this._score = score;
        this.scoreLabel.text = this._score + '分';
    }

}