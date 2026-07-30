const edgeBinary =
  process.env.EDGE_BIN || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

process.env.CHROME_BIN = edgeBinary;

module.exports = function (config) {
  const browsers = [process.env.CI ? 'ChromeHeadlessNoSandbox' : 'ChromeHeadless'];

  config.set({
    browsers,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-jasmine-html-reporter'),
    ],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    },
  });
};
