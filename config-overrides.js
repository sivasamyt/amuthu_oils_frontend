module.exports = function override(config, env) {
  // Customize the Webpack configuration here
  config.resolve = {
    ...config.resolve,
    alias: {
      ...(config.resolve.alias || {}),
      crypto: require.resolve('crypto-browserify'),
      util: require.resolve('util/'),
    },
  };
  return config;
};
