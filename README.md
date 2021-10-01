# EOSC Portal common

[![Deploy stable lib](https://github.com/cyfronet-fid/eosc-portal-common/actions/workflows/deploy-stable.yaml/badge.svg?branch=master)](https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html)
[![Deploy latest lib](https://github.com/cyfronet-fid/eosc-portal-common/actions/workflows/deploy-latest.yaml/badge.svg?branch=develop)](https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/index.production.html)

### Table of contents

- [Description](#description)
- [Requirements](#requirements)
- [Dependencies installation](#dependencies-installation)
- [Development](#development)
- [Building](#building)
- [Pushing to gihtub pages](#pushing-to-gihtub-pages)
- [Unit testing](#unit-testing)
- [Documentation](https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html#documentation)
    - [Prerequisites](https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html#prerequisites)
    - [Quickstart](https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html#quickstart)
    - [Versions urls](https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html#versions-urls)
    - [Components](https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html#components)

### Description

Library contains the custom UI components of the EOSC Portal services. Uses the JS scripts, and the SCSS styles for
consistent visualization and events triggering through many services.

### Requirements

Only for build purposes

- nodejs >= 14.17.1 LTE

### Dependencies installation

Only for building purposes

```bash
npm install -g gulp-cli
npm i
```

### Development

- [Install dependencies](#dependencies-installation)
- Run development mode locally
  > Browser will be opened at http://localhost:3000/documentation/index.html
  ```bash
  npm start
  ```

### Building

Building produce `*.min.js`, `*.min.css` files into `dist` folder.
`index.min.js` and `index.mn.css` contains all library components. Other scripts and styles will be named as components.

**Params**

- production
  > A flag to produce minified files without the transpiled/interpreted sourcemaps
- env
  > A relative path to a data configuration
- dist_path
  > Path to folder with the dist (can be URL). Must end with the sign `/`

Examples

```bash
gulp build_lib --production --env env/env.production.js --dist_path '../dist/' 
```

```bash
gulp build_lib --env env/env.development.js --dist_path https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/
```

### Unit testing

Only for build purposes

```bash
npm run test
```

