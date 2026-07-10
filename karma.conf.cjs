module.exports = function (config) {
  const browsers = [process.env.CI ? 'ChromeHeadlessNoSandbox' : 'ChromeHeadless'];

  config.set({
    browsers,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    },
  });
};
