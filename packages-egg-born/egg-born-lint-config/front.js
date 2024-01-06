const builtin = ['./lib/legacy'].map(require.resolve);

module.exports = {
  extends: ['eslint-config-egg/typescript'].concat(builtin),
  parserOptions: {},
};
