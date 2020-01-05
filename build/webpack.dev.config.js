/**
 * 本地预览
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
//生成可运行的html
let utils = require('./utils');

module.exports = merge(webpackBaseConfig, {
	// 入口
	// entry: {
	// 	// main: './examples/main',
	// },
	// // 输出
	// output: {
	// 	path: path.join(__dirname, '../examples/dist'),
	// 	publicPath: '',
	// 	filename: '[name].js',
	// 	chunkFilename: '[name].chunk.js'
	// },
	entry: utils.entries(),
	output: {
		//filename: 'js/[name].[hash:4].js',      // 打包后会根据entry里面的名称，生成新的name.js
		filename: 'js/[name].js',
		path: path.resolve('dist'),
		publicPath:'/',//需要设置为根目录，不然会找不到字体文件
		libraryTarget: 'umd',
        library: "zform"  
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
		  'vue$': 'vue/dist/vue.esm.js',
		  '@': utils.resolve('examples'),
		  'template': utils.resolve('src/template'),
		  'components': utils.resolve('src/components'),
		  'assets':utils.resolve('src/assets'),
		  'css':utils.resolve('src/css'),
		}
	},
	plugins: [
		...utils.packHtml(),
		new FriendlyErrorsPlugin()
	],
	module: {
		rules: [
			 {//解析html中的图片和include html
				test: /\.(htm|html)$/i,
				loader: 'html-withimg-loader'
			}
		]
	}
});