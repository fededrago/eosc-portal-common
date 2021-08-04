import React, {Component} from "react";
import {ElementType, debounce} from "./utils";
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
      const debounceHandleResize = debounce(
        function handleResize() {
          setDimensions({
            height: window.innerHeight,
            width: window.innerWidth
          });
        },
        1000
      );
      window.addEventListener('resize', debounceHandleResize);
      return () => window.removeEventListener('resize', debounceHandleResize);
    });
    const styles = { display: isComponentVisible(showOnBreakpoints, dimensions) ? "block" : "none" };
    // @ts-ignore
    return <div key={_.uniqueId("rwd-hoc-" + WrappedComponent.name + "-")} style={ styles }><WrappedComponent {...props} /></div>;
  }

  return Wrapper;
}
