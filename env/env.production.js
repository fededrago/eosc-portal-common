const mainHeaderConfig = require("../configurations/main-header.production.config.json");
const mainFooterConfig = require("../configurations/main-footer.production.config.json");
const defaultConfiguration = require("../configurations/configuration.default.json");

exports.environment = {
    mainHeaderConfig,
    mainFooterConfig,
    defaultConfiguration,
    production: true
}
