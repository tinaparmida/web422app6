const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: 'pages/index.js', // Adjust the entry point based on your project structure
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Other webpack configuration...
  stats: {
    // Emit all module assets and stats to a JSON file
    // which is used by webpack-bundle-analyzer to generate the report
    assets: true,
    assetsSort: 'size',
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    entrypoints: false,
    modules: false,
    moduleTrace: false,
    providedExports: false,
    usedExports: false,
  },
  plugins: [
    // Other plugins...
  
  ],
};
