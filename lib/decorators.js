// https://dev.to/dpksh/learn-javascript-class-decorators-in-5-minutes-4em7
// TODO: Add decorators interpretation to babel
// // .babelrc.json
// {
//   "presets": ["@babel/preset-env"],
//   "plugins": [
//     "@babel/plugin-proposal-decorators",
//   ]
// }

import uniqueId from "lodash-es/uniqueId";
import {render} from "react-dom";
import {fetchPropertiesAsCamelCaseFrom} from "./core";
import {rwdHOC} from "./rwd.hoc";
import {GRID_KEYS} from "./configuration";

/**
 *
 * @param {String} params.selector HTML DOM Element tag to be replaced with Component
 * @param {Array.<GRID_KEYS>} [params.rwd] Sizes of gri when component will be displayed. By default all
 * @constructor
 */
export function Render(params) {
  return function(WrappedComponent) {
    const elementsToBeReplaced = document.getElementsByTagName(params.selector);
    const displayOnGrid = !!params.rwd && params.rwd.length > 0
      ? params.rwd
      : GRID_KEYS;
    Array.of(elementsToBeReplaced)
      .forEach(element => _render(element, rwdHOC(WrappedComponent, displayOnGrid)));
  }
}

/**
 * @param {HTMLCollectionOf<Element> | Element[]} element
 * @param {{ new(props: T): Component<T, S, any> } | { (props: T): JSX.Element }} WrappedComponent
 * @return void
 */
function _render(element, WrappedComponent) {
  element.classList.add("eosc-common");
  const properties = fetchPropertiesAsCamelCaseFrom(el);
  const UID = uniqueId(element.tagName + "-" + WrappedComponent.name + "-");
  render(<WrappedComponent key={UID} { ...properties } />, element);
}