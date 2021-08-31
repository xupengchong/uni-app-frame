const api = '/cms/';
const apiList = [
	{ url: 'car/carOwnerService', method: 'post', fnName: 'carOwnerService' },				//服务首页
]

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {
	let apiObj = {}
	apiList.forEach(item => {
		let extraParams = item.extra ? item.extra : {};
		apiObj[item.fnName] = (params = {}, urlData = '') => {
			if (Array.isArray(params)) {
				return vm.$u[item.method](api + item.url + urlData, params)
			} else {
				return vm.$u[item.method](api + item.url + urlData, { ...params, ...extraParams })
			}
		}
	})
	apiObj.login = (params = {}) => vm.$u.post(`${api}login?username=${params.username}&password=${params.password}&appLogin=${params.appLogin}`, {});
	
	// 整合接口
	vm.$u.api = apiObj;
}

export default {
	install
}