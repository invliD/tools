import * as React from "react";
import { render } from "react-dom";

import { FocusStyleManager } from "@blueprintjs/core";

import { Header } from "./Header";
import { IpCalculator } from "./ip-calc/IpCalculator";

// tslint:disable:ordered-imports no-submodule-imports
// tslint:disable-next-line:no-implicit-dependencies
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "./index.scss";
// tslint:enable:ordered-imports no-submodule-imports

FocusStyleManager.onlyShowFocusOnTabs();

const container = document.createElement("div");
container.id = "tools-entry";
document.getElementsByTagName("body")[0].appendChild(container);
render(
	<>
		<Header />
		<div className="content">
			<IpCalculator />
		</div>
	</>,
	container,
);
