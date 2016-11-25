declare const GET_AUTH: string;
declare function getAuthAction(reddit?: any): (dispatch: any, getState: any) => boolean;
declare function loginOutAction(): void;
export { GET_AUTH, getAuthAction, loginOutAction };
