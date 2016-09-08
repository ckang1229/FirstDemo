<template>
  <div class="test">
    <!-- <div>account记账页面</div> -->
    <tab :line-width="0" active-color="#fc378c">
     <!-- @click="categoriestypes = $index" :selected="categoriestypes == $index"-->
      <tab-item :selected="categoriestypes !== $index" v-for="item in list2" @click="selectType($index)" :value.sync="categoriestypes">{{ item }}</tab-item>
    </tab>
    <group>
    <!-- placeholder="0.00" -->
      <x-input :value.sync="cost" id="acc_cost" title="金额"  type="number" show-clear="false"></x-input>
      <!-- <x-number :value.sync="cost" title="金额" placeholder="请填写" :min=0 @on-change="change"></x-number> -->
      <cell title="分类" id="fenlei" :value="cname" is-link @click="showPopup=true"></cell>
      <popup :show.sync="showPopup" class="checker-popup">
        <div style="margin:20px;">
          <checker :value.sync="cname" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
            <!-- 收入 -->  
            <checker-item v-if="categoriestypes==1" v-for="item in accGory.incomeCategories" :value.sync="item.categoryname" @click="cuuid = item.categoryuuid" @on-item-click="hideRedone()">{{ item.categoryname }}</checker-item>
            <!-- 支出 -->
            <checker-item v-if="categoriestypes==0" v-for="item in accGory.costCategories" :value.sync="item.categoryname" @click="cuuid = item.categoryuuid" @on-item-click="hideRedone()">{{ item.categoryname }}</checker-item>
          </checker>
        </div>
      </popup>
      <x-input :value.sync="remark" title="备注" placeholder="选填(限50个字)" @change="limitRemark(remark)" v-ref:input></x-input>
      <toast :show.sync="showRemrakLimit" type="text">备注不能超过50个字</toast>
    </group>
    <hr class="hr-grey"> 
    <group>
      <cell title="账户" id="zhanghu" :value="aname" is-link @click="showPopup1=true"></cell>
      <popup :show.sync="showPopup1" class="checker-popup">
        <div>
          <checker :value.sync="aname" default-item-class="demo1-item" selected-item-class="demo1-item-selected" disabled-item-class="demo1-item-disabled">
            <!-- 账户 -->
            <checker-item  v-for="item in accPersonData" :value="item.accountname" @on-item-click="hideRedTwo()" @click="auuid = item.accountuuid">{{ item.accountname }}</checker-item>
            <checker-item :value="notAcc" @on-item-click="hideRedTwo()" @click="auuid = notAuid">{{ notAcc }}</checker-item>
          </checker>
        </div>      
      </popup>
      <datetime title="时间" class="block" format="YYYY-MM-DD" :value.sync="ctime"></datetime>
    </group>  

    <div class="btnouter"><button v-on:click="submitAccount(bookuuid,categoriestypes,cost,remark,cuuid,auuid,ctime,recorduuid)">完成</button></div> 

  </div>  
</template>

<script>
import { Group, Cell, Tab, TabItem, Datetime, Panel, Radio, XInput, Checker, CheckerItem, Popup, Switch, XButton, Toast } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Tab,
    TabItem,
    Datetime,
    Panel,
    Radio,
    XInput,
    Checker,
    CheckerItem,
    Popup,
    Switch,
    XButton,
    Toast
  },
  data () {
    return {
      categoriestypes: 1,//账单分类 0-是支出，1-是收入
      accTypeData: '',
      showPopup: false,
      showPopup1: false,
      radioData: '',
      list2: ['收入', '支出'],
      // ctime: '请选择',
      ctime: new Date(),
      testuuid: '',
      accPersonData: '',
      auuid: null,
      cuuid: '',
      title: '编辑',
      notAcc: '不选账户',
      notAuid: 'null',
      aname: '请选择',
      cost: '',
      cname: '请选择',
      remark: '',
      accGory: '',
      billData: '',
      recorduuid: '',
      bookuuid: '',
      showRemrakLimit: false
    }
  },
  methods: {
    selectType: function (index) {
      if(index == 0){
        this.categoriestypes = 1
      }
      if(index == 1){
        this.categoriestypes = 0
      }
      // console.log("index-after:" + this.categoriestypes)
    },
    hideRedone: function () {
      $('#fenlei .weui_cell_ft').css('color','#888')
      this.showPopup=false
    },
    hideRedTwo: function () {
      $('#zhanghu .weui_cell_ft').css('color','#888')
      this.showPopup1=false
    },
    limitRemark: function(remark){
      if(remark.length > 50){
        this.showRemrakLimit = true
      }
    },
    submitAccount: function (uid, type, cost, remark, cuid, auid, ctime, recorduuid) {
      if(!cost || cost > 99999999 || cost <= 0){
        cost = 0
        $('#acc_cost input').addClass("weui_input_wyd")
      }
      console.log(remark)
      var remrakLimit
      if(remark.length > 50){
        this.showRemrakLimit = true
        remrakLimit = false
      }else{
        remrakLimit = true
      }
      // if(!cuid){
      //   $('#fenlei .weui_cell_ft').css('color','red')
      // }
      var auidFlag;
      if(typeof(auid) == 'undefined' || auid.length >0){
        auidFlag = true
      }else{
        auidFlag = false
      }

      if(ctime == '请选择'){
        $('.block .weui_cell_ft').css('color','red')
      }
      console.log(remrakLimit)
      if(cuid && auidFlag && uid && cost && ctime!=='请选择' && remrakLimit){
        $('.block .weui_cell_ft').css('color','#888')
        $('#fenlei .weui_cell_ft').css('color','#888 !important')
        console.log(cost)
        if(typeof(remark)=="undefined" ){
          remark = null
        }
        if( type===0 || type===1){
          this.$http.jsonp({
            url: window.$config.test + '/weixin/h5/book/expense/edit',
            method: 'POST',
            emulateJSON: true,
            data: JSON.stringify({
              bookuuid:uid,
              type: type,
              cost: cost,
              remark: remark,
              categoryuuid: cuid,
              accountuuid: auid,
              cts: ctime,
              uuid: recorduuid
            }),
          }).then((response) => {
              console.log("编辑记录提交成功")
              this.$route.router.go({name:'accountdetail',params:{listnumber: this.$route.params.bookuuid}})
          }, (response) => {
              console.log("error")
              this.$route.router.go({name:'error'})
          })
        }     
      }else {
        console.log(cuid,auidFlag,uid,cost,ctime,remrakLimit)
        console.log("数据不完整")
      }  
    }
  },
  ready () {
    var _this = this
    _this.ctime = new Date()
    var years = _this.ctime.getFullYear().toString()
    var months = (_this.ctime.getMonth()+1).toString()
    var days = _this.ctime.getDate().toString()
    if(months < 10){
      months = '0'+months
    }
    if(days < 10){
      days = '0'+days
    }
    _this.ctime = years + '-' + months + '-' + days
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
    data (){
      console.log(this.$route.params.bookuuid + "route")
      console.log(this.$route.params.uuId + "route")
      var _this = this
      // 获取到账户类别
      _this.bookuuid = this.$route.params.bookuuid
      this.$http.get(window.$config.test + '/weixin/h5/book/' + this.$route.params.bookuuid + '/accounts').then((response) => {
        _this.accPersonData = response.data.data
      }, (response) => {
        console.log("error")
      })
      // 获取消费类型类别
      this.$http.get(window.$config.test + '/weixin/h5/book/' + this.$route.params.bookuuid + '/categories').then((response) => {
        _this.accGory = response.data.data
        _this.testuuid = window.$config.testuuid      
        console.log(_this.accGory)
      }, (response) => {
        console.log("error")
      })

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
          // console.log(_this.billData)
          _this.categoriestypes = _this.billData.type
          _this.cost = _this.billData.cost + ''
          _this.cname = _this.billData.categoryName
          _this.ctime = _this.billData.cts
          _this.aname = _this.billData.accountname
          _this.auuid = _this.billData.accountuuid
          _this.cuuid = _this.billData.categoryuuid
          _this.recorduuid = _this.billData.uuid 
          if(_this.billData.remark){
            _this.remark = _this.billData.remark
          }else{
            _this.remark = ""
          }         
          // console.log(_this.auuid,_this.cuuid,_this.cname,_this.aname,_this.ctime,_this.recorduuid)
      }, (response) => {
          console.log("error")
      })
    }
  }
}
</script>
<style type="text/css">
  @import '~vux/dist/vux.css'
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

