import React, {PureComponent} from "react";
import {environment} from "../env/env";
import {renderAll} from "../lib/utils";
import {rwdHOC} from "../lib/rwd.hoc";
import {autoLogin, getAuthBtns, getBtns, valid} from "./main-header.utils";

export interface IEoscMainHeader {
  username: string;

  autoLogin?: 'true' | 'false' | '1' | '0' | undefined;

  loginUrl?: string;
  logoutUrl?: string;

  "(onLogin)"?: string;
  "(onLogout)"?: string;
}

export class EoscMainHeader extends PureComponent<IEoscMainHeader> {
  constructor(props: IEoscMainHeader) {
    super(props);
    valid(props);
    const shouldAutoLogin = props.autoLogin === 'true'
      || props.autoLogin === '1'
      || props.autoLogin === undefined;
    if (shouldAutoLogin) {
      autoLogin(props);
    }
  }

  render() {
    const navBtnsConfig = environment.mainHeaderConfig as any;
    return (
      <nav className={`top ${environment.production ? "" : "demo"}`}>
        <div className="container">
          <ul className="right-links">
            {
              getBtns(
                navBtnsConfig,
                (config) => config.label.toLowerCase() !== "login" && config.label.toLowerCase() !== "logout"
              )
            }
            {
              getAuthBtns(
                navBtnsConfig.find((btn: any) => btn.label.toLowerCase() === "login"),
                navBtnsConfig.find((btn: any) => btn.label.toLowerCase() === "logout"),
                this.props
              )
            }
          </ul>
        </div>
      </nav>
    );
  }
}

renderAll(
  document.getElementsByTagName("eosc-common-main-header"),
  rwdHOC(EoscMainHeader, ["lg", "xl"])
)
