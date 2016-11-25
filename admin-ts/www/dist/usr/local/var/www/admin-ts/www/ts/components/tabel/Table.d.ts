import * as React from "react";
export default class Table extends React.Component<any, any> {
    onceTable: boolean;
    checkedValue: any;
    constructor(props: any);
    getHeader(columns: any): JSX.Element;
    getBody(): any;
    hanldRadio(event: any, record: any): void;
    allCheckbox(value: any): void;
    childCheckbox(value: any, record: any): void;
    render(): JSX.Element;
}
