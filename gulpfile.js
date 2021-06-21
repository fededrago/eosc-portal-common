const {serve} = require("./deployment/serve.helper");
const {buildDocumentation} = require("./deployment/doc-build.helper");
const {pushToBranch} = require("./deployment/git-deploy.helper");
const {buildLib} = require("./deployment/lib-build.helper");
const {task} = require("gulp");

task('build_lib', buildLib());
task('build_doc', buildDocumentation());
task('push_to_branch', pushToBranch());
task('serve', serve);