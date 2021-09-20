import {allValidCallbacks, getCurrentUrl, runFirstCallback} from "../lib/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {IEoscMainHeader} from "./main-header";
import {environment} from "../env/env";
import Cookies from "js-cookie";
import uniqueId from "lodash-es/uniqueId";
import upperFirst from "lodash-es/upperFirst";
const AUTO_LOGIN_COOKIE_NAME = "_eosc_common_auto_login";
const LOGOUT_EVENT_COOKIE_NAME = "_eosc_common_logout_event";
const AUTO_LOGIN_COOKIE_LIFE_IN_MS = 8 * 60 * 1000;

export function autoLogin(props: IEoscMainHeader) {
  const isLoggedIn = !!props.username && props.username.trim() !== "";
  const shouldSkipAutoLogin = !Cookies.get(AUTO_LOGIN_COOKIE_NAME) && !isLoggedIn || !!Cookies.get(LOGOUT_EVENT_COOKIE_NAME);
  if (shouldSkipAutoLogin) {
    environment.defaultConfiguration.autoLoginDomains
      .forEach(domain => Cookies.remove(LOGOUT_EVENT_COOKIE_NAME, {domain}));
    return;
  }

  const shouldAutoLogin = !!Cookies.get(AUTO_LOGIN_COOKIE_NAME) && !isLoggedIn;
  if (shouldAutoLogin) {
    tryLogin(props);
    return;
  }

  // set auto login cookie for configuration domains
  environment.defaultConfiguration.autoLoginDomains
    .forEach(domain => Cookies.set(AUTO_LOGIN_COOKIE_NAME, AUTO_LOGIN_COOKIE_NAME, {
      expires: AUTO_LOGIN_COOKIE_LIFE_IN_MS,
      path: "/",
      domain
    }));
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
    .map((btn: any) => <li key={uniqueId("eosc-main-header-li")}>
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
      : (...args: any) => {
      }
    return <>
      <li key={uniqueId("eosc-main-header-li")}>
        <FontAwesomeIcon icon={faUser}/>
        {props.username}
      </li>
      <li key={uniqueId("eosc-main-header-li")} id="logout-btn">
        <strong>
          <a
            href={getOptionalUrl(props.logoutUrl)}
            onClick={(event) => {
              environment.defaultConfiguration.autoLoginDomains
                .forEach(domain => {
                  Cookies.remove(AUTO_LOGIN_COOKIE_NAME, {domain});
                  Cookies.set(LOGOUT_EVENT_COOKIE_NAME, LOGOUT_EVENT_COOKIE_NAME, {domain, path: "/"});
                });
              logoutCallback(event);
            }}
          >
            {upperFirst(logoutBtnConfig.label)}
          </a>
        </strong>
      </li>
    </>;
  }

  const loginCallback = !!props["(onLogin)"]
    ? (event: Event) => runFirstCallback(event, props["(onLogin)"])
    : (...args: any) => {
    }
  return <li key={uniqueId("eosc-main-header-li")} id="login-btn">
    <strong>
      <a
        href={getOptionalUrl(props.loginUrl)}
        onClick={(event) => loginCallback(event)}
      >
        {upperFirst(loginBtnConfig.label)}
      </a>
    </strong>
  </li>;
}
