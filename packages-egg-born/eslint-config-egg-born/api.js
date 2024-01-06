const builtin = ['./lib/legacy-api'].map(require.resolve);

module.exports = {
  extends: ['eslint-config-egg/typescript'].concat(builtin),
  parserOptions: {},
};
