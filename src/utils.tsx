import * as _ from "lodash";
import {rwdHOC} from "./rwd.hoc";
import {render} from "react-dom";
import React, {Component} from "react";
import {GRID_KEYS} from "./grid-configuration";

export function runFirstCallback(event: any, ...callbacks: Array<string|null|"">) {
  callbacks
    .find(callback => !!callback && callback !== "")
    .split(";")
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

export function allValidCallbacks(...callbacks: Array<string|null|"">) {
  const validStrings = callbacks.filter(callback => !!callback && callback !== "");
  if (validStrings.length === 0) {
    return false;
  }

  return _.every(
    validStrings
      .map(callback => _.every(
        callback
          .split(";")
          .map(callback => {try {return !!(new Function(callback));} catch (e) {return false;}})
        )
      ),
    Boolean
  );
}

const MAX_DEPTH = 20;
export function mergeDeep(target: {[field: string]: any}, source: {[field: string]: any}, depth: number = 0) {
  if (depth >= MAX_DEPTH) {
    throw Error("Object merge depth is too large, current limit is: " + MAX_DEPTH);
  }

  const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));
  const output = Object.assign({}, target);
  if (!isObject(target) || !isObject(source)) {
    return output;
  }

  Object.keys(source)
    .forEach(key => !isObject(source[key]) || !(key in target)
      ? Object.assign(output, { [key]: source[key] })
      : output[key] = mergeDeep(target[key], source[key], depth + 1)
    );
  return output;
}

export const fetchPropertiesAsCammelCaseFrom = (element: Element): {[field: string]: any} => {
  const properties = {};

  const toCamelCase = (sentence: string) => {
    const [firstWord, ...restOfWords] = sentence.split("-");
    if (restOfWords.length === 0) {
      return firstWord
    }

    const functionBracelet = firstWord.includes("(") ? ")" : "";
    const camelCasedWords = _.startCase(restOfWords.join(" ")).replace(" ", "");
    return firstWord + camelCasedWords + functionBracelet;
  }
  Object.assign(properties, ...Array.from(element.attributes).map(attribute => ({[toCamelCase(attribute.nodeName)]: attribute.nodeValue})));
  return properties;
}

export type ElementType<T extends ReadonlyArray <unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export const getJSON = function(url: string, callback: (error: number, data: {[field: string]: any}) => any) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    const status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

export const renderAll = <T, S>(
  elements: HTMLCollectionOf<Element> | Element[],
  WrappedComponent: { new(props: T): Component<T, S, any> } | { (props: T): JSX.Element },
) => {
  Array.from(elements)
    .map(el => {
      el.classList.add("eosc-common");
      const properties = fetchPropertiesAsCammelCaseFrom(el) as T;
      const UID = _.uniqueId(el.tagName + "-" + WrappedComponent.name + "-");
      return render(<WrappedComponent key={UID} { ...properties } />, el);
    });
}
