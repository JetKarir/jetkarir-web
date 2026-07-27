module.exports = function (config) {
  const browsers = [process.env.CI ? 'EdgeHeadlessNoSandbox' : 'EdgeHeadless'];

  config.set({
    browsers,
    customLaunchers: {
      EdgeHeadlessNoSandbox: {
        base: 'EdgeHeadless',
        flags: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    },
  });
};
