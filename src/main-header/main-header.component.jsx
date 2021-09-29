import React, {PureComponent} from "react";
import {environment} from "../../env/env";
import {allValidCallbacks, renderAll} from "../../lib/utils";
import {rwdHOC} from "../../lib/rwd.hoc";
import {EoscMainHeaderBtn} from "./main-header-btn.component";
import {tryAutologin} from "./auto-login.utils";
import {EoscMainHeaderLogoutBtn} from "./main-header-logout-btn.component";
import {EoscMainHeaderLoginBtn} from "./main-header-login-btn.component";

const valid = (props) => {
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

/**
 * IMPORTANT!!! By default is on
 * @param prop
 * @returns {boolean}
 */
const isAutoLoginOn = (prop) => prop === "true" || prop === "1" || prop === 1 || prop === undefined;

export class EoscMainHeader extends PureComponent {
  constructor(props) {
    super(props);
    valid(props);

    /**
     * IMPORTANT!!! By default is on
     */
    if (isAutoLoginOn(props.autoLogin)) { tryAutologin(props); }
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

renderAll(
  document.getElementsByTagName("eosc-common-main-header"),
  rwdHOC(EoscMainHeader, ["lg", "xl"])
)
