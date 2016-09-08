<template>
	<div class="export_book">
		<p class="add_text">新建日常账本</p>
		<input type="text" v-model="bookname" placeholder="请填写账本名" id="book">
		<p></p>
		<button v-on:click="addBook(bookname)">完成</button>
		<p class="add_tip">*登录APP可创建更多类型账本（结婚，生意，装修等）</p>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				bookname: '',
				buid: ''
			}
		},
		methods: {
			addBook: function(bookname){
				var _this = this
				if(bookname.replace(/(^\s*)|(\s*$)/g, "").length !=0){
				  this.$http.jsonp({
	          url: window.$config.test + '/weixin/h5/book/create',
	          method: 'POST',
	          emulateJSON: true,
	          data: JSON.stringify({
	            name: bookname
	          }),
	        }).then((response) => {
	            console.log("提交成功")
	            _this.buid = response.data.data.bookuuid
	            this.$route.router.go({name:'accountdetail',params:{listnumber:_this.buid}})
	        }, (response) => {
	            console.log("error")
	            this.$route.router.go({name:'error'})
	        })
				}else if(bookname.replace(/(^\s*)|(\s*$)/g, "").length ==0){
					var book = document.getElementById("book");
					book.value = '';
					book.placeholder = "不能为空";
					$("#book").addClass("addtip")
				}			
			}
		}
	}
</script>
<style scoped>
	.export_book{
		width: 100%;
		box-sizing: border-box;
		padding: 2rem 3rem 2.25rem 3rem;
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
	.export_book input[type='text']::-webkit-input-placeholder {
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
	.add_text{
		font-size: 1.6rem;
		color:#000;
		width: 100%;
		text-align: center;
		margin-bottom: 1rem;
	}
	.add_tip{
		color: #959595;
		font-size: 1.1rem;
		margin-top: 2rem;
	}
	.addtip[type='text']::-webkit-input-placeholder {
		color:red !important;
	}
</style>