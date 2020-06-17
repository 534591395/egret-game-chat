
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
                generateEUI.skins = {};generateEUI.paths['resource/eui_skins/Bg.exml'] = window.Bg = (function (_super) {
	__extends(Bg, _super);
	function Bg() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 315;
		this.width = 320;
		this.elementsContent = [this._Rect1_i()];
	}
	var _proto = Bg.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0x404d5e;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return Bg;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Mark.exml'] = window.Mark = (function (_super) {
	__extends(Mark, _super);
	function Mark() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 356;
		this.width = 320;
		this.elementsContent = [this._Rect1_i()];
	}
	var _proto = Mark.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.alpha = 0.8;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return Mark;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Panel.exml'] = window.Pannel = (function (_super) {
	__extends(Pannel, _super);
	function Pannel() {
		_super.call(this);
		this.skinParts = ["down","scrollareaLayer","score","grade","lianji"];
		
		this.height = 315;
		this.width = 320;
		this.elementsContent = [this.down_i(),this.scrollareaLayer_i(),this._Group1_i()];
	}
	var _proto = Pannel.prototype;

	_proto.down_i = function () {
		var t = new eui.Image();
		this.down = t;
		t.height = 65;
		t.source = "stackthelog_png";
		t.touchEnabled = true;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 246;
		t.zIndex = 18;
		return t;
	};
	_proto.scrollareaLayer_i = function () {
		var t = new eui.Group();
		this.scrollareaLayer = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 186;
		t.sortableChildren = true;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 55;
		t.zIndex = 16;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 46;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Label1_i(),this.score_i(),this._Label2_i(),this.grade_i(),this._Label3_i(),this.lianji_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 13;
		t.text = "得分:";
		t.x = 14;
		t.y = 18;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 13;
		t.text = "0";
		t.textColor = 0xef1010;
		t.x = 50;
		t.y = 18;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 13;
		t.text = "等级:";
		t.x = 104;
		t.y = 18;
		return t;
	};
	_proto.grade_i = function () {
		var t = new eui.Label();
		this.grade = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 13;
		t.text = "0";
		t.textColor = 0xEF1010;
		t.x = 140;
		t.y = 18;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 13;
		t.text = "完美次数:";
		t.x = 200;
		t.y = 18;
		return t;
	};
	_proto.lianji_i = function () {
		var t = new eui.Label();
		this.lianji = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 13;
		t.text = "0";
		t.textColor = 0xEF1010;
		t.x = 268;
		t.y = 18;
		return t;
	};
	return Pannel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Restart.exml'] = window.Bg = (function (_super) {
	__extends(Bg, _super);
	function Bg() {
		_super.call(this);
		this.skinParts = ["tip","restartgame"];
		
		this.height = 150;
		this.width = 250;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = Bg.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.percentHeight = 100;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.x = 0;
		t.elementsContent = [this.tip_i(),this.restartgame_i()];
		return t;
	};
	_proto.tip_i = function () {
		var t = new eui.Label();
		this.tip = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 49;
		t.lineSpacing = 10;
		t.size = 16;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 206;
		t.x = 23;
		t.y = 18;
		return t;
	};
	_proto.restartgame_i = function () {
		var t = new eui.Label();
		this.restartgame = t;
		t.text = "重新开始";
		t.touchEnabled = true;
		t.x = 63;
		t.y = 99;
		return t;
	};
	return Bg;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Start.exml'] = window.NewFile = (function (_super) {
	__extends(NewFile, _super);
	function NewFile() {
		_super.call(this);
		this.skinParts = ["btn"];
		
		this.height = 253;
		this.width = 320;
		this.elementsContent = [this._Group2_i()];
	}
	var _proto = NewFile.prototype;

	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.y = 0;
		t.elementsContent = [this._Label1_i(),this._Group1_i(),this.btn_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "helvetica, arial";
		t.horizontalCenter = 0;
		t.text = "堆木头";
		t.textAlign = "center";
		t.y = 32;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 85;
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.y = 73;
		t.elementsContent = [this._Label2_i(),this._Image1_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 49;
		t.lineSpacing = 4;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 13;
		t.text = "当木头移动到木头堆正上方时，按下按钮放木头，尽可能的对齐木头.";
		t.verticalAlign = "middle";
		t.width = 237;
		t.x = 79;
		t.y = 6;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 64;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "icon_png";
		t.width = 64;
		t.x = 8;
		t.y = 10.5;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Image();
		this.btn = t;
		t.height = 54;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "b_okay_png";
		t.touchEnabled = true;
		t.width = 114;
		t.y = 173;
		return t;
	};
	return NewFile;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Tip.exml'] = window.Bg = (function (_super) {
	__extends(Bg, _super);
	function Bg() {
		_super.call(this);
		this.skinParts = ["text"];
		
		this.height = 50;
		this.width = 100;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = Bg.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 100;
		t.elementsContent = [this._Rect1_i(),this.text_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0x333333;
		t.percentHeight = 100;
		t.strokeAlpha = 0;
		t.strokeWeight = 0;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.text_i = function () {
		var t = new eui.Label();
		this.text = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.text = "漂亮 完美!";
		t.textAlign = "center";
		t.verticalAlign = "justify";
		t.verticalCenter = 0;
		return t;
	};
	return Bg;
})(eui.Skin);