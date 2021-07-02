import * as _ from 'lodash';
import React, { Component } from "react";
import {render} from "react-dom";
import {environment} from "../../env/env";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class EoscMainHeader extends Component<{name: string, surname: string}> {
  render() {
    const navBtnsConfig = environment.mainHeaderConfig as any;
    const loginBtnConfig = navBtnsConfig.find((btn: any) => btn.label.toLowerCase() === "login");
    const logoutBtnConfig = navBtnsConfig.find((btn: any) => btn.label.toLowerCase() === "logout");
    const auth = !!this.props.name && !!this.props.surname
      ? <>
          <li key={_.uniqueId("eosc-main-header-li")}>
            <FontAwesomeIcon icon={faUser}/>
            {this.props.name} {this.props.surname}
          </li>
          <li key={_.uniqueId("eosc-main-header-li")} id="logout-btn">
            <strong><a href={logoutBtnConfig.url}>{_.upperFirst(logoutBtnConfig.label)}</a></strong>
          </li>
        </>
      : <li key={_.uniqueId("eosc-main-header-li")} id="logout-btn">
          <strong><a href={ loginBtnConfig.url }>{ _.upperFirst(loginBtnConfig.label) }</a></strong>
        </li>;
    const currentUrl = location.protocol + '//' + location.host + location.pathname;
    return (
      <nav className={`top ${environment.production ? "" : "demo"}`}>
        <div className="container">
          <ul className="right-inks">
            {
              navBtnsConfig
                .filter((btn: any) => btn.label.toLowerCase() !== "login" && btn.label.toLowerCase() !== "logout")
                .map((btn: any) => <li key={_.uniqueId("eosc-main-header-li")}>
                  <a
                    className={currentUrl === btn.url ? "active" : ""}
                    href={ btn.url }
                  >
                    { btn.label }
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

const eoscMainHeaders = document.getElementsByTagName("eosc-main-header");
Array.from(eoscMainHeaders)
  .map(eoscMainHeader => render(
    <EoscMainHeader
      key={ _.uniqueId("eosc-main-header") }
      name={ eoscMainHeader.getAttribute("name") }
      surname={ eoscMainHeader.getAttribute("surname") }
    />,
    eoscMainHeader
  ));
