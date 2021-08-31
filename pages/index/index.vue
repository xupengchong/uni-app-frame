<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<i class="icon-cry iconfont" style="font-size: 34rpx;"></i>
			<button type="default" @click="vuexs">点击</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			
		},
		methods: {
			vuexs(){
				this.$u.vuex('vuex_token', '540a42f2-a456-4099-8aeb-70d7bf13b3d3');
				this.$u.api.carOwnerService().then(res=>{
					console.log(res)
				})
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
