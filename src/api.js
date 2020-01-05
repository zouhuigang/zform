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
  customPhpApi (url, params) {
	return fetch(url, params)
  },
}