<template>
	<div>
		<scroller lock-x :scrollbar-y="false" use-pullup="true">
		<swiper :list="list" auto></swiper>
		<div id="homemain-title">国际</div>
		<scroller lock-y :scrollbar-x="false">
		  <div class="box1">
			<div class="box1-item">
				<a href="javascript:;">
					<img class="m-goodpic" src="http://spyl.zhaoshang01.com/Attachment/site/news/201410/5451a30a4129f.jpg" alt="" />
					<span class="p-title">雪肌精明星精选组合套餐</span>
					<span class="p-price">￥389</span>
				</a>
		  	</div>
		  </div>
		</scroller>
		</scroller>
	<div>
</template>

<script>
import { Swiper, SwiperItem, Scroller } from 'vux'

export default {
  components: {
    Swiper,
    SwiperItem,
    Scroller
  },
  data: function () {
    return {
      list: [{
        url: 'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&ampmid=400385458&ampidx=1&ampsn=78f6b8d99715384bdcc7746596d88359&ampscene=19#wechat_redirect',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
        title: '如何手制一份秋意的茶？'
      }, {
        url: 'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&ampmid=400160890&ampidx=1&ampsn=29ef02af25793a11a3f6aec92bfb46c1&ampscene=19#wechat_redirect',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
        title: '茶包VS原叶茶'
      }, {
        url: 'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&ampmid=400094682&ampidx=1&ampsn=8231a2053b772b2108784fccc254d28c&ampscene=19#wechat_redirect',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
        title: '播下茶籽，明春可发芽？'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*#homemain-title{
	font-size:30px;
	text-align: center;
}
.box1-item a{
	text-align: center;
}
.m-goodpic{
	display: block;
	width:200px;
	height:200px;
}
.p-title{
	
}
.p-price{}*/
</style>

