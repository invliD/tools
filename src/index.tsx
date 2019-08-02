import * as React from "react";
import { render } from "react-dom";

import { Header } from "./Header";

// tslint:disable:ordered-imports no-submodule-imports
// tslint:disable-next-line:no-implicit-dependencies
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./index.scss";
// tslint:enable:ordered-imports no-submodule-imports

const container = document.createElement("div");
container.id = "tools-entry";
document.getElementsByTagName("body")[0].appendChild(container);
render(
    <div>
        <Header />
    </div>,
    container,
);
