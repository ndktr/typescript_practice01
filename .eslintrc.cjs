module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "no-console": "error",
    camelcase: ["error", { properties: "never" }],
  },
}