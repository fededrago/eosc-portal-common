import "./index.scss";

import {render} from "react-dom";
import React from "react";
import {EoscMainHeader} from "./src/main-header/main-header";

window.addEventListener('load', () => {
    const eoscMainHeader = document.getElementsByTagName("eosc-main-header")[0];
    render(
        <EoscMainHeader
            name={ eoscMainHeader.getAttribute("name") }
            surname={ eoscMainHeader.getAttribute("surname") }
        />,
        eoscMainHeader
    );
})
