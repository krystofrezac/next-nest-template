module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    "prettier",
    '@typescript-eslint',
  ],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
