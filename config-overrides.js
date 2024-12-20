module.exports = function override(config, env) {
    // Customize the Webpack configuration here
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      util: require.resolve('util/'),
    };
    return config;
  }