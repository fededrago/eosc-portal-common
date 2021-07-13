const {watch, series, parallel, src, dest} = require("gulp");
const del = require('del');
const path = require('path');
const {getSuffixBy} = require("./utils");
const {transpileToBundle} = require("./utils");
const {COMPONENTS_PATHS} = require("../index");
const {preprocessStyles} = require("./lib-build.helper");
const browserSync = require('browser-sync').create();
const replace = require('gulp-replace');

const rootPath = path.resolve(__dirname, "../");
const options = {
  delay: 500,
  ignoreInitial: false
}
const env = 'env/env.development.js';
const mode = "development";
exports.serve = series(
  (cb) => del(path.resolve(rootPath, "dist"), cb),
  () => src(path.resolve(rootPath, "documentation/index.html"))
    .pipe(replace('<suffix>', getSuffixBy(env)))
    .pipe(replace('<dist_path>', ""))
    .pipe(dest(path.resolve(rootPath, `dist`))),
  () => src(path.resolve(rootPath, "documentation/*.css"))
    .pipe(dest(path.resolve(rootPath, `dist`))),
  function moveAssets() {
    return src(path.resolve(rootPath, "styles/assets/*"))
      .pipe(dest(path.resolve(rootPath, "dist/assets")))
  },
  () => {
    browserSync.init({
      server: rootPath,
      startPath: path.resolve(rootPath, `/dist/index.html`)
    });

    // on lib styles changes
    const stylesPathsPatterns = [
      path.resolve(rootPath, 'styles/**/*.scss'),
      path.resolve(rootPath, 'styles/**/*.css')
    ];
    watch(
      stylesPathsPatterns,
      options,
      preprocessStyles(mode, env, browserSync)
    );

    // on lib ts changes
    const libFilesToBuild = [
      path.resolve(rootPath, `src/**/*.ts`),
      path.resolve(rootPath, 'src/**/*.tsx'),
      path.resolve(rootPath, 'src/**/*.js'),
      path.resolve(rootPath, 'configurations/**/*/json')
    ];
    const entries = COMPONENTS_PATHS.map(componentPath => path.resolve(rootPath, componentPath));
    watch(
      libFilesToBuild,
      options,
      series(
        transpileToBundle(entries, mode, env),
        (cb) => { browserSync.reload(); cb();}
      )
    );

    // on documentation changes
    const docFilesToBuild = [
      path.resolve(rootPath, 'documentation/**/*.tsx'),
      path.resolve(rootPath, 'documentation/**/*.ts')
    ];
    const bundleName = 'documentation';
    watch(
      docFilesToBuild,
      options,
      series(
        transpileToBundle(docFilesToBuild, mode, env, bundleName),
        (cb) => { browserSync.reload(); cb();}
      )
    );

    const filesToWatch = [
      path.resolve(rootPath, 'documentation/**/*.css'),
      path.resolve(rootPath, 'documentation/**/*.html')
    ];
    watch(filesToWatch, options, series(
      parallel(
        function moveCssFiles() {
          return src(path.resolve(rootPath, "documentation/*.css"))
            .pipe(dest(path.resolve(rootPath, `dist`)));
        },
        function moveHtmlFiles() {
          return src(path.resolve(rootPath, "documentation/index.html"))
            .pipe(replace('<suffix>', getSuffixBy(env)))
            .pipe(replace('<dist_path>', ""))
            .pipe(dest(path.resolve(rootPath, `dist`)));
        }
      ),
      (cb) => { browserSync.reload(); cb(); }
    ))
  }
);
