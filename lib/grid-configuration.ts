import startCase from "lodash-es/startCase";
import {ElementType} from "./utils";
import globalConfig from "react-global-configuration";
import {CommonComponentsConfig} from "./configuration";

export const GRID_FIELD = 'gridBreakPoints';

/* IMPORTANT !!! Set in order from smallest to largest !!! */
export const GRID_KEYS = ["xsm", "sm", "md", "lg", "xl"] as const;

// @ts-ignore
CommonComponentsConfig.prototype[`set${startCase(GRID_FIELD)}`] = function(config: {[field in ElementType<typeof GRID_KEYS>]: number}) {
  const hasPermittedFields = Object.keys(config)
    .every((key : ElementType<typeof GRID_KEYS>) => GRID_KEYS.includes(key));
  const hasPermittedValues = Object.values(config)
    .every(value => Number.isInteger(value));
  if (hasPermittedFields && hasPermittedValues) {
    globalConfig.set({ [GRID_FIELD]: config });
    return;
  }
}
