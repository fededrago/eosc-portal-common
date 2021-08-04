import React, {PureComponent} from "react";
import {renderAll} from "../lib/utils";
import {environment} from "../env/env";

class EuInformation extends PureComponent {
  render() {
    return (
      <div className={"eu-information p-4"}>
        <div className={"container"}>
          <p className={"mb-1"}>
            { environment.euInformationConfig.description }
            &nbsp;<a href={ environment.euInformationConfig.btn.url }>{ environment.euInformationConfig.btn.label }</a>
          </p>
        </div>
      </div>
    );
  }
}

renderAll(
  document.getElementsByTagName('eosc-common-eu-information'),
  EuInformation
);
