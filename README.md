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
    - [Versions urls](#versions-urls)
    - [Components](https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html)

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

- mode
  > Allowed values `production` or `development`
  > - `development` mode create an additional source maps for debugging purpose
- env
  > A relative path to a configuration
- dist_path
  > Path to folder with the dist (can be URL). Must end with the sign `/`

Examples

```bash
gulp build_lib --mode development --env env/env.production.js --dist_path '../dist/' 
```

```bash
gulp build_lib --mode development --env env/env.development.js --dist_path https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/
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

- Attaching specific component from [list](https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html)
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
      
### Versions URLs
The URL pattern for: 
- stable version
  ```text
    https://s3.cloud.cyfronet.pl/eosc-portal-common/<file-name>.production.<extension>/
  ```

- versions **other than stable**
  ```text
  https://s3.cloud.cyfronet.pl/eosc-portal-common/<lib-version>/<file-name>.<data-instance>.<extension>/
  ```

  The lib versions:
  - pr-<pull-request-number>
  - latest

Data instances:
- development
- production

The files name's and its extensions:
- [the components names](https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html)
  - extensions
    - `.js`
    - `.css`
- index
  - extensions
    - `.html`
    - `.js`
    - `.css`
  
**Examples**
- stable 
  - documentation file
    ```text
    https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.html/
    ```
  - all components
    - styles
    ```text
     https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.css/
    ```
    - scripts
    ```text
     https://s3.cloud.cyfronet.pl/eosc-portal-common/index.production.js/
    ```
    
- latest
  - documentation file with development data
    ```text
    https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/index.development.html/
    ```
  - all components
    - styles with production data
    ```text
     https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/index.production.css/
    ```
    - scripts with development data
    ```text
     https://s3.cloud.cyfronet.pl/eosc-portal-common/latest/index.development.js/
    ```