import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hellow } from "./components/hellow";

ReactDOM.render(
    <Hellow compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);