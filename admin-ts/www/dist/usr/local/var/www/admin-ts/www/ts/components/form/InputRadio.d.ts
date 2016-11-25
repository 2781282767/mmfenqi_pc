import * as React from "react";
export default class InputRadio extends React.Component<any, any> {
    static defaultProps: {
        className: string;
        disabled: boolean;
    };
    constructor(props: any);
    handleClick(event: any): void;
    render(): JSX.Element;
    componentWillReceiveProps(nextProps: any): void;
}
