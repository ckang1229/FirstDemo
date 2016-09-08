<style>
[v-cloak] {
  display: none;
}


.view {
  transition: all .3s ease;
}


/*.fade-enter, .fade-leave {
  opacity: 0;
  transform: translate3d(0, -5px, 0);
}*/
.fade-enter{
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}

.fade-leave {
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);

}

.back-enter {
  opacity: 1;
  -webkit-transform: translate3d(-110%, 0, 0);
          transform: translate3d(-110%, 0, 0);

}
.back-leave{
  opacity: 0;
  /*transform: translate3d(100%, 0, 0);*/
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}


.v-link-active {
  color: red;
}

.custom-active-class {
  color: #f60;
}

/*css next 测试*/
  @keyframes testloading {
    0% {
      opacity: 0.2;
    }
    65% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }

::-webkit-scrollbar {
  display: none;
}
</style>
<template>
  <div class="app">
  <!-- class="view" id="view" :transition="effect" -->
    <router-view  keep-alive  transition-mode="out-in"></router-view>
    <!--toast-->
    <toast v-ref:toast :toast.sync="toast">
       <div slot = "content" >{{toast.content}}</div>
    </toast>
  </div>
</template>
<script>


module.exports = {
    data: function() {
      return {
        toast: {content:'正在加载...'},
      };
    },
    components:{
      toast:require('./components/toast.vue'),
    },
    methods:{
      openfn: function(val) {
         this.toast.content = val;
      }
    }
}

</script>
