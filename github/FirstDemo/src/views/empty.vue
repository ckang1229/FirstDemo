<template>
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
    <div class="right ">
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.account.book.quanzi&g_f=991653">用APP查看</a>
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
  }
}
</script>