export default function MenuReducers(state: {
    active: {
        parent: number;
        child: number;
    };
    menuSwitch: boolean;
    menuList: any[];
}, action: any): any;
