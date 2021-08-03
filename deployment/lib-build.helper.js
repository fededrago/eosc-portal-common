const {src, dest, series, parallel} = require('gulp');
const path = require('path');
const del = require('del');
const execa = require('execa');
const {getSuffixBy} = require("./utils");
const {STYLES_PATHS} = require("../app");
const {COMPONENTS_PATHS} = require("../app");
const parser = require('yargs-parser');
const {
  validParams,
  transpileToBundle
} = require("./utils");
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const rootPath = path.resolve(__dirname, "../");
exports.buildLib = (argv = process.argv.slice(2)) => {
  const parsedParams = parser(argv);
  const {mode, env} = parsedParams;
  const bundleEntries = COMPONENTS_PATHS.map(componentPath => path.resolve(rootPath, componentPath));
  return series(
    validParams(parsedParams, "mode", "env"),
    async function removeOldDist(cb) {
      await execa('rm', ['-fR', `dist`], {stdio: 'inherit'});
      cb();
    },
    function moveAssets() {
      return src(path.resolve(rootPath, "styles/assets/*"))
        .pipe(dest(path.resolve(rootPath, "dist/assets")))
    },
    transpileToBundle(bundleEntries, mode, env),
    preprocessStyles(mode, env),
    function deleteWebpackMisc(cb) {
      return del([
        path.resolve(rootPath, `dist/*.js`),
        "!" + path.resolve(rootPath, `dist/*.min.js`)
      ], cb);
    }
  );
}

const preprocessStyles = (mode, env, browserSync = null) => {
  return parallel(
    function preprocessStylesToSeparateFiles() {
      let pipe = src(STYLES_PATHS.map(stylesPath => path.resolve(rootPath, stylesPath)));

      if (mode === "development") {
        pipe = pipe.pipe(sourcemaps.init())
      }
      pipe = pipe
        .pipe(sass({outputStyle: 'compressed', includePaths: [rootPath, path.resolve(rootPath, "styles")]}).on('error', sass.logError))
        .pipe(rename({ extname: `.${getSuffixBy(env)}.min.css` }))

      if (mode === "development") {
        pipe = pipe.pipe(sourcemaps.write('.'));
      }
      pipe = pipe.pipe(dest(path.resolve(rootPath, `dist`)));
      if (!!browserSync) {
        pipe = pipe.pipe(browserSync.stream())
      }
      return pipe;
    },
    function preprocessStylesBundle() {
      let pipe = src(path.resolve(rootPath, 'styles/index.scss'));

      if (mode === "development") {
        pipe = pipe.pipe(sourcemaps.init())
      }
      pipe = pipe
        .pipe(sass({outputStyle: 'compressed', includePaths: [rootPath, path.resolve(rootPath, "styles")]}).on('error', sass.logError))
        .pipe(rename({ extname: `.${getSuffixBy(env)}.min.css` }));
      if (mode === "development") {
        pipe = pipe.pipe(sourcemaps.write('.'));
      }
      pipe = pipe.pipe(dest(path.resolve(rootPath, `dist`)));
      if (!!browserSync) {
        pipe = pipe.pipe(browserSync.stream())
      }
      return pipe;
    }
  )
}
exports.preprocessStyles = preprocessStyles;
