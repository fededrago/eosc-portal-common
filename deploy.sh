#!/bin/bash

has_changed_files=$(git status --porcelain --untracked-files=no | wc -l)

if [[ $has_changed_files -gt 0 ]]
then
  RED='\033[0;31m'
  echo
  tput setaf 1; echo "!!! Commit all local changes before deployment !!!"
  echo
  echo
  [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "Preparing package..."
git reset --hard "origin/$CURRENT_BRANCH"
npm run build

git checkout build
git reset --hard "origin/$CURRENT_BRANCH"
shopt -s extglob
git rm -fr .
git checkout "origin/$CURRENT_BRANCH" -- .gitignore
mv -f dist/* ./ && rm -fR dist

echo "Pushing new dist to build branch..."
git add *
git commit -m "[Build] v0.x.x"
git push origin --force

# Reverse last branch
git reset --hard "origin/$CURRENT_BRANCH"
git checkout "$CURRENT_BRANCH"