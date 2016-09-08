<template>
  <div class="test">
    <!-- 饼图统计 -->
    <tab :line-width="0" active-color="#fc378c">
      <tab-item :selected="categoriestypes !== $index" v-for="item in list2" @click="selectType($index)" :value.sync="categoriestypes">{{ item }}</tab-item>
    </tab> 
		<div class="sta_tip">
      <datetime title="" format="YYYY-MM" :value.sync="statime" @change="getStistics(statime)"></datetime>
    </div>
    <!-- 数据任何一方不为空 -->
    <div v-show="canvasLength > 0" class="bg_white">
      <!-- 支出不为空，收入不为空 -->
      <div v-show="cLength>0 && iLength>0">
        <div v-show="categoriestypes == 0" class="sta_canvas_outer">
          <div class="canvas_tip">
            <p>{{ costExpenses.totalCost | currency '' | double}}</p>
            <p>总支出</p>
          </div>
          <canvas class="myChart" id="costChart1" width="230" height="230"></canvas>
        </div>
        <div class="statis_type" v-for="item in costExpenses.expensesByCategory" v-show="categoriestypes == 0"> 
          <ul>
            <li><img :src="item.categoryurl"></li>
            <li>{{ item.categoryname }}</li>
            <!-- <li>{{ item.percent * 100 | currency ''  }}%</li> -->
            <li>
              <span v-show="item.percent > 0.0000">{{ item.percent * 100 | currency '' }}%</span> 
              <span v-show="item.percent == 0.0000"> &lt;0.01% </span>
            </li>
            <li>{{ item.subTotalCost | currency '' | double }}</li>
          </ul>  
        </div>
        <div v-show="categoriestypes == 1" class="sta_canvas_outer">
          <div class="canvas_tip">
            <p>{{ inExpenses.totalIncome | currency '' | double}}</p>
            <p>总收入</p>
          </div>
          <canvas class="myChart" id="inChart1" width="230" height="230"></canvas>
        </div>
        <div class="statis_type" v-show="categoriestypes == 1" v-for="item in inExpenses.expensesByCategory"> 
          <ul>
            <li><img :src="item.categoryurl"></li>
            <li>{{ item.categoryname }}</li>
            <li>
              <span v-show="item.percent > 0.0000">{{ item.percent * 100 | currency '' }}%</span> 
              <span v-show="item.percent == 0.0000"> &lt;0.01% </span>
            </li>
            <li>{{ item.subTotalIncome | currency '' | double }}</li>
          </ul>
        </div>
      </div>
      <!-- 支出不为空，收入为空 -->
      <div v-show="cLength>0 && iLength==0">
        <div v-show="categoriestypes == 0" class="sta_canvas_outer">
          <div class="canvas_tip">
            <p>{{ costExpenses.totalCost | currency '' | double}}</p>
            <p>总支出</p>
          </div>
          <canvas class="myChart" id="costChart2" width="230" height="230"></canvas>
        </div>
        <div class="statis_type" v-for="item in costExpenses.expensesByCategory" v-show="categoriestypes == 0"> 
          <ul>
            <li><img :src="item.categoryurl"></li>
            <li>{{ item.categoryname }}</li>
            <li>
              <span v-show="item.percent > 0.0000">{{ item.percent * 100 | currency '' }}%</span> 
              <span v-show="item.percent == 0.0000"> &lt;0.01% </span>
            </li>
            <li>{{ item.subTotalCost | currency '' | double }}</li>
          </ul>  
        </div>
        <div v-show="categoriestypes == 1" class="sta_canvas_outer">
          <div class="canvas_tip">
            <p>{{ 0 }}</p>
            <p>总收入</p>
          </div>
          <canvas class="myChart" id="emptyChart2" width="230" height="230"></canvas>
          <div class="show_empty">暂无可统计账单</div>
        </div>
      </div>
      <!-- 支出为空，收入不为空 -->
      <div v-show="cLength==0 && iLength>0">      
        <div v-show="categoriestypes == 0" class="sta_canvas_outer">
          <div class="canvas_tip">
            <p>{{ 0 }}</p>
            <p>总支出</p>
          </div>
          <canvas class="myChart" id="emptyChart3" width="230" height="230"></canvas>
          <div class="show_empty">暂无可统计账单</div>
        </div>
        <div v-show="categoriestypes == 1" class="sta_canvas_outer">
          <div class="canvas_tip">
            <p>{{ inExpenses.totalIncome | currency '' | double}}</p>
            <p>总收入</p>
          </div>
          <canvas class="myChart" id="inChart3" width="230" height="230"></canvas>
        </div>
        <div class="statis_type" v-show="categoriestypes == 1" v-for="item in inExpenses.expensesByCategory"> 
          <ul>
            <li><img :src="item.categoryurl"></li>
            <li>{{ item.categoryname }}</li>
            <li>
              <span v-show="item.percent > 0.0000">{{ item.percent * 100 | currency '' }}%</span> 
              <span v-show="item.percent == 0.0000"> &lt;0.01% </span>
            </li>
            <li>{{ item.subTotalIncome | currency '' | double }}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 支出为空，收入为空 -->
    <div v-show="canvasLength == 0" class="sta_canvas_outer bg_white">
      <div class="canvas_tip" v-show="categoriestypes == 0">
        <p>{{ 0 }}</p>
        <p>总支出</p>
      </div>
      <div class="canvas_tip" v-show="categoriestypes == 1">
        <p>{{ 0 }}</p>
        <p>总收入</p>
      </div>
      <canvas class="myChart" id="emptyChart" width="230" height="230"></canvas>
      <div class="show_empty">暂无可统计账单</div>
    </div>   
  </div>  
</template>

<script>
import { Group, Cell, Tab, TabItem, Datetime } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Tab,
    TabItem,
    Datetime
  },
  data () {
    return {
      categoriestypes: 0,
      list2: ['收入', '支出'],
      statime: '',
      costExpenses: '',
      inExpenses: '',
      statimes: '',
      emptycanvas: false,
      expensesByCategory: '',
      totalCost: '',
      totalIncome: '',
      canvasLength: '',
      costLength: '',
      inLength: '',
      cLength: '',
      iLength: '',
      showEmptyIn: false,
      showEmptyOut: false,
      title: '统计'
    }
  },
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

      _this.statime = new Date()
      var years = _this.statime.getFullYear().toString()
      var months = (_this.statime.getMonth()+1).toString()
      // var days = '01'
      if(months < 10){
        months = '0'+months
      }
      _this.statime = years + '-' + months
      window.$config.testuuid = this.$route.params.listnumber
      this.getStistics(_this.statime)
  },
  methods: {
    selectType: function (index) {
      var _this = this
      // 收入
      if(index == 0){
        this.categoriestypes = 1
      }
      // 支出
      if(index == 1){
        this.categoriestypes = 0
      }
    },
    getStistics: function (stime){
      var _this = this
      stime = stime + '-01'
      // console.log("执行一次就够了")
      this.$http.jsonp({
        url: window.$config.test + '/weixin/h5/book/' + window.$config.testuuid + '/statistics',
        method: 'POST',
        emulateJSON: true,
        data: JSON.stringify({month: stime}),
      }).then((response) => {
          _this.canvasLength = Object.keys(response.data.data).length
          var datacost = []
          var datain = []
          console.log(_this.canvasLength)
          // 当该月收入支出均无记录时
          if(_this.canvasLength == 0){
            var emptychart = document.getElementById("emptyChart").getContext("2d")
            new Chart(emptychart).Doughnut(dataempty, {
              segmentShowStroke: false,
              animationEasing: "easeOut",
              showTooltips: false,
              showScale: false,
              animationSteps: 30,
            })
          }
          // 当该月收入或支出有记录时
          if(_this.canvasLength > 0){
            var costChart1 = document.getElementById("costChart1").getContext("2d")
            costChart1.clearRect(0,0,230,230)
            var inChart1 = document.getElementById("inChart1").getContext("2d")
            inChart1.clearRect(0,0,230,230)
            //当收入和支出都有记录时
            _this.costExpenses = response.data.data.costExpenses
            _this.inExpenses = response.data.data.incomeExpenses
            // 收入和支出是否有数据 大于0 为有数据 ==0为无数据
            _this.cLength = Object.keys(_this.costExpenses).length
            _this.iLength = Object.keys(_this.inExpenses).length
            // console.log("cLength=" + _this.cLength + ",iLength=" + _this.iLength)
            if(_this.cLength > 0 && _this.iLength >0){
              _this.costLength = _this.costExpenses.expensesByCategory.length
              _this.inLength = _this.inExpenses.expensesByCategory.length
              for (var i = 0; i < _this.costLength; i++) {
                datacost.push({
                  "value": _this.costExpenses.expensesByCategory[i].subTotalCost,
                  "color": '#' + _this.costExpenses.expensesByCategory[i].color
                })
              }
              var costchart = document.getElementById("costChart1").getContext("2d")
              new Chart(costchart).Doughnut(datacost, {
                segmentShowStroke: false,
                animationEasing: "easeOut",
                showTooltips: false,
                showScale: false,
                animationSteps: 30,
              })
              for (var i = 0; i < _this.inLength; i++) {
                datain.push({
                  "value": _this.inExpenses.expensesByCategory[i].subTotalIncome,
                  "color": '#' + _this.inExpenses.expensesByCategory[i].color
                })
              }
              var inchart = document.getElementById("inChart1").getContext("2d")
              new Chart(inchart).Doughnut(datain, {
                segmentShowStroke: false,
                animationEasing: "easeOut",
                showTooltips: false,
                showScale: false,
                animationSteps: 30,
              })
              // console.log("支出数据个数=" + _this.costLength +",收入数据个数=" + _this.inLength)
            }
            if(_this.cLength>0 && _this.iLength==0){
              var costChart2 = document.getElementById("costChart2").getContext("2d")
              costChart2.clearRect(0,0,230,230)
              _this.costLength = _this.costExpenses.expensesByCategory.length
              for (var i = 0; i < _this.costLength; i++) {
                datacost.push({
                  "value": _this.costExpenses.expensesByCategory[i].subTotalCost,
                  "color": '#' + _this.costExpenses.expensesByCategory[i].color
                })
              }
              var costchart = document.getElementById("costChart2").getContext("2d")
              new Chart(costchart).Doughnut(datacost, {
                segmentShowStroke: false,
                animationEasing: "easeOut",
                showTooltips: false,
                showScale: false,
                animationSteps: 30,
              })
              var emptychart = document.getElementById("emptyChart2").getContext("2d")
              new Chart(emptychart).Doughnut(dataempty, {
                segmentShowStroke: false,
                animationEasing: "easeOut",
                showTooltips: false,
                showScale: false,
                animationSteps: 30,
              })
            }
            if(_this.cLength==0 && _this.iLength > 0){
              var inChart3 = document.getElementById("inChart3").getContext("2d")
              inChart3.clearRect(0,0,230,230)
              _this.inLength = _this.inExpenses.expensesByCategory.length
              for (var i = 0; i < _this.inLength; i++) {
                console.log(_this.inExpenses.expensesByCategory[i].subTotalIncome)
                datain.push({
                  "value": _this.inExpenses.expensesByCategory[i].subTotalIncome,
                  "color": '#' + _this.inExpenses.expensesByCategory[i].color
                })
              }
              var inchart = document.getElementById("inChart3").getContext("2d")
              new Chart(inchart).Doughnut(datain, {
                segmentShowStroke: false,
                animationEasing: "easeOut",
                showTooltips: false,
                showScale: false,
                animationSteps: 30,
              })
              var emptychart = document.getElementById("emptyChart3").getContext("2d")
              new Chart(emptychart).Doughnut(dataempty, {
                segmentShowStroke: false,
                animationEasing: "easeOut",
                showTooltips: false,
                showScale: false,
                animationSteps: 30,
              })
            }
          }
      },(response) => {
        console.log("获取统计失败")
      })
      // setTimeout(this.getStistics(_this.statime),3000)
    }
  } 
}
var dataempty = [{
  value: 100,
  color: "#f2f2f2"
},
{
  value: 0,
  color: "#f8f8f8"
}]
</script>
<style type="text/css">
  @import '~vux/dist/vux.css'
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

