#! /usr/bin/env bash

lerna version $1
git add .
git commit -m 'chore: release'
git push
lerna version patch
pnpm publish -r

