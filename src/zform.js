const axios = require('axios');

function showString ( str ) {
	return str;
}

const zform = {
	versionNo: '1.0.0',
	version () {
		return showString(this.versionNo)
	}
}

module.exports = zform