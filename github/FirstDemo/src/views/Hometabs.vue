<template>
	<div>
  <tab :line-width="2" active-color="#fc378c">
  <tab-item :selected="demo2 === item" v-for="item in list2" @click="demo2 = item">{{ demo2 = item }}</tab-item>
</tab>
</div>
</template>

<script>
import {Tab, TabItem} from 'vux/src/components/tab'
export default {
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      demo2: '美食',
      list2: ['精选', '美食', '电影', '酒店', '外卖']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>
</style>-->
