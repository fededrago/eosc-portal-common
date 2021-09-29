import {PureComponent} from "react";
import uniqueId from "lodash-es/uniqueId";

export class EoscMainHeaderBtn extends PureComponent {
  render() {
    return (
      <li key={uniqueId("eosc-main-header-li")}>
        <a
          className={(this.props.url).includes(location.hostname)  ? "active" : ""}
          href={this.props.url}
        >
          {this.props.label}
        </a>
      </li>
    )
  }
}