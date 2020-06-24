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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zIndexNum = 999999;
        // sttype[i] 木头种类
        _this.sttype = [];
        _this.extraleft = [];
        // 木头资源宽度
        _this.extraright = 10;
        _this.logh = 20;
        // 木头左右距离
        _this.stmargin = [];
        _this.stwidth = [];
        // 标记, 添加的木头索引
        _this.sts = 0;
        // 木头左右移动累加
        _this.timeNum = 0;
        _this.timeMax = 15;
        _this.time = 0;
        /**放下木头标记，=1表示放下木头 */
        _this.dnd = 0;
        /**玩家分数 */
        _this.stscore = 0;
        /**游戏结束标志：1 表示结束, 0 表示开始 */
        _this.gameisover = 1;
        /**游戏玩家数据 */
        _this.gamesplayed = 0;
        /**完美操作次数 */
        _this.perfectOperationNum = 0;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);
        this.bgUI();
        // 显示游戏面板
        this.panel();
        this.markUI();
        this.startUI();
    };
    /* 蒙层*/
    Main.prototype.markUI = function () {
        var markUI = new Marks();
        markUI.x = Utiles.horizontalCenter(this.stage.stageWidth, markUI.width);
        this.gameLayer.addChild(markUI);
    };
    Main.prototype.tipUI = function () {
        var _this = this;
        var tip = new Tip();
        this.scrollareaLayer.addChild(tip);
        egret.Tween.get(tip).to({ alpha: 0, y: 100 }, 400).call(function () {
            _this.scrollareaLayer.removeChild(tip);
        });
    };
    Main.prototype.bgUI = function () {
        var bgUI = new BgColor();
        bgUI.x = Utiles.horizontalCenter(this.stage.stageWidth, bgUI.width);
        this.gameLayer.addChild(bgUI);
    };
    Main.prototype.startUI = function () {
        // 加入开始UI组件
        var startUI = new Start();
        startUI.x = Utiles.horizontalCenter(this.stage.stageWidth, startUI.width);
        this.gameLayer.addChild(startUI);
        startUI.addEventListener(MainEvent.GameStart, this.gameStart, this);
    };
    Main.prototype.restartUI = function () {
        var restart = new Restart();
        restart.x = Utiles.horizontalCenter(this.stage.stageWidth, restart.width);
        this.gameLayer.addChild(restart);
    };
    /**游戏面板 */
    Main.prototype.panel = function () {
        var panelUI = new Panel();
        panelUI.x = Utiles.horizontalCenter(this.stage.stageWidth, panelUI.width);
        this.panelUI = panelUI;
        this.gameLayer.addChild(panelUI);
        this.scrollareaLayer = panelUI.scrollareaLayer;
        this.scrollareaLayer.sortableChildren = true;
        panelUI.addEventListener(MainEvent.Down, this.down, this);
    };
    /**放下木头 */
    Main.prototype.down = function () {
        // 如果游戏结束(this.gameisover == 1)或者当前正在放木头（this.dnd === 1）,禁止放下木头操作
        if (this.dnd === 1 || this.gameisover == 1) {
            return;
        }
        this.dnd === 1;
        // 停止心跳，放下后该木头停止左右移动
        egret.stopTick(this.moveStack, this);
        // 标记：要裁剪的木头是左边还是右边, 还是裁剪所有
        var hcf = '';
        // 当前木头离左边的距离小于底下木头
        if (this.stmargin[this.sts] < this.stmargin[this.sts - 1]) {
            // 重新设置当前木头的宽度（裁剪左边）
            this.stwidth[this.sts] -= this.stmargin[this.sts - 1] - this.stmargin[this.sts];
            this.stmargin[this.sts] = this.stmargin[this.sts - 1];
            hcf = 'left';
        }
        // 当前木头离左边的距离大于底下木头
        if (this.stmargin[this.sts] + this.stwidth[this.sts] > this.stmargin[this.sts - 1] + this.stwidth[this.sts - 1]) {
            // 重新设置当前木头的宽度（裁剪右边）
            this.stwidth[this.sts] -= this.stmargin[this.sts] + this.stwidth[this.sts] - this.stmargin[this.sts - 1] - this.stwidth[this.sts - 1];
            hcf = 'right';
        }
        if (this.stwidth[this.sts] <= 0) {
            hcf = 'all';
        }
        if (this.stwidth[this.sts] <= 0) {
            this.stwidth[this.sts] = 0;
        }
        if (this.sts % 2 == 0 && this.stwidth[this.sts] > 0) {
            //this.addshadow();
        }
        // 分数计算- 取当前落下的木头长度乘以已经添加了木头数量的对数值（平滑减小数据大小）。
        var score = Math.floor(this.stwidth[this.sts] / 10 * Math.log(this.sts + 1));
        // 如果是完美放入，分数乘以两倍， 完美判断：木头长度必须大于0，放入的木头跟前面的木头宽度相差某个阈值
        if (this.stwidth[this.sts] > 0 && Math.abs(this.stwidth[this.sts] - this.stwidth[this.sts - 1]) < 3) {
            score *= 2;
            this.perfectOperationNum += 1;
            this.panelUI.setPerfectOperation(this.perfectOperationNum);
            this.tipUI();
        }
        this.stscore += score;
        this.panelUI.setScore(this.stscore);
        var layer = this.scrollareaLayer.getChildByName('stp_' + this.sts);
        //裁剪木头
        this.cutaronk(layer, this.sttype[this.sts], this.stwidth[this.sts], hcf);
    };
    /**截取木头 */
    Main.prototype.cutaronk = function (layer, sttype, stwidth, hcf) {
        if (!layer) {
            return;
        }
        // 原先已存在容器 layer 的木头，该木头需做渐变效果和移除
        var childWoodOld = layer.getChildAt(0);
        var childWoodNew;
        // 是all的话，完美放入，无需添加一个新的木头（使用原来的木头即可）
        // 右
        if (hcf === 'right') {
            // 添加一个木头
            this.showaronk(layer, sttype, stwidth);
            childWoodNew = layer.getChildAt(1);
            childWoodNew.x = childWoodOld.x;
        }
        else if (hcf === 'left') {
            // 添加一个木头
            this.showaronk(layer, sttype, stwidth);
            childWoodNew = layer.getChildAt(1);
            childWoodNew.x = childWoodOld.width + childWoodOld.x - childWoodNew.width;
        }
        if (hcf != '') {
            if (hcf === 'left' || hcf === 'right') {
                // 堆叠时没有空隙效果，减去n个像素
                layer.y = this.sah - (this.sts + 1) * (this.logh - 4);
                egret.Tween.get(childWoodOld).to({ alpha: 0.25, y: childWoodOld.height }, 200).call(function () {
                    layer.removeChild(childWoodOld);
                });
            }
            if (this.stwidth[this.sts] > 0) {
                this.addStack();
                this.dnd = 0;
            }
            else {
                //游戏结束
                this.gameover();
            }
        }
    };
    /**游戏结束 */
    Main.prototype.gameover = function () {
        this.gameisover = 1;
        this.gamesplayed++;
        egret.localStorage.setItem('stack_gamesplayed', this.gamesplayed + '');
        var restartUI = new Restart();
        restartUI.x = Utiles.horizontalCenter(this.stage.stageWidth, restartUI.width);
        restartUI.y = 80;
        restartUI.setTip("\u6E38\u620F\u7ED3\u675F: " + this.stscore + ", \u518D\u6765\u4E00\u6B21?");
        restartUI.name = "restartUI";
        restartUI.addEventListener(MainEvent.Restartgame, this.restartGame, this);
        this.gameLayer.addChild(restartUI);
        this.restart = restartUI;
    };
    Main.prototype.restartGame = function () {
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
        this.sttype[0] = Math.floor(Math.random() * 4) + 1;
        this.stwidth[0] = 260;
        this.stmargin[0] = (this.saw - this.stwidth[0]) / 2;
        var layer = new egret.DisplayObjectContainer();
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
    };
    // 添加木头投影
    Main.prototype.addshadow = function () {
        var shadow = Utiles.createBitmapByName('dropshadow_png');
        shadow.name = 'shd_' + this.sts;
        shadow.width = this.extraleft[this.sttype[this.sts]] + this.stwidth[this.sts] + this.extraright / 2;
        shadow.height = 30;
        shadow.x = this.stmargin[this.sts] - this.extraleft[this.sttype[this.sts]];
        shadow.y += this.sah - (this.sts + 1) * (this.logh - 4);
        this.scrollareaLayer.addChild(shadow);
    };
    /**游戏开始 */
    Main.prototype.gameStart = function () {
        var startUI = this.gameLayer.getChildAt(3);
        if (startUI) {
            startUI.removeEventListener(MainEvent.GameStart, this.gameStart, this);
        }
        this.gameLayer.removeChildAt(3);
        this.gameLayer.removeChildAt(2);
        this.restartGame();
    };
    /**
     * 显示木头，木头资源说明：木头有多种，木头由三部分资源组成，
     * 举例：显示一个木头，类型是3，那么组成资源名称由：左边 31_png；中间 32_png；右边 33_png；
     */
    Main.prototype.showaronk = function (layer, sttype, stwidth) {
        var parentLayer = new egret.DisplayObjectContainer();
        parentLayer.width = this.extraleft[sttype] + stwidth + this.extraright / 2;
        parentLayer.height = this.logh;
        // 左边木头
        var leftWood = Utiles.createBitmapByName(sttype + '1_png');
        parentLayer.addChild(leftWood);
        // 中间木头
        var wood = Utiles.createBitmapByName(sttype + '2_png');
        wood.width = stwidth;
        wood.height = this.logh;
        wood.x = this.extraleft[sttype];
        //wood.x = leftWood.width;
        parentLayer.addChild(wood);
        // 右边木头
        var rightWood = Utiles.createBitmapByName(sttype + '3_png');
        // 木头距离：wood.x + stwidth （中间木头距离左边的距离+宽度），3_png素材缘故，要减去相应的值
        rightWood.x = wood.x + stwidth - this.extraright / 2;
        //rightWood.x = wood.x + wood.width;
        parentLayer.addChild(rightWood);
        layer.addChild(parentLayer);
    };
    /**添加一个可堆的木头 */
    Main.prototype.addStack = function () {
        /**一个轮次所需的堆木头次数 */
        var roundMax = 7;
        // 堆叠的木头超过指定个数，移除底部木头，然后所有已堆叠的木头往下移动一些距离
        var differenceY = 0;
        if (this.sts > roundMax) {
            var topWoodY = this.scrollareaLayer.getChildAt(this.scrollareaLayer.numChildren - 1).y;
            this.scrollareaLayer.removeChildAt(0);
            //const arr = [];
            for (var i = 0; i < this.scrollareaLayer.numChildren; i++) {
                var child = this.scrollareaLayer.getChildAt(i);
                //console.log(i, child.zIndex, child.width)
                child.y = this.sah - (i + 1) * (this.logh - 4);
                //arr.push(child);
            }
            // this.scrollareaLayer.removeChildren();
            // for (let k = arr.length-1; k >-1; k--) {
            //     console.log(k, arr[k].zIndex, arr[k].width)
            //     //arr[k].zIndex = arr[arr.length-k];
            //     this.scrollareaLayer.addChildAt(arr[k], 4);
            // }
            differenceY = topWoodY - this.scrollareaLayer.getChildAt(this.scrollareaLayer.numChildren - 1).y;
        }
        this.sts++;
        /**设置当前轮次-游戏等级 */
        this.panelUI.setlevel(Math.floor(this.sts / roundMax) + 1);
        this.stwidth[this.sts] = this.stwidth[this.sts - 1];
        this.stmargin[this.sts] = 0;
        // Math.log:  取对数之后不会改变数据的性质和相关关系，数据更加平稳，压缩了尺度。
        this.stdir = Math.log(this.sts + 1);
        this.sttype[this.sts] = Math.floor(Math.random() * 4) + 1;
        if (Math.random() > 0.5) {
            this.stdir *= -1;
            this.stmargin[this.sts] = this.saw - this.stwidth[this.sts];
        }
        var layer = new egret.DisplayObjectContainer();
        layer.sortableChildren = true;
        layer.name = 'stp_' + this.sts;
        layer.height = this.logh;
        layer.width = this.extraleft[this.sttype[this.sts]] + this.stwidth[this.sts] + this.extraright / 2;
        // 左右移动的木头（待添加）y轴要减去差值。
        layer.y = this.sah - (this.sts + 2) * (this.logh - 4) - differenceY;
        layer.x = this.stmargin[this.sts] - this.extraleft[this.sttype[this.sts]];
        //layer.x = this.stmargin[this.sts];
        this.scrollareaLayer.addChild(layer);
        //this.zIndexNum --;
        //layer.zIndex = this.zIndexNum;
        // 添加一个木头
        this.showaronk(layer, this.sttype[this.sts], this.stwidth[this.sts]);
        // 木头左右移动
        egret.startTick(this.moveStack, this);
    };
    Main.prototype.moveStack = function (timeStamp) {
        var now = timeStamp;
        var time = this.time;
        var pass = now - time;
        this.timeNum += pass;
        if (this.timeNum > this.timeMax) {
            this.timeNum = 0;
            this.stmargin[this.sts] += this.stdir;
            // 左右移动
            if (this.stmargin[this.sts] < 0) {
                this.stmargin[this.sts] = -this.stmargin[this.sts];
                this.stdir *= -1;
            }
            else if (this.stmargin[this.sts] + this.stwidth[this.sts] > this.saw) {
                this.stmargin[this.sts] = this.saw - this.stwidth[this.sts];
                this.stdir *= -1;
            }
            var wood = this.scrollareaLayer.getChildByName('stp_' + this.sts);
            if (wood) {
                wood.x = this.stmargin[this.sts] - this.extraleft[this.sttype[this.sts]];
                //wood.x = this.stmargin[this.sts];
            }
        }
        this.time = now;
        return false;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
