#! /usr/bin/env bash

lerna version patch
git add .
git commit -m 'chore: release'
git push
lerna version patch
pnpm publish -r

