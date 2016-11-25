import * as React from "react";
export default class InputCheckbox extends React.Component<any, any> {
    static defaultProps: {
        className: string;
        checked: boolean;
    };
    constructor(props: any);
    handleChange(event: any): void;
    render(): JSX.Element;
    componentWillReceiveProps(nextProps: any): void;
}
