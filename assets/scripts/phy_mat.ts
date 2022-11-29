// 从引擎模块 导入特定的类;
import { _decorator, Component, Node, RigidBodyComponent, PhysicMaterial, ColliderComponent } from "cc";


const { ccclass, property } = _decorator;

// 装饰器:  ccclass 组件类;
@ccclass("phymat")

export class phymat extends Component {
    
    @property
    private friction: number = 0;

    @property
    private restitution: number = 0;
     
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    onLoad(): void {
        var comps: Array<ColliderComponent> = this.node.getComponents(ColliderComponent) as Array<ColliderComponent>;
        var phy_m = new PhysicMaterial();
        phy_m.friction = this.friction;
        phy_m.restitution = this.restitution;

        for(var i = 0; i < comps.length; i ++) {
            comps[i].material = phy_m;
        }
    }

    start () {
        // Your initialization goes here.
        
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
