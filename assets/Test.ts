
import { _decorator, Component, Node } from 'cc';
import { ball_ctrl } from './scripts/ball_ctrl';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Test
 * DateTime = Tue Nov 29 2022 23:36:10 GMT+0800 (中国标准时间)
 * Author = h824612114
 * FileBasename = Test.ts
 * FileBasenameNoExtension = Test
 * URL = db://assets/Test.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

function test(){
    console.log("调用函数");
}
function greet():string{
    return "Hello World"
}
function caller(){
    var msg = greet()
    console.log(msg);
}

caller()

function add(x:number,y:number):number{
    return x+y;
}
console.log(add(1,2));

function buildName(firstName:string,lastName:string){
    return firstName + " "+lastName;
}
let result1 = buildName("Bob","Adams");
function buildName1(firstName:string,lastName?:string){
    if(lastName)
    {
        return firstName +" "+lastName;
    }else{
        return firstName
    }
}
result1 = buildName1("Bob")
result1 = buildName1("Bob","Adams")

function calc(price:number,rate:number = 0.50){
    var discount = price*rate;
    console.log("计算结果：",discount);
    
}

function addNumbers(...nums:number[]){
    var i;
    var sum:number = 0;
    for(i = 0;i<nums.length;i++)
    {
        sum = sum+nums[i];
    }
    console.log("和为：",sum);
    
}
addNumbers(1,2,3)
addNumbers(10,10,11,12,13)

var msg = function(){
    return "hello world"
}
console.log(msg());

var res = function(a:number,b:number){
    return a*b;
}
console.log(res(12,3));

(function(){
    var x = "Hello!!";
    console.log(x);
    
})

var foo = (x:number)=>10+x
console.log(foo(100));

var myFuntion = new Function("a","b","return a*b")
var x = myFuntion(4,3)
console.log(x);

@ccclass('Test')


export class Test extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    varDefinition():void{
        var uname:string = "Runoob";
        var score1:number = 50;
        var score2:number = 42.5;
        var sum = score1 + score2;
        console.log("名字："+uname);
        console.log("第一个科目成绩:"+score1);
        console.log("第二个科目成绩："+score2);
        console.log("总成绩:"+sum);
        var num:number = 2
        if(num>0)
        {
            console.log(num+" 是正数");
        }else if(num <0){
            console.log(num+" 是负数");
            
        }else{
            console.log(num +" 不是正数也不是负数");
        }
        var num:number = 5;
        var i:number;
        var factorial = 1;
        for(i = num;i>=1;i--)
        {
            factorial *= i;
        }
        console.log(factorial)
        var j:any;
        var n:any = "a b c"
        for(j in n){
            console.log(n[j]);
        }
        let someArray = [1,"string",false]
        for(let entry of someArray){
            console.log(entry);
        }
        let list = [4,5,6]
        list.forEach((val,idx,array)=>{

        })
        list.every((val,idx,array)=>{
            return true;
        })
        var num:number = 5;
        var factorial1:number = 1;
        while(num>=1){
            factorial = factorial*num;
            num--;
        }
        console.log("5 的阶乘为："+factorial);
        var n1:number = 10;
        do{
            console.log(n);
            n--;
            
        }while(n>=0);
        var i:number = 1;
        while(i<=10)
        {
            if(i%5 == 0){
                console.log("在1~10之间第一个被5整除的数为："+i);
                break;
            }
            i++;
        }
        var num:number = 0;
        var count:number = 0;
        for(num = 0;num<= 20;num++)
        {
            if(num%2 ==0)
            {
                continue
            }
            count++
        }
        console.log("0~20之间的奇数个数为:"+count);
        
    }
    
    start () {
        // [3]
        const hello:string = "Hello World!"
        console.log(hello);
        let binaryLiteral:number = 0b1010;
        let octal:number = 0o744;
        let decLiteral:number = 6;
        let hexLiteral:number = 0xf00d;
        let name :string = "Runnob";
        let years:number = 5;
        let words:string = '您好,今年是${name}发布${years+1}周年';
        let flag:boolean = true;
        let arr:number[] = [1,2];
        let arr1:Array<number> = [1,2];
        enum Color{Red,Green,Blue};
        let c:Color=Color.Blue;
        console.log(c);
        
        this.varDefinition();
        
    }
    hello():void{
        alert("Hello Runoob");
        ball_ctrl
    }
    
    test():number{

        let x:any = 1;
        x = 'I am who I am';
        x = false;
        let x1:any = 4;
        let arrayList:any[] = [1,false,'fine'];
        arrayList[1] = 100;

        let x2:number;
        // x = 1;
        // x = undefined;
        // x = null;

        let x3:number|null|undefined;
        x3 = 1;
        x3 = undefined;
        x3 = null;

        let x4:never;
        let y4:number;
        // x4 = 123;
        x4 = (()=>{
            throw new Error('exception')
        })();

        y4 = (()=>{throw new Error('exception')})();
        function error(message:string):never{
            throw new Error(message);
        }

        return 1;
    }
    loop():never{
        while(true){}
    }

    


    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
