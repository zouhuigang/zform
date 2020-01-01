const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
// const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
	devtool: 'source-map', 
	entry: {
		main: './src/zform.js'
	},
	output: {
		path: path.resolve('dist'),
		publicPath:'/',
		filename: 'zform.min.js',
		library: 'zform',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	plugins: [
		// @todo
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new UglifyJsPlugin({
			parallel: true,
			sourceMap: true,
		}),
		// new CompressionPlugin({
		// 	asset: '[path].gz[query]',
		// 	algorithm: 'gzip',
		// 	test: /\.(js|css)$/,
		// 	threshold: 10240,
		// 	minRatio: 0.8
		// })
	]
});