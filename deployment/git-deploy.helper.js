const execa = require('execa');
const {series} = require('gulp');
const parser = require('yargs-parser');
const {validParams} = require("./utils");

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
          '--prefix', `dist/${distPath}`,
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
