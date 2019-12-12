<template>
  <div class="home">
    <!-- 导航栏通知 -->
    <van-notice-bar left-icon="volume-o" color="#333333" mode="link" :speed="30">
      <a href="javascript:;">CF枪模暂不支持邮寄地区提醒</a>&nbsp;
      <a href="javascript:;">CF快递通告</a>&nbsp;
      <a href="javascript:;">CF枪模暂不支持邮寄地区提醒</a>&nbsp;
      <a href="javascript:;">CF快递通告</a>&nbsp;
    </van-notice-bar>
    <!-- 轮播 -->
    <van-swipe :autoplay="3000" indicator-color="white" :show-indicators="false">
      <van-swipe-item v-for="(item, index) in wheelPlanting" :key="index">
        <!-- {{item}} -->
        <img :src="item.cf_wheelplantingname" />
      </van-swipe-item>
    </van-swipe>
    <!-- <van-button @click="show=true"></van-button> -->
    <div class="tuchuc">
      <div class="tuchuc-left" @click="toSearch">
        <i></i>
      </div>
      <div class="tuchuc-right" @click="show=true">
        <i></i>
      </div>
    </div>
    <!-- 标题 -->
    <van-grid :column-num="4" :border="false">
      <van-grid-item v-for="(item,index) in titleData" :key="index" @click="gotoclass">
        <img slot="icon" class="titles" :src="item.cf_image" />
        <p slot="text" class="titlep">{{item.cf_title}}</p>
      </van-grid-item>
    </van-grid>
    <!-- 模型手办 -->
    <div>
      <van-divider :style="{ color: '#000', borderColor: '#ffb222', padding: '0 20px'}">模型手办</van-divider>
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in moxindata" :key="index" icon="photo-o" text="文字">
          <!-- {{item}} -->
          <img class="moxis" slot="icon" :src="item.goods_image" />
          <p slot="text" class="moxingone">{{item.goods_name}}</p>
          <span slot="text" class="moxingtwo">￥{{item.goods_price}}.00</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 个性生活 -->
    <div>
      <van-divider :style="{ color: '#000', borderColor: '#ffb222', padding: '0 20px'}">个性生活</van-divider>
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in gxsh" :key="index" icon="photo-o" text="文字">
          <!-- {{item}} -->
          <img class="moxis" slot="icon" :src="item.goods_image" />
          <p slot="text" class="moxingone">{{item.goods_name}}</p>
          <span slot="text" class="moxingtwo">￥{{item.goods_price}}.00</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 新颖数码 -->
    <div>
      <van-divider :style="{ color: '#000', borderColor: '#ffb222', padding: '0 20px'}">新颖数码</van-divider>
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in shuma" :key="index" icon="photo-o" text="文字">
          <!-- {{item}} -->
          <img class="moxis" slot="icon" :src="item.goods_image" />
          <p slot="text" class="moxingone">{{item.goods_name}}</p>
          <span slot="text" class="moxingtwo">￥{{item.goods_price}}.00</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 专属定制 -->
    <div>
      <van-divider :style="{ color: '#000', borderColor: '#ffb222', padding: '0 20px'}">专属定制</van-divider>
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in dingz" :key="index" icon="photo-o" text="文字">
          <!-- {{item}} -->
          <img class="moxis" slot="icon" :src="item.goods_image" />
          <p slot="text" class="moxingone">{{item.goods_name}}</p>
          <span slot="text" class="moxingtwo">￥{{item.goods_price}}.00</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 查看更多商品 -->
    <p class="goshop">
      查看全部商品
      <i></i>
    </p>
    <!-- <van-tag class="goshop" type="primary" icon="play-circle">标签</van-tag> -->

    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      wheelPlanting: [], //轮播数据
      titleData: [], //标题数据
      moxindata: [], //模型数据
      gxsh: [], //个性生活
      shuma: [], //数码
      dingz: [], //定制
      show: false,
      actions: [{ name: "商城公告" }, { name: "意见反馈" }, { name: "聚诚品" }]
    };
  },
  methods: {
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      Toast(item.name);
    },

    // 轮播请求
    getWheelPlanting() {
      this.$http.get("/wheel").then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$dialog.alert({
            message: res.data.message
          });
        } else {
          this.wheelPlanting = res.data.data;
        }
      });
    },
    //标题请求
    getTitles() {
      this.$http.get("/titles").then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$dialog.alert({
            message: res.data.message
          });
        } else {
          this.titleData = res.data.result;
        }
      });
    },
    // 模型
    getmoxindata() {
      this.$http.get("/moxin").then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$dialog.alert({
            message: res.data.message
          });
        } else {
          this.moxindata = res.data.data;
        }
      });
    },
    // 个性
    getgxshenhou() {
      this.$http.get("/gexing").then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$dialog.alert({
            message: res.data.message
          });
        } else {
          this.gxsh = res.data.data;
        }
      });
    },
    // 数码
    getshumadata() {
      this.$http.get("/shuma").then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$dialog.alert({
            message: res.data.message
          });
        } else {
          this.shuma = res.data.data;
        }
      });
    },
    // 定制
    getdingzhiData() {
      this.$http.get("/dingzhi").then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$dialog.alert({
            message: res.data.message
          });
        } else {
          this.dingz = res.data.data;
        }
      });
    },
    // 搜索
    toSearch() {
      this.$router.push("/search");
    },
    gotoclass() {
      this.$router.push("/class");
      // console.log(122);
    }
  },
  created() {
    this.getWheelPlanting(); //轮播请求
    this.getTitles(); //标题请求
    this.getmoxindata(); //模型
    this.getgxshenhou(); //个性
    this.getshumadata(); //数码
    this.getdingzhiData(); //定制
  }
};
</script>
<style lang="less" scoped>
.van-notice-bar a {
  color: #333333;
  font-size: 12px;
}
.van-notice-bar {
  height: 30px;
}
.van-swipe img {
  width: 100%;
  height: 182px;
}
.titlep {
  font-size: 13px;
  margin: 0;
}
.titles {
  width: 48.5px;
  height: 48.5px;
}
.van-divider {
  font-size: 18px;
}
.home {
  position: relative;
  margin-bottom: 60px;
}
.goshop {
  margin: 0;
  font-size: 12px;
  text-align: center;
  padding: 10px 0;
}
.goshop i {
  width: 20px;
  height: 20px;
  display: block;
  background-image: url("../assets/image/ico-mall.png");
  background-repeat: no-repeat;
  background-position: -110px -138px;
  margin-top: -18px;
  margin-left: 245px;
}
.tuchuc {
  width: 89%;
  height: 36px;
  // background-color: aqua;
  position: absolute;
  top: 36px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  // padding-right: 20px;
}
.tuchuc-left {
  width: 36px;
  height: 36px;
  background-color: #0c121a;
  border-radius: 50%;
  // background-color: aqua;
  background-image: url("../assets/image/ico-mall.png");
  background-repeat: no-repeat;
  background-position: -454px -176px;
}
// .tuchuc-left i {
//   width: 18px;
//   height: 18px;
//   display: block;
//   // background-image: url("../assets/image/ico-mall.png");
//   // background-repeat: no-repeat;
//   // background-position: -110px -138px;
// }
// .tuchuc-right i {
//   width: 18px;
//   height: 18px;
//   display: block;
//   background-image: url("../assets/image/ico-mall.png");
//   background-repeat: no-repeat;
//   background-position: -110px -138px;
// }
.tuchuc-right {
  width: 36px;
  height: 36px;
  background-color: #0c121a;
  border-radius: 50%;
  background-image: url("../assets/image/ico-mall.png");
  background-repeat: no-repeat;
  background-position: -102px -130px;
  // background-color: aqua;
}
.moxis {
  width: 100%;
  height: 186px;
}
.moxingone {
  font-size: 16px;
}
.moxingtwo {
  color: #f7545f;
  font-size: 18px;
}

</style>