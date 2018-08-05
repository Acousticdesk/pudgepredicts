const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: process.env.ENVIRONMENT === 'DEV' ? 'development' : 'production',
	entry: {
    vendor: './src/js/materialize.js',
	  main: './src/js/index.js'
  },
	output: {
		filename: '[name].[contenthash].js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	devServer: {
    contentBase: __dirname + '/dist',
    historyApiFallback: {
      index: 'index.html'
    }
	},
	plugins: [
	  new CleanWebpackPlugin(['dist']),
		new CopyWebpackPlugin([
			{
				from: 'src/css',
				to: __dirname + '/dist'
			},
      {
        from: 'static/images',
        to: __dirname + '/dist/images'
      }
		]),
    new HtmlWebpackPlugin({
      template: 'static/index.html'
    })
	]
};
