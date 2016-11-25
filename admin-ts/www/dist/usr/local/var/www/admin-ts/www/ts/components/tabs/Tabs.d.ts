import * as React from "react";
export default class Tabs extends React.Component<any, any> {
    static defaultProps: {
        activeKey: number;
    };
    constructor(props: any);
    onChange(value: any, key: any): void;
    TabsTitle(): JSX.Element[];
    tabConten(): React.DOMElement<{
        className: string;
    }, Element>[];
    render(): JSX.Element;
}
