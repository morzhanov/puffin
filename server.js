const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

if (process.env.NODE_ENV === 'production') {
  const stat = require('node-static')
  const port = process.env.PORT || 3000
  const http = require('http')
  const file = new stat.Server('.', {
    cache: 3600,
    gzip: true
  })
  http.createServer(function (request, response) {
    request.addListener('end', function () {
      file.serve(request, response)
    }).resume()
  }).listen(port)
} else {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(process.env.PORT || 3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err)
    }

    console.log('Listening Application at localhost:3000')
  })
}
