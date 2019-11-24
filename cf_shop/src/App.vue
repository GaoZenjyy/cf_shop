<template>
  <div id="app">
    <!-- 标签栏 -->
    <van-tabbar :route="true" active-color="#ffb425" v-if="flug">
      <van-tabbar-item icon="shop-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="qr-invalid" to="/class">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/me">我</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      flug: true
    };
  },
  watch: {
    $route: function(val) {
      // console.log(val);
      if (
        val.path === "/search" ||
        val.path === "/login" ||
        val.path === "/register" ||
        val.path === "/address" ||
        val.path === "/addressedit" ||
        val.path === "/pay"
      ) {
        this.flug = false;
      } else {
        this.flug = true;
      }
    }
  }
};
</script>


