const mainHeaderConfig = require("../configurations/main-header.development.config.json");
const mainFooterConfig = require("../configurations/main-footer.development.config.json");
const euInformationConfig = require("../configurations/eu-information.development.json");

const defaultConfiguration= require("../configurations/configuration.development.json");

exports.environment = {
    mainHeaderConfig,
    mainFooterConfig,
    defaultConfiguration,
    euInformationConfig,
    production: false
}
