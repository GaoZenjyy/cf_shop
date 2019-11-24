<template>
  <div class="search">
    <van-nav-bar left-arrow @click-left="returninfo" fixed>
      <van-search slot="title" placeholder="搜索你想要的宝贝" v-model="value" @input="onDetermine" />
    </van-nav-bar>
    <!-- 商品数据 -->
    <van-grid :column-num="2">
      <van-grid-item v-for="(item, index) in searchData" :key="index" icon="photo-o" text="文字">
        <!-- {{item}} -->
        <img class="moxis" slot="icon" :src="item.goods_image" />
        <p slot="text" class="moxingone">{{item.goods_name}}</p>
        <span slot="text" class="moxingtwo">￥{{item.goods_price}}.00</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      searchData: []
    };
  },
  methods: {
    //  返回
    returninfo() {
      //   console.log(123);
      // this.$router.push("/");
      this.$router.go(-1)
    },
    // 确定
    onDetermine() {
      //   console.log(123);
      this.$http
        .get("/search", { params: { goods_name: this.value } })
        .then(res => {
          // console.log(res.data.result.length);

          if (res.data.result.length == 76) {
            this.searchData = [];
          } else {
            this.searchData = res.data.result;
          }
          // console.log(res);
          // console.log(this.searchData);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.moxis {
  width: 190px;
  height: 186px;
}
.moxingone {
  font-size: 16px;
}
.moxingtwo {
  color: #f7545f;
  font-size: 18px;
}
.van-search {
  padding: 6px 0 0 0;
}
</style>