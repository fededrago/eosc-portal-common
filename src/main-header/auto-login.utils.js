import Cookies from "js-cookie";
import globalConfig from "react-global-configuration";
import {environment} from "../../env/env";
import {runFirstCallback} from "../../lib/utils";

export const AUTOLOGIN_COOKIE_NAME = "_eosc_common_autologin";
export const LOGIN_ATTEMPT_COOKIE_NAME = "_eosc_common_login_attempt";
export const LOGOUT_ATTEMPT_COOKIE_NAME = "_eosc_common_logout_attempt";

/**
 * IMPORTANT!!! The cookies life is equal to AAI Session Life Time
 * @type {number}
 */
const AUTOLOGIN_COOKIE_LIFE_OFFSET_MS = 60 * 1000;
export const AUTOLOGIN_COOKIE_LIFE_MS = 60 * 60 * 1000 - AUTOLOGIN_COOKIE_LIFE_OFFSET_MS;

export function tryAutologin(props) {
  const isLoggedIn = !!props.username && props.username.trim() !== "";
  if (
    setAutologinCookie(isLoggedIn)
    || removeAutologinCookie(isLoggedIn)
    || shouldSkipAutologin(isLoggedIn)
  ) { return; }

  tryLogin(props);
}

export function getCookieConfig(domain) {
  return {
    domain,
    expires: new Date(new Date().getTime() + AUTOLOGIN_COOKIE_LIFE_MS),
    secure: environment.production,
    sameSite: "strict"
  };
}

function setAutologinCookie(isLoggedIn) {
  const setAutologinCookie = !!Cookies.get(LOGIN_ATTEMPT_COOKIE_NAME) && isLoggedIn;
  if (setAutologinCookie) {
    Cookies.remove(LOGIN_ATTEMPT_COOKIE_NAME, {domain: location.hostname});
    globalConfig.get("autoLoginDomains")
      .forEach(domain => Cookies.set(AUTOLOGIN_COOKIE_NAME, AUTOLOGIN_COOKIE_NAME, getCookieConfig(domain)));
  }
  return setAutologinCookie;
}

function removeAutologinCookie() {
  const removeAutologinCookie = !!Cookies.get(LOGIN_ATTEMPT_COOKIE_NAME) && !isLoggedIn;
  if (removeAutologinCookie) {
    Cookies.remove(LOGIN_ATTEMPT_COOKIE_NAME, getCookieConfig(location.hostname));
    globalConfig.get("autoLoginDomains")
      .forEach(domain => Cookies.remove(AUTOLOGIN_COOKIE_NAME, getCookieConfig(domain)));
  }
  return removeAutologinCookie;
}

function shouldSkipAutologin(isLoggedIn) {
  const shouldSkipAutologin = !Cookies.get(AUTOLOGIN_COOKIE_NAME) && !isLoggedIn
    || !!Cookies.get(LOGOUT_ATTEMPT_COOKIE_NAME)
    || isLoggedIn;
  if (shouldSkipAutologin) {
    globalConfig.get("autoLoginDomains")
      .forEach(domain => Cookies.remove(LOGOUT_ATTEMPT_COOKIE_NAME, {domain, secure: environment.production, sameSite: "strict"}));
  }
  return shouldSkipAutologin;
}

function tryLogin(props) {
  Cookies.set(LOGIN_ATTEMPT_COOKIE_NAME, LOGIN_ATTEMPT_COOKIE_NAME, getCookieConfig(location.hostname));

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



