export default class StringUtil {
 
    /**
     * 字符串格式
     * @param str 
     * @param args 
     * @returns  使用方法： let str:string = StringUtil.stringFormat("我是{0},{1},{2}","1","2","3");console.log(str);
        
     */
    static stringFormat(str: string, ...args: Array<any>) {
        return str.replace(/{(\d+)}/gm, function (ms, p1) {
            return typeof (args[p1]) == 'undefined' ? ms : args[p1]
        });
    }
 
    static globalindex = 0;
    static globaltime = 0;
    /**
     * 获得唯一ID
     */
    static getGlobalID(): string {
        let nowtime = Date.now();
        if (StringUtil.globaltime == nowtime)
            this.globalindex++;
        else
            this.globalindex = 0;
        StringUtil.globaltime = nowtime;
        return nowtime + "_" + StringUtil.globalindex;
    }
}