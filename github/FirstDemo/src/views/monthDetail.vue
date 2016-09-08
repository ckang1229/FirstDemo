<template>
	<!-- 月份流水统计 -->
  <div class="month_main">
    <div class="detail" v-for="item in monthData">
      <div class="date">
        <ul>
            <li class="left">
                <p>{{ item.date | monthdate }}</p>
            </li>
            <li class="center">
                <p>支出：{{ item.totalCost | currency '' | double }}</p>
            </li>
            <li class="right">
                <p>收入：{{ item.totalIncome | currency '' | double }}</p>
            </li>
        </ul>
      </div>
      <div class="account-detail" v-for="c in item.expenses">
        <ul  v-on:click="getEdit(c.uuid)">
          <li class="left">
              <img :src="c.iconUrl">
          </li>
          <li class="center">
              <!-- <p>{{ c.categoryName }}</p>
              <p>{{ c.remark || '无备注' }}</p> -->
              <p class="margin-t-1">{{ c.categoryName }}</p>
              <div class="ft-12">
                <p class="pname">{{ c.creatorName }}</p>
                <img v-show="c.images" src="http://img.qufaya.com/www/images/mpapp/book/pnote.png">
                <p class="premark">{{ c.remark || "未填写"}}</p>
              </div>
          </li>
           <!-- v-bind:class="{ 'colorGreen': c.type==1 }" -->
          <li class="right" v-bind:class="{ 'colorGreen': c.type==1 }">
              <p>{{ c.cost | currency '' | double }}</p>
          </li> 
        </ul>   
      </div>
    </div> 
  </div>
</template>
<script>
export default{
	data () {
		return {
			flag:true,
      bookuuid: '',
      month: '',
      memberid: '',
      monthData: ''
		}
	},
  methods: {
    getEdit: function(uuid){
      var _this = this
      console.log(_this.bookuuid,uuid)
      this.$route.router.go({name:'billDetail',params:{bookuuid:_this.bookuuid,uuId:uuid}})
    }
  },
	route: {
		data (){
			console.log(this.$route.params.bookuuid + "route")
      console.log(this.$route.params.month + "route")
			console.log(this.$route.params.memberid + "route")

      var _this = this
      _this.bookuuid = this.$route.params.bookuuid
      _this.month = this.$route.params.month
      _this.memberid = this.$route.params.memberid
      this.$http.jsonp({
        url: window.$config.test + '/weixin/h5/book/' + _this.bookuuid + '/monthexpenses',
        method: 'POST',
        emulateJSON: true,
        data: JSON.stringify({
          month:_this.month,
          memberid:_this.memberid
        }),
      }).then((response) => {
        console.log("获取月份数据")
        console.log(response)
        _this.monthData = response.data.data
      }, (response) => {
          console.log("error")
      })
		}
	}
}
</script>
<style scoped>
	.month_main{
		margin-top: 0;
	}
</style>