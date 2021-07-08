const path = require('path');
const concat = require('gulp-concat');
const {src, dest, series} = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');
const rename = require('gulp-rename');
const log = require('fancy-log');
const _ = require("lodash");
const sourcemaps = require("gulp-sourcemaps");
const through = require("through2");
const del = require("del");

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
const transpileToBundle = (entries, mode, env, bundleName = `index`) => {
  return series(
    function replaceEnvConfig() {
      return src(path.resolve(rootPath, env))
        .pipe(rename(`env.js`))
        .pipe(dest(path.resolve(rootPath, 'env')));
    },
    function transpileToBundle() {
      return src(entries)
        .pipe(named((file) => file.path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "") + `.${getSuffixBy(env)}.min`))
        .pipe(webpackStream({...webpackConf, mode, devtool: mode === "development" ? 'inline-source-map' : false}, webpack))
        .pipe(dest(path.resolve(rootPath, `dist`)))
        .pipe(concat(`${bundleName}.${getSuffixBy(env)}.min.js`))
        .pipe(dest(path.resolve(rootPath, `dist`)));
    }
  );
}
exports.transpileToBundle = transpileToBundle;

const getSuffixBy = (envPath) => {
  return path.parse(envPath).base
    .split(".")[1];
}
exports.getSuffixBy = getSuffixBy;

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
        - https://github.com/cyfronet-fid/eosc-portal-common#development
        - https://github.com/cyfronet-fid/eosc-portal-common#building
      `)
      process.exit(1);
    }

    cb();
  }

  return validParams;
}
exports.validParams = validParams;