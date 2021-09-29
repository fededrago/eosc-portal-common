import uniqueId from 'lodash-es/uniqueId';
import globalConfig from "react-global-configuration";
import {useMediaQuery} from "react-responsive";
import {GRID_FIELD, GRID_KEYS} from "./configuration";

/**
 * @param {{ new(props: T): Component<T, S, any> }} WrappedComponent
 * @param {GRID_KEYS[]} showOnBreakpoints
 * @return {function(props: T): JSX.Element}
 */
export const rwdHOC = (WrappedComponent, showOnBreakpoints) => {
  function Wrapper(props) {
    const styles = { display: isComponentVisible(showOnBreakpoints) ? "block" : "none" };
    const uid = uniqueId("rwd-hoc-" + WrappedComponent.name + "-");
    return <div key={ uid } style={ styles }><WrappedComponent {...props} /></div>;
  }
  return Wrapper;
}

/**
 * @type {{[GRID_KEYS]: {minWidth: number, maxWidth?: number}}}
 */
const lookupTable = {};
/**
 * @param {GRID_KEYS[]} showOnBreakpoints
 * @return {boolean}
 */
const isComponentVisible = (showOnBreakpoints) => {
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
