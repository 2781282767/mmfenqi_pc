import * as React from "react";
export default class FormGroup extends React.Component<any, any> {
    static defaultProps: {
        type: string;
    };
    constructor(props: any);
    toChild(): React.DOMElement<{
        isInline: boolean;
    }, Element>[];
    render(): JSX.Element;
}
