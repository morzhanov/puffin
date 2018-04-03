const path = require('path')
const webpack = require('webpack')

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
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  },
  watchOptions: {
    poll: true
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
    },
    {
      test: /\.(jpg|jpeg|gif|png|svg)$/,
      exclude: /node_modules/,
      use: 'file-loader'
    }]
  }
}
