import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// ip
const ip = 'http://47.93.53.100:8080';
	// 创建一个永久储存到本地的对象
let ksxtData = {}

	// 尝试获取本地是否存在ksxtData变量，第一次启动APP时是不存在的
try{
	ksxtData = uni.getStorageSync('ksxtData')
}catch(e){
	//TODO handle the exception
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_username','vuex_password','vuex_token','vuex_ip']

// 保存变量到本地存储中
const saveCsData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的ksxtData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('ksxtData');
		// 第一次打开APP，不存在ksxtData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的ksxtData对象中
		uni.setStorageSync('ksxtData', tmp)
	}
}

if (!uni.getStorageSync('ksxtData').vuex_ip) {
	saveCsData('vuex_ip', ip)
}

const store = new Vuex.Store({
	state:{
		// 如果上面从本地获取的ksxtData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_username: ksxtData.vuex_username ? ksxtData.vuex_username : '',
		vuex_password: ksxtData.vuex_password ? ksxtData.vuex_password : '',
		vuex_ip: ksxtData.vuex_ip ? ksxtData.vuex_ip : ip,
		vuex_token: ksxtData.vuex_token ? ksxtData.vuex_token : '',
		// 如果vuex_version无需保存到本地永久存储，无需ksxtData.vuex_version方式
		vuex_version: '1.0.0',
		vuex_modal_show: false,
		vuex_modal_content: ''
	},
	mutations:{
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveCsData(saveKey, state[saveKey])
		}
	}
})

export default store

