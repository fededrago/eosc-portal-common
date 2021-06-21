var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as _ from 'lodash';
import React, { Component } from "react";
import { render } from "react-dom";
import { environment } from "../../env/env";
var EoscMainHeader = /** @class */ (function (_super) {
    __extends(EoscMainHeader, _super);
    function EoscMainHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EoscMainHeader.prototype.render = function () {
        var navBtnsConfig = environment.mainHeaderConfig;
        var loginBtnConfig = navBtnsConfig.find(function (btn) { return btn.label === "login"; });
        var logoutBtnConfig = navBtnsConfig.find(function (btn) { return btn.label === "logout"; });
        var auth = !!this.props.name && !!this.props.surname
            ? React.createElement(React.Fragment, null,
                React.createElement("li", { key: _.uniqueId("eosc-main-header-li") },
                    this.props.name,
                    " ",
                    this.props.surname),
                React.createElement("li", { key: _.uniqueId("eosc-main-header-li"), id: "logout-btn" },
                    React.createElement("a", { href: logoutBtnConfig.url }, _.upperFirst(logoutBtnConfig.label))))
            : React.createElement("li", { key: _.uniqueId("eosc-main-header-li"), id: "logout-btn" },
                React.createElement("a", { href: loginBtnConfig.url }, _.upperFirst(loginBtnConfig.label)));
        var currentUrl = location.protocol + '//' + location.host + location.pathname;
        return (React.createElement("nav", { className: "top " + (environment.production ? "" : "demo") },
            React.createElement("div", { className: "container" },
                React.createElement("ul", { className: "right-inks" },
                    navBtnsConfig
                        .filter(function (btn) { return btn.label !== "login" && btn.label !== "logout"; })
                        .map(function (btn) { return React.createElement("li", { key: _.uniqueId("eosc-main-header-li") },
                        React.createElement("a", { className: currentUrl === btn.url ? "acive" : "", href: btn.url }, _.upperFirst(btn.label))); }),
                    auth))));
    };
    return EoscMainHeader;
}(Component));
export { EoscMainHeader };
var eoscMainHeader = document.getElementsByTagName("eosc-main-header")[0];
render(React.createElement(EoscMainHeader, { name: eoscMainHeader.getAttribute("name"), surname: eoscMainHeader.getAttribute("surname") }), eoscMainHeader);
