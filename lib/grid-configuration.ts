import * as _ from "lodash";
import {ElementType} from "./utils";
import globalConfig from "react-global-configuration";
import {CommonComponentsConfig} from "./configuration";

export const GRID_FIELD = 'gridBreakPoints';

/* IMPORTANT !!! Set in order from smallest to largest !!! */
export const GRID_KEYS = ["xsm", "sm", "md", "lg", "xl"] as const;

// @ts-ignore
CommonComponentsConfig.prototype[`set${_.startCase(GRID_FIELD)}`] = function(config: {[field in ElementType<typeof GRID_KEYS>]: number}) {
  const hasPermittedFields = Object.keys(config)
    .every((key : ElementType<typeof GRID_KEYS>) => GRID_KEYS.includes(key));
  const hasPermittedValues = Object.values(config)
    .every(value => Number.isInteger(value));
  if (hasPermittedFields && hasPermittedValues) {
    globalConfig.set({ [GRID_FIELD]: config });
    return;
  }
}

export const isComponentVisible = (
  showOnBreakpoints: ElementType<typeof GRID_KEYS>[],
  dimensions: { width: number; height: number; }
): boolean => {
  if (dimensions.width <= 0) {
    console.warn("Something go wrong while measuring window size in Common Components lib. Width can't be zero or less!!!");
  }

  const currentSize = GRID_KEYS
    .find(currentSize => {
      const nextSize = GRID_KEYS[GRID_KEYS.indexOf(currentSize) + 1];
      const isLargerThanLowerBound = dimensions.width >= globalConfig.get(GRID_FIELD)[currentSize];
      const isSmallerThanUpperBound = !!nextSize ? dimensions.width < globalConfig.get(GRID_FIELD)[nextSize] : true;
      return isLargerThanLowerBound && isSmallerThanUpperBound;
    });
  return showOnBreakpoints.includes(currentSize);
}
