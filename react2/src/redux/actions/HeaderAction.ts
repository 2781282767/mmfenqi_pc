import Config from '../../pub/Config';
import Tool from '../../pub/Tool';
// import Api from '../../pub/Api';
import LocalStorage from '../../pub/LocalStorage';
/**
 * 菜单初始化获取值
 */
const GET_AUTH = 'sb';
const R_login = 'R_login';

let OnGetAuth = (state) => {
    return { type: GET_AUTH, state };
}


let R_Login=(state)=>{
    return { type: R_login, state };
}


/**
 * 获取个人资料数据，如果存在读取本地数据。
 */
function getAuthAction(reddit?: any) {
    return (dispatch, getState) => {
        let _data = LocalStorage.get('cw_auth');
        /**
         * 如果本地存在就取本地数据，否则跳转到登录页。
         */
        if (_data) {
            dispatch(OnGetAuth(_data));
            return false;
        }
    }
}


function Login(){
    return function (dispatch) {
           dispatch(R_Login({name:'sb'}))

    }
}

/**
 * 退出操作
 */
function loginOutAction(){
    let buyConfirm = (modal) => {
        LocalStorage.remove('cw_auth');
        LocalStorage.remove('cw_menu');
        Tool.goPush('login');
        modal.close();
    }

    let actions = [
        { label: '取消' },
        { label: '确定', onClick: buyConfirm, primary: true }
    ]

    // Dialog.show('您确定要退出？', actions);
    
}

export {
    GET_AUTH,
    R_login,
    getAuthAction,
    loginOutAction,
    Login

}