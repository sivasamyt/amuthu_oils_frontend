const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // ... other configuration options ...

  resolve: {
    fallback: {
      util: require.resolve('util/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },

  // Add this line to exclude crypto module
  externals: [nodeExternals({ allowlist: ['util'] })],
};