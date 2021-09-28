import {allValidCallbacks, runFirstCallback} from "../lib/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {IEoscMainHeader} from "./main-header";
import {environment} from "../env/env";
import Cookies from "js-cookie";
import uniqueId from "lodash-es/uniqueId";
import upperFirst from "lodash-es/upperFirst";

const AUTOLOGIN_COOKIE_NAME = "_eosc_common_autologin";
const LOGIN_ATTEMPT_COOKIE_NAME = "_eosc_common_login_attempt";
const LOGOUT_ATTEMPT_COOKIE_NAME = "_eosc_common_logout_attempt";
const AUTOLOGIN_COOKIE_LIFE_IN_MS = 60 * 60 * 1000;
import globalConfig from 'react-global-configuration';

export function autoLogin(props: IEoscMainHeader) {
  const isLoggedIn = !!props.username && props.username.trim() !== "";
  const setAutoLoginCookie = !!Cookies.get(LOGIN_ATTEMPT_COOKIE_NAME) && isLoggedIn;
  if (setAutoLoginCookie) {
    Cookies.remove(LOGIN_ATTEMPT_COOKIE_NAME, {domain: location.hostname});
    globalConfig.get("autoLoginDomains")
      .map((domain: string) => ({
        expires: new Date(new Date().getTime() + AUTOLOGIN_COOKIE_LIFE_IN_MS),
        domain,
        secure: environment.production,
        sameSite: "strict"
      }))
      .forEach((cookieOptions: Cookies.CookieAttributes) => Cookies.set(AUTOLOGIN_COOKIE_NAME, AUTOLOGIN_COOKIE_NAME, cookieOptions));
    return;
  }

  const removeAutoLoginCookie = !!Cookies.get(LOGIN_ATTEMPT_COOKIE_NAME) && !isLoggedIn;
  if (removeAutoLoginCookie) {
    Cookies.remove(LOGIN_ATTEMPT_COOKIE_NAME, {domain: location.hostname, secure: environment.production, sameSite: "strict"});
    globalConfig.get("autoLoginDomains")
      .forEach((domain: string) => Cookies.remove(AUTOLOGIN_COOKIE_NAME, {domain, secure: environment.production, sameSite: "strict"}));
    return;
  }

  const shouldSkipAutoLogin = !Cookies.get(AUTOLOGIN_COOKIE_NAME) && !isLoggedIn
    || !!Cookies.get(LOGOUT_ATTEMPT_COOKIE_NAME)
    || isLoggedIn;
  if (shouldSkipAutoLogin) {
    globalConfig.get("autoLoginDomains")
      .forEach((domain: string) => Cookies.remove(LOGOUT_ATTEMPT_COOKIE_NAME, {domain, secure: environment.production, sameSite: "strict"}));
    return;
  }

  tryLogin(props);
}

export function tryLogin(props: IEoscMainHeader) {
  Cookies.set(
    LOGIN_ATTEMPT_COOKIE_NAME,
    LOGIN_ATTEMPT_COOKIE_NAME,
    {
      domain: location.hostname,
      expires: new Date(new Date().getTime() + AUTOLOGIN_COOKIE_LIFE_IN_MS),
      secure: environment.production,
      sameSite: "strict"
    }
  );

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
        className={(btn.url).includes(location.hostname)  ? "active" : ""}
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
                  Cookies.remove(AUTOLOGIN_COOKIE_NAME, {domain, secure: environment.production, sameSite: "strict"});
                  Cookies.set(LOGOUT_ATTEMPT_COOKIE_NAME, LOGOUT_ATTEMPT_COOKIE_NAME, {domain, secure: environment.production, sameSite: "strict"});
                });
              logoutCallback(event);
            }}
            data-e2e={"logout"}
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
        onClick={(event) => {
          Cookies.set(
            LOGIN_ATTEMPT_COOKIE_NAME,
            LOGIN_ATTEMPT_COOKIE_NAME,
            {
              domain: location.hostname,
              expires: new Date(new Date().getTime() + AUTOLOGIN_COOKIE_LIFE_IN_MS),
              sameSite: "strict",
              secure: environment.production
            }
          );
          loginCallback(event);
        }}
      >
        {upperFirst(loginBtnConfig.label)}
      </a>
    </strong>
  </li>;
}
