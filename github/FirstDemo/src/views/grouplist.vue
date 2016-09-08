<template>
<div class="container book-group-list-container">
  <div class="content">
    <div class="bg-list" v-for="item in grouplistData">
      <a v-link="{name:'accountdetail',params:{listnumber:item.bookuuid}}" v-on:click="linkDetail(item.bookuuid)" target="_blank">
        <ul>
          <li>
              <img src="https://img2.qufaya.com/www/images/mpapp/book-group-list/picon.png">
          </li>
          <li>
              <p>{{ item.name }}</p>
              <p>{{ item.membersCount }}人</p><!-- membersCount -->
          </li>
          <li class="point">
              <img src="https://img2.qufaya.com/www/images/mpapp/book-group-list/ppoint.png">
          </li>
        </ul>
      </a>
    </div>
  </div>
  <div class="add_foot" v-link="{name:'addbook'}">
    <p><img src="https://img2.qufaya.com/weuitest/addicon.png"></p>
    <p>新建账本</p>
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
      grouplistData: [],
      title: '圈子账本',
      loadShow: false
    }
  },
  methods: {
    linkDetail: function (num) {
      var _this = this
      this.$http.get(window.$config.test + '/weixin/h5/book/' + num).then((response) => {
        console.log("success")
        _this.accountData = response.data.data
        console.log(_this.accountData.monthStats.length)
        if(_this.accountData.monthStats.length == 0){
          _this.totalin = 0
          _this.totalout = 0
          _this.totalcha = 0
        }
        _this.totalin = _this.accountData.monthStats[0].totalIncome
        _this.totalout = _this.accountData.monthStats[0].totalCost
        _this.totalcha = _this.totalin - _this.totalout
        
        // console.log(_this.accountData)
        // transition.next({
        //   loadShow: true
        // })
      }, (response) => {
        console.log("error")
        this.$route.router.go({name:'error'})
      })
    }
  },
  // ready () {
  //   var _this = this
  //   this.$http.get('http://quanzi.'+window.$config.test+'.qufaya.com/weixin/h5/books').then((response) => {
  //     _this.grouplistData = response.data.data
  //     // console.log(_this.grouplistData)
  //   }, (response) => {
  //     // console.log(response.data)
  //   }) 
  // }
  ready () {
    var _this = this
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
    
  },
  route: {
    waitForData: true,
    data (transition) {
      var _this = this
      this.$http.get(window.$config.test + '/weixin/h5/books').then((response) => {
        _this.grouplistData = response.data.data 
        transition.next({
          loadShow: true
        })
      }, (response) => {
        this.$route.router.go({name:'error'})
      }) 
    }
  }
}
</script>
