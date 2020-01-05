import axios from 'axios';
const ERR_OK = 200;

export function fetch (url, params) {
  return new Promise((resolve, reject) => {
	axios.post(url, params)
	  .then(res => {
		resolve(res.data)
	  })
	  .catch((error) => {
		reject(error)
	  })
  })
}
export default {
  ERR_OK,
  customPhpApi  (url, params) {
	let form_data = {}
	let data = {}
	let type = ''
	for (var i = 0; i < params.length; i++) {
		if(ele.name== 'cscode'){
			type = ele.value
		}else{
			let ele = params[i];
			data[ele.name] = ele.value
		}
		
	
	}
	
    form_data["type"]=type
    form_data["data"]=JSON.stringify(data)
	console.info(form_data);
	return fetch(url, form_data)
  },
}