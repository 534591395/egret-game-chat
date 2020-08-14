/**
 * 游戏主逻辑
 */

class Game extends eui.UILayer {
    private pannelUI: Pannels;
    private restartUI: Restarts;

    private timeNum: number = 0;
    private timeMax = 30;
    private time = 0;
    
    /**可见屏幕下云朵总共数量 */
    private cloudMaxNumber = 13;
    /**当前屏幕上云朵数量 */
    private nowCloudNumber = 13;

    /**游戏暂停标记 */
    private isPause: boolean = true;

    /**回收池队列， 存储云朵对象*/
    private poolList: any[];

    /**倒计时 */
    private timer: egret.Timer;

    /**一局的总时间 */
    private times = 60;

    /**以下是参考代码的定义*/
    private sfcy: number;
    private sfct = 368;
    private wj = 0;
    private wy = 0;
    private my = 416;
    private tch = 0;
    private scr_m = 0;
    private scr_p = 0;
    private spjpa = 0;
    private wbgy = 832;
    private twy = 56;
    private scc: number = 0;
    private mj = -18;
    private tcd = 1;
    private t = 0;
    private bp_fi = 0;
    private pcfi = 0;
    /**保存小人的四种状况 */
    private personArr: egret.Bitmap[] = []
    /**当前放入显示对象列表的小人 */
    private nowPerson: egret.Bitmap;
    private touchStatus:boolean = false;
    private distance:egret.Point = new egret.Point();
    private system;
    private particleTypeArr: egret.Bitmap[] = [];

    /**往上跳距离：累加 */
    private numberDistance: number = 0;

    private cloudBottomVisable = true;

    constructor() {
        super();
        this.width = 320;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStages, this);
    }

    private onAddToStages() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStages, this); 
        this.pannelUI = new Pannels();
        this.pannelUI.x = Util.horizontalCenter(this.stage.stageWidth, 320); 
        this.pannelUI.name = 'pannelUI';
        this.addChild(this.pannelUI);

        this.restartUI = new Restarts();
        this.restartUI.x = Util.horizontalCenter(this.stage.stageWidth, this.restartUI.width);
        this.restartUI.name = 'restartUI';
        this.addChild(this.restartUI);

        this.restartUI.addEventListener(MainEvent.Restart, this.start, this);

        this.personArr.push(Util.createBitmapByName('imgMerger#person_1'))
        this.personArr.push(Util.createBitmapByName('imgMerger#person_3'))
        this.personArr.push(Util.createBitmapByName('imgMerger#person_2'))
        this.personArr.push(Util.createBitmapByName('imgMerger#person_4'))

        // green
        this.particleTypeArr.push(Util.createBitmapByName('imgMerger#particle_sm_green_2'));
        // blue
        this.particleTypeArr.push(Util.createBitmapByName('imgMerger#particle_sm_blue_2'));

        egret.startTick(this.onEnterFrame, this);
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    private touchStart(evt:egret.TouchEvent) {
        this.touchStatus = true;
        if (this.nowPerson) {
            this.distance.x = evt.stageX - this.nowPerson.x;
            this.distance.y = evt.stageY - this.nowPerson.y;
        }
    }
    
    private touchMove(evt:egret.TouchEvent) {
        if (this.nowPerson && this.touchStatus) {
            this.nowPerson.x = evt.stageX - this.distance.x;
            if (this.nowPerson.x >= this.stage.width/2) {
                this.t = 1;
            } else {
                this.t = 0;
            }
           // this.nowPerson.y = evt.stageY - this.distance.y;
        }
    }

    private touchEnd(evt:egret.TouchEvent) {
        this.touchStatus = false;
    }

    /**开始 */
    public start(): void {
        this.removeChild(this.restartUI);
        this.clearClouds(this.pannelUI.cloudBox);
        this.default();
        this.particle();
        this.addDefalutClouds();
        this.timerStart();
        this.numberDistance = 0;
        this.pannelUI.cloudBottomType = 1;
        this.nowPerson = this.personArr[0];
        this.nowPerson.name = '0';
        this.pannelUI.personBox.addChild(this.nowPerson);
    }
    

    /**停止 */
    public stop(): void {
        this.pannelUI.personBox.removeChild(this.nowPerson);
        this.addChild(this.restartUI);
        this.isPause = true;
        this.restartUI.nowDistance = 300;
        this.restartUI.historyDistance = 400;
    }

    private default(): void {
        this.poolList = [];
        this.sfcy = this.pannelUI.cloudBottomBgYMin;
        this.wj = this.wy = 0;
        this.tch = this.scr_m = this.scr_p = this.spjpa = 0;
        this.my = 416;
        this.wbgy = -832;
        this.twy = 56;
        this.scc = 0;
        this.mj = -18;
        // 底部云层Y轴初始值，用来控制
        this.sfct = 368;
        this.tcd = 1;
        this.spjpa = 0;
        this.t = 0;
        this.bp_fi = 0;
        this.pcfi = 0;
        this.cloudBottomVisable = true;
    }

    private onEnterFrame(timeStamp:number):boolean {
        const now = timeStamp;
        const time = this.time;
        const pass = now - time;
        this.timeNum += pass;
        if (this.timeNum > this.timeMax) {
            this.timeNum = 0;
            if (!this.isPause) {
                this.wj = 100 - this.my;
                if (this.wj < 1) {
                    this.wj = 0;
                } else {
                    // 移动距离
                    this.scr_m += this.wj / 5;
                }
                if (this.wj > 37) {
                    this.wj = 37;
                }
                // this.wbgy -= this.wj / 23;
                // if (this.wbgy > 0) {
                //     this.wbgy = 0;
                // }
                this.twy -= this.wj / 3;
                if (this.twy < 0) {
                    this.twy += 104;
                }
                this.wbgy += 0.08;
                this.pannelUI.bgY = this.wbgy;
                // 这一行执行添加云朵和清除云朵，暂时不加

                this.cloudBottomBgMove();
                // 绘制小人
                this.person();
                // 踩到云朵
                this.stepClouds();
            }
        }
        this.time = now;

        return false;
    } 

    /**倒计时 */
    private timerStart(): void {
        this.isPause = false;
        this.pannelUI.countNumber = this.times;
        this.timer = new egret.Timer(1000, this.times);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        this.timer.start();
    }
    

    private timerFunc(event:egret.TimerEvent): void {
        const count =  (<egret.Timer>event.target).currentCount;
        this.pannelUI.countNumber = this.times - count;
    }

    private timerComFunc(event:egret.TimerEvent): void {
        console.log('倒计时结束')
        this.stop();
    }

    private particle(): void {
        // 粒子：默认是蓝色粒子
        const texture = this.particleTypeArr[1].texture;
        const config = RES.getRes("paopao_json");
        this.system = new particle.GravityParticleSystem(texture, config);
        this.system.endAlpha = 0;
        this.pannelUI.personBox.addChild(this.system);
    }
    
    /**添加云朵 */
    private addDefalutClouds(): void {
        for (let i = 0; i < this.cloudMaxNumber; i++) {
            // 254 - 38 = 216; 216/36 = 6;（可整除）
            let x = 36 * (Math.floor(7 * Math.random()));
            let y = 40 * i;
            // 不超出容器范围
            if (i >= 10) {
                y = 40 * (Math.floor(9 * Math.random()));
            }

            let cloudType;
            if (100 * Math.random() > 10) {
                cloudType = 'blue';
            } else {
                cloudType = 'green';
            }
            const cloud = this.getCloud(cloudType);
            cloud.x = x;
            cloud.y = y;
            this.pannelUI.cloudBox.addChild(cloud);
        }
        this.nowCloudNumber = this.cloudMaxNumber;
    }

    /**底部云层的上下运动 */
    private cloudBottomBgMove(): void {
        if (this.sfcy !== -1) {
            const num = this.scc === 0 ? 1 : 0;
            this.sfcy += this.wj * num;
            // 更新底部云层的Y轴值
            this.pannelUI.cloudBottomBgY = this.sfcy;
            // 当小人触摸到底部云层时，更新云层的Y轴值
            if (this.my > (this.pannelUI.personBox.height - this.nowPerson.height) && this.mj > 0) {
                this.sfcy = this.my + 42;
                if (this.my > this.pannelUI.personBox.height && this.cloudBottomVisable) {
                    // 此时，小人到了底部了，得往上跳； 若底部云层隐藏，那不执行（若掉到底部，游戏结束）
                    this.mj = -18;
                    // if (this.scc > 0) {
                    //     this.scc = 0;
                    //     this.sfct = 416;
                    // }
                }
            } else {
                this.sfcy += (this.sfct - this.sfcy) / 5;
                if (this.sfct === 416 && this.sfcy > this.pannelUI.cloudBottomBgYMin) {
                    this.sfcy = -1;
                }
                // if (this.scc > 0) {
                //     this.scc --;
                // }
            }

            this.my += (this.mj + this.wj) * this.tcd;
            this.mj += 0.6;
            if (this.mj > 8) {
                this.mj = 8;
            }

            // 绘制小鸟
        }
        if (this.numberDistance > 200) {
            this.cloudBottomVisable = false;
            this.pannelUI.cloudBottomBgY = 460;
        } 
    }
    
    
    /**绘制小人 */
    private person(): void {
        let personType = '0';
        // this.mj > 0 表示小人在往下移动
        // 变更小人
        if (this.t > 0) {
            if (this.mj > 0) {
                personType = '3';
            } else {
                personType = '2';
            }
        } else {
            if (this.mj > 0 ) {
                personType = '1';
            } else {
                personType = '0';
            }
        }
        if (this.nowPerson.name !== personType) {
            const x = this.nowPerson.x;
            const y = this.nowPerson.y;
            this.pannelUI.personBox.removeChild(this.nowPerson);
            this.nowPerson = this.personArr[Number(personType)];
            this.nowPerson.name = personType;
            this.nowPerson.x = x;
            this.nowPerson.y = y;
            this.pannelUI.personBox.addChild(this.nowPerson);
        }
        //this.nowPerson.x = this.mx;
        this.nowPerson.y = this.my;
        if (!this.cloudBottomVisable) {
            if (this.nowPerson.y > 400) {
                //游戏结束
                this.stop();
            }
        }
    }

    /**绘制小鸟 */
    private brid() {

    }

    /**更新云朵，小人踩到云朵时才触发更新，每次踩到后云朵下降40（先写死） */
    private updateClouds():void {
        const layer = this.pannelUI.cloudBox;
        for (let i = 0; i < layer.numChildren; i++) {
            const cloud = layer.getChildAt(i);
            if (cloud) {
                cloud.y += 40;
                if (cloud.y > this.pannelUI.cloudBox.height) {
                    this.clearCloud(layer, i);
                    this.nowCloudNumber --;
                }
            }
        }
        // 缺失的云朵从顶部补回来，云朵下降速度默认写死：40
        for (let j = 0; j < (this.cloudMaxNumber - this.nowCloudNumber); j++) {
            let x = 36 * (Math.floor(7 * Math.random()));
            let y = 40 * j;
            // 不超出容器范围
            if (j >= 10) {
                y = 40 * (Math.floor(9 * Math.random()));
            }
            let cloudType;
            if (100 * Math.random() > 10) {
                cloudType = 'blue';
            } else {
                cloudType = 'green';
            }
            const cloud = this.getCloud(cloudType);
            cloud.x = x;
            cloud.y = y;
            this.pannelUI.cloudBox.addChild(cloud);
        }
        this.nowCloudNumber = this.cloudMaxNumber;
    }

    /**小人踩到云朵，小人往下的时候才触发踩云朵 */
    private stepClouds():void {
        if (this.mj <=0 ) {
            return;
        }
        const layer = this.pannelUI.cloudBox;
        for (let i = 0; i < layer.numChildren; i++) {
            const cloud = layer.getChildAt(i);
            if (!cloud) continue;
            const yNum = Math.floor(cloud.y / 40);
            const xNum = Math.floor(cloud.x / 36);
            const personXNum = Math.floor(this.nowPerson.x / 36);
            const personYNum = Math.floor(this.nowPerson.y / 40);
            
            if (personXNum === xNum && personYNum === yNum) {
                this.my = cloud.y - 40;
                this.mj = -18;
                if (cloud.name === 'green') {
                    this.system.changeTexture(this.particleTypeArr[0].texture);
                } else 
                if (cloud.name === 'blue') {
                    this.system.changeTexture(this.particleTypeArr[1].texture);
                }
                this.system.start(500);
                this.system.emitterX = cloud.x;
                this.system.emitterY = cloud.y;
                this.clearCloud(layer, i);
                this.nowCloudNumber --;
                this.numberDistance += 40;
                this.pannelUI.numberDistance = this.numberDistance;
                this.updateClouds();
            }
        }
    }
    
    /**cloudType 云朵种类：green, yellow, purple  */
    private getCloud(cloudType):egret.Bitmap  {
        let cloud;
        let cloudArr = this.poolList.filter(cloud => {
            return cloud.name === cloudType;
        });
        if (cloudArr.length) {
            // 取出队列的最后一个
            cloud = cloudArr.pop();
            // 从回收池中移除
            this.poolList = this.poolList.filter(item => {
                return item != cloud;
            });
        } else {
            cloud = Util.createBitmapByName('imgMerger#cloud_' + cloudType);
            cloud.name = cloudType;
        }
        return cloud;
    }

    private destroyCloud(cloud: egret.Bitmap, layer:eui.Group) {
        layer.removeChild(cloud);
        this.poolList.push(cloud);
    }
    

    /**清除容器中的所有云朵 */
    private clearClouds(layer: eui.Group):void  {
        let gridArr = [];
        let grid;
        for (let i = 0; i < layer.numChildren; i++) {
            const grid = layer.getChildAt(i);
            gridArr.push(grid);
        }
        while(gridArr.length) {
            grid = gridArr.shift();
            this.destroyCloud(<egret.Bitmap>grid, layer);
        }
    }
    /**清除容器中的指定云朵 */
    private clearCloud(layer: eui.Group, index: number): void {
        const grid = layer.getChildAt(index);
        this.destroyCloud(<egret.Bitmap>grid, layer);
    }

}