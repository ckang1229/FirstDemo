<template>
    <!-- vux的scroller -->
  <div v-show="mLength > 1">
    <!-- <scroller lock-y :scrollbar-x=false :bounce=false v-ref:scroller>
      <div class="box1" id="box1">
      	<div class="box1-item" @click="getAllDetail()"><span>全部成员</span></div>
        <div class="box1-item" v-for="item in flowData.members" @click="getPersonDetail(item.memberid)"><span>{{ item.membername }}</span></div>
      </div>
    </scroller> -->
    <div class="member_outer">
      <div class="member" id="member">
        <div class="member_item" v-bind:class="{ 'itemactive' : i == -1 }" @click="getAllDetail()">全部成员</div>
        <div class="member_item" v-for="item in flowData.members" v-bind:class="{ 'itemactive' : i == $index }" @click="getPersonDetail(item.memberid,$index)">
          {{ item.membername }}
        </div>
      </div>
    </div>

    <div class="flow_record" v-show="flowData.yearFlowStatistics">
      <div  v-for="f in flowData.yearFlowStatistics">
        <div class="year_flow">
          <div class="flow_left">{{ f.year }}</div>
          <div class="flow_middle">
            <p>收：{{ f.totalIncome | currency '' }}</p>
            <p>支：{{ f.totalCost | currency '' }}</p>
          </div>
          <div class="flow_right">
            <p>{{ f.totalIncome - f.totalCost | currency ''}}</p>
            <p>结余</p>
          </div>
        </div>
        <div v-for="n in f.monthFlowStatistics" >
          <div class="month_flow" v-on:click="getMonthDetail(f.year,n.month)">
            <div class="flow_left">{{ n.month }}月</div>
            <div class="flow_middle">
              <p>收：{{ n.totalIncome | currency '' }}</p>
              <p>支：{{ n.totalCost | currency '' }}</p>
            </div>
            <div class="flow_right">
              <p>{{ n.totalIncome - n.totalCost | currency ''}}</p>
              <p>结余</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flow_record big_kong" v-show="!flowData.yearFlowStatistics">
      空
    </div>
  </div>
  <div v-show="mLength == 1">
    <div class="flow_record flow_top" v-show="flowData.yearFlowStatistics">
      <div  v-for="f in flowData.yearFlowStatistics">
        <div class="year_flow">
          <div class="flow_left">{{ f.year }}</div>
          <div class="flow_middle">
            <p>收：{{ f.totalIncome | currency '' }}</p>
            <p>支：{{ f.totalCost | currency '' }}</p>
          </div>
          <div class="flow_right">
            <p>{{ f.totalIncome - f.totalCost | currency ''}}</p>
            <p>结余</p>
          </div>
        </div>
        <div v-for="n in f.monthFlowStatistics" >
          <div class="month_flow" v-on:click="getMonthDetail(f.year,n.month)">
            <div class="flow_left">{{ n.month }}月</div>
            <div class="flow_middle">
              <p>收：{{ n.totalIncome | currency '' }}</p>
              <p>支：{{ n.totalCost | currency '' }}</p>
            </div>
            <div class="flow_right">
              <p>{{ n.totalIncome - n.totalCost | currency ''}}</p>
              <p>结余</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flow_record big_kong" v-show="!flowData.yearFlowStatistics">
      空
    </div>
  </div>
	
</template>
<script>
export default {
  data () {
    return {
      item: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
      flowData: '',
      mLength: '',
      members:'',
      yearFlowStatistics: '',
      bookuuid: '',
      i: ''
    }
  },
  methods: {
  	getAllDetail: function(){
  		var _this = this
      _this.i = -1
  		this.$http.get(window.$config.test + '/weixin/h5/book/' + this.$route.params.bookuuid + '/flowstatistics').then((response) => {
        // console.log("获取年份流水统计")
        _this.flowData = response.data.data
        _this.mLength = _this.flowData.members.length
        document.getElementById("member").style.width = (_this.mLength+2)*140 + "px";
      }, (response) => {
        console.log("error")
      })
  	},
  	getPersonDetail: function(memberid,index){
  		var _this = this
      _this.i = index
      window.$config.memberid = memberid
			this.$http.jsonp({
        url: window.$config.test + '/weixin/h5/book/' + this.$route.params.bookuuid + '/member/flowstatistics',
        method: 'POST',
        emulateJSON: true,
        data: JSON.stringify({
          memberid:memberid
        }),
      }).then((response) => {
        _this.flowData = response.data
        _this.mLength = _this.flowData.members.length
      }, (response) => {
          console.log("error")
      })
  	},
    getMonthDetail: function(year,month){
      if(typeof(window.$config.memberid) == "undefined"){
        window.$config.memberid = 0
      }
      if(month < 10){
        month = year + '-0' + month + '-' + '01'
        console.log(month)
      }else{
        month = year + '-' + month + '-' + '01'
        console.log(month)
      }
      console.log(year,month,window.$config.memberid)

      this.$route.router.go({name:'monthDetail',params:{bookuuid:this.$route.params.bookuuid,month:month,memberid:window.$config.memberid}})
    },
    getMonth: function(year,month,memberid){
      console.log(year,month,memberid)
      if(month < 10){
        month = year + '-0' + month + '-' + '01'
        console.log(month)
      }else{
        month = year + '-' + month + '-' + '01'
        console.log(month)
      }
      this.$route.router.go({name:'monthDetail',params:{bookuuid:this.$route.params.bookuuid,month:month,memberid:memberid}})
    }
  },
  ready () {
  	var boxwidth = this.item.length;
  	document.getElementById("member").style.width = boxwidth*130 + "px";
    if(typeof(window.$config.memberid) == "undefined"){
      window.$config.memberid = 0
    }
    console.log(window.$config.memberid)
  },
  route: {
  	data (){
  		// 获取年份流水统计 
  		var _this = this
      _this.bookuuid = this.$route.params.bookuuid
      this.getAllDetail()
  	}
  }
}
</script>
<style scoped>
.app{
	background-color: #f2f2f2 !important;
}
.box1 {
  height: 80px;
  position: relative;
  /*width: 1490px;*/
  padding-top: 20px;
  box-sizing: border-box;
}
.box1-item {
  width: 120px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border-radius: 20px;
	background-color: #fff;
	color: #000;
	float: left;
	margin-left: 20px;
	font-size: 1.4rem;
}
.box1-item:first-child {
  margin-left: 10px;
}

</style>