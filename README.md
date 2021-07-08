# EOSC Portal common

### Table of contents

- [Description](#description)
- [Requirements](#requirements)
- [Dependencies installation](#dependencies-installation)
- [Development](#development)
- [Building](#building)
- [Pushing to gihtub pages](#pushing-to-gihtub-pages)
- [Unit testing](#unit-testing)
- [Documentation](#documentation)
    - [Prerequisites](#prerequisites)
    - [Quickstart](#quickstart)
    - [Components](https://cyfronet-fid.github.io/eosc-portal-common/)

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
- Run development mode
  > Browser will open at http://localhost:3000/documentation/index.html with library of components
  ```bash
  npm start
  
  # or for specific configuration
  
  gulp serve --env env/env.test.js
  ```
- How to create component?
    - create a new folder in `src/<component_name>`
    - create a new `src/<component_name>/<component_name>.tsx` file
        - component name should be prefixed with `Eosc`
        - component tag which will be rendered should be prefixed with `eosc-common-<component-name>`
    - (optional) add a styles file `styles/<component_name>.scss>` and include it in `styles/index.scss`
    - append relative paths in `index.js` file
        - component path
        - styles path

### Building

Building produce `*.min.js`, `*.min.css` files into `dist` folder.
`index.min.js` and `index.mn.css` contains all library components. Other scripts and styles will be named as components.

**Params**

- mode
  > Allowed values `production` or `development`
  > - `development` mode create an additional source maps for debugging purpose
- env
  > Relative path to specific configuration starting at `root` level,

Examples

```bash
gulp build_lib --mode development --env env/env.production.js 
```

```bash
gulp build_lib --mode development --env env/env.latest.js
```

### Unit testing

Only for build purposes

```bash
npm run test
```

### Documentation

##### Prerequisites

You'll need to know a bit of HTML and JS. For refresher see [HTML tutorial](https://www.w3schools.com/html/)
or [JS tutorial](https://www.w3schools.com/js/default.asp).

##### Quickstart

- Attaching all components at once
  > Add script and styles to file with extension `.html`. It can be done by appending it into `<body>...</body>` section.

  **Examples**

    - Using public version
      ```html
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <body>
          <eosc-common-main-header 
            name="name" 
            surname="surname" 
            loginUrl="https://marketplace.eosc-portal.eu/users/auth/checkin" 
            logoutUrl="https://marketplace.eosc-portal.eu/users/logout"
          ></eosc-common-main-header>
      
          <script src="https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.min.js"></script>
          <link rel="stylesheet" href="https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.min.css" />
        </body>
      </html>
      ```

    - Using local build
      ```html
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <body>
          <eosc-common-main-header 
            name="name" 
            surname="surname" 
            loginUrl="https://marketplace.eosc-portal.eu/users/auth/checkin" 
            logoutUrl="https://marketplace.eosc-portal.eu/users/logout"
          ></eosc-common-main-header> 
      
          <script src="<dist_path>/index.producition.min.js"></script>
          <link rel="stylesheet" href="<dist_path>/index.production.min.css" />
        </body>
      </html>
      ```

- Attaching specific component from [list](https://cyfronet-fid.github.io/eosc-portal-common)
  by its name
  > Add script and styles to file with extension `.html`. It can be done by appending it into `<body>...</body>` section.

  **Examples**

    - Using public version
      ```html
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <body>
          <eosc-common-main-header 
            name="name" 
            surname="surname" 
            loginUrl="https://marketplace.eosc-portal.eu/users/auth/checkin" 
            logoutUrl="https://marketplace.eosc-portal.eu/users/logout"
          ></eosc-common-main-header> 
        
          <script src="https://s3.cloud.cyfronet.pl/eosc-portal-common/main-header.production.min.js"></script>
          <link rel="stylesheet" href="https://s3.cloud.cyfronet.pl/eosc-portal-common/main-header.production.min.css" />
        </body>
      </html>
      ```

    - Using local build
      ```html
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <body>
          <eosc-common-main-header 
            name="name" 
            surname="surname" 
            loginUrl="https://marketplace.eosc-portal.eu/users/auth/checkin" 
            logoutUrl="https://marketplace.eosc-portal.eu/users/logout"
          ></eosc-common-main-header> 
        
          <script src="<dist_path>/main-header.production.min.js"></script>
          <link rel="stylesheet" href="<dist_path>/main-header.production.min.css" />
        </body>
      </html>
      ```
