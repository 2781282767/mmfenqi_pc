export default class Tool {
    constructor();
    static goPush(path: string): boolean;
    static assign(...args: any[]): any;
    static each(elements: any, callback: any): any;
    static hasPrototype(object: {}, name: string): boolean;
    static hasClass(ele: any, cls: any): any;
    static addClass(ele: any, cls: any): void;
    static removeClass(ele: any, cls: any): void;
    static toggleClass(ele: any, cls: any): void;
    static getUrlParams(): any;
    static verifier(verifier: any): {
        isOk: boolean;
        tips: string;
    };
    static getQueryString(Paras: any): any;
}
