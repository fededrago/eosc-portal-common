import React, {PureComponent} from "react";
import {environment} from "../env/env";
import {Render} from "../lib/decorators";

@Render({
  selector: 'eosc-common-eu-information'
})
class EuInformationComponent extends PureComponent {
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
