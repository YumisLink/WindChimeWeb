declare global {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
    interface Date {
        Format(fmt:string):string;
    }

    interface String {
        transVersion(pow?:number):number;
        format(...v:any[]):string;
    }
}


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt:string)
{ //author: meizz
    var o:any = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "H+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}



String.prototype.transVersion = function(pow?:number):number {
    let result = 0;
    let arr = this.split(".");
    let power = 1000;
    if(pow !== undefined) {
        power = parseInt(pow as any);
        if(isNaN(power)) {
            power = 1000;
        }
    }
    arr.reverse();
    for(let i = 0,l = arr.length;i < l;i ++) {
        let str = arr[i];
        let value = parseInt(str);
        if(!isNaN(value)) {
            result += value * Math.pow(power,i);
        }
    }
    return result;
}

String.prototype.format = function(...v:any[]):string {
    if(arguments.length == 0){
        return this as string;
    }
    for(var s = this, i = 0; i < arguments.length; i++){
        s = s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
    }
    return s as string;
};

export class Utils {
    public static Init() {

    }

    /**深度克隆 */
    public static deepClone(origin: any, target: any) {
        var target = target || {};
        let toStr = Object.prototype.toString;
        let arrStr = '[object Array]';
        for (let prop in origin) {
            if (origin.hasOwnProperty(prop)) {
                if (origin[prop] !== null && typeof (origin[prop]) == 'object') {
                    target[prop] = (toStr.call(origin[prop]) == arrStr) ? [] : {};
                    Utils.deepClone(origin[prop], target[prop]);
                } else {
                    target[prop] = origin[prop];
                }
            }
        }
        return target;
    }

    public static dataSet(target: any, keypath: string, value: any) {
        let _target: any = target;
        if (_target == null) return;
        if (typeof _target != "object") return;
        let arr = keypath.split("/");
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == "") arr.splice(i, 1);
        }

        for (let i = 0; i < arr.length; i++) {
            let key = arr[i];
            if (i < arr.length - 1) {
                if ((key in _target && (typeof _target[key]) != "object") || !(key in _target)) {
                    if (isNaN(parseInt(key))) {
                        _target[key] = {};
                    } else {
                        _target[key] = [];
                    }
                }
                _target = _target[key];
            } else {
                _target[key] = value;
            }
        }
    }

    public static dataGet(target: any, keypath: string, def: any) {
        let _target: any = target;
        if (_target == null) return def;
        if (typeof _target != "object") return def;
        let arr = keypath.split("/");
        for (let key of arr) {
            if (_target === undefined) return def;
            if (key == "") continue;
            if (key in _target) {
                _target = _target[key];
            } else {
                return def;
            }
        }
        return _target;
    }

    private static filesizearr = ["B", "KB", "MB", "GB", "TB"];

    public static transFileSize(bytesSize: number, addSpeed: boolean = false): string {
        let max = 1024;
        let arr = Utils.filesizearr
        let ret: string | number = bytesSize;
        let i = 0;
        for (i = 0; i < arr.length; i++) {
            if (ret >= max) {
                ret = ret / max;
            } else {
                break;
            }
        }
        ret = (Math.round(ret * 100) / 100) + arr[i] + (addSpeed ? "/s" : "");
        return ret;
    }

    public static stripHTML(str: string): string {
        var reTag = /<(?:.|\s)*?>/g;
        return str.replace(reTag, "");
    }

    public static applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }

    /**HTML编码 */
    public static htmlEncode(str: string) {
        let temp = "";
        if (str.length == 0) return "";
        temp = str.replace(/&/g, "&amp;");
        temp = temp.replace(/</g, "&lt;");
        temp = temp.replace(/>/g, "&gt;");
        temp = temp.replace(/\s/g, "&nbsp;");
        temp = temp.replace(/\'/g, "&#39;");
        temp = temp.replace(/\"/g, "&quot;");
        return temp;
    }

    /**HTML解码 */
    public static htmlDecodeByRegExp(str: string) {
        let temp = "";
        if (str.length == 0) return "";
        temp = str.replace(/&amp;/g, "&");
        temp = temp.replace(/&lt;/g, "<");
        temp = temp.replace(/&gt;/g, ">");
        temp = temp.replace(/&nbsp;/g, " ");
        temp = temp.replace(/&#39;/g, "\'");
        temp = temp.replace(/&quot;/g, "\"");
        return temp;
    }

    /**将秒数转化为00:00:00格式的字符串 */
    public static second2hmsStr(second: number, showhour: boolean = false) {
        second = Math.floor(second);
        let hour = 0;
        let minute = 0;
        let sec = 0;
        let hStr = "";
        let mStr = "";
        let sStr = "";
        sec = second % 60;
        second -= sec;
        minute = Math.floor(second / 60);
        if (showhour) {
            second -= minute * 60;
            hour = Math.floor(second / 3600);
            hStr = hour + "";
            while (hStr.length < 2) hStr = "0" + hStr;
        }
        mStr = minute + "";
        while (mStr.length < 2) mStr = "0" + mStr;
        sStr = sec + "";
        while (sStr.length < 2) sStr = "0" + sStr;
        if (showhour) {
            return `${hStr}:${mStr}:${sStr}`;
        } else {
            return `${mStr}:${sStr}`;
        }
    }

    /**权重抽取，给定一个length，会根据weight数组抽取 >=0 && <length 的一个整数(不含length) */
    public static weightExtract(param: number | Array<number>): number {
        if (typeof param == "number") {
            return Math.floor(Math.random() * param);
        } else if (param && param instanceof Array && param.length > 0) {
            let realLength = 0;
            let weightArr = param.concat();
            for (let i = 1; i < weightArr.length; i++) {
                weightArr[i] += weightArr[i - 1];
            }
            realLength = weightArr[weightArr.length - 1];
            let rand = Math.floor(Math.random() * realLength);
            for (let i = 0; i < weightArr.length; i++) {
                if (rand < weightArr[i]) {
                    return i;
                }
            }
            return 0;
        } else {
            return 0;
        }
    }

    public static getRandomString(count:number,type:'number' | 'letter' | 'string' | 'all' = 'all') {
        let dict = {
            'number': '1234567890',
            'letter': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'string': 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789',
            'all': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        };
        let str = dict[type];
        if(str == undefined) return "";
        let len = str.length;
        let result = "";
        for(let i = 0;i < count;i ++) {
            result += str[Math.floor(Math.random() * len)];
        }
        return result;
    }
}