# EOSC Portal commons components

### Table of contents
- [Description](#description)
- [Requirements](#requirements)
- [Building](#building)
- [Testing](#testing)
- [Documentation](#documentation)
  - [Prerequisites](#prerequisites)
  - [Quickstart](#quickstart)
  - [Components](#components)
    - [Main header](#main-header)

### Description
Library contains the custom UI components of the EOSC Portal services. 
Uses the JS scripts, and the SCSS styles for consistent visualization and events triggering through many services.

### Requirements
Only for build purposes
- nodejs >= 10.x.x LTE

### Dependencies installation
Only for building purposes

```bash
npm i
```

### Building
Building produce `index.js` library under `build` branch automatically by running the command

```bash
npm run build
```

### Deploying
Deployment of artifacts like `index.js` to branch `build` available under [URL](https://raw.githubusercontent.com/cyfronet-fid/eosc-portal-commons-components/build/index.js).

```bash
npm run deploy
```

### Testing
Only for build purposes

```bash
npm run test
```

### Documentation
##### Prerequisites
You'll need to know a bit of HTML and JS. 
For refresher see [HTML tutorial](https://www.w3schools.com/html/) or [JS tutorial](https://www.w3schools.com/js/default.asp).

##### Quickstart
Add library to file with extension `.html`. It can be done by appending `<header>...</header>` section.

For debugging purposes
```html
<script type="application/json"  src="https://raw.githubusercontent.com/cyfronet-fid/eosc-portal-commons-components/build/index.js"></script>
```

For local debugging purposes
```bash
# build library
npm run build

# install minified server
npm install -g local-web-server

# go to folder with code
cd ~/eosc-portal-commons-components

# run server for specific file
ws --spa examples/main-header.html
```
```html
<script type="application/json" src="../dist/index.js"></script>
```

For production purposes
```html
<script type="application/json"  scr=""></script>
```
   
#### Components

##### Main header
> Header at top of the application

tag: `eosc-main-header`

Example of usage: `<eosc-main-header name="test" surname="test"></eosc-main-header>`

[Example template](./examples/main-header.html)