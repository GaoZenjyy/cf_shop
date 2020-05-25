<template>
  <div class="me">
    <!-- 我的 -->
    <div class="users">
      <img :src="avatar" />
      <!-- <van-uploader :deletable="false" :after-read="afterRead" v-model="fileList" :max-count="1" /> -->
      <h4>{{name}}</h4>
      <a href="javascript:;" @click="gotoEdit">
        <i></i>
      </a>
    </div>
    <!-- 我的订单 -->
    <div class="orders">
      <van-cell-group class="user-group">
        <van-cell title="我的订单" is-link />
      </van-cell-group>
      <van-row class="user-links">
        <van-col span="4" @click="topath">
          <van-icon name="pending-payment" />待付款
        </van-col>
        <van-col span="4">
          <van-icon name="records" />待接单
        </van-col>
        <van-col span="4">
          <van-icon name="tosend" />待发货
        </van-col>
        <van-col span="4">
          <van-icon name="logistics" />已发货
        </van-col>
        <van-col span="4">
          <van-icon name="records" />已签收
        </van-col>
        <van-col span="4">
          <van-icon name="edit" />待评价
        </van-col>
      </van-row>
    </div>
    <!-- 我的收藏 -->
    <van-cell-group class="user-group">
      <van-cell icon="like-o" title="我的收藏" is-link />
    </van-cell-group>
    <!-- 优惠卡卷 -->
    <van-cell-group class="user-group">
      <van-cell icon="coupon-o" title="优惠卡卷" is-link />
    </van-cell-group>
    <!-- 地址管理 -->
    <van-cell-group class="user-group">
      <van-cell icon="location-o" title="地址管理" is-link to="/address" />
    </van-cell-group>
    <!-- 领取中心 -->
    <van-cell-group class="user-group">
      <van-cell icon="gift-o" title="领取中心" is-link />
    </van-cell-group>
    <!-- 订阅中心 -->
    <van-cell-group class="user-group">
      <van-cell icon="bill-o" title="订阅中心" is-link />
    </van-cell-group>
    <!-- 我的评价 -->
    <van-cell-group class="user-group">
      <van-cell icon="chat-o" title="我的评价" is-link />
    </van-cell-group>
    <!-- 常见问题 -->
    <van-cell-group class="user-group">
      <van-cell icon="question-o" title="常见问题" is-link />
    </van-cell-group>
    <!-- 意见反馈 -->
    <van-cell-group class="user-group">
      <van-cell icon="service-o" title="意见反馈" is-link />
    </van-cell-group>
    <!-- 商城公告 -->
    <van-cell-group class="user-group">
      <van-cell icon="bullhorn-o" title="商城公告" is-link />
    </van-cell-group>
  </div>
</template>
<script>
import { log } from "util";
export default {
  data() {
    return {
      avatar: "",
      name: "",
      fileList: []
    };
  },
  methods: {
    topath() {
      this.$router.push("/login");
    },
    // afterRead(file) {
    //   console.log(file.file.name);
    // },
    // 获取用户信息
    getUserData() {
      this.$http.get("/userdata").then(res => {
        // console.log(res);
        if (res.data.ok === 0) {
          this.$dialog.alert({
            message: res.data.error
          });
        } else {
          let user = res.data.data[0].cf_username;
          let avatar = res.data.data[0].avatar;

          //   console.log(user);
          this.name = user;
          this.avatar = avatar;
          //   this.userdata.push(...res.data.data);
          //   console.log(this.userdata[this.num].cf_username);
          //   console.log(this.name);
        }
      });
    },
    // 个人中心
    gotoEdit() {
      this.$router.push("/edit");
    }
  },
  created() {
    this.getUserData(); //获取用户信息
  }
};
</script>
<style lang="less">
.users {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  //   background-color: aqua;
  position: relative;
}
.users a {
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  position: absolute;
  top: 40px;
  right: 20px;
}
.users a i {
  display: block;
  width: 20px;
  height: 20px;
  background-image: url("../assets/image/ico-mall.png");
  background-repeat: no-repeat;
  background-position: -110px -138px;
}
.orders {
  width: 100%;
  height: 132px;
  //   background-color: aquamarine;
  border-top: 11px solid #f3f4f6;
  border-bottom: 11px solid #f3f4f6;
}

.user {
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
.van-uploader__wrapper {
  margin-top: 10px;
  margin-left: 10px;
}
.users img {
  display: block;
  width: 78px;
  height: 78px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  // background-color: aqua;
}
</style>