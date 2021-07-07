import * as _ from 'lodash';
import React, {Component} from "react";
import {render} from "react-dom";
import {environment} from "../../env/env";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {allValidCallbacks, runFirstCallback} from "../utils";

interface IEoscMainHeader {
  name: string;
  surname: string;

  loginUrl?: string;
  logoutUrl?: string;

  onLogin?: string;
  onLogout?: string;
}

export class EoscMainHeader extends Component<IEoscMainHeader> {
  constructor(props: IEoscMainHeader) {
    super(props);

    if (
      (!!props.name && !props.surname)
      || (!props.name && !!props.surname)
    ) {
      console.warn("To set user as logged in the name and the surname should be non-empty");
    }

    if (!props.loginUrl && !props.onLogin) {
      throw Error("At least one of the params needs to be set: loginUrl or onLogin");
    }

    if (!props.logoutUrl && !props.onLogout) {
      throw Error("At least one of the params needs to be set: logoutUrl or onLogout");
    }

    if (!!props.onLogin && !allValidCallbacks(props.onLogin)) {
      throw Error("onLogin property is not a function");
    }

    if (!!props.onLogout && !allValidCallbacks(props.onLogout)) {
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
    const isLoggedIn = !!this.props.name && !!this.props.surname;
    if (isLoggedIn) {
      const logoutCallback = !!this.props.onLogout
        ? (event: Event) => runFirstCallback(event, this.props.onLogout)
        : (...args: any) => {}
      return <>
        <li key={_.uniqueId("eosc-main-header-li")}>
          <FontAwesomeIcon icon={faUser}/>
          {this.props.name} {this.props.surname}
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

    const loginCallback = !!this.props.onLogin
      ? (event: Event) => runFirstCallback(event, this.props.onLogin)
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
    return !!url ? url : "javascript:void(0);";
  }
}

const eoscMainHeaders = document.getElementsByTagName("eosc-common-main-header");
Array.from(eoscMainHeaders)
  .map(eoscMainHeader => render(
    <EoscMainHeader
      key={_.uniqueId("eosc-common-main-header")}
      name={eoscMainHeader.getAttribute("name")}
      surname={eoscMainHeader.getAttribute("surname")}

      loginUrl={eoscMainHeader.getAttribute("loginUrl")}
      logoutUrl={eoscMainHeader.getAttribute("logoutUrl")}

      onLogin={eoscMainHeader.getAttribute("(onLogin)")}
      onLogout={eoscMainHeader.getAttribute("(onLogout)")}
    />,
    eoscMainHeader
  ));
