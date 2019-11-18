<template>
  <div id="app">
    <!-- 标签栏 -->
    <van-tabbar :route="true">
      <van-tabbar-item icon="shop-o">首页</van-tabbar-item>
      <van-tabbar-item icon="qr-invalid">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o">我</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>


