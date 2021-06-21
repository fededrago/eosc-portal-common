const {config} = require("./configurations/webpack.default.config");
const {getEntryBy} = require("./configurations/webpack.default.config");
const {getMode} = require("./configurations/webpack.default.config");

module.exports = (env, argv) => {
  config.mode = getMode(argv);
  config.entry = getEntryBy(config.mode);
  return config;
};
