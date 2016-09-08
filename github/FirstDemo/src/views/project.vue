<template>
   <foot></foot>
   <!-- <account></account> -->
</template>
<script>
export default {
  components: {
    foot:require('../views/foot.vue')
    // account:require('../views/account.vue')
  },
  data () {
  	return {
  		title: '圈子账本'
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
    
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->