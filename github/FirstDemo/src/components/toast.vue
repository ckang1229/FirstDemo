<template>
<div>
	<div class="mask_transparent" v-if="show"></div>
	<div class="toast" transition="toast" v-if="show">
		<slot name="content">正在加载……</slot>
	</div>
</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				show : false
			}
		},
		props: ['toast'],
		watch:{
			'toast.content':function(val,oldVal){

				if(val == '') return;

				let _this = this;
				_this.show = true;
				setTimeout(function(){
					_this.show = false;

					setTimeout(function(){
						_this.toast.content = '';
						delete _this.toast.timer ;
					},310);

				},_this.toast.timer || 3000);
			}
		}
	}
</script>

<style>
.mask_transparent {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.toast{
	position: absolute;
	top:50%;
	left:50%;
	background: rgba(40, 40, 40, 0.75);
	transform:translateX(-50%) translateY(-50%);
	color:#FFFFFF;
    text-align: center;
    border-radius: 5px;
    padding:15px;
    opacity:1;
    transition:opacity .3s linear;
    font-size: 14px;
}


.toast-leave{
	opacity:0;
}

</style>