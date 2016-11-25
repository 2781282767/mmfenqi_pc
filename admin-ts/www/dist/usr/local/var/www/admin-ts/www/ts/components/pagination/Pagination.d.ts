import * as React from "react";
export default class Pagination extends React.Component<any, any> {
    pages: number;
    static defaultProps: {
        defaultCurrent: number;
        total: number;
        defaultPageSize: number;
        pageSizeOptions: number[];
    };
    constructor(props: any);
    handlePagesClick(page: any): void;
    handlePrevClick(event: any, pages: any): void;
    handleNextClick(pages: any): void;
    jumpPrev(): void;
    jumpNext(): void;
    handleGo(): void;
    createItem(allPages: any): any;
    handleKeyDown(evt: any): void;
    handleKeyUp(evt: any): void;
    showQuickJumper(): JSX.Element;
    showSizeChanger(): JSX.Element;
    handleChange(value: any): void;
    render(): JSX.Element;
}
