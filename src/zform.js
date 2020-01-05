const axios = require('axios');
const zjq = require('jquery');
let util = require('./util.js');

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

zform.println = () => {
	let eleList = util.getElements(this.id);
	console.info(eleList);
	const mobile = zjq('input[name="mobile"]').val();
	alert(mobile);
}



// exports default {
//     add: function (num1, num2) {
//          return num1 + num2; 
//     }         
// };

module.exports = zform