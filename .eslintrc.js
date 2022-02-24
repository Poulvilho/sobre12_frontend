module.exports = {
  env: {
    node: true,
  },
  extends: 'eslint:recommended',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      js: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    quotes: [
      'error',
      'single',
      'avoid-escape',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'no-console': [
      'error',
      { allow: [ 'warn' ]},
    ],
    'max-len': [
      'error',
      { code: 80 },
      { comments: 65 },
    ],
    'eol-last': [
      'error',
      'always',
    ],
  },
};
