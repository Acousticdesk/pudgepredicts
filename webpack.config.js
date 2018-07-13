module.exports = {
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
	}
};