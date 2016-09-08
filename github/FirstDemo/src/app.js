
import './css/common.css';
import './css/animate.css';
import './css/account.css';
import './css/style.css';
import './css/grouplist.css';
import './css/flow.css'

import Vue from 'vue';
import VueRouter from 'vue-router';
import fastclick from 'fastclick';
import vueResource from 'vue-resource';
import echarts from 'echarts/lib/echarts'
fastclick.attach(document.body);

/* 声明一个vue实例 */
import appVue from './app.vue'; 
const App = Vue.extend(appVue);



Vue.use(VueRouter);
Vue.use(vueResource);

const router = new VueRouter(
	{
		hashbang: true,  //为true的时候 example.com/#!/foo/bar ， false的时候 example.com/#/foo/bar
		linkActiveClass:'custom-active-class', //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
	}
);


Vue.filter('monthdate', function (value) {
  return value.substring(5, 10)
});

Vue.filter('double', function (value) {
  return value.replace(/\.00/," ")
});

import routers from './routers';
routers(router);
router.start(App,'#app');