const prefab = require("../eslint.prefab");

prefab.extends = [...prefab.extends, 'plugin:react/recommended'];
prefab.plugins = [...prefab.plugins, 'react'];
prefab.rules = {
  ...prefab.rules,
  'react/jsx-filename-extension': 'off',
  'react/jsx-props-no-spreading': 'off',
};
module.exports = prefab;