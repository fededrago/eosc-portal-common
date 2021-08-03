import React, {Component} from "react";
import {ElementType} from "./utils";
import {GRID_KEYS, isComponentVisible} from "./grid-configuration";
import * as _ from 'lodash';

export const rwdHOC = <T, S>(
  WrappedComponent: { new(props: T): Component<T, S, any> },
  showOnBreakpoints: ElementType<typeof GRID_KEYS>[]
): (props: T) => JSX.Element => {
  function Wrapper(props: T): JSX.Element {
    const [dimensions, setDimensions] = React.useState({
      height: window.innerHeight,
      width: window.innerWidth
    });
    React.useEffect(() => {
      function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        });
      }

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize)
      };
    });
    const styles = { display: isComponentVisible(showOnBreakpoints, dimensions) ? "block" : "none" };
    // @ts-ignore
    return <div key={_.uniqueId("rwd-hoc-" + WrappedComponent.name + "-")} style={ styles }><WrappedComponent {...props} /></div>;
  }

  return Wrapper;
}
