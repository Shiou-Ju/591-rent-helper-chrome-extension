const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode || 'production',
  devtool: argv.mode === 'development' ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: {
    background: './background.ts',
    contentScript: './contentScript.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
});
