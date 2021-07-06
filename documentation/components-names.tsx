import React, { Component } from "react";
import {render} from "react-dom";
import * as componentsDocsInfo from "./components-docs-info";
import * as _ from "lodash";
import {ComponentDocInfo} from "./component-doc-info.interface";

// export class EoscComponentsNames extends Component<{componentsDocs: ComponentDocInfo[]}> {
//   render() {
//     const componentsNamesList = this.props.componentsDocs.map(component => () => {
//       return (
//         <li><a href={"#" + _.kebabCase(component.name)}>{component.name}</a></li>
//       );
//     });
//     return (
//       <>
//         <li>Components</li>
//           {componentsNamesList}
//       </>
//     );
//   }
// }
//
// const EoscComponentsDocsNamesElement = document.getElementsByTagName("eosc-components-docs-names")[0];
// render(
//   <EoscComponentsNames componentsDocs={((componentsDocsInfo as any).default as ComponentDocInfo[])} />,
//   EoscComponentsDocsNamesElement
// );
