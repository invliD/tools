import * as React from "react";
import { render } from "react-dom";

const container = document.createElement("div");
document.getElementsByTagName("body")[0].appendChild(container);
render(<div>Hi!</div>, container);
