const zjq = require('jquery');

exports.showString = function (str) {
	return str;
}

//获取所有的Intpu对象加select对象
exports.getElements = function (formId) {
	var form = document.getElementById(formId);
	var elements = new Array();
	var tagElements = form.getElementsByTagName('input');
	for (var j = 0; j < tagElements.length; j++){
		 elements.push(tagElements[j]);
	}
	return elements;
}


//获取所有的Intpu对象加select对象
exports.getFormElements = function (formId) {
	var form = document.getElementById(formId);
	var elements = new Array();

	for (var i=0;i<form.elements.length;i++){
		let ee = form.elements[i];
		if ("INPUT" == ee.tagName|| "SELECT" == ee.tagName) {
			elements.push(ee);
		}
	}
	return elements;
}


//获取单个input中的【name,value】数组 
exports.inputSelector = function (element) {
	if (element.checked)
		return [element.name, element.value];
}

exports.input = function (element) {   
	switch (element.type.toLowerCase()) {   
	  case 'submit':   
	  case 'hidden':   
	  case 'password':   
	  case 'text':   
		return [element.name, element.value];   
	  case 'checkbox':   
	  case 'radio':   
		return exports.inputSelector(element);   
	}   
	return false;   
}  

//组合URL 
exports.serializeElement = function (element) {   
	var method = element.tagName.toLowerCase();   
	var parameter = exports.input(element);   
	 
	if (parameter) {   
	  var key = encodeURIComponent(parameter[0]);   
	  if (key.length == 0) return;   
	 
	  if (parameter[1].constructor != Array)   
		parameter[1] = [parameter[1]];   
		   
	  var values = parameter[1];   
	  var results = [];   
	  for (var i=0; i<values.length; i++) {   
		results.push(key + '=' + encodeURIComponent(values[i]));   
	  }   
	  return results.join('&');   
	}   
 }  

exports.serializeForm = function (formId) {
	var elements = exports.getElements(formId);
	var queryComponents = new Array();
	
	for (var i = 0; i < elements.length; i++) {
		var queryComponent = exports.serializeElement(elements[i]);
		if (queryComponent)
			queryComponents.push(queryComponent);
	}
	return queryComponents.join('&'); 
}


//根据不同的类型获取选中的值
exports.getValue = function (name, type) {
	let value
	if (type == 'text' || type == 'hidden') {
		let $ele = zjq('input[name="' + name+'"]');
		value = $ele.val();
	}else if (type == 'select-one'){
		let $ele = zjq('select[name="' + name+'"]');
		value = $ele.val();
	}else if (type == 'radio') {
		let $ele = zjq('input[name="' + name+'"]:checked');
		value = $ele.val();
	}else if (type == 'checkbox'){
		let $ele = zjq('input[name="' + name+'"]:checked');
		var id_array=new Array();  
		$ele.each(function(){  
			id_array.push(zjq(this).val());//向数组中添加元素
		});  
		value=id_array.join(',');//将数组元素连接起来以构建一个字符串
	}

	return value;
}

//获取回调函数
exports.getCallback = function (name, type) {
	let value
	if (type == 'text' || type == 'hidden') {
		let $ele = zjq('input[name="' + name+'"]');
		value = $ele.attr("zform-callback");
	}else if (type == 'select-one') {
		let $ele = zjq('select[name="' + name+'"]');
		value = $ele.attr("zform-callback");
	}else if (type == 'radio') {
		let $ele = zjq('input[name="' + name+'"]');
		value = $ele.attr("zform-callback");
	}else if (type == 'checkbox'){
		let $ele = zjq('input[name="' + name+'"]');
		value = $ele.attr("zform-callback");
	}

	return value;
}

//获取input的值和回调函数,暂时依赖jquery，以后需要移除
exports.InputFormCallBack = function (form_id) {
	let elements = exports.getFormElements(form_id);
	let dataList = []
	let filterList = []

	for (var i = 0; i < elements.length; i++) {
		let element = elements[i];
		let name = element.name;
		let type = element.type.toLowerCase()
		let uniKey = name+'_'+type
		if(filterList.indexOf(uniKey)>0){
			continue
		}
		let inputOne = {}
		inputOne['name'] = name
		inputOne['type'] = type
		inputOne['value'] = exports.getValue(name, type)
		inputOne['callback'] =  exports.getCallback(name, type)
		dataList.push(inputOne);
		filterList.push(uniKey);
	}
	return dataList;
}