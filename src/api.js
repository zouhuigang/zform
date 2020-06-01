import axios from 'axios';
import qs from 'qs';

//请求头
//拦截请求
axios.interceptors.request.use((config) => {
	// 请求头信息ajax,这里可以获取token
	// config.headers={'X-Requested-With': 'XMLHttpRequest','Content-Type':'application/json;charset=UTF-8'}
	// config.headers= {"content-type": "application/x-www-form-urlencoded"}
	return config
  }, (error) => {
	return Promise.reject(error)
  })

//拦截返回
axios.interceptors.response.use((res) => {
	console.info("zform res:",res);
	if (res.status === 200) {
		return res
	} else {
		return Promise.reject(res)
	}
},	(error) => {
	console.info("zform error:",error);
	return Promise.reject(error)
})

export function fetch (url, headers, params) {
  return new Promise((resolve, reject) => {
	axios.post(url, params, {headers})
		.then(res => {
			resolve(res.data)
	  }).catch((error) => {
			reject(error)
		})
	})
}

//自定义的api传输
export function __CUSTOM_API__ (url, params, submitSuccessCallback, submitErrorCallback) {
	let __this = this;
	let headers = {"content-type": "application/x-www-form-urlencoded"}
	let form_data = {}
	let data = {}
	let type = ''
	for (var i = 0; i < params.length; i++) {
		let item = params[i];
		if (item.name== 'cscode') {
			type = item.value
		}else{
			data[item.name] = item.value
		}
	}
	form_data["type"]=type
	form_data["data"]=JSON.stringify(data)
	return fetch(url, headers, qs.stringify(form_data)).then( response  => {
		if(submitSuccessCallback){
			submitSuccessCallback.call(this,'__CUSTOM_API__', response);
		}
	}).catch( error => {//接口或处理逻辑出错
		if(submitErrorCallback){
			submitErrorCallback.call(this,'__CUSTOM_API__', error);
		}
	});
}


export function __JSON_RAW__ (url, params, submitSuccessCallback, submitErrorCallback) {
	let __this = this;
	let headers = {"content-type": "application/json;charset=UTF-8"}
	let form_data = {}
	for (var i = 0; i < params.length; i++) {
		let item = params[i];
		form_data[item.name] = item.value
	}

	return fetch(url, headers, JSON.stringify(form_data)).then( response  => {
		if(submitSuccessCallback){
			submitSuccessCallback.call(this,'__JSON_RAW__',response);
		}
	}).catch( error => {//接口或处理逻辑出错
		if(submitErrorCallback){
			submitErrorCallback.call(this,'__JSON_RAW__', error);
		}
	});
}

/** 
 * 虚拟API,不发送真实请求
*/
export function __VIRTUAL__ (url, params, submitSuccessCallback, method) {
	let __this = this;
	let form_data = {}
	for (var i = 0; i < params.length; i++) {
		let item = params[i];
		form_data[item.name] = item.value
	}
	submitSuccessCallback.call(this,method,form_data);
}

// action: send_sms
// mobile: 18117000087
// type: captcha
// business: insurance
// load_page: https://htk1.xbaod.com/lp/#/

//发送短信
export function __SEND_CODE__ (url, mobile, submitSuccessCallback, submitErrorCallback) {
	let __this = this;
	let headers = {"content-type": "application/x-www-form-urlencoded"}
	let form_data = {}
	form_data["mobile"] = mobile
	form_data["type"] = 'captcha'
	form_data["business"] = 'insurance'
	form_data["action"] = 'send_sms'
	form_data["load_page"] = window.location.href;

	return fetch(url, headers, qs.stringify(form_data)).then( response  => {
		if(submitSuccessCallback){
			submitSuccessCallback.call(this,'__SEND_CODE__',response);
		}
	}).catch( error => {//接口或处理逻辑出错
		if(submitErrorCallback){
			submitErrorCallback.call(this,'__SEND_CODE__', error);
		}
	});
}

//验证短信
export function __VER_CODE__ (url, mobile, code) {
	let is_ver_success = false;
	let headers = {"content-type": "application/x-www-form-urlencoded"}
	let form_data = {}
	form_data["mobile"] = mobile
	form_data["code"] = code
	form_data["type"] = 'captcha'
	form_data["business"] = 'insurance'
	form_data["action"] = 'verify_sms'
	form_data["load_page"] = window.location.href;
	return fetch(url, headers, qs.stringify(form_data))
}