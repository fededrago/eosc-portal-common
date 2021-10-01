const {src, dest, series, parallel} = require('gulp');
const path = require('path');
const execa = require('execa');
const {STYLES_PATHS} = require("../app");
const {COMPONENTS_PATHS} = require("../app");
const parser = require('yargs-parser');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const {validDistPathArgv} = require("./validators");
const {validEnvArgv} = require("./validators");
const {validProductionArgv} = require("./validators");
const terser = require("gulp-terser");
const autoprefixer = require("gulp-autoprefixer");
const {getSuffixBy} = require("./utils");

const rootPath = path.resolve(__dirname, "../");
exports.buildLib = (argv = process.argv.slice(2)) => {
  const {production, env, dist_path: distPath} = parser(argv);
  const bundleEntries = COMPONENTS_PATHS.map(componentPath => path.resolve(rootPath, componentPath));
  return series(
    parallel(
      validProductionArgv(production),
      validEnvArgv(env),
      validDistPathArgv(distPath)
    ),
    async function removeOldDist(cb) {
      await execa('rm', ['-fR', `dist`], {stdio: 'inherit'});
      cb();
    },
    function moveAssets() {
      return src(path.resolve(rootPath, "styles/assets/*"))
        .pipe(dest(path.resolve(rootPath, "dist/assets")))
    },
    parallel(
      series(
        replaceEnvConfig(env),
        transpileFiles(bundleEntries, production, env)
      ),
      preprocessStyles(production, env)
    )
  );
}

const preprocessStyles = (production, env, browserSync = null) => {
  return parallel(
    series(
      function preprocessStylesToSeparateFiles() {
        return src(STYLES_PATHS.map(stylesPath => path.resolve(rootPath, stylesPath)))
          .pipe(gulpIf(!production, sourcemaps.init()))
          .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            includePaths: [rootPath, path.resolve(rootPath, "styles"), "./"]
          }).on('error', sass.logError))
          .pipe(rename({extname: `.${getSuffixBy(env)}.min.css`}))
          .pipe(gulpIf(!production, sourcemaps.write('.')))
          .pipe(dest(path.resolve(rootPath, `dist`)));
      },
      (cb) => {
        if (browserSync) {
          browserSync.stream();
        }
        cb();
      }
    ),
    series(
      function preprocessStylesBundle() {
        return src(path.resolve(rootPath, 'styles/index.scss'))
          .pipe(gulpIf(!production, sourcemaps.init()))
          .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            includePaths: [rootPath, path.resolve(rootPath, "styles"), "./"]
          }).on('error', sass.logError))
          .pipe(rename({extname: `.${getSuffixBy(env)}.min.css`}))
          .pipe(gulpIf(!production, sourcemaps.write('.')))
          .pipe(dest(path.resolve(rootPath, `dist`)))
      },
      (cb) => {
        if (browserSync) {
          browserSync.stream();
        }
        cb();
      }
    )
  )
}

function transpileFiles(paths, production, env, bundleName = `index`) {
  function transpileFiles() {
    return src(paths)
      .pipe(gulpIf(!production, sourcemaps.init()))
      .pipe(babel())
      .pipe(gulpIf(production, terser({compress: true, toplevel: true})))
      .pipe(rename(function (path) {
        const fileBaseName = path.basename.replace(".component", "");
        return {...path, basename: `${fileBaseName}.${getSuffixBy(env)}${production ? ".min" : ""}`};
      }))
      .pipe(gulpIf(!production, sourcemaps.write('.')))
      .pipe(dest(path.resolve(rootPath, 'dist')))

      // concat to bundle
      .pipe(concat(`${bundleName}.${getSuffixBy(env)}.min.js`))
      .pipe(dest(path.resolve(rootPath, `dist`)));
  }

  return transpileFiles;
}

function replaceEnvConfig(env) {
  function replaceEnvConfig() {
    return src(path.resolve(rootPath, env))
      .pipe(rename(`env.js`))
      .pipe(dest(path.resolve(rootPath, 'env')))
  }

  return replaceEnvConfig;
}
