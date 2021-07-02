const path = require('path');
const concat = require('gulp-concat');
const {src, dest, series} = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');
const rename = require('gulp-rename');
const parser = require('yargs-parser');
const log = require('fancy-log');
const _ = require("lodash");

const rootPath = path.resolve(__dirname, "../");

const webpackConf = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules|\.git/,
        use: 'ts-loader'
      }
    ],
  }
};
const transpileToBundle = (entries, mode, distPath, env) => {
  return series(
    function replaceEnvConfig() {
      return src(path.resolve(rootPath, env))
        .pipe(rename(`env.js`))
        .pipe(dest(path.resolve(rootPath, 'env')));
    },
    function transpileToBundle() {
      return src(entries)
        .pipe(named((file) => file.path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "") + ".min"))
        .pipe(webpackStream({...webpackConf, mode}, webpack))
        .pipe(dest(path.resolve(rootPath, `dist/${distPath}/`)))
        .pipe(concat('index.min.js'))
        .pipe(dest(path.resolve(rootPath, `dist/${distPath}/`)));
    }
  );
}
exports.transpileToBundle = transpileToBundle;

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
exports.getProcessParams = getProcessParams;

const validParams = (parsedParams, ...requiredFields) => {
  function validParams(cb) {
    const validatedFields = Object.assign({}, ...requiredFields
      .map(requiredKey => ({[requiredKey]: Object.keys(parsedParams).includes(requiredKey)})))
    const hasAllRequired = _.every(Object.values(validatedFields));

    let hasError = false;
    const ALLOWED_MODES = ["production", "development"];
    if (requiredFields.includes("mode") && !ALLOWED_MODES.includes(parsedParams["mode"])) {
      log(`Mode can be ${ALLOWED_MODES.join(", ")}, you passed: ${parsedParams["mode"]}`);
      hasError = true;
    }

    if (!hasAllRequired) {
      const invalidKeys = Object.keys(validatedFields)
        .filter(key => !validatedFields[key])
        .join(", ");
      log("You're missing the required fields: " + invalidKeys);
    }

    if (hasError) {
      log(`
        To get more knowledge about params please see documentation under URL:\n
        - https://github.com/cyfronet-fid/eosc-portal-commons-components#development
        - https://github.com/cyfronet-fid/eosc-portal-commons-components#building
        - https://github.com/cyfronet-fid/eosc-portal-commons-components#deploying
      `)
      process.exit(1);
    }

    cb();
  }

  return validParams;
}
exports.validParams = validParams;