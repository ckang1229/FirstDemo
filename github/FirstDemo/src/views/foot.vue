<template>
  <!-- <div class="bgfooter">
      <img src="http://img.qufaya.com/www/images/ad/app-action-center/loading.gif">
  </div> -->
  <div>
    <div id="loadingToast" class="weui_loading_toast" v-show="show1">
      <div class="weui_mask_transparent"></div>
      <div class="weui_toast">
        <div class="weui_loading">
          <div class="weui_loading_leaf" v-for="i in 12" :class="['weui_loading_leaf_' + i]"></div>
        </div>
        <p class="weui_toast_content">{{text}}<slot></slot></p>
      </div>
    </div>
  </div>
  <div class="per-container">
  <div class="test" v-show="dataLength > 0">
    <div class="main_header">
      <div class="message">
      <span>{{ accountData.name }}</span>
      <span>
        <a v-link="{ path: '/grouplist' }" ><img src="https://img2.qufaya.com/www/images/mpapp/book/pturn.png">切换账本</a>
      </span>
      </div>
      <p v-show="accountData.membersCount > 1" class="ushare">共享中</p>
      <div class="money" v-link="{name:'flowStatistics',params:{bookuuid:accountData.bookuuid}}">
        <ul>
          <li>{{ totalin | currency '' | double }}</li>
          <li>{{ totalcha | currency '' |  double }}</li>
          <li>{{ totalout | currency '' | double }}</li>
        </ul>
      </div>
      <div class="header" v-link="{name:'flowStatistics',params:{bookuuid:accountData.bookuuid}}">
        <ul>
          <li>{{ monthNumber }}月收入</li>
          <li>
            <span v-if="accountData.enableMonthbudget">{{ nowMonth }}月预算余额</span>
            <span v-if="!accountData.enableMonthbudget">{{ monthNumber }}月结余</span>
          </li>
          <li>{{ monthNumber }}月支出</li>
        </ul>
      </div>
    </div>
    <div class="main_center"  v-show="detailLength > 0">
      <div class="detail" v-for="item in accountData.monthStats">
        <div v-for="items in item.dateStats">
          <div class="date">
            <ul>
                <li class="left">
                    <p>{{ items.date | monthdate}}</p>
                </li>
                <li class="center" v-show="items.totalCost > 0">
                    <p>支出：{{ items.totalCost | currency '' | double }}</p>
                </li>
                <li class="right" v-show="items.totalIncome > 0">
                    <p>收入：{{ items.totalIncome | currency '' | double }}</p>
                </li>
            </ul>
          </div>
          <div class="account-detail" v-for="c in items.expenses">
            <ul v-on:click="goBill(c.uuid)"> <!-- v-link="{name:'billDetail',params:{bookuuid:accountData.bookuuid,uuId:c.uuid}}" -->
              <li class="left">
                  <img :src="c.iconUrl">
              </li>
              <li class="center">
                  <p class="margin-t-1">{{ c.categoryName }}</p>
                  <!-- <p><span v-show="accountData.membersCount > 1">{{ c.creatorName }}&nbsp;</span>{{ c.remark || "无备注"}}</p> -->
                  <div class="ft-12">
                    <p v-show="accountData.membersCount > 1" class="pname">{{ c.creatorName }}&nbsp;</p>
                    <img v-show="c.images" src="http://img.qufaya.com/www/images/mpapp/book/pnote.png">
                    <p class="premark">{{ c.remark || " "}}</p>
                  </div>
              </li>
              <li class="right" v-bind:class="{ 'colorGreen': c.type==1 }">
                  <p>{{ c.cost | currency '' | double }}</p>
              </li> 
            </ul>   
          </div>
        </div>
      </div> 
    </div>
    <div class="main_center big_kong" v-show="detailLength == 0" v-cloak>
      <img src="https://img2.qufaya.com/weui/empty.png">
    </div>
  </div>
  <div class="foot" v-show="dataLength > 0">
   <!-- v-link="{name:'statistics'}" -->
    <div class="left" v-on:click="linkStatistics()">
      <p><img src="https://img2.qufaya.com/weuitest/tongji.png"></p>
      <p>统计</p>
    </div>
    <div class="center">
      <img src="https://img2.qufaya.com/weuitest/jizhang.png" v-on:click="linkAccount()">
      <!-- <button class="write_block" v-on:click="linkAccount()">记</button> -->
    </div>
    <div class="right" v-link="{name:'bookdetail'}">
      <p><img src="https://img2.qufaya.com/weuitest/more.png"></p>
      <p>更多</p>
    </div>
  </div>
  <div v-show="dataLength == 0" v-cloak>
    <div class="list-empty-container">
      <img src="https://img2.qufaya.com/www/images/mpapp/empty/empty.png" alt="empty">
      <p>这里什么都没有哦~</p>
      <p>快去下载APP创建账本吧~</p>
    </div>
    <div class="download-box">
      <div class="left ">
        <img src="https://img2.qufaya.com/www/images/shareApp/floatLayer/floatLogo.png">
      </div>
      <div class="center ">
        <ul>
          <li>
            <p>圈子账本</p>
          </li>
          <li>
            <p>请用微信账号登录APP</p>
          </li>
        </ul>
      </div>
      <div class="right">
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.account.book.quanzi&g_f=991653">用APP查看</a>
      </div>
    </div>
  </div>
  </div>

</template>
<script>

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      accountData: '',
      accountDetail: [],
      totalin: '',
      totalout: '',
      totalcha: '',
      title: '圈子账本',
      dataLength: '',
      detailLength: '',
      month: '2016-08-01 00:00:00',
      show1: true,
      text: '加载中',
      monthNumber: '',
      nowMonth: '',
    }
  },
  methods: {
    linkAccount: function (){
      this.$route.router.go({name:'account',params:{listnumber:window.$config.testuuid}})
      window.location.reload()
    },
    showLoad: function(){
      $('.bgfooter').css('display','none')
      $('.per-container').css('display','block')
    },
    linkStatistics: function(){
      this.$route.router.go({name:'statistics',params:{listnumber:window.$config.testuuid}})
      window.location.reload()
    },
    goBill: function(uuid){
      this.$route.router.go({name:'billDetail',params:{bookuuid:window.$config.testuuid,uuId:uuid}})
    }
  },
  ready () {
    var _this = this
    _this.show1 = true
    let self = this
    setTimeout(function(){self.showLoad()},2000)
    // 微信修改title的问题
    document.setTitle = function(t) {
      document.title = t;
      var i = document.createElement('iframe');
      i.src = '//m.baidu.com/favicon.ico';
      i.style.display = 'none';
      i.onload = function() {
        setTimeout(function(){
          i.remove();
        }, 9)
      }
      document.body.appendChild(i);
    }
    document.setTitle(_this.title)

    var month = []
    
    this.$http.get(window.$config.test + '/weixin/h5/books').then((response) => {    
      _this.dataLength = response.data.data.length
      // console.log(_this.dataLength)   
      if(_this.dataLength > 0){
        window.$config.testuuid = response.data.data[0].bookuuid
        this.$http.get(window.$config.test + '/weixin/h5/book/' + window.$config.testuuid ).then((response) => {
          _this.accountData = response.data.data
          console.log(_this.accountData)
          _this.detailLength = _this.accountData.monthStats.length
          if(_this.accountData.monthStats.length == 0){
            _this.totalin = 0
            _this.totalout = 0
            _this.totalcha = 0
          }
          if(_this.accountData.monthStats.length > 0){
            for(var i=0;i<_this.accountData.monthStats.length;i++){
                month[i] = _this.accountData.monthStats[i]
            }
            _this.monthNumber = _this.accountData.monthStats[0].month.substring(5,7);
            if(_this.monthNumber < 10){
              _this.monthNumber = _this.monthNumber.replace(/0/, "")
            }
            _this.nowMonth = _this.monthNumber
            _this.totalin = _this.accountData.monthStats[0].totalIncome
            _this.totalout = _this.accountData.monthStats[0].totalCost
            _this.totalcha = _this.totalin - _this.totalout
            if(_this.accountData.enableMonthbudget){
              _this.totalyu = _this.accountData.monthbudget
              _this.totalcha = _this.totalyu - _this.totalout
            }else if(_this.accountData.enableMonthbudget == false){
              _this.totalin = _this.accountData.monthStats[0].totalIncome
              _this.totalout = _this.accountData.monthStats[0].totalCost
              _this.totalcha = _this.totalin - _this.totalout
            }
          } 
          // console.log("success")
          setTimeout(function () {
            _this.show1 = false
          }, 1500)
        }, (response) => {
          console.log("error")
          this.$route.router.go({name:'error'})
        })
      }
      if(_this.dataLength == 0){
        setTimeout(function () {
          _this.show1 = false
        }, 1000)
      }       
      // 滑动改变顶部的统计数据
      $(window).scroll(function(){
        var thisScrollTop = $(this).scrollTop();
        var oUl = $(".main_center .detail");
        var aUlHeight = [];
        oUl.each(function(i){
          $(this).attr("id", "ul_" + i);
          aUlHeight[i] = $(this).offset().top;
          if(thisScrollTop > aUlHeight[i] - 147.5){            
            _this.totalin = month[i].totalCost;
            _this.totalout = month[i].totalIncome;
            if(_this.accountData.enableMonthbudget == false){
              _this.monthNumber = month[i].month.substring(5,7);
              if(_this.monthNumber < 10){
                _this.monthNumber = _this.monthNumber.replace(/0/, "");
              }
              _this.totalin = month[i].totalIncome;
              _this.totalout = month[i].totalCost;
              _this.totalcha = _this.totalin - _this.totalout;

            }
            if(_this.accountData.enableMonthbudget == true){
              _this.monthNumber = month[i].month.substring(5,7);
              if(_this.monthNumber < 10){
                _this.monthNumber = _this.monthNumber.replace(/0/, "");
              }
              _this.totalin = month[i].totalIncome;
              _this.totalout = month[i].totalCost;

            }

          }
        })       
      });
        
    }, (response) => {
      console.log("error")
      this.$route.router.go({name:'error'})
      // console.log(response.data)
    })
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
