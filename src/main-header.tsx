import * as _ from 'lodash';
import React, {Component, PureComponent} from "react";
import {environment} from "../env/env";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {allValidCallbacks, renderAll, runFirstCallback} from "../lib/utils";
import {rwdHOC} from "../lib/rwd.hoc";

interface IEoscMainHeader {
  username: string;

  loginUrl?: string;
  logoutUrl?: string;

  "(onLogin)"?: string;
  "(onLogout)"?: string;
}

export class EoscMainHeader extends PureComponent<IEoscMainHeader> {
  constructor(props: IEoscMainHeader) {
    super(props);

    if (!props.loginUrl && !props["(onLogin)"]) {
      throw Error("At least one of the params needs to be set: loginUrl or (onLogin)");
    }

    if (!props.logoutUrl && !props["(onLogout)"]) {
      throw Error("At least one of the params needs to be set: logoutUrl or (onLogout)");
    }

    if (!!props["(onLogin)"] && !allValidCallbacks(props["(onLogin)"])) {
      throw Error("onLogin property is not a function");
    }

    if (!!props["(onLogout)"] && !allValidCallbacks(props["(onLogout)"])) {
      throw Error("onLogout property is not a function");
    }
  }

  render() {
    const navBtnsConfig = environment.mainHeaderConfig as any;
    return (
      <nav className={`top ${environment.production ? "" : "demo"}`}>
        <div className="container">
          <ul className="right-inks">
            {
              this._getBtns(
                navBtnsConfig,
                (config) => config.label.toLowerCase() !== "login" && config.label.toLowerCase() !== "logout"
              )
            }
            {
              this._getAuthBtns(
                navBtnsConfig.find((btn: any) => btn.label.toLowerCase() === "login"),
                navBtnsConfig.find((btn: any) => btn.label.toLowerCase() === "logout")
              )
            }
          </ul>
        </div>
      </nav>
    );
  }

  private static _getCurrentUrl = () => location.protocol + '//' + location.host + location.pathname;

  private _getBtns(navBtnsConfig: any, filter = (config: any) => true) {
    return navBtnsConfig
      .filter((btn: any) => filter(btn))
      .map((btn: any) => <li key={_.uniqueId("eosc-main-header-li")}>
        <a
          className={EoscMainHeader._getCurrentUrl() === btn.url ? "active" : ""}
          href={btn.url}
        >
          {btn.label}
        </a>
      </li>)
  }

  private _getAuthBtns(loginBtnConfig: any, logoutBtnConfig: any) {
    const isLoggedIn = !!this.props.username;
    if (isLoggedIn) {
      const logoutCallback = !!this.props["(onLogout)"]
        ? (event: Event) => runFirstCallback(event, this.props["(onLogout)"])
        : (...args: any) => {}
      return <>
        <li key={_.uniqueId("eosc-main-header-li")}>
          <FontAwesomeIcon icon={faUser}/>
          {this.props.username}
        </li>
        <li key={_.uniqueId("eosc-main-header-li")} id="logout-btn">
          <strong>
            <a
              href={EoscMainHeader._getOptionalUrl(this.props.logoutUrl)}
              onClick={ (event) => logoutCallback(event) }
            >
              {_.upperFirst(logoutBtnConfig.label)}
            </a>
          </strong>
        </li>
      </>;
    }

    const loginCallback = !!this.props["(onLogin)"]
      ? (event: Event) => runFirstCallback(event, this.props["(onLogin)"])
      : (...args: any) => {}
    return <li key={_.uniqueId("eosc-main-header-li")} id="login-btn">
      <strong>
        <a
          href={EoscMainHeader._getOptionalUrl(this.props.loginUrl)}
          onClick={ (event) => loginCallback(event) }
        >
          {_.upperFirst(loginBtnConfig.label)}
        </a>
      </strong>
    </li>;
  }

  private static _getOptionalUrl(url: string) {
    return !!url ? url : "#!";
  }
}

renderAll(
  document.getElementsByTagName("eosc-common-main-header"),
  rwdHOC(EoscMainHeader, ["lg", "xl"])
)
