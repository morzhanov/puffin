const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
  filename: '[name]-[hash].css',
  allChunks: true
});

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devServer: {
    contentBase: __dirname + '/src',
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    }
  },
  cache: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader?sourceMap'
    }]
  }
}
