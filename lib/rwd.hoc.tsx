import React, {Component} from "react";
import {ElementType} from "./utils";
import {GRID_FIELD, GRID_KEYS} from "./grid-configuration";
import uniqueId from 'lodash-es/uniqueId';
import globalConfig from "react-global-configuration";
import {useMediaQuery} from "react-responsive";

export const rwdHOC = <T, S>(
  WrappedComponent: { new(props: T): Component<T, S, any> },
  showOnBreakpoints: ElementType<typeof GRID_KEYS>[]
): (props: T) => JSX.Element => {
  function Wrapper(props: T): JSX.Element {
    const styles = { display: isComponentVisible(showOnBreakpoints) ? "block" : "none" };
    const uid = uniqueId("rwd-hoc-" + WrappedComponent.name + "-");
    return <div key={ uid } style={ styles }><WrappedComponent {...props} /></div>;
  }
  return Wrapper;
}

const lookupTable: {[key in ElementType<typeof  GRID_KEYS>]?: {minWidth: number, maxWidth?: number}} = {};
const isComponentVisible = (showOnBreakpoints: ElementType<typeof GRID_KEYS>[]): boolean => {
  if (!showOnBreakpoints || showOnBreakpoints.length === 0) {
    console.warn("Component may not be displayed due to missing RWD breakpoints!!!");
  }

  // Build lookup table of breakpoints bounds in px
  if (Object.keys(lookupTable).length === 0) {
    GRID_KEYS
      .forEach((key, index) => {
        const nextKey = GRID_KEYS[index + 1];
        lookupTable[key] = {minWidth: globalConfig.get(GRID_FIELD)[key]};
        if (!!nextKey) { lookupTable[key]["maxWidth"] = globalConfig.get(GRID_FIELD)[nextKey]; }
      });
  }

  // Map current with to allowed breakpoints
  return showOnBreakpoints
    .map(key => lookupTable[key])
    .map(bounds => useMediaQuery(bounds))
    .some(value => value);
}
