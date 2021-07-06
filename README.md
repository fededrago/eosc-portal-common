# EOSC Portal commons

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
  - [Components](https://cyfronet-fid.github.io/eosc-portal-common-components/)

### Description
Library contains the custom UI components of the EOSC Portal services. 
Uses the JS scripts, and the SCSS styles for consistent visualization and events triggering through many services.

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
      - component tag which will be rendered should be prefixed with `eosc-commons-<component-name>`
  - (optional) add a styles file `styles/<component_name>.scss>` and include it in `styles/index.scss` 
  - append relative paths in `index.js` file
    - component path
    - styles path

### Building
Building produce `*.min.js`, `*.min.css` files into `dist/<dist_path>` folder.
`index.min.js` and `index.mn.css` contains all library components. 
Other scripts and styles will be named as components.

**Params**
- mode
  > Allowed values `production` or `development`
- dist_path
  > `dist/<dist_path>` path where transpiled and/or bundled files will be saved
- env
  > Relative path to specific configuration starting at `root` level, 
  > by default env files are chosen by `mode`

Examples
```bash
# Command will produce transpiled and/or bundled files 
# for development purpose into `dist/test` folder
# using `env.development.js` configuration
gulp build_lib --mode development --dist_path test
```

```bash
# Command will produce transpiled and/or bundled files 
# for production purpose into `dist/test` folder
# using `env.production.js` configuration
gulp build_lib --mode production --dist_path test
```

```bash
# Command will produce transpiled and/or bundled files 
# for production purpose into `dist/test` folder
# using `env/env.test.js` configuration
gulp build_lib --mode production --dist_path test --env env/env.test.js
```

### Pushing to gihtub pages
Committing and pushing artifacts `*.min.js`, `*.min.css` to the chosen branch
from `dist/<dist_path>`.

**Params**
- dest_branch
  > Branch to which will be pushed transpiled and/or bundled files
- dist_path
  > Folder from which files will be pushed
  
Examples
```bash
gulp push_to_branch --dest_branch stable --dist_path stable
```

```bash
gulp push_to_branch --dest_branch stable --dist_path stable
```

### Unit testing
Only for build purposes

```bash
npm run test
```

### Documentation
##### Prerequisites
You'll need to know a bit of HTML and JS. 
For refresher see [HTML tutorial](https://www.w3schools.com/html/) or [JS tutorial](https://www.w3schools.com/js/default.asp).

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
        <eosc-main-header name="test" surname="test2"></eosc-main-header>
      
        <!-- Work in progress on deployment to S3 -->
        <script src="<url-to-s3>/index.min.js"></script>
        <link rel="stylesheet" href="<url-to-s3>/index.css" />
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
        <eosc-main-header name="test" surname="test2"></eosc-main-header>
      
        <script src="<dist_path>/index.min.js"></script>
        <link rel="stylesheet" href="<dist_path>/index.css" />
      </body>
    </html>
    ```

- Attaching specific component from [list](https://cyfronet-fid.github.io/eosc-portal-common-components)
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
        <eosc-main-header name="test" surname="test2"></eosc-main-header>
      
        <!-- Work in progress on deployment to S3 -->
        <script src="<url-to-s3>/main-header.min.js"></script>
        <link rel="stylesheet" href="<url-to-s3>/main-header.css" />
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
        <eosc-main-header name="test" surname="test2"></eosc-main-header>
      
        <script src="<dist_path>/main-header.min.js"></script>
        <link rel="stylesheet" href="<dist_path>/main-header.css" />
      </body>
    </html>
    ```
