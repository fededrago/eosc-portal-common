import globalConfig from 'react-global-configuration';
import {environment} from "../env/env";
import {getJSON} from "./utils";
import * as _ from 'lodash';

export class CommonComponentsConfig {
  constructor(config: {[field: string]: any}) {
    if (!!config) {
      return;
    }

    Object.keys(config)
      .filter(key => {
        const hasSetter = !!Object.getOwnPropertyDescriptor(config, key).set;
        if (!hasSetter) {
          console.warn(`A "${key}" doesn't exists in the EOSC Common Components configuration`);
        }

        return hasSetter;
      })
      // @ts-ignore
      .forEach(key => this[`set${_.startCase(key)}`](config[key]));
  }
}

globalConfig.set(environment.defaultConfiguration);

// Merge with user configuration
const userConfiguration = Array.from(document.getElementsByTagName("eosc-common-config")).pop();
const configPath = window.location.origin + userConfiguration.getAttribute("path");
getJSON(configPath, (error, data) => {
  if (error) {
    console.log("Loading the Common Components config JSON has ended with the error: " + error);
    return;
  }

  new CommonComponentsConfig(data);
});
