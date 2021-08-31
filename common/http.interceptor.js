// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	let config = {
		showLoading: true, // 是否显示请求中的loading
		loadingText: '努力加载中~',
		loadingTime: 500,
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		originalData: true,
		header: {
			'content-type': 'application/json;charset=UTF-8',
			'app': 'app'
		},
		// ......
	}
	// #ifndef H5
	config.baseUrl = vm.vuex_ip,
	// #endif
	Vue.prototype.$u.http.setConfig(config);
	
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if(!config.url.includes('/cms/login') && config.url !== '/cms/user/register') {
			config.header.token = vm.$store.state.vuex_token;
		}
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}
	
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		console.log(res);
		if(res.statusCode == 200) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			if (!res.data.success) {
				uni.showModal({
					title: '提示',
					content: res.data.msg || '请求失败',
					showCancel: false
				});
				return false;
			}
			return res.data;
		} else if(res.statusCode == 401) {
			vm.$u.toast('登录失效，请重新登录');
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				vm.$u.route({type:'redirectTo', url: '/pages/login/login' })
			}, 1500)
			return false;
		} else {
			uni.showModal({
				title: '提示',
				content: res.msg || '数据请求失败',
				showCancel: false
			});
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

export default {
	install
}