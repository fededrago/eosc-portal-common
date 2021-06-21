const execa = require('execa');
const {series} = require('gulp');
const log = require('fancy-log');
const parser = require('yargs-parser');
const _ = require('lodash');

exports.pushToBranch = (argv = process.argv.slice(2)) => {
  async function pushToBranch() {
    const requiredFields = [
      "dest_branch",
      "dist_path",
      "git_paths_to_include"
    ];
    const parsedParams = getProcessParams(
      argv,
      ...requiredFields
    );
    const {
      dest_branch: destBranch,
      dist_path: distPath
    } = parsedParams;

    return series(
      validParams(parsedParams, ...requiredFields),
      async (cb) => {
        try { await execa('git', ['branch', '-D', destBranch], {stdio: 'inherit'}); } catch (e) {}

        await execa('git', [
          'subtree', 'split',
          '--prefix', distPath,
          '-b', destBranch
        ], {stdio: 'inherit'});
        await execa('git', ['push', '-f', 'origin', `${destBranch}:${destBranch}`]);
        await execa('git', ['branch', '-D', destBranch], {stdio: 'inherit'});

        cb();
      }
    )();
  }

  return pushToBranch;
}

const getProcessParams = (argv, ...requiredFields) => {
  return parser(
    argv,
    {
      array: ["git_paths_to_include"],
      default: {
        "git_paths_to_include": []
      },
      string: requiredFields
    }
  );
}

const validParams = (parsedParams, ...requiredFields) => {
  function validParams(cb) {
    const hasAllRequired = _.every(
      requiredFields
        .map(requiredKey => Object.keys(parsedParams).includes(requiredKey))
    );
    if (!hasAllRequired) {
      log("You're missing the required fields: " + requiredFields.join(", "));

      // Help message
      log("\n[push_to_branch] process move build (transpiled) files to branch and push them\n");

      log("--dest_branch name of branch to which push should be made")
      log("--dist_path path where will be available transpiled files under ~/eosc-portal-common-components/dist/<dist_path>")
      log("--git_paths_to_include git files that should be kept")

      process.exit(1);
    }

    cb();
  }

  return validParams;
}
