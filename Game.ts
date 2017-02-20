/**
 *测试页面2
 * @author 
 *
 */
class Game extends CBaseClass {
    public constructor() {
        super();
    }
    private nowAns: number = 1;
    private AnsArr = ['A', 'B', 'B', 'C', 'C', 'B'];

    private box: egret.Sprite;
    public addToStage() {
        Effects.CenterSize(this);
        this.createGameScene();
    }
    private A: egret.Bitmap;
    private B: egret.Bitmap;
    private C: egret.Bitmap;
    private title: egret.Bitmap;
    public createGameScene() {
        this.addChild(Tool.createBitmapByName('load_bg_png'));
        var db: egret.Bitmap = Tool.createBitmapByName('game_bg_png');
        db.y = 49; db.x = 20;
        this.addChild(db);

        this.box = Tool.createSprite(457, 640);
        this.box.x = 88; this.box.y = 65;
        this.box.addChild(Tool.createBitmapByName('game_1_dt_jpg'));
        this.addChild(this.box);

        var mc: egret.MovieClip = Tool.createMovieClip('game_1_dh');
        mc.play(-1);
        this.box.addChild(mc);


        this.title = Tool.createBitmapByName('game_1_title_png');
        this.title.x = 44; this.title.y = 28;
        this.addChild(this.title);

        this.A = Tool.createBitmapByName('game_1_A_png');
        this.A.x = 46; this.A.y = 739; this.A.name = "A"; this.A.touchEnabled = true;
        this.addChild(this.A);
        this.A.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touBegin, this);

        this.B = Tool.createBitmapByName('game_1_B_png');
        this.B.x = 240; this.B.y = 739; this.B.name = "B"; this.B.touchEnabled = true;
        this.addChild(this.B);
        this.B.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touBegin, this);

        this.C = Tool.createBitmapByName('game_1_C_png');
        this.C.x = 436; this.C.y = 739; this.C.name = "C"; this.C.touchEnabled = true;
        this.addChild(this.C);
        this.C.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touBegin, this);
    }
    private touBegin(e: egret.TouchEvent) {
        TouchStyleEffects.touchStyleEffects(e);
        if (this.nowAns == 1) {
            window['MtaH5'].clickStat('one');
        }
        if (this.nowAns == 2) {
            window['MtaH5'].clickStat('two');
        }
        if (this.nowAns == 3) {
            window['MtaH5'].clickStat('three');
        }
        if (this.nowAns == 4) {
            window['MtaH5'].clickStat('four');
        }
        if (this.nowAns == 5) {
            window['MtaH5'].clickStat('five');
        }
        if (this.nowAns == 6) {
            window['MtaH5'].clickStat('six');
        }
        if (this.nowAns > this.AnsArr.length - 1) {
            if (e.target.name == this.AnsArr[this.nowAns - 1]) {
                Mode.score++;
                if (window['audioStatus'] == "playing") {
                    window.document.getElementById('dd')['pause']();
                    window.document.getElementById('dc')['pause']();
                    window.document.getElementById('dd')['load']();
                    window.document.getElementById('dc')['load']();
                    window.document.getElementById('dd')['play']();
                }

                PopUpManager.getInstance().addPopUp(new Tips(this.nowAns, true, () => {
                    Main.eventManager.dispatchEventWith(EventManager.GOTO_END);
                }, this), true, 640, 1036, 1);
            }
            else {
                if (window['audioStatus'] == "playing") {
                    window.document.getElementById('dd')['pause']();
                    window.document.getElementById('dc')['pause']();
                    window.document.getElementById('dd')['load']();
                    window.document.getElementById('dc')['load']();
                    window.document.getElementById('dc')['play']();
                }

                PopUpManager.getInstance().addPopUp(new Tips(this.nowAns, false, () => {
                    Main.eventManager.dispatchEventWith(EventManager.GOTO_END);
                }, this), true, 640, 1036, 1);
            }
            return;
        }
        Tool.ButtonBound(e.target, (e) => {
            if (e[0].name != this.AnsArr[this.nowAns - 1]) {
                if (window['audioStatus'] == "playing") {
                    window.document.getElementById('dd')['pause']();
                    window.document.getElementById('dc')['pause']();
                    window.document.getElementById('dd')['load']();
                    window.document.getElementById('dc')['load']();
                    window.document.getElementById('dc')['play']();
                }
                // Main.eventManager.dispatchEventWith(EventManager.GOTO_END);
                PopUpManager.getInstance().addPopUp(new Tips(this.nowAns, false, () => {
                    this.switchAns();
                }, this), true, 640, 1036, 1);
            }
            else {
                if (window['audioStatus'] == "playing") {
                    window.document.getElementById('dd')['pause']();
                    window.document.getElementById('dc')['pause']();
                    window.document.getElementById('dd')['load']();
                    window.document.getElementById('dc')['load']();
                    window.document.getElementById('dd')['play']();
                }
                Mode.score++;
                PopUpManager.getInstance().addPopUp(new Tips(this.nowAns, true, () => {
                    this.switchAns();
                }, this), true, 640, 1036, 1);
            }
        }, this)
    }
    private switchAns() {
        this.nowAns++;
        this.title.texture = Tool.createBitmapByName('game_' + this.nowAns + '_title_png').texture;
        this.A.texture = Tool.createBitmapByName('game_' + this.nowAns + '_A_png').texture;
        if (this.nowAns == 3) {
            this.B.x = 240;
        }
        if (this.nowAns == 5) {
            this.B.x = 240;
        }
        if (this.nowAns == 6) {
            this.B.x = 230;
        }
        // else {
        //     this.A.x = 46;
        // }
        this.B.texture = Tool.createBitmapByName('game_' + this.nowAns + '_B_png').texture;
        this.C.texture = Tool.createBitmapByName('game_' + this.nowAns + '_C_png').texture;

        Tool.removeALL(this.box);

        this.box.addChild(Tool.createBitmapByName('game_' + this.nowAns + '_dt_jpg'));

        var mc: egret.MovieClip = Tool.createMovieClip('game_' + this.nowAns + '_dh');
        mc.play(-1);
        this.box.addChild(mc);
    }
}