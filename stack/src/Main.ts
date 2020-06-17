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
    private zIndexNum: number = 999999;
    // sttype[i] 木头种类
    public sttype: number[] = [];
    public extraleft = [];
    // 木头高度 
    public extraright: number = 10;
    public logh: number = 20;
    public sah: number;
    public saw: number;
    // 木头左右距离
    public stmargin = [];
    public stwidth = [];
    // 标记, 添加的木头索引
    private sts: number = 0;
    private stdir;
    // 木头左右移动累加
    private timeNum: number = 0;
    private timeMax = 15;
    private time = 0;
    /**放下木头标记，=1表示放下木头 */
    private dnd = 0;
    /**玩家分数 */
    private stscore = 0;
    
    /**游戏结束标志：1 表示结束, 0 表示开始 */
    private gameisover = 1;
    /**游戏玩家数据 */
    private gamesplayed = 0;
    /**完美操作次数 */
    private perfectOperationNum = 0;

    // 游戏场景容器
    private gameLayer:egret.DisplayObjectContainer;
    // 堆放木头的容器
    private scrollareaLayer: eui.Group;

    private panelUI: Panel;

    private restart: Restart;

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
        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);
        
        this.bgUI();
        // 显示游戏面板
        this.panel();
        this.markUI();
        this.startUI();
    }

    private tipUI():void {
        let tip = new Tip();
        this.scrollareaLayer.addChild(tip);
        egret.Tween.get(tip).to({alpha: 0, y: 100}, 400).call(() => {
            this.scrollareaLayer.removeChild(tip);
        });
    }

    private bgUI(): void {
        const bgUI = new BgColor();
        bgUI.x = Utiles.horizontalCenter(this.stage.stageWidth, bgUI.width);

        this.gameLayer.addChild(bgUI);
    }

    private startUI(): void {
        // 加入开始UI组件
        const startUI = new Start();
        startUI.x = Utiles.horizontalCenter(this.stage.stageWidth, startUI.width);

        this.gameLayer.addChild(startUI);

        startUI.addEventListener(MainEvent.GameStart, this.gameStart, this);
    }

    private restartUI():void {
        const restart = new Restart();
        restart.x = Utiles.horizontalCenter(this.stage.stageWidth, restart.width);

        this.gameLayer.addChild(restart);
    }

    /**游戏面板 */
    private panel(): void {
        const panelUI = new Panel();
        panelUI.x = Utiles.horizontalCenter(this.stage.stageWidth, panelUI.width);

        this.panelUI = panelUI;

        this.gameLayer.addChild(panelUI);

        this.scrollareaLayer = panelUI.scrollareaLayer;
        this.scrollareaLayer.sortableChildren = true;

        panelUI.addEventListener(MainEvent.Down, this.down, this);
    }
    
    /**放下木头 */
    private down():void {
        if (this.dnd === 1 || this.gameisover == 1) {
            return ;
        }
        this.dnd === 1;
        // 停止心跳，放下后该木头停止左右移动
        egret.stopTick(this.moveStack,this);
        // 标记：要裁剪的木头是左边还是右边, 还是裁剪所有
        let hcf:string = '';
        // 当前木头离左边的距离小于底下木头
        if (this.stmargin[this.sts] < this.stmargin[this.sts - 1]) {
            // 重新设置当前木头的宽度（裁剪左边）
            this.stwidth[this.sts] -= this.stmargin[this.sts -1] - this.stmargin[this.sts];
            this.stmargin[this.sts] = this.stmargin[this.sts - 1];
            hcf = 'left';
        }
        // 当前木头离左边的距离大于底下木头
        if (this.stmargin[this.sts] + this.stwidth[this.sts] > this.stmargin[this.sts - 1] + this.stwidth[this.sts - 1]) {
            // 重新设置当前木头的宽度（裁剪右边）
            this.stwidth[this.sts] -= this.stmargin[this.sts] + this.stwidth[this.sts] - this.stmargin[this.sts-1]-this.stwidth[this.sts-1];      
            hcf = 'right';      
        }
        if (this.stwidth[this.sts] <= 0) {
            hcf = 'all';
        }
        

        if (this.stwidth[this.sts] <= 0) {
            this.stwidth[this.sts] = 0;
        }
        if(this.sts % 2 == 0 && this.stwidth[this.sts] > 0) {
          //this.addshadow();
        }
        // 分数计算- 取当前落下的木头长度乘以已经添加了木头数量的对数值（平滑减小数据大小）。
        let score = Math.floor(this.stwidth[this.sts]/10*Math.log(this.sts+1));
        const layer = <egret.DisplayObjectContainer>this.scrollareaLayer.getChildByName('stp_' + this.sts);
        // 如果是完美放入，分数乘以两倍， 完美判断：木头长度必须大于0，放入的木头跟前面的木头宽度相差某个阈值
        if (this.stwidth[this.sts] > 0 && Math.abs(this.stwidth[this.sts] - this.stwidth[this.sts - 1]) < 3) {
            score *= 2;
            this.perfectOperationNum += 1;
            this.panelUI.setPerfectOperation(this.perfectOperationNum);
            this.tipUI();
        }

        this.stscore += score;
        this.panelUI.setScore(this.stscore);
        //裁剪木头
        this.cutaronk(layer, this.sttype[this.sts], this.stwidth[this.sts], hcf);
    }
    /**截取木头 */
    private cutaronk(layer, sttype:number, stwidth, hcf) {
        if (!layer) {
            return;
        }

        const croriw = parseInt(layer.width);
        // 原先已存在容器 layer 的木头，该木头需做渐变效果和移除
        const childWoodOld = layer.getChildAt(0);
  
        let childWoodNew;
        // 如果是完美放入，无需添加一个新的木头（使用原来的木头即可）
        if (hcf === 'right') {
            // 添加一个木头
            this.showaronk(layer, sttype, stwidth);
            childWoodNew = layer.getChildAt(1);
            childWoodNew.x = childWoodOld.x;
        } else
        if (hcf === 'left') {
            // 添加一个木头
            this.showaronk(layer, sttype, stwidth);
            childWoodNew = layer.getChildAt(1);
            childWoodNew.x = childWoodOld.width + childWoodOld.x - childWoodNew.width;
        }

        if(hcf !='') {
            if (hcf === 'left' || hcf === 'right') {
                // 堆叠时没有空隙效果，减去n个像素
                layer.y = this.sah-(this.sts + 1)*(this.logh - 4);
                egret.Tween.get(childWoodOld).to({alpha: 0.25, y: childWoodOld.height}, 200).call(() => {
                    layer.removeChild(childWoodOld);
                });
            }

            if (this.stwidth[this.sts] > 0) {
              this.addStack();
              this.dnd = 0;
            } else {
                //游戏结束
                this.gameover();
            }
        }
    }

    /**游戏结束 */
    private gameover() {
        this.gameisover = 1;
        this.gamesplayed ++;
        egret.localStorage.setItem('stack_gamesplayed', this.gamesplayed+'');

        const restartUI = new Restart();
        restartUI.x = Utiles.horizontalCenter(this.stage.stageWidth, restartUI.width);
        restartUI.y = 80;
        restartUI.setTip(`游戏结束: ${this.stscore}, 再来一次?`);
        restartUI.name= "restartUI";
        restartUI.addEventListener(MainEvent.Restartgame, this.restartGame, this);
        this.gameLayer.addChild(restartUI);
        this.restart = restartUI;
    }

    private restartGame() {
        egret.stopTick(this.moveStack, this);
        
        if (this.restart) {
            this.gameLayer.removeChild(this.restart);
            this.restart = null;
        }
        this.zIndexNum = 999999;
        this.scrollareaLayer.removeChildren();
        this.sts = 0; 
        this.gameisover = 0;
        this.panelUI.setlevel(1);
        this.panelUI.setPerfectOperation(0);
        this.panelUI.setScore(this.stscore);
        this.saw = this.scrollareaLayer.width;
        this.sah = this.scrollareaLayer.height;
        this.extraleft[1] = 6;
        this.extraleft[2] = 4;
        this.extraleft[3] = 5;
        this.extraleft[4] = 5;
        this.sttype[0] = Math.floor(Math.random()*4)+1;
        this.stwidth[0] = 260;
        this.stmargin[0] = (this.saw - this.stwidth[0])/2;
        
        const layer = new egret.DisplayObjectContainer();
        layer.sortableChildren = true;  
        layer.height = this.logh;
        layer.y = this.sah - this.logh;
        layer.x = this.stmargin[0] - this.extraleft[this.sttype[0]];
        layer.name = 'stp_0';
        //layer.zIndex = this.zIndexNum;

        this.scrollareaLayer.addChild(layer);
        // 默认添加一个木头
        this.showaronk(layer, this.sttype[0], this.stwidth[0]);
        // 添加一个可堆的木头
        this.addStack();  
    }
    
    
    // 添加木头投影
    private addshadow() {
        const shadow = Utiles.createBitmapByName('dropshadow_png');
        shadow.name = 'shd_' + this.sts;
        shadow.width = this.extraleft[this.sttype[this.sts]] + this.stwidth[this.sts]+ this.extraright/2;
        shadow.height = 30;
        shadow.x = this.stmargin[this.sts] - this.extraleft[this.sttype[this.sts]];
        shadow.y += this.sah-(this.sts + 1)*(this.logh - 4);
        this.scrollareaLayer.addChild(shadow);
    }

    /* 蒙层*/
    private markUI(): void {
        const markUI = new Marks();
        markUI.x = Utiles.horizontalCenter(this.stage.stageWidth, markUI.width);

        this.gameLayer.addChild(markUI);
    }

    /**游戏开始 */
    private gameStart() {
        const startUI = this.gameLayer.getChildAt(3);
        if (startUI) {
            startUI.removeEventListener(MainEvent.GameStart, this.gameStart, this);
        }
        this.gameLayer.removeChildAt(3);
        this.gameLayer.removeChildAt(2);

        this.restartGame();
    }
    
    /**
     * 显示木头，木头资源说明：木头有多种，木头由三部分资源组成，
     * 举例：显示一个木头，类型是3，那么组成资源名称由：左边 31_png；中间 32_png；右边 33_png；
     */
    private showaronk(layer:egret.DisplayObjectContainer, sttype:number, stwidth) {
        const parentLayer = new egret.DisplayObjectContainer();
        parentLayer.width = this.extraleft[sttype] + stwidth + this.extraright/2;
        parentLayer.height = this.logh;
        
        // 中间木头
        const wood = Utiles.createBitmapByName(sttype+'2_png');
        wood.width = stwidth;
        wood.height = this.logh;
        wood.x = this.extraleft[sttype];

        parentLayer.addChild(wood);
        
        // 左边木头
        const leftWood = Utiles.createBitmapByName(sttype+'1_png');
        parentLayer.addChild(leftWood);

        // 右边木头
        const rightWood = Utiles.createBitmapByName(sttype+'3_png');
        rightWood.x = this.extraleft[sttype] + stwidth - this.extraright/2;
        parentLayer.addChild(rightWood);
        

        layer.addChild(parentLayer);
    } 
    

    /**添加一个可堆的木头 */
    private addStack() {
        /**一个轮次所需的堆木头次数 */
        const roundMax = 3;
        // 堆叠的木头超过指定个数，移除底部木头，然后所有已堆叠的木头往下移动一些距离
        let differenceY = 0;
        if (this.sts > roundMax) {
            const topWoodY = this.scrollareaLayer.getChildAt(this.scrollareaLayer.numChildren-1).y;
            this.scrollareaLayer.removeChildAt(0);
            //const arr = [];

            for(let i = 0; i< this.scrollareaLayer.numChildren; i++) {
                const child = this.scrollareaLayer.getChildAt(i);
                //console.log(i, child.zIndex, child.width)
                child.y = this.sah-(i + 1)*(this.logh - 4);
                //arr.push(child);
            }

            // this.scrollareaLayer.removeChildren();
            // for (let k = arr.length-1; k >-1; k--) {
                
            //     console.log(k, arr[k].zIndex, arr[k].width)
            //     //arr[k].zIndex = arr[arr.length-k];
            //     this.scrollareaLayer.addChildAt(arr[k], 4);
            // }
          

            differenceY = topWoodY - this.scrollareaLayer.getChildAt(this.scrollareaLayer.numChildren-1).y;
        }
        this.sts++;
        /**设置当前轮次-游戏等级 */
        this.panelUI.setlevel(Math.floor(this.sts/roundMax)+1);
        this.stwidth[this.sts] = this.stwidth[this.sts - 1];
        this.stmargin[this.sts] = 0;
        // Math.log:  取对数之后不会改变数据的性质和相关关系，数据更加平稳，压缩了尺度。
        this.stdir = Math.log(this.sts + 1)*2;
        this.sttype[this.sts] = Math.floor(Math.random()*4)+1;
        if (Math.random() > 0.5) {
            this.stdir *= -1;
            this.stmargin[this.sts] = this.saw - this.stwidth[this.sts];
        }

        const layer = new egret.DisplayObjectContainer();
        layer.sortableChildren = true; 
        layer.name = 'stp_' + this.sts;
        layer.height = this.logh;
        layer.width = this.extraleft[this.sttype[this.sts]] + this.stwidth[this.sts] + this.extraright/2;
        // 左右移动的木头（待添加）y轴要减去差值。
        layer.y = this.sah - (this.sts + 2)*(this.logh - 4) - differenceY;
        layer.x = this.stmargin[this.sts] - this.extraleft[this.sttype[this.sts]];
        this.scrollareaLayer.addChild(layer);
        //this.zIndexNum --;
        //layer.zIndex = this.zIndexNum;
        
        // 添加一个木头
        this.showaronk(layer, this.sttype[this.sts], this.stwidth[this.sts]);

        // 木头左右移动
        egret.startTick(this.moveStack, this);
    }

    private moveStack(timeStamp:number):boolean {
        const now = timeStamp;
        const time = this.time;
        const pass = now - time;
        this.timeNum += pass;
        if (this.timeNum > this.timeMax) {
            this.timeNum = 0;

            this.stmargin[this.sts] += this.stdir;
            // 左右移动
            if (this.stmargin[this.sts] < 0) {
                this.stmargin[this.sts] = -this.stmargin[this.sts];
                this.stdir *= -1;
            } else
            if (this.stmargin[this.sts] + this.stwidth[this.sts] > this.saw) {
                this.stmargin[this.sts] = this.saw - this.stwidth[this.sts];
                this.stdir *= -1;
            }
            const wood = this.scrollareaLayer.getChildByName('stp_' + this.sts);
            if (wood) {
                wood.x = this.stmargin[this.sts] - this.extraleft[this.sttype[this.sts]];
            }
            
        }
        
        this.time = now;
        return false;
    }
    
}
