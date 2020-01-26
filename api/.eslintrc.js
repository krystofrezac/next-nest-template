const prefab = require("../eslint.prefab");

prefab.rules = {
  ...prefab.rules,
  "class-methods-use-this": "off"
};

module.exports = prefab;