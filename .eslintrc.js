module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "prettier",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y", "prettier", "react-hooks"],
  rules: {
    "react/state-in-constructor": "off",
    "react/sort-comp": "off",
    semi: "off",
    "no-plusplus": "off",
    "eol-last": "off",
    "max-len": ["error", 150, { ignoreUrls: true }],
    "no-tabs": "off",
    "no-alert": "off",
    "prefer-destructuring": "off",
    "no-param-reassign": "off",
    "class-methods-use-this": "off",
    "react/destructuring-assignment": "off",
    "react/static-property-placement": "off",
    "react/no-unused-state": "off",
    "react/prefer-stateless-function": "off",
    "react/no-array-index-key": "off",
    "react/require-default-props": "off",
    "react/default-props-match-prop-types": "off",
    "import/newline-after-import": "off",
    "import/order": "off",
    "no-shadow": "off",
    "prefer-template": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "max-len": "off",
    "no-return-await": "off",
    "no-else-return": "off",
    "consistent-return": "off",
    "no-useless-catch": "off",
  },
};
