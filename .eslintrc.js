module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
    mocha: true,
    node: true,
  },
  rules: {
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
  },
};
