module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  overrides: [
    {
      files: ['cypress/**/*.js'],
      parserOptions: {
        sourceType: 'module',
      },
      env: {
        'cypress/globals': true,
      },
      plugins: ['cypress'],
    },
  ],
};
