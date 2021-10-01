const path = require('path');
const concat = require('gulp-concat');
const {src, dest} = require('gulp');
const named = require('vinyl-named');

const gulpIf = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const log = require('fancy-log');

const rootPath = path.resolve(__dirname, "../");
function replaceEnvConfig(env) {
  return src(path.resolve(rootPath, env))
    .pipe(rename(`env.js`))
    .pipe(dest(path.resolve(rootPath, 'env')));
}
exports.replaceEnvConfig = replaceEnvConfig;

function transpileFiles(paths, mode, env) {
  return src(paths)
    .pipe(gulpIf(mode === "development", sourcemaps.init()))
    .pipe(babel())
    .pipe(gulpIf(mode === "production", terser()))
    .pipe(named((file) => file.path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "") + `.${getSuffixBy(env)}` + mode === "production" ? ".min" : ""))
    .pipe(gulpIf(mode === "development", sourcemaps.write('.')))
    .pipe(dest('dist'))
}
exports.transpileFiles = transpileFiles;

function transpileBundle(paths, mode, env, bundleName = `index`) {
  return;
}
exports.transpileBundle = transpileBundle;

const getSuffixBy = (envPath) => {
  return path.parse(envPath).base
    .split(".")[1];
}
exports.getSuffixBy = getSuffixBy;

// TODO: Refactor validators and parsing system !!!
const validParams = (parsedParams, ...requiredFields) => {
  function validParams(cb) {
    const validatedFields = Object.assign({}, ...requiredFields
      .map(requiredKey => ({[requiredKey]: Object.keys(parsedParams).includes(requiredKey)})))
    const hasAllRequired = Object.values(validatedFields).every(valid => valid);

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
