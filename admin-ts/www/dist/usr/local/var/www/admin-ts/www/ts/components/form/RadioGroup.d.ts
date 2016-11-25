import * as React from "react";
export default class RadioGroup extends React.Component<any, any> {
    static defaultProps: {
        disabled: boolean;
        onChange(): void;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
}
