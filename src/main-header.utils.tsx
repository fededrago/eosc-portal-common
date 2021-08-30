import * as _ from "lodash";
import {allValidCallbacks, deleteCookie, getCookie, getCurrentUrl, runFirstCallback, setCookie} from "../lib/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {IEoscMainHeader} from "./main-header";
import {environment} from "../env/env";

const AUTO_LOGIN_COOKIE_NAME = "_eosc_common_auto_login";
const AUTO_LOGIN_COOKIE_LIFE_IN_MS = 8 * 60 * 1000;
export function autoLogin(props: IEoscMainHeader) {
  const isLoggedIn = !!props.username && props.username.trim() !== "";
  const hasAutologinCookie = !!getCookie(AUTO_LOGIN_COOKIE_NAME);

  if (!hasAutologinCookie && !isLoggedIn) {
    return;
  }

  if (hasAutologinCookie && !isLoggedIn) {
    tryLogin(props);
    return;
  }

  environment.defaultConfiguration.autoLoginDomains
    .forEach(domain => setCookie(AUTO_LOGIN_COOKIE_NAME, AUTO_LOGIN_COOKIE_LIFE_IN_MS, domain));
}

export function tryLogin(props: IEoscMainHeader) {
  if (props.loginUrl) {
    window.location.href = props.loginUrl;
    return;
  }

  if (props["(onLogin)"]) {
    runFirstCallback(null, props["(onLogin)"]);
    return;
  }

  console.warn("Login attempt goes wrong. Your session may expired.");
}

export function valid(props: IEoscMainHeader) {
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

export function getBtns(navBtnsConfig: any, filter = (config: any) => true) {
  return navBtnsConfig
    .filter((btn: any) => filter(btn))
    .map((btn: any) => <li key={_.uniqueId("eosc-main-header-li")}>
      <a
        className={getCurrentUrl() === btn.url ? "active" : ""}
        href={btn.url}
      >
        {btn.label}
      </a>
    </li>)
}

export function getAuthBtns(loginBtnConfig: any, logoutBtnConfig: any, props: IEoscMainHeader) {
  function getOptionalUrl(url: string) {
    return !!url ? url : "#!";
  }

  const isLoggedIn = !!props.username && props.username.trim() !== "";
  if (isLoggedIn) {
    const logoutCallback = !!props["(onLogout)"]
      ? (event: Event) => runFirstCallback(event, props["(onLogout)"])
      : (...args: any) => {}
    return <>
      <li key={_.uniqueId("eosc-main-header-li")}>
        <FontAwesomeIcon icon={faUser}/>
        {props.username}
      </li>
      <li key={_.uniqueId("eosc-main-header-li")} id="logout-btn">
        <strong>
          <a
            href={getOptionalUrl(props.logoutUrl)}
            onClick={ (event) => {
              logoutCallback(event);


              environment.defaultConfiguration.autoLoginDomains
                .forEach(domain => deleteCookie(AUTO_LOGIN_COOKIE_NAME, domain));
            } }
          >
            {_.upperFirst(logoutBtnConfig.label)}
          </a>
        </strong>
      </li>
    </>;
  }

  const loginCallback = !!props["(onLogin)"]
    ? (event: Event) => runFirstCallback(event, props["(onLogin)"])
    : (...args: any) => {}
  return <li key={_.uniqueId("eosc-main-header-li")} id="login-btn">
    <strong>
      <a
        href={getOptionalUrl(props.loginUrl)}
        onClick={ (event) => loginCallback(event) }
      >
        {_.upperFirst(loginBtnConfig.label)}
      </a>
    </strong>
  </li>;
}
