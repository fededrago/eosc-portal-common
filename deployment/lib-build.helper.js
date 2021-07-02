const {src, dest, series, parallel} = require('gulp');
const path = require('path');
const del = require('del');
const execa = require('execa');
const {STYLES_PATHS} = require("../index");
const {COMPONENTS_PATHS} = require("../index");
const {
  getProcessParams,
  validParams,
  transpileToBundle
} = require("./utils");
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
    function deleteWebpackMisc(cb) {
      return del([
        path.resolve(rootPath, `dist/${distPath}/*.js`),
        "!" + path.resolve(rootPath, `dist/${distPath}/*.min.js`)
      ], cb);
    }
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
