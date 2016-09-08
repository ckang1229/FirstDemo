<template>
	<!-- 查看自己的账单明细 有编辑以及删除功能 -->
	<!-- <flowStatistics></flowStatistics> -->
	<div v-show="billData.editable" style="padding-bottom:3rem;">
		<div class="bill">
			<div class="bill_record">
				<div class="record_left">
					<span v-show="billData.type==0">支出金额</span>
					<span v-show="billData.type==1">收入金额</span>
				</div>
				<div class="record_right">{{ billData.cost }}</div>
			</div>
			<div class="bill_record">
				<div class="record_left">分类</div>
				<div class="record_right">
					<span v-show="billData.type==0">支出&gt;{{ billData.categoryName }}</span>
					<span v-show="billData.type==1">收入&gt;{{ billData.categoryName }}</span>
				</div>
			</div>
			<div class="bill_record">
				<div class="record_left">账户</div>
				<div class="record_right">{{ billData.accountname || "未选择"}}</div>
			</div>
			<div class="bill_record">
				<div class="record_left">记录人</div>
				<div class="record_right">{{ billData.creatorName }}</div>
			</div>
			<div class="bill_record">
				<div class="record_left">记录时间</div>
				<div class="record_right">{{ billData.cts }}</div>
			</div>
		</div>
		<div class="bill">
			<div class="bill_remark">
				<div class="remark_left">
					<p>备注</p>
					<p>{{ billData.remark }}<span v-show="!billData.remark">未填写</span></p>
				</div>
				<div class="remark_right">
					<img v-show="imgLength > 0" :src="imgUrl" onClick="$(this).ImgZoomIn();">
				</div>
			</div>	
		</div>
		 <!-- v-link="{name:'editAccount',params:{bookuuid:bookuuid,uuId:uuid}}" -->
		<div class="edit_btn" v-on:click="editRecords()">编辑</div>
		<div class="delete_btn" v-on:click="deleteBtn()">删除</div>
		<confirm :show.sync="deleteFlag" confirm-text="确定" cancel-text="取消" title="操作提示" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')">
		  <p style="text-align:center;">真的要删除该条记录吗？</p>
		</confirm>
	</div>
	<!-- 查看他人的账单明细 仅有查看功能 -->
	<div v-show="!billData.editable">
		<div class="bill">
			<div class="bill_record">
				<div class="record_left">
					<span v-show="billData.type==0">支出金额</span>
					<span v-show="billData.type==1">收入金额</span>
				</div>
				<div class="record_right">{{ billData.cost }}</div>
			</div>
			<div class="bill_record">
				<div class="record_left">分类</div>
				<div class="record_right">
					<span v-show="billData.type==0">支出&gt;{{ billData.categoryName }}</span>
					<span v-show="billData.type==1">收入&gt;{{ billData.categoryName }}</span>
				</div>
			</div>
			<div class="bill_record">
				<div class="record_left">记录人</div>
				<div class="record_right">{{ billData.creatorName }}</div>
			</div>
			<div class="bill_record">
				<div class="record_left">记录时间</div>
				<div class="record_right">{{ billData.cts }}</div>
			</div>
		</div>
		<div class="bill">
			<div class="bill_remark">
				<div class="remark_left">
					<p>备注</p>
					<p>{{ billData.remark || "未填写" }}</p>
				</div>
				<div class="remark_right">
					<img v-show="imgLength > 0" :src="imgUrl" onClick="$(this).ImgZoomIn();">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Confirm } from 'vux'
export default{
	components: {
		Confirm
	},
	data () {
		return {
			flag: true,
			billData: '',
			imgLength: '',
			imgUrl: '',
			deleteFlag: false,
			bookuuid:'',
			uuid: '',
			loadShow: false
		}
	},
	methods: {
		editRecords: function(){
			// 带bookuuid  &  uuid  到记账页
     	this.$route.router.go({name:'editAccount',params:{bookuuid:this.bookuuid,uuId:this.uuid}})     

		},
		onAction: function (type) {
      if(type == "确认"){
      	// alert("此处调确认删除接口！")
      	this.$http.jsonp({
	        url: window.$config.test + '/weixin/h5/book/expense/delete',
	        method: 'POST',
	        emulateJSON: true,
	        data: JSON.stringify({
	          bookuuid:this.bookuuid,
	          uuId:this.uuid
	        }),
	      }).then((response) => {
	          console.log("删除成功")
	          console.log(response)
            this.$route.router.go({name:'accountdetail',params:{listnumber: this.bookuuid}})     
	      }, (response) => {
	          console.log("error")
	      })
      }
    },
    deleteBtn: function() {
    	this.deleteFlag = true
    }
	},
	route: {
		waitForData: true,
		data (transition){			
			// console.log(this.$route.params.bookuuid + "route")
			// console.log(this.$route.params.uuId + "route")
			var _this = this
			_this.bookuuid = this.$route.params.bookuuid
			_this.uuid = this.$route.params.uuId
			this.$http.jsonp({
        url: window.$config.test + '/weixin/h5/book/expense',
        method: 'POST',
        emulateJSON: true,
        data: JSON.stringify({
          bookuuid:this.$route.params.bookuuid,
          uuid: this.$route.params.uuId
        }),
      }).then((response) => {
          console.log("请求成功")      
          _this.billData = response.data.data
          
          if(_this.billData.images){
          	_this.imgLength = _this.billData.images.length
          	_this.imgUrl = _this.billData.images[0]
          }else{
          	_this.imgLength == 0
          }
          transition.next({
	          loadShow: true
	        })
      }, (response) => {
          console.log("error")
      })
		}
	}
}
// 点击图片方法
$.fn.ImgZoomIn = function() {
	var bgstr,imgstr;
  bgstr = '<div id="ImgZoomInBG" style=" background:#000000; filter:Alpha(Opacity=70); opacity:0.7; position:fixed; left:0; top:0; z-index:10000; width:100%; height:100%; display:none;"><iframe src="about:blank" frameborder="5px" scrolling="yes" style="width:100%; height:100%;"></iframe></div>';
  //alert($(this).attr('src'));
  imgstr = '<img id="ImgZoomInImage" src="' + $(this).attr('src') + '" onclick=$(\'#ImgZoomInImage\').hide();$(\'#ImgZoomInBG\').hide(); style="cursor:pointer; display:none; position:absolute; z-index:10001;" />';
  if ($('#ImgZoomInBG').length < 1) {
    $('body').append(bgstr);
  }
  if ($('#ImgZoomInImage').length < 1) {
    $('body').append(imgstr);
  } else {
    $('#ImgZoomInImage').attr('src', $(this).attr('src'));
  }
  //alert($(window).scrollLeft());
  //alert( $(window).scrollTop());
  // $('#ImgZoomInImage').css('left', $(window).scrollLeft() + ($(window).width() - $('#ImgZoomInImage').width()) / 2);
  $('#ImgZoomInImage').css('left', 0);
  $('#ImgZoomInImage').css('width', "100%");
  $('#ImgZoomInImage').css('top', "20%");
  // $('#ImgZoomInImage').css('top', $(window).scrollTop() + ($(window).height() - $('#ImgZoomInImage').height()) / 2);
  $('#ImgZoomInBG').show();
  $('#ImgZoomInImage').show();
};
</script>
<style scoped>
	.app{
		background-color: #f2f2f2 !important;
	}
	.bill{
		border-top:10px solid #f2f2f2 !important;
		background-color: #fff;
	}
	.bill_record{
		width: 100%;
		box-sizing: border-box;
		height: 60px;
		line-height: 60px;
		padding:0 1rem;
		font-size: 1.6rem;
		border-top:1px solid #f0f0f0;
	}
	.record_left{
		width: 30%;
		float: left;
		text-align: left;
		height: 60px;
		line-height: 60px;
	}
	.record_right{
		width: 68%;
		float: left;
		text-align: right;
		height: 60px;
		line-height: 60px;
	}
	.bill_remark{
		width: 100%;
		box-sizing: border-box;
		height: 80px;
		padding:0 1rem;	
	}
	.remark_left{
		width: 70%;
		float: left;
		height: 80px;
		line-height: 40px;
		text-align: left;	
	}
	.remark_left p:nth-child(1){
		line-height: 40px;
		font-size: 1.6rem;
	}
	.remark_left p:nth-child(2){
		line-height: 18px;
		font-size: 1.2rem;
	}
	.remark_right{
		width: 30%;
		float: left;
		height: 80px;
		text-align: right;
		vertical-align: middle;
	}
	.remark_right img{
		width: 60px;
		height: 60px;
		margin-top: 10px;
	}
	.edit_btn{
		width: 90%;
		margin-left: 5%;
		height: 50px;
		line-height: 50px;
		border:1px solid #ffc386;
		border-radius: 5px;
		text-align: center;
		font-size: 1.4rem;
		color:#000;
		margin-top: 3rem;
		background-color: #fff;
	}
	.delete_btn{
		width: 90%;
		margin-left: 5%;
		height: 50px;
		line-height: 50px;
		border:1px solid #ffc386;
		border-radius: 5px;
		text-align: center;
		font-size: 1.4rem;
		color:#ff4e00;
		margin-top: 1rem;
		background-color: #fff;
		margin-bottom: 3rem;
	}
</style>