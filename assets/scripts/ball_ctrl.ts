import { _decorator, Component, Node, systemEvent, RigidBodyComponent, UITransformComponent, Vec3, CameraComponent } from "cc";
const { ccclass, property } = _decorator;

class State {
    public static Idle: number = 1;
    public static AddForce: number = 2;
    public static ThrowOut: number = 3;
}


@ccclass("ball_ctrl")
export class ball_ctrl extends Component {

    @property(UITransformComponent)
    private content: UITransformComponent = null;

    private state: number = State.Idle;
    private body: RigidBodyComponent = null;    

    private start_pos: Vec3 = null;

    @property({type:Node})
    camera:Node = null;
    private add_delta: number = 0;
    private group_speed: number = (6.5 - 3.5) / 3; // 蓄力增长的速度;
    public isStart:boolean = false;
    private cameraOriginPos:Vec3 = Vec3.ZERO;

    onLoad(): void {
        
        this.state = State.Idle;
        this.body = this.node.getComponent(RigidBodyComponent);
        console.log(this.body);

        this.start_pos = cc.v3(this.node.position.x, this.node.position.y, this.node.position.z);
        this.body.useGravity = false;
        this.set_per(0);
        systemEvent.on(Node.EventType.TOUCH_START, this.on_touch_start, this);
        systemEvent.on(Node.EventType.TOUCH_END, this.on_touch_end, this);
        this.cameraOriginPos = this.camera.getPosition();//摄像机的原始位置
    }

    reset_ball() {
        this.node.setPosition(this.start_pos);
        this.body.setLinearVelocity(Vec3.ZERO);
        this.body.setAngularVelocity(Vec3.ZERO);

        this.body.useGravity = false;
        this.state = State.Idle;
        this.set_per(0);
        this.camera.setPosition(this.cameraOriginPos);
    }

    set_per(per: number): void {
        this.content.width = per * 250;
    }

    on_touch_start(): void {
        if (this.state != State.Idle) {
            return;
        }
        if(!this.isStart)
        {
            return;
        }

        this.set_per(0);
        this.add_delta = 0;
        this.state = State.AddForce;
    }

    throw_ball_out(): void {
        var speed: number = 6.5 + this.add_delta; // [3.5, 6.5]
        var r: number = Math.PI / 4;

        var vz: number = -speed * Math.cos(r);
        var vy: number = speed * Math.sin(r);

        this.body.useGravity = true;
        this.body.setLinearVelocity(cc.v3(0, vy, vz));

        this.scheduleOnce(this.reset_ball.bind(this), 3);
    }

    on_touch_end(): void {
        if (this.state != State.AddForce) {
            return;
        }
        this.state = State.ThrowOut;

        this.throw_ball_out();
    }

    start (): void {
        // Your initialization goes here.
    }

    update (deltaTime: number):void {
        if (this.state != State.AddForce) {
            return;
        }else if(this.state === State.ThrowOut)
        {
            let pos =  this.camera.getPosition();
            // pos.z -= this.group_speed*Math.cos(this.)
        }

        this.add_delta += (this.group_speed * deltaTime);
        this.add_delta = (this.add_delta > 3.0) ? 3.0 : this.add_delta;

        var per = this.add_delta / 3.0;
        this.set_per(per);
    }
}
