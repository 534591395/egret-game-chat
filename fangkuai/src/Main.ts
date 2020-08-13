//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    private pannelUI: Pannel;

    private grids: any[];
    
    /**每个正方形小格子的长宽值 */
    public static Gridsize: number = 20;

    /**图形类型索引 */
    private nextShapeIndex: number = 0;
    /**图形索引 */
    private index: number = 0;

    /**当前图形相关属性 */
    private nowShape: any;

    /**七种图形 */
    private shapeList: any[];

    /**回收池队列， 存储小格子对象*/
    private poolList: any[];

    private timeNum: number = 0;
    private timeMax = 300;
    private time = 0;
    /**游戏暂停标记 */
    private isPause: boolean;
    private restartUI: Restart;

    /**分数 */
    private score: number;


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        this.pannelUI = new Pannel();
        //this.pannelUI.width = this.stage.stageWidth;
        this.addChild(this.pannelUI);

        this.restartUI = new Restart();
        this.addChild(this.restartUI);

        // 图形有7种，每种由四个格子组成，对应的格子位置配置
        this.shapeList = [
            [[0, -1], [-1, 1], [0, 0], [0, 1]], 
            //[[1,0],[1,1],[1,2],[0,2]],
            //[[0,0],[0,1],[0,2],[-1,2]],
            [[0, -1], [1, 1], [0, 0], [0, 1]], 
            [[0, 0], [-1, 0], [0, 1], [0, -1]], 
            [[-1, -1], [0, -1], [0, 0], [1, 0]], 
            [[0, -1], [1, -1], [-1, 0], [0, 0]], 
            [[0, -1], [1, -1], [0, 0], [1, 0]], 
            [[0, -1], [0, 0], [0, 1], [0, 2]]
        ];

        this.poolList = [];

        this.pannelUI.addEventListener(MainEvent.Left, this.translateAction, this);
        this.pannelUI.addEventListener(MainEvent.Right, this.translateAction, this);
        this.pannelUI.addEventListener(MainEvent.RotateShape, this.rotateShape, this);

        this.restartUI.addEventListener(MainEvent.Restart, this.start, this);
    }

    private start() {
        this.score = 0;
        this.changeScore(this.score);
        this.removeChild(this.restartUI);
        this.clearShape(this.pannelUI.scrollBox);
        this.clearNextShape();

        this.isPause = false;
        this.nextShapeIndex = this.index = 0;
        this.createMatrix();
        this.createNewShape();
    }
 
    private translateAction(event: MainEvent): void {
        if (event.type === '左移') {
            this.translateXShape(-1);
        } else
        if (event.type === '右移') {
            this.translateXShape(1);
        }
    } 

    /**
     * 图形翻转
     * 原理公式参考：沿着原点旋转坐标转换公式： https://blog.csdn.net/weixin_30808693/article/details/97098913
     */
    private rotateShape():void {
        // 田字图形无需翻转
        if (this.nowShape.shapeIndex  === 5) {
            return;
        }
        const data = this.nowShape.data;
        const temp = [];
        
        for (let i = 0; i < data.length; i++) {
            temp.push([data[i][1], -data[i][0] ]);
        }
        this.nowShape.data = temp;
        

        const x = this.checkXBoundary(); 
        if ( Math.abs(x) === 1) {
            // 如果 this.checkXBoundary() === -1 ，表示左边超出了，相反值右边超出了；假如左边超出，就往右移动单位位置
            this.translateXShape(-x);
        } else {
            if (this.checkXBoundary() === 0) {
                this.clearShape(this.pannelUI.scrollBox, this.nowShape.index);
                this.drawShape();
            }
        }
    }
    
    /**
     * 参数num 
     * -1 往左边移动；1往右边移动
     */
    private translateXShape(num: number): void {
        // 边界检测通过
        if (this.checkXBoundary(num) === 0) {
            this.nowShape.x += Main.Gridsize * num;
            this.clearShape(this.pannelUI.scrollBox, this.nowShape.index);
            this.drawShape();
        }
    }

    private getGrid():egret.Bitmap  {
        let grid;
        if (this.poolList.length) {
            // 取出队列的最后一个
            grid = this.poolList.pop();
        } else {
            grid = Util.createBitmapByName('rect_png');
        }
        return grid;
    }

    private destroyGrid(grid: egret.Bitmap, layer:eui.Group) {
        layer.removeChild(grid);
        this.poolList.push(grid);
    }
    
    // 创建矩阵，将scroll界面分成多个格子
    private createMatrix():void {
        // grids[i] Y轴  grids[i][j] X轴
        this.grids = <any>[];
        for (let i = 0; i < this.pannelUI.scrollBox.height / Main.Gridsize; i++) {
            this.grids[i] = <any>[];
            for (let j = 0; j < this.pannelUI.scrollBox.width / Main.Gridsize; j++) {
                this.grids[i][j] = false;
            }
        }
    }

    /**创建一个新的图形 */
    private createNewShape(): void {
        // 默认超出范围
        this.nowShape = {
            x: this.pannelUI.scrollBox.width / 2,
            y: -40,
            shapeIndex: this.nextShapeIndex,
            index: this.index,
            data: JSON.parse(JSON.stringify(this.shapeList[this.nextShapeIndex]))
        };
        this.index ++;
        // 随机赋值下一个方块形状索引
        this.nextShapeIndex = Math.floor(Math.random() * this.shapeList.length);
        // 将下一个图形添加到预览容器中
        const nextShape = {
            x: 40,
            y: 40,
            index: 0,
            data: JSON.parse(JSON.stringify(this.shapeList[this.nextShapeIndex]))
        };
        this.clearNextShape();
        this.drawShape(nextShape, this.pannelUI.nextShapeBox);

        egret.startTick(this.translateYShape, this);
    }
    
    /**清除预览容器的图形 */
    private clearNextShape():void {
        // 从格子索引0清除
        this.clearShape(this.pannelUI.nextShapeBox, 0);
    }

    /**清除图形显示容器的当前图形 */
    private clearShape(layer: eui.Group, index?: number):void  {
        let gridArr = this.getGridFromLayer(layer, index);
        let grid;
        while(gridArr.length) {
            grid = gridArr.shift();
            this.destroyGrid(<egret.Bitmap>grid, layer);
        }
    }

    /**获取指定容器中格子对象列表 */
    private getGridFromLayer(layer: eui.Group, index?: number): egret.Bitmap[] {
        let arr = [];
        for (let i = 0; i < layer.numChildren; i++) {
            const grid = layer.getChildAt(i);
            if (grid) {
                if (typeof index === 'undefined') {
                    if (grid.name.indexOf('grid') > -1) {
                        arr.push(grid);
                    }
                } else
                if (grid.name === ('grid_'+index) ) {
                    arr.push(grid);
                }
            }
        }
        return arr;
    }

    /**绘制图形 */
    private drawShape(shape?:any, layer?: eui.Group): void {
        const shapeObject = shape || this.nowShape;
        const container = layer || this.pannelUI.scrollBox;
        const arr = this.transitionCoordinate(shapeObject.data, shapeObject.x, shapeObject.y);
        for (let i = 0; i < arr.length; i++) {
            const grid = this.getGrid();
            grid.x = arr[i][0];
            grid.y = arr[i][1];
            grid.name = 'grid' + '_' +shapeObject.index;
            container.addChild(grid);
        }
    }

    /**根据shape值，转换实际坐标 */
    private transitionCoordinate(shapeArr, shapeX, shapeY) {
        const arr = [];
        for (let i = 0; i < shapeArr.length; i++) {
            arr.push([ 
                Main.Gridsize * shapeArr[i][0] + shapeX,  
                Main.Gridsize * shapeArr[i][1] + shapeY
            ]);
        }
        return arr;
    }

    /**更新图形的Y轴值 */
    private translateYShape(timeStamp:number): boolean {
        const now = timeStamp;
        const time = this.time;
        const pass = now - time;
        this.timeNum += pass;
        if (this.timeNum > this.timeMax) {
            this.timeNum = 0;
            if (!this.isPause) {
                const checkedBool = this.checkYBoundary();
                if (checkedBool) {
                    this.clearShape(this.pannelUI.scrollBox, this.nowShape.index);
                    this.nowShape.y += Main.Gridsize;
                    this.drawShape();
                } else {
                    // 停止心跳
                    egret.stopTick(this.translateYShape, this);
                    this.drawWall();
                    this.createNewShape();
                }
            }
        } 
  
        this.time = now;
        return false;
    }

    /**检测当前图形是否在容器Y轴边界内，返回 false，表示已经到边界 */
    private checkYBoundary() : boolean {
        let bool = true;
        const arr = this.transitionCoordinate(this.nowShape.data, this.nowShape.x, this.nowShape.y);
        for (let i = 0; i < arr.length; i++) {
            const xNum = arr[i][0] / Main.Gridsize;
            const yNum = arr[i][1] /  Main.Gridsize;
            // 如果当前图形有个格子的Y轴已经在最低处，检测不通过
            if (yNum === (this.grids.length - 1)) {
                bool = false;
                break;
            }
            // 检测当前图形有格子的下个行走的格子是被占用的（有堆叠的格子）
            if ( (typeof this.grids[yNum + 1] !== 'undefined') && this.grids[yNum + 1][xNum]) {
                // 如果此时 图形 在容器顶部（此时图形为刚刚生成的图形），游戏结束
                if (yNum === -1) {
                    this.restart();
                }
                bool = false;
                break;
            }
        }
        return bool;
    }
    /**
     * x轴检测，返回的值：0 - 表示校验通过；-1 - 表示左边超出了（需要微调位置）；1 - 表示右边超出了（需要微调位置） 
     *  2 - 表示要碰到堆叠好的格子
     * 参数num：1 -1 2 0
     * */
    private checkXBoundary(num?: number): number {
        let numMark = 0;
        const arr = this.transitionCoordinate(this.nowShape.data, this.nowShape.x, this.nowShape.y);
        try {
            for (let i = 0; i < arr.length; i++) {
                const xNum = arr[i][0] / Main.Gridsize;
                const yNum = arr[i][1] /  Main.Gridsize;
                // 左边超出了
                if ( 
                    (typeof num === 'undefined' && xNum < 0) || 
                    num === -1 && xNum === 0 
                ) {
                    numMark = -1;
                    break;
                } else 
                // 右边超出了
                if ( 
                    (typeof num === 'undefined' && xNum > this.grids[0].length - 1) ||
                    num === 1 && xNum === this.grids[0].length - 1
                 )  {
                     numMark = 1;
                     break;
                 } else
                 // 碰到已经堆积好的方块们;  num === -1 表示左边方向；num === 1 表示右边方向； this.grids[yNum][xNum] === true 表示这个小格子已经被占用了（再往左右移动就碰到已经堆积好的方块们）
                 if (
                     (typeof num === 'undefined' && this.grids[yNum][xNum]) ||
                     (num === -1 && this.grids[yNum][xNum - 1]) ||
                     (num === 1 && this.grids[yNum][xNum + 1])
                 ) {
                     numMark = 2;
                     break;
                 }
            }
        } catch (error) {
            console.log(error);
        }
        return numMark;
    }
      
    // 两个形状相碰后，留有空隙--停止往下, 销毁。 满行了，那么我们就要清空这一整行的小方块们，同时要将占用的格子标记设置为true
    private drawWall():void {
        const arr = this.transitionCoordinate(this.nowShape.data, this.nowShape.x, this.nowShape.y);
        let i = 0;
        try {
            //停止下降后，此时要把所在的格子标志为已占用(true)
            for (i = 0; i < arr.length; i++) {
                const yNum = arr[i][1] / Main.Gridsize;
                const xNum = arr[i][0] / Main.Gridsize;
                this.grids[yNum][xNum] = true;
            }
        } catch (error) {
            console.log(error);
            this.restart();
        }
          
        for (i = 0; i < this.grids.length; i++) {
            // 是否满格
            let mark = true;
            // 循环某个行，该行上的所有小格子都被占用，那么就更新分数 
            for (let k = 0; k < this.grids[i].length; k++) {
                if (!this.grids[i][k]) {
                    mark = false;
                    break;
                }
            }
            if (mark) {
                this.changeScore();
                for (let j = i; j > 0; j--) {
                    for (let h = 0; h < this.grids[i].length; h++) {
                        this.grids[j][h] = this.grids[j-1][h];
                    }
                }
            }
        }

        this.clearShape(this.pannelUI.scrollBox);
        // 绘制已被占的格子
        for (let g = 0; g < this.grids.length; g++) {
            for (let s = 0; s < this.grids[g].length; s++) {
                if (this.grids[g][s]) {
                    const grid = this.getGrid();
                    grid.x = s * Main.Gridsize;
                    grid.y = g * Main.Gridsize;
                    this.pannelUI.scrollBox.addChild(grid);
                }
            }
        }
    }

    private restart(): void {
        console.log('游戏结束')
        this.isPause = true;
        egret.stopTick(this.translateYShape, this);
        this.addChild(this.restartUI);
    }
    
    /**设置分数 */
    private changeScore(score?:number): void {
        if (typeof score === 'undefined') {
            this.score += 1;
        } else {
            this.score = score;
        }
        this.pannelUI.score = this.score;
    }

}
