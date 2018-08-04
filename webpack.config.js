const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log(process.env.ENVIRONMENT === 'DEV' ? 'development' : 'production');

module.exports = {
	mode: process.env.ENVIRONMENT === 'DEV' ? 'development' : 'production',
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
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
		new CopyWebpackPlugin([
			{
				from: 'src/css',
				to: __dirname + '/dist'
			},
      {
        from: 'static',
        to: __dirname + '/dist'
      }
		])
	]
};
