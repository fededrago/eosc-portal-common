import globalConfig from 'react-global-configuration';
import {environment} from "../env/env";
import startCase from 'lodash-es/startCase';
import {getJSON} from "./core";

export const GRID_FIELD = 'gridBreakPoints';

/* IMPORTANT !!! Set in order from smallest to largest !!! */
export const GRID_KEYS = ["xsm", "sm", "md", "lg", "xl"];

function getValidKeys(config) {
  return Object.keys(config)
    .filter(key => {
      const hasSetter = !!Object.getOwnPropertyDescriptor(config, key).set;
      if (!hasSetter) {
        console.warn(`A "${key}" doesn't exists in the EOSC Common Components configuration`);
      }

      return hasSetter;
    });
}

export class CommonComponentsConfig {
  constructor(config) {
    if (!!config) {
      return;
    }

    getValidKeys(config)
      .forEach(key => this[`set${startCase(key)}`](config[key]));
  }

  setGridBreakPoints(config) {
    const hasPermittedFields = Object.keys(config)
      .every(key => GRID_KEYS.includes(key));
    const hasPermittedValues = Object.values(config)
      .every(value => Number.isInteger(value));
    if (hasPermittedFields && hasPermittedValues) {
      globalConfig.set({[GRID_FIELD]: config});
    }
  }
}


globalConfig.set(environment.defaultConfiguration);

// Merge with user configuration
const userConfiguration = Array.from(document.getElementsByTagName("eosc-common-config")).pop();
if (userConfiguration) {
  const configPath = window.location.origin + userConfiguration.getAttribute("path");
  getJSON(configPath, (error, data) => {
    if (error) {
      console.log("Loading the Common Components config JSON has ended with the error: " + error);
      return;
    }

    new CommonComponentsConfig(data);
  });
}
