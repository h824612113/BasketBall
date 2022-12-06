import { _decorator, Component, Node, RigidBodyComponent,systemEvent, SystemEvent ,Vec3, math, v3, SpriteComponent, Label, SphereCollider, ICollisionEvent, AudioSource, AudioClip, Slider} from 'cc';
import { Speed, State } from './GameConstants';
import { Label3D } from './label-3d';
import {md5} from './md5';
import StringUtil from './StringUtil';
// import * as MD5 from "./md5";

const { ccclass, property } = _decorator;

@ccclass('BallCtrls')
export class BallCtrls extends Component {

    @property
    angle:number = Math.PI/4;
    @property
    time:number = 3;
    // @property({type:SpriteComponent})
    // progressBar:SpriteComponent = null;
    @property(Slider)
    progressSlider:Slider = null;

    
    @property({type:Node})
    camera:Node = null;

    private cameraOriginPos:Vec3 = Vec3.ZERO;
    private minFillRange = 0.0;
    private aSpeed = (Speed.MAX - Speed.MIN)/this.time;
    private state:number = State.IDLE;
    private body: RigidBodyComponent = null;   
    private speed:number = Speed.MIN; 
    private ballOriginPos:Vec3 = Vec3.ZERO;
    public isStart:boolean = false;
    @property({type:Label3D})
    daojiTime:Label3D = null;
    private totalTime:number = 10;//倒计时的总时间
    @property({type:Label3D})
    scoreStr:Label3D = null;
    private beatCount:number = 0;//投篮的次数
    private beatSuccessCount:number = 0;//投篮成功的次数
    public isSubmit:boolean = false; //提交成功数据

    @property({type:AudioSource})
    audioSource:AudioSource = null;
    @property({type:AudioClip})
    audioClipBeatKuang:AudioClip = null;
    @property({type:AudioClip})
    audioDaoji:AudioClip = null;
    @property({type:AudioClip})
    audioClipCheer:AudioClip = null;
    @property({type:AudioClip})
    audioziFreeLand:AudioClip = null;
    onLoad()
    {
        this.initGame();
        systemEvent.on(SystemEvent.EventType.TOUCH_START,this.onTouchStart,this);
        systemEvent.on(SystemEvent.EventType.TOUCH_END,this.onTouchEnd,this);
        let collider = this.node.getComponent(SphereCollider);
        collider?.on('onCollisionEnter',this.onCollisionEnter,this);
        // var temp = MD5.md5("abjksdjfcisdfl")
        // let temp = new MD5();
        var final = md5("sdfsdf87s8d7f8sdfhsdjfs")
        console.log("MD5------"+final);
        //时间戳
        let timestamp = Date.parse(new Date().toString()).toString();
        timestamp = timestamp.substring(0,10);
        console.log('onload--当前的时间戳是timestamp: ' + timestamp);
        console.log("测试BallCtrls 播放音效----");
        
        this.playDaojiEffect();
        

    }
    
    public playDaojiEffect()
    {
        console.log("播放倒计时音效");
        
        this.audioSource.clip = this.audioDaoji;
        this.audioSource.play();
    }
    onDestroy()
    {
        let collider = this.node.getComponent(SphereCollider);
        collider?.off('onCollisionEnter',this.onCollisionEnter,this);
    }
    onCollisionEnter(event:ICollisionEvent){
        if(event.otherCollider.name == "netCollider<BoxCollider>")
        {
            console.log("投篮成功------netCollider");
            this.audioSource.playOneShot(this.audioClipCheer,1);
            this.beatSuccessCount+=1;
        }
        if(event.otherCollider.name == "Basketball_1_43<BoxCollider>") //篮筐
        {
            console.log("打到篮筐------Basketball_1_43");
            this.audioSource.playOneShot(this.audioClipBeatKuang,1);
        }
        if(event.otherCollider.name == "basketball_ground<BoxCollider>") //落地
        {
            console.log("自由落体掉在地上------basketball_ground");
            this.audioSource.playOneShot(this.audioziFreeLand,1);
        }
        console.log("碰撞了--------"+event.otherCollider.name);
        
    }

    private onTouchStart():void{
        if(this.state === State.IDLE)
        {
            if(this.isStart)
            {
                this.state = State.ADD_FORCE;
            }else{
                console.log("当前还在倒计时阶段-----");
                
            }
        }
    }

    throwOutBall()
    {
        this.body.useGravity = true;
        let vy = this.speed *Math.sin(this.angle);
        let vz = -this.speed *Math.cos(this.angle);
        this.body.setLinearVelocity(v3(0,vy,vz));
        this.scheduleOnce(this.resetGame.bind(this),2);
        console.log("当前的progressbar---"+this.progressSlider.progress);
        
    }

    gameEnd()
    {
        // this.scoreStr.string = (this.beatSuccessCount*3).toString();
        //记录分数 //传递分数
        if(!this.isSubmit) this.SendPost();
        this.resetGame();
    }
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return r[2];
      return '';
    }
    SendPost()
    {
        this.isSubmit = true
        var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
        var url = "http://api.test.mteam01.com/api/member/submitAch";
        httpRequest.open('post', url, true); //第二步：打开连接
        httpRequest.setRequestHeader("Content-type","application/json;charset=UTF-8");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        httpRequest.setRequestHeader("token",this.getQueryString('token'));
        //时间戳
        let timestamp = Date.parse(new Date().toString()).toString();
        timestamp = timestamp.substring(0,10);
        console.log("total---"+this.beatCount+"--hitbeat--"+this.beatSuccessCount);
        
        console.log('当前的时间戳是timestamp: ' + timestamp);

        var sessionPre = "wYGRnzQXCPdnhQVYXA"+timestamp; 
        var session = md5(sessionPre);
        console.log("sessionPre==="+sessionPre+"--session---"+session);
        var params = {
          total:this.beatCount,
          hit_count:this.beatSuccessCount,
          submit_time:timestamp,
          session_key:session
        };
        httpRequest.send(JSON.stringify(params));
        
        httpRequest.onreadystatechange =  ()=> {//请求后的回调接口，可将请求成功后要执行的程序写在其中
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
                var res = JSON.parse(httpRequest.responseText);//获取到服务端返回的数据
                if(res.code ==0 ){
                  location.href=`http://web.echo.mteam01.com/h5/#/activity?cm=record&is_cur_day_first=${res.data.is_cur_day_first}&hit_count=${res.data.hit_count}&is_rank=${res.data.is_rank}&integral=${res.data.integral}`;
                }else{
                  console.log("请求失败-------"+res.message);
                }
            }else{
                console.log("请求失败-------"+httpRequest.status+"--error--"+httpRequest.onerror);
            }
        };
    }
    resetGame()
    {

        this.body.useGravity = false;
        this.node.setPosition(this.ballOriginPos);
        this.body.setLinearVelocity(Vec3.ZERO);
        this.body.setAngularVelocity(Vec3.ZERO);
        this.state = State.IDLE;
        this.speed = Speed.MIN;
        this.progressSlider.progress = this.minFillRange;
        this.camera.setPosition(this.cameraOriginPos);
    }

    private onTouchEnd():void{
        if(this.state === State.ADD_FORCE)
        {
            this.state = State.THROW_OUT;
            this.throwOutBall();
            this.beatCount+=1;
        }
    }

    initGame()
    {
        this.state = State.IDLE;
        this.isStart = false;
        this.body = this.node.getComponent(RigidBodyComponent);
        this.body.useGravity = false;
        this.ballOriginPos = this.node.getPosition();
        this.speed = Speed.MIN;
        this.progressSlider.progress = this.minFillRange;
        console.log("enter initGmae-----fillrange---"+this.progressSlider.progress);
        this.cameraOriginPos = this.camera.getPosition();
        this.totalTime = 30;
        this.beatCount = 0;
        this.beatSuccessCount = 0;
    }
    start() {

    }

    update(deltaTime: number) {
        if(this.state === State.ADD_FORCE)
        {
            this.updateProgress(deltaTime);
        }else if(this.state === State.THROW_OUT)
        {
            // this.camera.setPosition();
            let pos = this.camera.getPosition();
            pos.z -= (this.speed+0.2)*Math.cos(this.angle)*deltaTime;
            if(pos.z <= -8)
            {
                pos.z = -8;
            }
            this.camera.setPosition(pos);
        }
        if(this.totalTime<=1 )
        {
            this.gameEnd();
        }
    }
    updateProgress(deltaTime:number)
    {
        this.speed += this.aSpeed*deltaTime;
        if(this.speed >= Speed.MAX)
        {
            this.speed = Speed.MAX;
        }
        let per:number = this.minFillRange+(this.speed - Speed.MIN)/(Speed.MAX - Speed.MIN);
        this.progressSlider.progress = per;
    }
    public OnloadDaoJiTime():void
    {
        var self = this;
        this.schedule(function(){
            self.totalTime -= 1;
            self.daojiTime.string = "00:"+self.totalTime.toString();
            self.scoreStr.string = (self.beatSuccessCount*3).toString();
        },1,29,1);
    }
}

