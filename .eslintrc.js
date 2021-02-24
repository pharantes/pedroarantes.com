module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
    jquery: true,
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-var": "error",
    "prefer-arrow-callback": "error",
    "no-console": "off",
    "no-unused-vars": "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
