declare const BASE_MENU: string;
declare const SWITCH_MENU: string;
declare const GET_ACTIVE: string;
declare const ACTIVE_MENU: string;
declare const CHANGE_ACTIVE: string;
declare let switchMenu: (menuSwitch: any) => {
    type: string;
    menuSwitch: any;
};
declare let saveParentActive: (saveData: any) => void;
declare let saveChildActive: (saveData: any) => void;
declare let changeActiveAction: () => (dispatch: any, getState: any) => void;
declare function getMenuAction(reddit?: any): (dispatch: any, getState: any) => void;
export { BASE_MENU, SWITCH_MENU, GET_ACTIVE, ACTIVE_MENU, CHANGE_ACTIVE, getMenuAction, switchMenu, saveParentActive, saveChildActive, changeActiveAction };
