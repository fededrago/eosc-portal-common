const path = require('path');

const getSuffixBy = (envPath) => path.parse(envPath).base.split(".")[1];
exports.getSuffixBy = getSuffixBy;
