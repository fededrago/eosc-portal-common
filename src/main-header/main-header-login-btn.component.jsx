import {PureComponent} from "react";
import uniqueId from "lodash-es/uniqueId";
import Cookies from "js-cookie";
import upperFirst from "lodash-es/upperFirst";
import {runFirstCallback} from "../../lib/utils";
import {getCookieConfig, LOGIN_ATTEMPT_COOKIE_NAME} from "./auto-login.utils";

export class EoscMainHeaderLoginBtn extends PureComponent {
  render() {
    return (
      <li key={uniqueId("eosc-main-header-li")} id="login-btn">
        <strong>
          <a
            href={!!this.props.loginUrl ? this.props.loginUrl : "#!"}
            onClick={(event) => {
              Cookies.set(LOGIN_ATTEMPT_COOKIE_NAME, LOGIN_ATTEMPT_COOKIE_NAME, getCookieConfig(location.hostname));
              runFirstCallback(event, this.props["(onLogin)"]);
            }}
          >
            {upperFirst(this.props.label)}
          </a>
        </strong>
      </li>
    )
  }
}