const path = require('path');
const {validParams} = require("./utils");
const {getProcessParams} = require("./utils");
const {buildLib} = require("./lib-build.helper");
const {transpileToBundle} = require("./utils");
const {dest, parallel, src, series} = require('gulp');

const rootPath = path.resolve(__dirname, "../")
exports.buildDocumentation = (argv = process.argv.slice(2)) => {
  const parsedParams = getProcessParams(argv);
  const {dist_path: distPath, mode, env} = parsedParams;
  return series(
    validParams(parsedParams, "dist_path", "mode", "env"),
    parallel(
      buildLib([
        this.name,
        "--mode", mode,
        "--dist_path", `${distPath}/dist`,
        "--env", env
      ]),
      transpileToBundle(
        path.resolve(rootPath, 'documentation/*.tsx'),
        mode,
        distPath,
        'env/env.production.js'
      ),
      function moveCssFiles() {
        return src(path.resolve(rootPath, "documentation/*.css"))
          .pipe(dest(path.resolve(rootPath, `dist/${distPath}/`)))
      },
      function moveHtmlFiles() {
        return src(path.resolve(rootPath, "documentation/index.html"))
          .pipe(dest(path.resolve(rootPath, `dist/${distPath}/`)))
      }
    )
  );
}