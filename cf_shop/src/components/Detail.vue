<template>
  <div class="detail">
    <van-nav-bar left-arrow title="商品详情" @click-left="onClickLeft" />
    <!-- 商品轮播 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in imagelunbo" :key="index">
        <!-- {{item}} -->
        <img :src="item" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品数据 -->
    <div class="briefIntroduction">
      <h3>{{goodsdata.goods_name}}</h3>
      <!-- <span class="describe">传播的免费打手</span> -->
      <p>￥{{goodsdata.goods_price}}.00</p>
      <div class="tags-left">
        <span class="tags-top">
          <i></i>VIP优惠
        </span>
      </div>
    </div>
    <div class="aftersale">
      <span class="tags-genu">
        <i></i> 官方周边
      </span>
      <span class="tags-sh">
        <i></i>售后保障
      </span>
    </div>
    <!-- 商品宣传 -->
    <div class="details">
      <a href="javascript:;" v-for="(item, index) in detailsdata" :key="index">
        <img :src="item" alt />
      </a>
    </div>
    <!-- 加入购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="show=!show" />
      <van-goods-action-icon icon="cart-o" text="购物车" :info="total"  to="/cart"/>
      <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="goshops" />
      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 弹框 -->
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      :style="{ height: '38%' , width: '80%' }"
      round
    >
      <p>联系客服</p>
      <h4>服务时间:周一到周五，10:00~18:00</h4>
      <ul>
        <li class="shangjia">
          <i></i>商家名称：衍界文化
        </li>
        <li>
          <i></i>客服电话：
          <a href="javascript:;">01053680863</a>
        </li>
        <li>
          <i></i>客服QQ：3431632071
        </li>
      </ul>
      <h4>温馨提示:如有商品问题,请联系客服受理,谢谢您的配合</h4>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      goods_id: "",
      imagelunbo: [],
      goodsdata: [],
      detailsdata: [],
      show: false,
      num: 0
    };
  },
  computed: {
    ...mapState(["total"])
  },
  methods: {
    ...mapMutations(["start"]),
    getGoodsImage() {
      this.$http.get(`/goodsimage?id=` + this.goods_id).then(res => {
        // console.log(res);
        res.data.result.forEach(v => {
          // console.log(v.goods_image_lunbo);
          this.imagelunbo.push(v.goods_image_lunbo);
        });
        this.goodsdata = res.data.data[0];
        res.data.results.forEach(v => {
          // console.log(v);
          this.detailsdata.push(v.details_image);
        });
        // console.log(...res.data.result);
        // console.log(this.goodsdata);
        // console.log(this.detailsdata);
        // this.imagelunbo = res.data.result;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
      // 加入购物车
    goshops() {
      this.$http.post("/goshops", { id: this.goods_id }).then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$dialog.alert({
            message: res.data.error
          });
        } else {
          this.$dialog.alert({
            message: res.data.message
          });
        }
      });
    }
    // 加入购物车
    // goshopping() {
    //   // console.log(123);
    //   let token = localStorage.getItem("token");
    //   // console.log(token);
    //   if (!token) {
    //     setTimeout(() => {
    //       this.$router.push("/login");
    //     }, 1000);
    //     this.$toast.fail("请先登录");
    //   } else {
    //     // this.start(this.total);
    //     // console.log(this.goods_id);
    //     let ids = localStorage.getItem("id");
    //     // console.log(ids);
    //     if (ids === null) {
    //       ids = [parseInt(this.goods_id)];
    //     } else {
    //       ids = JSON.parse(ids);
    //       ids.push(parseInt(this.goods_id));
    //       ids = Array.from(new Set(ids));
    //     }
    //     localStorage.setItem("id", JSON.stringify(ids));
    //     let cart = localStorage.getItem("cart");
    //     if (cart === null) {
    //       cart = [];
    //       cart[parseInt(this.goods_id)] = {
    //         ischk: false,
    //         count: 1
    //       };
    //     } else {
    //       cart = JSON.parse(cart);
    //       cart[parseInt(this.goods_id)] = {
    //         ischk: false,
    //         count: 1
    //       };
    //     }
    //     localStorage.setItem("cart", JSON.stringify(cart));
    //   }
    // }
  },
  created() {
    this.goods_id = this.$route.params.id;
    // console.log(this.$route.params.id);
    this.getGoodsImage();
  }
};
</script>
<style lang="less" scoped>
.van-swipe-item img {
  width: 100%;
  height: 396px;
}
h3 {
  margin: 0;
}
.describe {
  font-size: 14px;
  color: #999999;
}
.briefIntroduction {
  margin-left: 10px;
}
.briefIntroduction p {
  margin: 5px 0;
  font-size: 25px;
  font-weight: bold;
  color: #f7545f;
}
h4 {
  margin: 0;
}
.van-goods-action {
  z-index: 100000;
}
.van-popup {
  p {
    margin: 30px 0 0 0;
    text-align: center;
    font-size: 24px;
  }
  h4 {
    text-align: center;
    color: #999999;
    font-size: 14px;
    margin: 0 35px;
  }
  ul {
    margin: 0 40px;
    li {
      line-height: 45px;
    }
  }
}
.details {
  margin-bottom: 40px;
}
.details img {
  width: 100%;
}
.aftersale {
  width: 374px;
  height: 47px;
  padding: 0 20px;
  border-top: 10px solid #f3f4f6;
  border-bottom: 10px solid #f3f4f6;
  line-height: 47px;
  font-size: 14px;
  color: #666;
}
.van-nav-bar {
  position: fixed;
  width: 100%;
  z-index: 1000;
  top: 0px;
  // margin-bottom: 20px;
}
.van-swipe {
  margin-top: 50px;
}
// .shangjia i {
//   width: 20px;
//   height: 20px;
//   display: inline-block;
//   background-image: url("https://js01.daoju.qq.com/zb/v2/ico-mall.png");
//   // background-size: 200px 200px;
//   background-position: -3px -909px;
//   background-repeat: no-repeat;
// }
.tags-genu {
  margin-right: 10px;
}
.tags-genu i {
  width: 23px;
  height: 23px;
  display: inline-block;
  //  background-color: aqua;
  position: relative;
  top: 6px;
  background-image: url("https://js01.daoju.qq.com/zb/v2/ico-mall.png");
  background-repeat: no-repeat;
  background-position: -209px -107px;
  background-size: 28.6rem 38rem;
}
.tags-sh i {
  width: 23px;
  height: 23px;
  display: inline-block;
  //  background-color: aqua;
  position: relative;
  top: 6px;
  background-image: url("https://js01.daoju.qq.com/zb/v2/ico-mall.png");
  background-repeat: no-repeat;
  background-position: -3px -107px;
  background-size: 28.6rem 38rem;
}
.tags-top i {
  width: 23px;
  height: 23px;
  display: inline-block;
  //  background-color: aqua;
  position: relative;
  top: 6px;
  background-image: url("https://js01.daoju.qq.com/zb/v2/ico-mall.png");
  background-repeat: no-repeat;
  background-position: -33px -107px;
  background-size: 28.6rem 38rem;
}
.tags-left {
  line-height: 30px;
  font-size: 14px;
  color: #ca7312;
}
</style>