/**
 * 公共配置
 */
const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');

function resolve (dir) {
	return path.join(__dirname, '..', dir);
}

module.exports = {
	// 加载器
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					sourceMap: true,
				},
				exclude: /node_modules/,
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'vue': 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.DefinePlugin({
			'process.env.VERSION': `'${pkg.version}'`
		}),
	]
};