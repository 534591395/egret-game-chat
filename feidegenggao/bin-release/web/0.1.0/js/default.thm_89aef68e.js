
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {};generateEUI.paths['resource/skins/Index.exml'] = window.NewFile = (function (_super) {
	__extends(NewFile, _super);
	function NewFile() {
		_super.call(this);
		this.skinParts = ["gameStart"];
		
		this.height = 416;
		this.width = 320;
		this.elementsContent = [this._Image1_i(),this.gameStart_i()];
	}
	var _proto = NewFile.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "title_jmp_jpg";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gameStart_i = function () {
		var t = new eui.Image();
		this.gameStart = t;
		t.height = 56;
		t.horizontalCenter = 0;
		t.source = "btn_start";
		t.touchEnabled = true;
		t.width = 205;
		t.y = 242;
		return t;
	};
	return NewFile;
})(eui.Skin);generateEUI.paths['resource/skins/Pannel.exml'] = window.Pannel = (function (_super) {
	__extends(Pannel, _super);
	function Pannel() {
		_super.call(this);
		this.skinParts = ["bg","bgBox","cloudBox","cloudBottomBg","personBox","countDownBar","countTimeLeft","countTimeRight","numberDistanceOne","numberDistanceTwo","numberDistanceThree","numberDistanceFour","scoreProgressBar","numberScoreOne","numberScoreTwo","numberScoreThree"];
		
		this.height = 480;
		this.width = 320;
		this.elementsContent = [this.bgBox_i(),this._Image1_i(),this._Image2_i(),this.cloudBox_i(),this.cloudBottomBg_i(),this.personBox_i(),this._Group2_i(),this._Group3_i(),this._Group4_i()];
	}
	var _proto = Pannel.prototype;

	_proto.bgBox_i = function () {
		var t = new eui.Group();
		this.bgBox = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.height = 1248;
		t.scaleX = 1;
		t.scaleY = 1;
		t.sortableChildren = false;
		t.source = "cs_jmp_bg_jpg";
		t.percentWidth = 100;
		t.x = 0;
		t.y = -832;
		t.zIndex = 1;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "left_bar";
		t.width = 22;
		t.x = 0;
		t.y = 0;
		t.zIndex = 2;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "right_bar";
		t.width = 20;
		t.x = 299;
		t.zIndex = 3;
		return t;
	};
	_proto.cloudBox_i = function () {
		var t = new eui.Group();
		this.cloudBox = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 384;
		t.width = 254;
		t.x = 32;
		t.y = 0;
		t.zIndex = 4;
		return t;
	};
	_proto.cloudBottomBg_i = function () {
		var t = new eui.Image();
		this.cloudBottomBg = t;
		t.height = 34;
		t.source = "cloud_bottom_1";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 368;
		t.zIndex = 5;
		return t;
	};
	_proto.personBox_i = function () {
		var t = new eui.Group();
		this.personBox = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 370;
		t.horizontalCenter = 0;
		t.width = 254;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 17;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 402;
		t.zIndex = 6;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this.countDownBar_i(),this._Group1_i(),this._Rect1_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 17;
		t.source = "countdown_progress_bar_bg";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 78;
		t.source = "clock";
		t.width = 49;
		t.x = 5;
		t.y = -63;
		return t;
	};
	_proto.countDownBar_i = function () {
		var t = new eui.Image();
		this.countDownBar = t;
		t.height = 9;
		t.source = "countdown_progress_bar";
		t.width = 294;
		t.x = 13;
		t.y = 4;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 17;
		t.left = 16;
		t.width = 26;
		t.y = -43;
		t.elementsContent = [this.countTimeLeft_i(),this.countTimeRight_i()];
		return t;
	};
	_proto.countTimeLeft_i = function () {
		var t = new eui.Image();
		this.countTimeLeft = t;
		t.height = 17;
		t.source = "number_blue_6";
		t.width = 12;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.countTimeRight_i = function () {
		var t = new eui.Image();
		this.countTimeRight = t;
		t.height = 17;
		t.source = "number_blue_0";
		t.width = 12;
		t.x = 13;
		t.y = 0;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 17.33;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 27;
		t.width = 102;
		t.x = 4;
		t.y = 2;
		t.zIndex = 7;
		t.elementsContent = [this.numberDistanceOne_i(),this.numberDistanceTwo_i(),this.numberDistanceThree_i(),this.numberDistanceFour_i(),this._Image5_i()];
		return t;
	};
	_proto.numberDistanceOne_i = function () {
		var t = new eui.Image();
		this.numberDistanceOne = t;
		t.height = 26;
		t.source = "number_distance_0";
		t.width = 16;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.numberDistanceTwo_i = function () {
		var t = new eui.Image();
		this.numberDistanceTwo = t;
		t.height = 26;
		t.source = "number_distance_0";
		t.width = 16;
		t.x = 18;
		t.y = 0;
		return t;
	};
	_proto.numberDistanceThree_i = function () {
		var t = new eui.Image();
		this.numberDistanceThree = t;
		t.height = 26;
		t.source = "number_distance_0";
		t.width = 16;
		t.x = 35;
		t.y = 0;
		return t;
	};
	_proto.numberDistanceFour_i = function () {
		var t = new eui.Image();
		this.numberDistanceFour = t;
		t.height = 26;
		t.source = "number_distance_0";
		t.width = 16;
		t.x = 52;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 18;
		t.source = "distance_icon";
		t.width = 17;
		t.x = 73;
		t.y = 0;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 16;
		t.width = 100;
		t.x = 218;
		t.y = 2;
		t.zIndex = 8;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this.scoreProgressBar_i(),this.numberScoreOne_i(),this.numberScoreTwo_i(),this.numberScoreThree_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 13;
		t.source = "tip_score_icon";
		t.width = 13;
		t.x = -7;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 17;
		t.source = "score_progress_bar_bg";
		t.width = 58;
		t.x = 42;
		t.y = 0;
		return t;
	};
	_proto.scoreProgressBar_i = function () {
		var t = new eui.Image();
		this.scoreProgressBar = t;
		t.height = 9;
		t.source = "score_progress_bar";
		t.width = 0;
		t.x = 47;
		t.y = 4;
		return t;
	};
	_proto.numberScoreOne_i = function () {
		var t = new eui.Image();
		this.numberScoreOne = t;
		t.height = 16;
		t.source = "number_score_0";
		t.width = 10;
		t.x = 9;
		t.y = 0;
		return t;
	};
	_proto.numberScoreTwo_i = function () {
		var t = new eui.Image();
		this.numberScoreTwo = t;
		t.height = 16;
		t.source = "number_score_0";
		t.width = 10;
		t.x = 20;
		t.y = 0;
		return t;
	};
	_proto.numberScoreThree_i = function () {
		var t = new eui.Image();
		this.numberScoreThree = t;
		t.height = 16;
		t.source = "number_score_0";
		t.width = 10;
		t.x = 30;
		t.y = 0;
		return t;
	};
	return Pannel;
})(eui.Skin);generateEUI.paths['resource/skins/Restart.exml'] = window.Restart = (function (_super) {
	__extends(Restart, _super);
	function Restart() {
		_super.call(this);
		this.skinParts = ["restart","nowDistanceBox","historyDistanceBox"];
		
		this.height = 416;
		this.width = 320;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.restart_i(),this.nowDistanceBox_i(),this.historyDistanceBox_i()];
	}
	var _proto = Restart.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.alpha = 0.6;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 174;
		t.horizontalCenter = 0.5;
		t.source = "tip_modal";
		t.width = 299;
		t.y = 34;
		return t;
	};
	_proto.restart_i = function () {
		var t = new eui.Image();
		this.restart = t;
		t.height = 46;
		t.horizontalCenter = 0.5;
		t.source = "btn_restart";
		t.touchEnabled = true;
		t.width = 121;
		t.y = 249;
		return t;
	};
	_proto.nowDistanceBox_i = function () {
		var t = new eui.Group();
		this.nowDistanceBox = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.width = 145;
		t.x = 110;
		t.y = 121;
		return t;
	};
	_proto.historyDistanceBox_i = function () {
		var t = new eui.Group();
		this.historyDistanceBox = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 23;
		t.width = 65;
		t.x = 162;
		t.y = 180;
		return t;
	};
	return Restart;
})(eui.Skin);