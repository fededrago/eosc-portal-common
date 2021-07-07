const execa = require("execa");
const parser = require("yargs-parser");
const {validParams} = require("./utils");
const {series} = require("gulp");
const ENDPOINT_URL = "https://s3.cloud.cyfronet.pl/";
const path = require('path');

const rootPath = path.resolve(__dirname, "../");
exports.updateS3BucketPolicy = function (arguments = process.argv.slice(2)) {
  const parsedParams = parser(arguments, {default: {endpoint_url: ENDPOINT_URL}});
  const {endpoint_url: endpointUrl, bucket} = parsedParams;
  return series(
    validParams(parsedParams, 'bucket'),
    async function updateS3BucketPolicy() {
      await execa('aws', [
        '--endpoint-url', endpointUrl,
        's3api', 'put-bucket-policy',
        '--bucket', bucket,
        '--policy', "file://" + path.resolve(rootPath, "deployment/s3.policy.json")
      ])
    }
  )
}