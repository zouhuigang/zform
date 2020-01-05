'use strict'
const path = require('path');
//读取文件
const glob = require('glob');
//解析html
let HtmlWebpackPlugin = require('html-webpack-plugin');
//Html模板存放根目录
const TEMPLATE_PATH = path.resolve(__dirname, '../examples/template')


exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
	? '/statics'
	: '/statics'

  return path.posix.join(assetsSubDirectory, _path)
}

//循环读取页面模板
/*
{
		index: './src/template/welcome/index.js',
		login: './src/template/login/index.js',
		user_login: './src/template/user/login/index.js',
		test:'./src/template/test/index.js',
		phone:'./src/template/tool/phone/index.js',
		auth_authorize: './src/template/auth/authorize/index.js',
		user_register: './src/template/user/register/index.js',
	}
	//basename = path.basename(filePath, path.extname(filePath));//获取文件名
		  //分割路径, path.extname(filePath):返回js后缀  path.basename(filePath):返回index.js文件
	  var filename = entryPath.substring(entryPath.lastIndexOf('\/') + 1);
	   var basename = path.basename(filePath)
		  */
exports.entries = function () {
  /*用于匹配 pages 下一级文件夹中的 index.js 文件 */
  var entryFiles = glob.sync(TEMPLATE_PATH + '/**/index.js')
  var map = {}
  entryFiles.forEach((filePath) => {
	  var entryPath = path.dirname(filePath);
	  var index=entryPath.replace(/\//g,'_');
	  index= index.split("template_")[1];

	  /* 生成对应的键值对 */
	  map[index] = filePath
	  //console.info("读取template入口文件",index,filePath);
  });
  map['myZform'] = './src/zform.js'
  return map
}

exports.resolve = function (dir) {
	return path.join(__dirname, '..', dir)
}
/**
 * 页面打包
 *          new HtmlWebpackPlugin({
				template: './src/template/welcome/index.html',   
				filename: 'index.html',//打包后的文件名称
				chunks: ['vendor','welcome']   //将entry名称对应的js文件，打包进对应的filename页面中
			}),
			new HtmlWebpackPlugin({
				template: './src/template/t/phone/index.html',
				filename: 't/phone/index.html',
				chunks: ['vendor','phone']
			}),
			new HtmlWebpackPlugin({
				template: './src/template/user/login/index.html',
				filename: 'user/login/index.html',
				chunks: ['vendor','user_login']
			}),
			new HtmlWebpackPlugin({
				template: './src/template/auth/authorize/index.html',
				filename: 'auth/authorize/index.html',
				chunks: ['vendor','auth_authorize']
			}),
			new HtmlWebpackPlugin({
				template: './src/template/user/register/index.html',
				filename: 'user/register/index.html',
				chunks: ['vendor','user_register']
			}),
 */
exports.packHtml = function () {
	var entryFiles = glob.sync(TEMPLATE_PATH + '/**/index.html');
	const configHtmlPlugins = [];
	entryFiles.forEach((template) => {
		var index=path.dirname(template).replace(/\//g,'_');
		var chunks_js= index.split("template_")[1];
		var filename=chunks_js.replace(/_/g,'\/')+'/index.html';//打包后的文件路径

		//首页更改为根目录
		if(filename=='welcome/index.html'){
			filename='index.html';
		}
		const conf = {
		  template: template,
		  filename: filename,//打包后的文件名称
		  chunks: ['vendor', chunks_js]   // 将entry名称对应的js文件，打包进对应的filename页面中
		}

		//console.info("==============",template,filename);
		const htmlPlugin=new HtmlWebpackPlugin(conf);
		configHtmlPlugins.push(htmlPlugin);
	});
	return configHtmlPlugins;
}

//打包成nginx方便访问的文件，packHtml生成的文件，会在每个路由后面带上斜杆/.
exports.packHtmlToNginx = function () {
	var entryFiles = glob.sync(TEMPLATE_PATH + '/**/index.html');
	const configHtmlPlugins = [];
	entryFiles.forEach((template) => {
		var index=path.dirname(template).replace(/\//g,'_');
		var chunks_js= index.split("template_")[1];
		var filename=chunks_js.replace(/_/g,'\/')+'.html';//打包后的文件路径

		//首页更改为根目录
		if(filename=='welcome.html'){
			filename='index.html';
		}
		const conf = {
		  template: template,
		  filename: filename,//打包后的文件名称
		  chunks: ['vendor', chunks_js]   // 将entry名称对应的js文件，打包进对应的filename页面中
		}
		const htmlPlugin=new HtmlWebpackPlugin(conf);
		configHtmlPlugins.push(htmlPlugin);
	});
	return configHtmlPlugins;
}