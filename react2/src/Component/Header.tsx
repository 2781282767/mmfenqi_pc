'usr strict';


import * as React from "react";



import '../less/app.less'




import ComponentsConfig from "./componentsConfig";
const css_prefix = ComponentsConfig.css_prefix;
interface AppHeaderProps {
    meu_reducers?:any;
    hed_reducers?:any;
    actions?:any;
    menuComponent?:any;
}
export default class AppHeader extends React.Component<AppHeaderProps, any> {

    render(){
        return (
            <div>sss</div>
        )
    }


}