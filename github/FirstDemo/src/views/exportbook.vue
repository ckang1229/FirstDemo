<template>
	<div class="export_book">
		<input type="email" v-model="email" placeholder="请输入收件箱地址" id="email">	
		<button v-on:click="sendEmail(email)">发送</button>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				email: ''
			}
		},
		methods: {
			sendEmail: function(email){
				if(email != ""){
					var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
					var isok = reg.test(email)
					if(isok){
						this.$http.jsonp({
		          url: window.$config.test + '/weixin/h5/book/' + window.$config.testuuid + '/export',
		          method: 'POST',
		          emulateJSON: true,
		          data: JSON.stringify({
		            email: email
		          }),
		        }).then((response) => {
		            console.log("提交成功")
		            this.$route.router.go({name:'accountdetail',params:{listnumber:window.$config.testuuid}})
		        }, (response) => {
		            console.log("error")
		            this.$route.router.go({name:'error'})
		        })
					}else if(!isok){
						var email = document.getElementById("email")
						email.value = ''
						email.placeholder = "邮箱格式有误"
						$("#email").addClass("addtip")
					}
				}else{
					var email = document.getElementById("email")
					email.value = ''
					email.placeholder = "不能为空"
					$("#email").addClass("addtip")
				}			
			}
		},
		ready () {
			console.log(window.$config.testuuid)
		}
	}

</script>
<style scoped>
	.export_book{
		width: 100%;
		box-sizing: border-box;
		padding: 3.7rem 3rem 2.25rem 3rem;
		overflow: hidden;
	}
	.export_book input{
		width: 90%;
		border:2px solid #d5d5d5;
		background-color: #fff;
		font-size: 1.4rem;
		padding: 1rem;
		border-radius: 5px;
		display: block;
	}
	.export_book input[type='email']::-webkit-input-placeholder {
    color: #959595;
    font-size: 1.4rem;
	}
	.export_book button{
		width: 100%;
		background-color: #f5a623;
		border:2px solid #f49b13;
		color:#fff;
		text-align: center;
		padding: 1rem 0;
		border-radius: 5px;
		font-size: 1.4rem;
		display: block;
		margin-top:2rem;
	}
	.addtip[type='email']::-webkit-input-placeholder {
		color:red !important;
	}
</style>