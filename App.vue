<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/* 阿里字体库 */
	@import url("https://at.alicdn.com/t/font_2484187_n9vwmtgf0lb.css");
	
	/*每个页面公共css */
	
	.ellip{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>
