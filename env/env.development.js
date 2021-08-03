const mainHeaderConfig = require("../configurations/main-header.development.config.json");
const mainFooterConfig = require("../configurations/main-footer.development.config.json");
const defaultConfiguration= require("../configurations/configuration.default.json");

exports.environment = {
    mainHeaderConfig,
    mainFooterConfig,
    defaultConfiguration,
    production: false
}
