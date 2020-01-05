const zjq = require('jquery');
let util = require('./util.js');
let api = require('./api.js');

//配置支持的属性
const prex = 'zform-';
const conf= [prex+'api-url', prex+'submit-before', prex+'submit-success', prex+'submit-method']

const zform = {
	id:'formid',
	versionNo: '1.0.0',
	version () {
		return util.showString(this.versionNo)
	}
}

zform.config = ({form_id, api_url }) => {
	this.id = form_id
	return api_url;
}

zform.getConfig = (form_id) => {
	$_form = zjq('#'+form_id);
	let configList = {}
	conf.map(function (key) {
		let value = $_form.attr(key);
		configList[key] = value
	})
	return JSON.stringify(configList);
}

zform.println = (form_id) => {
	// let eleList = util.serializeForm(form_id);
	let eleList = util.InputFormCallBack(form_id);
	return JSON.stringify(eleList); 
}

zform.Submit = (form_id) => {
	let eleList = util.InputFormCallBack(form_id);
	let is_ver_success = true;
	
	//验证是否成功
	for (var i = 0; i < eleList.length; i++) {
		let ele = eleList[i];
		if (ele.callback && !window[ele.callback].call(this, ele.value)){ //每个回调函数后需要返回true/false
			is_ver_success = false;
			break;
		}
	}

	//验证通过
	if (is_ver_success) {
		$_form = zjq('#'+form_id);
		let apiUrl = $_form.attr(prex+'api-url');
		let submitMethod = $_form.attr(prex+'submit-method');
		if (submitMethod == 'customPhpApi') {
			return api.customPhpApi(apiUrl, eleList);
		}
		
	}
	
	return false;
}

module.exports = zform