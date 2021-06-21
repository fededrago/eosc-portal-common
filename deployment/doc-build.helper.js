const path = require('path');
const {transpileToBundle} = require("./utils");
const {dest, parallel, src} = require('gulp');

const rootPath = path.resolve(__dirname, "../")
exports.buildDocumentation = () => {
  return parallel(
    transpileToBundle(
      path.resolve(rootPath, 'documentation/*.tsx'),
      "production",
      "documentation",
      'env/env.production.js'
    ),
    () => src(path.resolve(rootPath, "documentation/*.css"))
      .pipe(dest(path.resolve(rootPath, 'dist/documentation/'))),
    () => src(path.resolve(rootPath, "documentation/index.html"))
      .pipe(dest(path.resolve(rootPath, 'dist/documentation/')))
  );
}