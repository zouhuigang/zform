exports.showString = function (str) {
	return str;
}

//获取所有的Intpu对象
exports.getElements = function (formId) {
	var form = document.getElementById(formId);
	console.info("formId==",formId);
	var elements = new Array();
	var tagElements = form.getElementsByTagName('input');
	for (var j = 0; j < tagElements.length; j++){
		 elements.push(tagElements[j]);
	}
	return elements;
}

//获取单个input中的【name,value】数组 
exports.inputSelector = function (element) {
	if (element.checked)
		return [element.name, element.value];
}