import {PureComponent} from "react";
import {runFirstCallback} from "../../lib/utils";
import uniqueId from "lodash-es/uniqueId";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {environment} from "../../env/env";
import Cookies from "js-cookie";
import upperFirst from "lodash-es/upperFirst";
import {AUTOLOGIN_COOKIE_NAME, getCookieConfig, LOGOUT_ATTEMPT_COOKIE_NAME} from "./auto-login.utils";

export class EoscMainHeaderLogoutBtn extends PureComponent {
  render() {
    return (
      <>
        <li key={uniqueId("eosc-main-header-li")}>
          <FontAwesomeIcon icon={faUser}/>
          {this.props.username}
        </li>
        <li key={uniqueId("eosc-main-header-li")} id="logout-btn">
          <strong>
            <a
              href={!!this.props.logoutUrl ? this.props.logoutUrl : "#!"}
              onClick={(event) => {
                Cookies.set(LOGOUT_ATTEMPT_COOKIE_NAME, LOGOUT_ATTEMPT_COOKIE_NAME, getCookieConfig(location.hostname));
                environment.defaultConfiguration.autoLoginDomains
                  .forEach(domain => Cookies.remove(AUTOLOGIN_COOKIE_NAME, getCookieConfig(domain)));
                runFirstCallback(event, this.props["(onLogout)"]);
              }}
              data-e2e={"logout"}
            >
              {upperFirst(this.props.label)}
            </a>
          </strong>
        </li>
      </>
    );
  }
}