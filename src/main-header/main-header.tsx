import * as _ from 'lodash';
import React, { Component } from "react";
import {render} from "react-dom";
import {environment} from "../../env/env";

export class EoscMainHeader extends Component<{name: string, surname: string}> {
  render() {
    const navBtnsConfig = environment.mainHeaderConfig as any;
    const loginBtnConfig = navBtnsConfig.find((btn: any) => btn.label === "login");
    const logoutBtnConfig = navBtnsConfig.find((btn: any) => btn.label === "logout");
    const auth = !!this.props.name && !!this.props.surname
      ? <>
        <li key={_.uniqueId("eosc-main-header-li")}>{this.props.name} {this.props.surname}</li>
        <li key={_.uniqueId("eosc-main-header-li")} id="logout-btn"><a href={logoutBtnConfig.url}>{_.upperFirst(logoutBtnConfig.label)}</a></li>
      </>
      : <li key={_.uniqueId("eosc-main-header-li")} id={"logout-btn"}><a href={ loginBtnConfig.url }>{ _.upperFirst(loginBtnConfig.label) }</a></li>;
    const currentUrl = location.protocol + '//' + location.host + location.pathname;

    return (
      <nav className={`top ${environment.production ? "" : "demo"}`}>
        <div className="container">
          <ul className="right-inks">
            {
              navBtnsConfig
                .filter((btn: any) => btn.label !== "login" && btn.label !== "logout")
                .map((btn: any) => <li key={_.uniqueId("eosc-main-header-li")}>
                  <a
                    className={currentUrl === btn.url ? "acive" : ""}
                    href={ btn.url }
                  >
                    { _.upperFirst(btn.label) }
                  </a>
                </li>)
            }
            { auth }
          </ul>
        </div>
      </nav>
    );
  }
}

const eoscMainHeader = document.getElementsByTagName("eosc-main-header")[0];
render(
  <EoscMainHeader
    name={ eoscMainHeader.getAttribute("name") }
    surname={ eoscMainHeader.getAttribute("surname") }
  />,
  eoscMainHeader
);
