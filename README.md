# EOSC Portal commons components

### Table of contents
- [Description](#description)
- [Requirements](#requirements)
- [Dependencies installation](#dependencies-installation)
- [Development](#development)
- [Building](#building)
- [Unit testing](#unit-testing)
- [Documentation](#documentation)
  - [Prerequisites](#prerequisites)
  - [Quickstart](#quickstart)
  - [Components](https://cyfronet-fid.github.io/eosc-portal-commons-components/)

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
- (Optional) Include locally transpiled and/or bundled files in `documentation/index.html`.
  ```html
  <body>
    ...
    <script type="application/javascript" src="../dist/<dist_path>/index.min.js"></script>
    <link type="text/css" src="../dist/<dist_path>/index.min.css" />
  </body>
  ```

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

### Deploying
Deployment of artifacts `*.min.js`, `*.min.css` to the chosen branch
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
    <body>
      ...
      <script type="application/javascript" src="https://raw.githubusercontent.com/cyfronet-fid/eosc-portal-commons-components/stable/index.min.js"></script>
      <link src="https://raw.githubusercontent.com/cyfronet-fid/eosc-portal-commons-components/stable/index.min.css">
    </body>
    ```
  
  - Using local build
    ```html
    <body>
      ...
      <script type="application/javascript" src="../<dist_path>/index.min.js"></script>
      <link src="../<dist_path>/index.min.css">
    </body>
    ```

- Attaching specific component from [list](https://cyfronet-fid.github.io/eosc-portal-commons-components)
  by its name
  > Add script and styles to file with extension `.html`. It can be done by appending it into `<body>...</body>` section.
  
  **Examples**
  
  - Using public version
  ```html
  <body>
    ...
    <script type="application/javascript" src="https://raw.githubusercontent.com/cyfronet-fid/eosc-portal-commons-components/stable/<component-name>.min.js"></script>
    <link src="https://raw.githubusercontent.com/cyfronet-fid/eosc-portal-commons-components/stable/<component-name>.min.css">
  </body>
  ```
  
  - Using local build
    ```html
    <body>
      ...
      <script type="application/javascript" src="../<dist_path>/<component-name>.min.js"></script>
      <link src="../<dist_path>/<component_name>.min.css">
    </body>
    ```
