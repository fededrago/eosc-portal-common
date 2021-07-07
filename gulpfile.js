const {updateS3BucketPolicy} = require("./deployment/update-s3-policies");
const {serve} = require("./deployment/serve.helper");
const {buildDocumentation} = require("./deployment/doc-build.helper");
const {buildLib} = require("./deployment/lib-build.helper");
const {task} = require("gulp");

task('build_lib', buildLib());
task('build_doc', buildDocumentation());
task('serve', serve);
task('update-s3-policies', updateS3BucketPolicy());