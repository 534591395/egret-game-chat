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
        /**图形类型索引 */
        _this.nextShapeIndex = 0;
        /**图形索引 */
        _this.index = 0;
        _this.timeNum = 0;
        _this.timeMax = 300;
        _this.time = 0;
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
    };
    Main.prototype.start = function () {
        this.score = 0;
        this.changeScore(this.score);
        this.removeChild(this.restartUI);
        this.clearShape(this.pannelUI.scrollBox);
        this.clearNextShape();
        this.isPause = false;
        this.nextShapeIndex = this.index = 0;
        this.createMatrix();
        this.createNewShape();
    };
    Main.prototype.translateAction = function (event) {
        if (event.type === '左移') {
            this.translateXShape(-1);
        }
        else if (event.type === '右移') {
            this.translateXShape(1);
        }
    };
    /**
     * 图形翻转
     * 原理公式参考：沿着原点旋转坐标转换公式： https://blog.csdn.net/weixin_30808693/article/details/97098913
     */
    Main.prototype.rotateShape = function () {
        // 田字图形无需翻转
        if (this.nowShape.shapeIndex === 5) {
            return;
        }
        var data = this.nowShape.data;
        var temp = [];
        for (var i = 0; i < data.length; i++) {
            temp.push([data[i][1], -data[i][0]]);
        }
        this.nowShape.data = temp;
        var x = this.checkXBoundary();
        if (Math.abs(x) === 1) {
            // 如果 this.checkXBoundary() === -1 ，表示左边超出了，相反值右边超出了；假如左边超出，就往右移动单位位置
            this.translateXShape(-x);
        }
        else {
            if (this.checkXBoundary() === 0) {
                this.clearShape(this.pannelUI.scrollBox, this.nowShape.index);
                this.drawShape();
            }
        }
    };
    /**
     * 参数num
     * -1 往左边移动；1往右边移动
     */
    Main.prototype.translateXShape = function (num) {
        // 边界检测通过
        if (this.checkXBoundary(num) === 0) {
            this.nowShape.x += Main.Gridsize * num;
            this.clearShape(this.pannelUI.scrollBox, this.nowShape.index);
            this.drawShape();
        }
    };
    Main.prototype.getGrid = function () {
        var grid;
        if (this.poolList.length) {
            // 取出队列的最后一个
            grid = this.poolList.pop();
        }
        else {
            grid = Util.createBitmapByName('rect_png');
        }
        return grid;
    };
    Main.prototype.destroyGrid = function (grid, layer) {
        layer.removeChild(grid);
        this.poolList.push(grid);
    };
    // 创建矩阵，将scroll界面分成多个格子
    Main.prototype.createMatrix = function () {
        // grids[i] Y轴  grids[i][j] X轴
        this.grids = [];
        for (var i = 0; i < this.pannelUI.scrollBox.height / Main.Gridsize; i++) {
            this.grids[i] = [];
            for (var j = 0; j < this.pannelUI.scrollBox.width / Main.Gridsize; j++) {
                this.grids[i][j] = false;
            }
        }
    };
    /**创建一个新的图形 */
    Main.prototype.createNewShape = function () {
        // 默认超出范围
        this.nowShape = {
            x: this.pannelUI.scrollBox.width / 2,
            y: -40,
            shapeIndex: this.nextShapeIndex,
            index: this.index,
            data: JSON.parse(JSON.stringify(this.shapeList[this.nextShapeIndex]))
        };
        this.index++;
        // 随机赋值下一个方块形状索引
        this.nextShapeIndex = Math.floor(Math.random() * this.shapeList.length);
        // 将下一个图形添加到预览容器中
        var nextShape = {
            x: 40,
            y: 40,
            index: 0,
            data: JSON.parse(JSON.stringify(this.shapeList[this.nextShapeIndex]))
        };
        this.clearNextShape();
        this.drawShape(nextShape, this.pannelUI.nextShapeBox);
        egret.startTick(this.translateYShape, this);
    };
    /**清除预览容器的图形 */
    Main.prototype.clearNextShape = function () {
        // 从格子索引0清除
        this.clearShape(this.pannelUI.nextShapeBox, 0);
    };
    /**清除图形显示容器的当前图形 */
    Main.prototype.clearShape = function (layer, index) {
        var gridArr = this.getGridFromLayer(layer, index);
        var grid;
        while (gridArr.length) {
            grid = gridArr.shift();
            this.destroyGrid(grid, layer);
        }
    };
    /**获取指定容器中格子对象列表 */
    Main.prototype.getGridFromLayer = function (layer, index) {
        var arr = [];
        for (var i = 0; i < layer.numChildren; i++) {
            var grid = layer.getChildAt(i);
            if (grid) {
                if (typeof index === 'undefined') {
                    if (grid.name.indexOf('grid') > -1) {
                        arr.push(grid);
                    }
                }
                else if (grid.name === ('grid_' + index)) {
                    arr.push(grid);
                }
            }
        }
        return arr;
    };
    /**绘制图形 */
    Main.prototype.drawShape = function (shape, layer) {
        var shapeObject = shape || this.nowShape;
        var container = layer || this.pannelUI.scrollBox;
        var arr = this.transitionCoordinate(shapeObject.data, shapeObject.x, shapeObject.y);
        for (var i = 0; i < arr.length; i++) {
            var grid = this.getGrid();
            grid.x = arr[i][0];
            grid.y = arr[i][1];
            grid.name = 'grid' + '_' + shapeObject.index;
            container.addChild(grid);
        }
    };
    /**根据shape值，转换实际坐标 */
    Main.prototype.transitionCoordinate = function (shapeArr, shapeX, shapeY) {
        var arr = [];
        for (var i = 0; i < shapeArr.length; i++) {
            arr.push([
                Main.Gridsize * shapeArr[i][0] + shapeX,
                Main.Gridsize * shapeArr[i][1] + shapeY
            ]);
        }
        return arr;
    };
    /**更新图形的Y轴值 */
    Main.prototype.translateYShape = function (timeStamp) {
        var now = timeStamp;
        var time = this.time;
        var pass = now - time;
        this.timeNum += pass;
        if (this.timeNum > this.timeMax) {
            this.timeNum = 0;
            if (!this.isPause) {
                var checkedBool = this.checkYBoundary();
                if (checkedBool) {
                    this.clearShape(this.pannelUI.scrollBox, this.nowShape.index);
                    this.nowShape.y += Main.Gridsize;
                    this.drawShape();
                }
                else {
                    // 停止心跳
                    egret.stopTick(this.translateYShape, this);
                    this.drawWall();
                    this.createNewShape();
                }
            }
        }
        this.time = now;
        return false;
    };
    /**检测当前图形是否在容器Y轴边界内，返回 false，表示已经到边界 */
    Main.prototype.checkYBoundary = function () {
        var bool = true;
        var arr = this.transitionCoordinate(this.nowShape.data, this.nowShape.x, this.nowShape.y);
        for (var i = 0; i < arr.length; i++) {
            var xNum = arr[i][0] / Main.Gridsize;
            var yNum = arr[i][1] / Main.Gridsize;
            // 如果当前图形有个格子的Y轴已经在最低处，检测不通过
            if (yNum === (this.grids.length - 1)) {
                bool = false;
                break;
            }
            // 检测当前图形有格子的下个行走的格子是被占用的（有堆叠的格子）
            if ((typeof this.grids[yNum + 1] !== 'undefined') && this.grids[yNum + 1][xNum]) {
                // 如果此时 图形 在容器顶部（此时图形为刚刚生成的图形），游戏结束
                if (yNum === -1) {
                    this.restart();
                }
                bool = false;
                break;
            }
        }
        return bool;
    };
    /**
     * x轴检测，返回的值：0 - 表示校验通过；-1 - 表示左边超出了（需要微调位置）；1 - 表示右边超出了（需要微调位置）
     *  2 - 表示要碰到堆叠好的格子
     * 参数num：1 -1 2 0
     * */
    Main.prototype.checkXBoundary = function (num) {
        var numMark = 0;
        var arr = this.transitionCoordinate(this.nowShape.data, this.nowShape.x, this.nowShape.y);
        try {
            for (var i = 0; i < arr.length; i++) {
                var xNum = arr[i][0] / Main.Gridsize;
                var yNum = arr[i][1] / Main.Gridsize;
                // 左边超出了
                if ((typeof num === 'undefined' && xNum < 0) ||
                    num === -1 && xNum === 0) {
                    numMark = -1;
                    break;
                }
                else 
                // 右边超出了
                if ((typeof num === 'undefined' && xNum > this.grids[0].length - 1) ||
                    num === 1 && xNum === this.grids[0].length - 1) {
                    numMark = 1;
                    break;
                }
                else 
                // 碰到已经堆积好的方块们;  num === -1 表示左边方向；num === 1 表示右边方向； this.grids[yNum][xNum] === true 表示这个小格子已经被占用了（再往左右移动就碰到已经堆积好的方块们）
                if ((typeof num === 'undefined' && this.grids[yNum][xNum]) ||
                    (num === -1 && this.grids[yNum][xNum - 1]) ||
                    (num === 1 && this.grids[yNum][xNum + 1])) {
                    numMark = 2;
                    break;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        return numMark;
    };
    // 两个形状相碰后，留有空隙--停止往下, 销毁。 满行了，那么我们就要清空这一整行的小方块们，同时要将占用的格子标记设置为true
    Main.prototype.drawWall = function () {
        var arr = this.transitionCoordinate(this.nowShape.data, this.nowShape.x, this.nowShape.y);
        var i = 0;
        try {
            //停止下降后，此时要把所在的格子标志为已占用(true)
            for (i = 0; i < arr.length; i++) {
                var yNum = arr[i][1] / Main.Gridsize;
                var xNum = arr[i][0] / Main.Gridsize;
                this.grids[yNum][xNum] = true;
            }
        }
        catch (error) {
            console.log(error);
            this.restart();
        }
        for (i = 0; i < this.grids.length; i++) {
            // 是否满格
            var mark = true;
            // 循环某个行，该行上的所有小格子都被占用，那么就更新分数 
            for (var k = 0; k < this.grids[i].length; k++) {
                if (!this.grids[i][k]) {
                    mark = false;
                    break;
                }
            }
            if (mark) {
                this.changeScore();
                for (var j = i; j > 0; j--) {
                    for (var h = 0; h < this.grids[i].length; h++) {
                        this.grids[j][h] = this.grids[j - 1][h];
                    }
                }
            }
        }
        this.clearShape(this.pannelUI.scrollBox);
        // 绘制已被占的格子
        for (var g = 0; g < this.grids.length; g++) {
            for (var s = 0; s < this.grids[g].length; s++) {
                if (this.grids[g][s]) {
                    var grid = this.getGrid();
                    grid.x = s * Main.Gridsize;
                    grid.y = g * Main.Gridsize;
                    this.pannelUI.scrollBox.addChild(grid);
                }
            }
        }
    };
    Main.prototype.restart = function () {
        console.log('游戏结束');
        this.isPause = true;
        egret.stopTick(this.translateYShape, this);
        this.addChild(this.restartUI);
    };
    /**设置分数 */
    Main.prototype.changeScore = function (score) {
        if (typeof score === 'undefined') {
            this.score += 1;
        }
        else {
            this.score = score;
        }
        this.pannelUI.score = this.score;
    };
    /**每个正方形小格子的长宽值 */
    Main.Gridsize = 20;
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
