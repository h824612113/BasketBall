import { _decorator, Component, Node, SpriteFrame, Sprite,resources, CCObject, AudioSource, AudioClip} from 'cc';
import { BallCtrls } from './BallCtrls';
import { ball_ctrl } from './ball_ctrl';
const { ccclass, property } = _decorator;

@ccclass('DaoJiCtrl')
export class DaoJiCtrl extends Component {
    @property(BallCtrls)
    public ballctrl:BallCtrls = new BallCtrls();
    private daojiTime:number = 3;
    @property(Sprite)
    public daojiImg1:Sprite= new Sprite();
    @property(Sprite)
    public daojiImg2:Sprite= new Sprite();
    @property(Sprite)
    public daojiImg3:Sprite= new Sprite();
    // @property(AudioSource)
    // public audioSource:AudioSource = null;
    // @property(AudioClip)
    // public audioDaoji:AudioClip = null;
    

    onload(){
        console.log("DaojiCtrl----ONload方法");
        
    }
    start() {
        console.log("DaoJiCtrl---start方法");
        
        var self = this;
        this.ballctrl.isStart = false;    
        var s="reources/NewTex/";
        // resources.preload(s+3, SpriteFrame);
        // resources.preload(s+2, SpriteFrame);
        // resources.preload(s+1, SpriteFrame);

        console.log("开始播放倒计时音乐---");
        this.ballctrl.playDaojiEffect();
        this.schedule(function(){
            self.daojiTime -=1;
            self.replaceImg(self.daojiTime);
            console.log("当前的时间是----"+self.daojiTime);
            
        },1,2,1);
        // this.audioSource.clip = this.audioDaoji;
        // this.audioSource.playOneShot(this.audioDaoji,1);
        console.log("enter DaojiCtrl----");
        
    }

    // async loadResSpriteFrame(paths: string) {
    //     const spriteFrame = await new Promise<SpriteFrame>((resolve, reject) => {
    //         resources.load(paths+ '/spriteFrame', SpriteFrame, (err: Error, assets: SpriteFrame) => {
    //             err && reject(err);
    //             resolve(assets);
    //         });
    //     });

    //     if (spriteFrame instanceof SpriteFrame) {
    //         this._spriteFrameCacheMap.set(paths, spriteFrame);
    //         return spriteFrame;
    //     }
    //     else {
    //         error(`<load fail>path:${paths}`);
    //         return null;
    //     }
    // }
    hideAllImg()
    {
        this.daojiImg1.node.active = false;
        this.daojiImg2.node.active = false;
        this.daojiImg3.node.active = false;
    }
    replaceImg(id:number)
    {
        const s="NewTex/"+id;
        console.log("当前的图片为---"+s);
        var self = this;
        this.hideAllImg();
        if(id == 1)
        {
            this.daojiImg1.node.active = true;
        }else if(2 == id)
        {
            this.daojiImg2.node.active = true;
        }else if(3 == id)
        {
            this.daojiImg3.node.active = true;
        }
        // this.loadResSpriteFrame(s);
        // resources.load(s,SpriteFrame, (err, spriteFrame) => {
        //     self.daojiImg.spriteFrame = spriteFrame;
        //     console.log("enter resources.load"+err);
            
        // });

        // cc.loader.loadRes(s, cc.SpriteFrame, function (err, spriteFrame) {
        //     self.daojiImg.spriteFrame = spriteFrame;
        //     console.log("enter resources.load"+err);
        // });
    

    }

    
    update(deltaTime: number) {
        if(this.daojiTime>0)
        {
            this.node.active = true;
            this.ballctrl.isStart = false;
        }else{
            this.ballctrl.isStart = true;
            this.ballctrl.OnloadDaoJiTime();
            this.node.active = false;   
        }
    }
}

