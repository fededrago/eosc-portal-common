const {src, dest, series, parallel} = require('gulp');
const path = require('path');
const del = require('del');
const rename = require('gulp-rename');
const execa = require('execa');
const {STYLES_PATHS} = require("../index");
const {COMPONENTS_PATHS} = require("../index");
const log = require('fancy-log');
const parser = require("yargs-parser");
const _ = require("lodash");
const {transpileToBundle} = require("./utils");
const sass = require('gulp-sass')(require('sass'));

const rootPath = path.resolve(__dirname, "../");
exports.buildLib = (argv = process.argv.slice(2)) => {
  const parsedParams = getProcessParams(argv);
  const {mode, dist_path: distPath, env} = parsedParams;
  const bundleEntries = COMPONENTS_PATHS.map(componentPath => path.resolve(rootPath, componentPath));
  return series(
    validParams(parsedParams, "mode", "dist_path", "env"),
    async function removeOldDist(cb) {
      await execa('rm', ['-fR', `./dist/${distPath}`], {stdio: 'inherit'});
      cb();
    },
    transpileToBundle(bundleEntries, mode, distPath, env),
    preprocessStyles(distPath),
    deleteWebpackMisc(distPath)
  );
}

const preprocessStyles = (distPath, browserSync = null) => {
  return parallel(
    function preprocessStylesToSeparateFiles() {
      let pipe = src(STYLES_PATHS.map(stylesPath => path.resolve(rootPath, stylesPath)))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(dest(path.resolve(rootPath, `dist/${distPath}/`)));
      if (!!browserSync) {
        pipe = pipe.pipe(browserSync.stream())
      }
      return pipe;
    },
    function preprocessStylesBundle() {
      let pipe = src(path.resolve(rootPath, 'styles/index.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(dest(path.resolve(rootPath, `dist/${distPath}/`)));
      if (!!browserSync) {
        pipe = pipe.pipe(browserSync.stream())
      }
      return pipe;
    }
  )
}
exports.preprocessStyles = preprocessStyles;

const deleteWebpackMisc = (distPath, rootPath = path.resolve(__dirname, '../')) => {
  function deleteWebpackMisc(cb) {
    return del([
      path.resolve(rootPath, `dist/${distPath}/*.js`),
      "!" + path.resolve(rootPath, `dist/${distPath}/*.min.js`)
    ], cb);
  }

  return deleteWebpackMisc;
}

const getProcessParams = (argv) => {
  const parsedParams = parser(argv, {default: {env: ""}});
  if (!parsedParams["env"] || parsedParams["env"] === "") {
    switch (parsedParams["mode"]) {
      case "production":
        parsedParams["env"] = 'env/env.production.js';
        break;
      case "development":
      default:
        parsedParams["env"] = 'env/env.development.js';
        break;
    }
  }

  return parsedParams;
}

const validParams = (parsedParams, ...requiredFields) => {
  function validParams(cb) {
    const hasAllRequired = _.every(
      requiredFields
        .map(requiredKey => Object.keys(parsedParams).includes(requiredKey))
    );
    const ALLOWED_MODES = ["production", "development"];
    if (!hasAllRequired || !ALLOWED_MODES.includes(parsedParams["mode"])) {
      log("You're missing the required fields: " + requiredFields.join(", "));
      log("or mode has other value than development or production")

      // Help message
      log("\n[build_lib] process produce transpiled files to `dist_path` depend on `mode`\n");

      log("--dist_path path where will be available transpiled files under ~/eosc-portal-common-components/dist/<dist_path>")
      log("--mode enum with allowed values 'production'|'development' which will produce different output")

      process.exit(1);
    }

    cb();
  }

  return validParams;
}
