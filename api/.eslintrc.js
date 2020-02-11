const prefab = require("../eslint.prefab");

prefab.rules = {
  ...prefab.rules,
  'class-methods-use-this': 'off',
  'no-useless-constructor': 'off',
  'no-empty-function': 'off'
};

prefab.settings = {
  'import/resolver': {
    'typescript': {
      'alwaysTryTypes': true
    }
  }
};
module.exports = prefab;