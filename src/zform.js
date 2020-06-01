const zjq = require('jquery');
let util = require('./util.js');
let api = require('./api.js');
let Timeer = require('./timer.js');
let Popup = require('./popup.js');
require("babel-polyfill");
const _win_this = window;

//配置支持的属性
const prex = 'zform-';
const conf = [prex + 'api-url', prex + 'submit-before', prex + 'submit-success', prex + 'submit-method', prex + 'query', prex + 'sms-verify']

const zform = {
    id: 'formid',
    versionNo: '1.0.4',
    version() {
        return util.showString(this.versionNo)
    }
}

zform.config = ({form_id, api_url}) => {
    this.id = form_id
    return api_url;
}

zform.getConfig = (form_id) => {
    $_form = zjq('#' + form_id);
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


//这块可能以后会有多个返回值
async function submiBeforetPlugin(form_id, is_ver_success) {
    let $_form = zjq('#' + form_id);

    if (!is_ver_success) return false;

    // let beforePlugin= $_form.attr(prex+'api-before');
    // let pluginList = beforePlugin.split('|');
    // if (pluginList.length>0) {
    // 	for(var callbackFunc in pluginList){
    // 		if (callbackFunc && !_win_this[callbackFunc].call(this)){ //每个回调函数后需要返回true/false
    // 			is_ver_success = false;
    // 			break;
    // 		}
    // 	}
    // }

    //短信插件
    let verifyCodeFunc = $_form.attr("zform-sms-verify");
    let mobileName = $_form.attr("zform-sms-mobile_name")
    let codeName = $_form.attr("zform-sms-code_name")
    let smsUrl = $_form.attr("zform-sms-url") || '/api/v1/financialbusiness/datahandler'
    let mobile = zjq('input[name="' + mobileName + '"]').val();
    let code = zjq('input[name="' + codeName + '"]').val();
    if (verifyCodeFunc && mobile && code) {
        if (smsUrl == '__VIRTUAL_API__') {
            sms_ver_success = true
        } else { 
            let sms_result = await api.__VER_CODE__(smsUrl, mobile, code)
            let sms_ver_success = false;
            if (sms_result.status == 200) {
                sms_ver_success = true
            }
            if (verifyCodeFunc && !_win_this[verifyCodeFunc].call(this, mobile, code, sms_ver_success)) {
                is_ver_success = false;
            }
        }
    }

    return is_ver_success;
}

zform.Submit = (form_id) => {

    let eleList = util.InputFormCallBack(form_id);
    let is_ver_success = true;
    let $_form = zjq('#' + form_id);

    //网络请求成功回调
    let submitSuccessFunc = $_form.attr("zform-submit-success");
    if (submitSuccessFunc) {
        var submitSuccessCallback = _win_this[submitSuccessFunc];
    }

    // console.info(submitSuccessCallback);
    //错误回调
    let submitErrorFunc = $_form.attr("zform-submit-error");
    if (submitErrorFunc) {
        var submitErrorCallback = _win_this[submitErrorFunc];
    }


    //验证是否成功
    for (var i = 0; i < eleList.length; i++) {
        let ele = eleList[i];
        if (ele.callback && !_win_this[ele.callback].call(this, ele.value)) { //每个回调函数后需要返回true/false
            is_ver_success = false;
            break;
        }
    }

    //提交之前调用插件
    return submiBeforetPlugin(form_id, is_ver_success).then((is_ver_success) => {
        //验证通过
        if (is_ver_success) {
            let apiUrl = $_form.attr(prex + 'api-url');
            if (apiUrl == '__VIRTUAL_API__') {
                return api.__VIRTUAL__(apiUrl, eleList, submitSuccessCallback, '__VIRTUAL__SUBMIT__');
            } else { 
                let submitMethod = $_form.attr(prex + 'submit-method');
                if (submitMethod == '__CUSTOM_API__') {
                    return api.__CUSTOM_API__(apiUrl, eleList, submitSuccessCallback, submitErrorCallback);
                } else if (submitMethod == '__JSON_RAW__') {
                    return api.__JSON_RAW__(apiUrl, eleList, submitSuccessCallback, submitErrorCallback);
                }
            }
        }
    });
}


//发送验证码
zform.SendCode = (form_id, buttonId) => {
    let $_form = zjq('#' + form_id);
    let mobileName = $_form.attr("zform-sms-mobile_name")
    let mobile = zjq('input[name="' + mobileName + '"]').val();

    smsSuccessCallback = zjq('#' + buttonId).attr("zform-callback");
    if (!smsSuccessCallback) {
        alert("请设置回调函数");
        return false;
    }

    if (!mobile) {
        _win_this[smsSuccessCallback].call(this, mobile, "手机号不能为空");
        return false;
    }


    //网络请求成功回调
    let submitSuccessFunc = $_form.attr("zform-submit-success");
    if (submitSuccessFunc) {
        var submitSuccessCallback = _win_this[submitSuccessFunc];
    }

    //错误回调
    let submitErrorFunc = $_form.attr("zform-submit-error");
    if (submitErrorFunc) {
        var submitErrorCallback = _win_this[submitErrorFunc];
    }

    //发送短信
    let apiUrl = $_form.attr(prex + 'sms-url')||'/api/v1/financialbusiness/datahandler';
    if (apiUrl == '__VIRTUAL_API__') {
        return api.__VIRTUAL__(apiUrl, {}, submitSuccessCallback, '__VIRTUAL__SMS__');
    } else { 
        return api.__SEND_CODE__(apiUrl, mobile, submitSuccessCallback, submitErrorCallback);
    }
}

module.exports = {
    Core: zform, //表单核心
    Timeer: Timeer, //倒计时验证码
    Popup: Popup, //弹窗组件
}