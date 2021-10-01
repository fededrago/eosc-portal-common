import uniqueId from "lodash-es/uniqueId";
import {render} from "react-dom";
import {fetchPropertiesAsCamelCaseFrom} from "./core";
import startCase from "lodash-es/startCase";
import {GRID_KEYS} from "./configuration";
import {rwdHOC} from "./rwd.hoc";

////////////////////////////////////////
// CALLBACKS
////////////////////////////////////////

/**
 * Run scripts from the strings
 * @param {object} event
 * @param {string} JSscripts
 * @return void
 */
export const callAll = (event, ...JSscripts) => JSscripts.forEach(script => _call(script, event));

/**
 * Run script from a string
 * @param {string} JSscript
 * @param {object} event
 */
function _call(JSscript, event = {}) {
  _toCallbacks(JSscript)
    .forEach(callback => {
      try {
        callback.includes("$event")
          ? new Function("$event", callback)(event)
          : new Function("{ return " + callback + " };").call(null);
      } catch (e) {
        console.error(`Calling ${callback} on ${event.type} ${event.target} has been crashed`);
        console.error(e);
      }
    });
}

/**
 * Valid statically and split a script to the callbacks
 * @param {string} JSscript
 */
function _toCallbacks(JSscript) {
  let callbacks = [];
  if (isStaticallyValid(JSscript)) {
    callbacks = JSscript
      .split(";")
      .filter(callback => isStaticallyValid(callback));
  }
  return callbacks;
}

/**
 * Valid dynamically (a string can be parsed to a function?)
 * @param {string} JSscripts
 * @return {boolean}
 */
export function allValidScripts(...JSscripts) {
  if (!JSscripts && JSscripts.some(script => !isStaticallyValid(script))) {
    return false;
  }

  return !JSscripts
    .map(script => script.split(";"))
    .reduce((acc, callbacks) => acc = [...acc, ...callbacks], [])
    .filter(callback => isStaticallyValid(callback))
    .some(callback => !isDynamicallyValid(callback));

}

/**
 * Is non empty string
 * @param callback
 * @return {boolean}
 */
const isStaticallyValid = (callback) => !!callback && callback.trim() !== "";
/**
 * Can a string be parsed to a function
 * @param {string} callback
 * @param {object} event
 * @return {boolean}
 */
const isDynamicallyValid = (callback, event = {}) => {
  try {
    return !!(
      callback.includes("$event")
        ? new Function("$event", callback)
        : new Function("{ return " + callback + " };")
    );
  } catch (e) {
    console.error(`Calling ${callback} on ${event.type} ${event.target} has been crashed`);
    console.error(e);

    return false;
  }
}

////////////////////////////////////////
// PARSING
////////////////////////////////////////

/**
 * Fetch snake case attributes as with camel case names
 * @param {Element} element
 * @return {{[camelCaseProperty: string]: any}}
 */
export const fetchPropertiesAsCamelCaseFrom = element => {
  const properties = {};

  const toCamelCase = sentence => {
    const [firstWord, ...restOfWords] = sentence.split("-");
    if (restOfWords.length === 0) {
      return firstWord
    }

    const functionBracelet = firstWord.includes("(") ? ")" : "";
    const camelCasedWords = startCase(restOfWords.join(" ")).replace(" ", "");
    return firstWord + camelCasedWords + functionBracelet;
  }
  Object.assign(properties, ...Array.from(element.attributes).map(attribute => ({[toCamelCase(attribute.nodeName)]: attribute.nodeValue})));
  return properties;
}

/**
 *
 * @param {string} url
 * @param {function(error, data)} callback
 */
export const getJSON = function(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() { callback(xhr.status === 200 ? xhr.status : null, xhr.response); };
  xhr.send();
};

////////////////////////////////////////
// RENDERING & TRANSPILATION
////////////////////////////////////////

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
  render(<WrappedComponent key={UID} {...properties} />, element);
}