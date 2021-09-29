import {environment} from "../../env/env";
import uniqueId from "lodash-es/uniqueId";

export function EoscMainFooterCols() {
  return (
    <div className="row">
      {
        environment.mainFooterConfig.cols
          .map(col => {
            return (
              <div key={uniqueId("main-footer-col")} className="col-md">
                <ul>
                  <li key={uniqueId("eosc-main-footer-li")}>
                    <div className="title">
                      {!!col.url ? <a href={col.url}>{col.label}</a> : col.label}
                    </div>
                  </li>
                  {
                    !!col.navBtns && col.navBtns.length > 0
                      ? col.navBtns
                        .map(btn => {
                          return (
                            <li className="mb-1" key={uniqueId("eosc-main-footer-li")}>
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