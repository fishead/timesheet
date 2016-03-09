module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    mocha: true,
  },
  rules: {
    'func-names': 0,
    'arrow-body-style': 0,
    'no-use-before-define': 0,
    'max-len': [0],
    'react/sort-comp': 0,
    'react/prefer-stateless-function': 0,
  },
};
