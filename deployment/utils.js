const path = require('path');
const concat = require('gulp-concat');
const {src, dest, series} = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');
const rename = require('gulp-rename');

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