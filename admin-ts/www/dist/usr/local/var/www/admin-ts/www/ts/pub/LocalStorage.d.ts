export default class LocalStorage {
    constructor();
    static getLocalStorage(): Storage;
    static add(key: string, value: any, expired?: number): void;
    static get(key: string, callback?: any): any;
    static update(key: any, value: any, expired: any): any;
    static remove(key: string): void;
    static clear(): void;
    static getExp(key: string, expired?: number): number;
}
