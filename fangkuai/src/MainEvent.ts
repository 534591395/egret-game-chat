/**
 * 自定义事件
 */

class MainEvent extends egret.Event {
    /**往左边移动 */
    public static Left:string = '左移';
    /**往右边移动 */
    public static Right:string = '右移';
    /**图形翻转 */
    public static RotateShape:string = '图形翻转';
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
