import React, {Component} from "react";
import {environment} from "../env/env";
import {render} from "react-dom";
import * as _ from "lodash";

interface ICol {
  label: string;
  url?: string;
  navBtns: { label: string, url?: string }[]
}

interface ISocialIcon {
  class: string;
  url: string;
}

export class EoscMainFooter extends Component<{}> {
  render() {
    return (
      <footer className="footer pt-3 pb-3">
        <div className="container">
          <a className="arrow-up" href="#"/>
          {EoscMainFooter._getLogoBar()}
          <hr className="mb-4"/>
          {EoscMainFooter._getCols()}
          <div className="row mt-4 socials">
            <div className="col-md-6">
              {
                (environment.mainFooterConfig.socials as ISocialIcon[])
                  .map(social => {
                    return (
                      <a className={social.class} href={social.url}/>
                    );
                  })
              }
            </div>
          </div>
        </div>
      </footer>
    );
  }

  private static _getLogoBar() {
    return (
      <div className="row h-100">
        <div className="col-md-3 my-auto">
          <a className="eosc-logo-mono d-block" href="https://eosc-portal.eu">
            <img
              src="https://marketplace.eosc-portal.eu/packs/media/images/eosc-logo-mono-eceb9ad05d4123200a20b9640278973f.png"/>
          </a>
        </div>
        <div className="col-md-9 my-auto copyright">
          <span className="copy-text">
            Copyright 2020 - All rights reserved
          </span>
          <a className="ml-4 text-uppercase" href="https://eosc-portal.eu/privacy-policy-summary">
            privacy policy
          </a>
        </div>
      </div>
    );
  }

  private static _getCols() {
    return (
      <div className="row">
        {
          (environment.mainFooterConfig.cols as ICol[])
            .map(col => {
              return (
                <div className="col-md">
                  <ul>
                    <li key={_.uniqueId("eosc-main-footer-li")}>
                      <div className="title">
                        {!!col.url ? <a href={col.url}>{col.label}</a> : col.label}
                      </div>
                    </li>
                    {
                      !!col.navBtns && col.navBtns.length > 0
                        ? col.navBtns
                          .map(btn => {
                            return (
                              <li className="mb-1" key={_.uniqueId("eosc-main-footer-li")}>
                                {!!btn.url ? <a href={btn.url}>{btn.label}</a> : btn.label}
                              </li>
                            );
                          })
                        : <></>
                    }
                  </ul>
                </div>
              );
            })
        }
      </div>
    );
  }
}

const eoscMainFooters = document.getElementsByTagName('eosc-common-main-footer');
Array.from(eoscMainFooters)
  .map(footer => {
    render(
      <EoscMainFooter
        key={_.uniqueId("eosc-main-footer")}
      />,
      footer
    )
  })