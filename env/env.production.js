const mainHeaderConfig = require("../configurations/main-header.production.config.json");
const mainFooterConfig = require("../configurations/main-footer.production.config.json");
const euInformationConfig = require("../configurations/eu-information.production.json");

const defaultConfiguration = require("../configurations/configuration.production.json");

exports.environment = {
    mainHeaderConfig,
    mainFooterConfig,
    defaultConfiguration,
    euInformationConfig,
    production: true
}
