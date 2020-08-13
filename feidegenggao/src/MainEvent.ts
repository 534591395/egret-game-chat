/**
 * 自定义事件
 */

class MainEvent extends egret.Event {
    /**开始游戏 */
    public static GameStart:string = '开始游戏';
    /**重新开始 */
    public static Restart:string = '重新开始';


    private _resName: string = ""; 

    public constructor(type:string, resName:string="", bubbles:boolean=false, cancelable:boolean=false) {
        super(type, bubbles, cancelable);
        this._resName = resName;
    }

    public get resName(): string {
        return this._resName;
    }
}
