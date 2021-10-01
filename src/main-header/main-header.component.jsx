import React, {PureComponent} from "react";
import {environment} from "../../env/env";
import {EoscMainHeaderBtn} from "./main-header-btn.component";
import {tryAutologin} from "./auto-login.utils";
import {EoscMainHeaderLogoutBtn} from "./main-header-logout-btn.component";
import {EoscMainHeaderLoginBtn} from "./main-header-login-btn.component";
import {allValidScripts, Render} from "../../lib/core";

const valid = (props) => {
  if (!props.loginUrl && !props["(onLogin)"]) {
    throw Error("At least one of the params needs to be set: loginUrl or (onLogin)");
  }

  if (!props.logoutUrl && !props["(onLogout)"]) {
    throw Error("At least one of the params needs to be set: logoutUrl or (onLogout)");
  }

  if (!!props["(onLogin)"] && !allValidScripts(props["(onLogin)"])) {
    throw Error("onLogin property is not a function");
  }

  if (!!props["(onLogout)"] && !allValidScripts(props["(onLogout)"])) {
    throw Error("onLogout property is not a function");
  }
}

/**
 * IMPORTANT!!! By default is on
 * @param prop
 * @returns {boolean}
 */
const isAutoLoginOn = (prop) => prop === "true" || prop === "1" || prop === 1 || prop === undefined;

@Render({
  selector: 'eosc-common-main-header',
  rwd: ["lg", "xl"]
})
export class EoscMainHeader extends PureComponent {
  /**
   * @param {String|""} props.username
   * @param {String} [props.loginUrl]
   * @param {String} [props.logoutUrl]
   * @param {String} [props.(onLogout)] A JS action to be called on logout btn click
   * @param {String} [props.(onLogin)] A JS action to be called on login btn click
   * @param {boolean} [props.autoLogin=undefined] Turn on or off autologin feature
   */
  constructor(props) {
    super(props);
    valid(props);

    /**
     * IMPORTANT!!! By default is on
     */
    if (isAutoLoginOn(props.autoLogin)) {
      tryAutologin(props);
    }
  }

  render() {
    const btns = environment.mainHeaderConfig
      .filter((config) => config.label.toLowerCase() !== "login" && config.label.toLowerCase() !== "logout")
      .map(config => <EoscMainHeaderBtn {...config} />);
    return (
      <nav className={`top ${environment.production ? "" : "demo"}`}>
        <div className="container">
          <ul className="right-links">{btns} {this.getAuthBtn()}</ul>
        </div>
      </nav>
    );
  }

  getAuthBtn() {
    const isLoggedIn = !!this.props.username && this.props.username.trim() !== "";
    return isLoggedIn
      ? <EoscMainHeaderLogoutBtn
        {
          ...{
            ...this.props,
            ...environment.mainHeaderConfig.find(btn => btn.label.toLowerCase() === "logout")
          }
        }
      />
      : <EoscMainHeaderLoginBtn
        {
          ...{
            ...this.props,
            ...environment.mainHeaderConfig.find(btn => btn.label.toLowerCase() === "login")
          }
        }
      />;
  }
}
