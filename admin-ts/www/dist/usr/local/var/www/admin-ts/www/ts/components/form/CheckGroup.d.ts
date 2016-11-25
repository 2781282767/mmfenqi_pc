import * as React from "react";
export default class CheckGroup extends React.Component<any, any> {
    checkedValue: any;
    static defaultProps: {
        options: any[];
        defaultValue: any[];
        onChange(): void;
    };
    constructor(props: any);
    getOptions(): any;
    componentWillReceiveProps(nextProps: any): void;
    toggleOption(option: any): void;
    render(): JSX.Element;
}
