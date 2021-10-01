import {PureComponent} from "react";
import {environment} from "../../env/env";
import uniqueId from "lodash-es/uniqueId";
import {EoscMainFooterCols} from "./main-footer-cols.component";
import {EoscMainFooterLogoBar} from "./main-footer-logo-bar.component";
import {Render} from "../../lib/core";

@Render({
  selector: 'eosc-common-main-footer'
})
export class EoscMainFooter extends PureComponent {
  render() {
    return (
      <footer className={`footer pt-3 pb-3 ${environment.production ? "" : "demo"}`}>
        <div className="container">
          <a className="arrow-up" href="#"/>
          <EoscMainFooterLogoBar/>
          <hr className="mb-4"/>
          <EoscMainFooterCols/>
          <div className="row mt-4 socials">
            <div className="col-md-6">
              {
                environment.mainFooterConfig.socials
                  .map(social => {
                    return (
                      <a key={uniqueId("main-footer-social-icon")} className={social.class}
                         href={social.url}/>
                    );
                  })
              }
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
