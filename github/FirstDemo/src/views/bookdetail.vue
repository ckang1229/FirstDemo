<template>
	<div>
		<div class="cell_book" v-link="{name:'share'}">
			<span>共享账本</span>
			<span></span>
		</div>
		<div class="cell_book bordernone" v-link="{name:'exportbook'}">
			<span>导出账单</span>
			<span></span>
		</div>
		<div class="cell_middle">更多内容请在客户端查看</div>
		<div class="cell_book cell_unlink">
			<span>账本资料</span>
			<span></span>
		</div>
		<div class="cell_book bordernone cell_unlink">
			<span>记账类别管理</span>
			<span></span>
		</div>
		<div class="cell_btn">
			<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.account.book.quanzi&g_f=991653">在APP中查看</a>
		</div>
	</div>
</template>
<script>

</script>
<style scoped>
	.cell_book{
		width: 100%;
		padding: 0 2rem;
		box-sizing: border-box;
		height: 5rem;
		line-height: 5rem;
		border-bottom: 1px solid #eaeaea;
		background-color: #fff;
	}
	.cell_book span:nth-child(1){
		display: inline-block;
		float: left;
		font-size: 1.7rem;
	}
	.cell_book span:nth-child(2){
		display: inline-block;
		float: right;
		width: 1rem;
		height: 1rem;
		border-top: 2px solid #ddd;
		border-right: 2px solid #ddd;
		transform:rotate(45deg);
		-ms-transform:rotate(45deg); 	/* IE 9 */
		-moz-transform:rotate(45deg); 	/* Firefox */
		-webkit-transform:rotate(45deg); /* Safari 和 Chrome */
		-o-transform:rotate(45deg);
		margin-top: 2rem;
	}
	.bordernone{
		border:none !important;
	}
	.cell_middle{
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		padding-left: 2rem;
		box-sizing: border-box;
		font-size: 1.4rem;
		color: #959595;
	}
	.cell_unlink{
		color: #959595;
	}
	.cell_btn{
		width: 100%;
		box-sizing: border-box;
		padding:0 3rem;
		margin-top: 2rem;
	}
	.cell_btn a{
		width: 100%;
		display: block;
		border:2px solid #f49b13;
		color:#f49b13;
		background-color: #fff;
		text-align: center;
		padding: 1rem 0;
		border-radius: 5px;
		font-size: 1.7rem;
	}
</style>