import * as React from "react";
export default class FormItems extends React.Component<any, any> {
    static defaultProps: {
        labelCol: string;
        wrapperCol: string;
    };
    constructor(props: any);
    toChild(): React.DOMElement<{
        className: string;
    }, Element>[];
    render(): JSX.Element;
}
