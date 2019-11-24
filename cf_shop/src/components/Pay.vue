<template>
  <div class="pay">
    <a href="javascript:;" @click="toaddress">
      <div class="pay-top">
        <div class="pay-top-left"></div>
        <div class="pay-top-right">
          <h4>{{name}}</h4>
          <span class="moblie-top">{{tel}}</span>
          <p>{{address}}</p>
        </div>
      </div>
    </a>
    <!-- 购物数据 -->
    <div>
      <van-card
        v-for="(item, index) in goodsdata"
        :key="index"
        :price="item.goods_price"
        :title="item.goods_name"
        :thumb="item.goods_image"
        :num="carts[item.id].count"
      ></van-card>
      <van-cell-group>
        <van-cell title="总价" value="内容">
          <van-tag round slot="default" type="primary" size="large">￥{{cartb}}.00</van-tag>
        </van-cell>
        <van-cell title="运费" value="内容">
          <van-tag round slot="default" type="primary" size="large">￥0.00</van-tag>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="orderremark"
          clearable
          label="订单备注："
          placeholder="请填写购买需求说明(限45字)"
          @click-right-icon="$toast('question')"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="不满足聚豆使用条件">
          <!-- <van-tag round slot="default" type="primary" size="large">￥{{cartb}}.00</van-tag> -->
        </van-cell>
        <van-cell title="优惠卡劵" value="不使用优惠卡劵">
          <!-- <van-tag round slot="default" type="primary" size="large">￥0.00</van-tag> -->
        </van-cell>
      </van-cell-group>
      <div class="payment">
        <div class="payment-one">
          <span>共计</span>
          <p>{{nums}}件</p>
        </div>
        <div class="payment-two">
          <span>合计</span>
          <p style="color:#f7545f">￥{{cartb}}.00</p>
        </div>
        <div class="payment-three">
          <a href="javascript:;" @click="gettotal">立即付款</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      tel: "",
      address: "",
      goodsdata: [],
      carts: [],
      cartb: "",
      orderremark: "",
      nums: "",
      id: ""
    };
  },
  methods: {
    toaddress() {
      this.$router.push("/address");
    },
    getaddress() {
      this.$http.get("/geraddress").then(res => {
        // console.log(res);
        if (res.data.ok === 0) {
          this.$dialog.alert({
            message: res.data.error
          });
        } else {
          this.name = res.data.result[0].name;
          this.tel = res.data.result[0].tel;
          this.address = res.data.result[0].address;
          this.id = res.data.result[0].id;
        }
      });
    },
    // 商品数据
    getGoodsData() {
      let id = JSON.parse(localStorage.getItem("id"));
      // console.log(id);
      if (id !== null) {
        this.$http.get(`/dataid?id=` + id).then(res => {
          // console.log(res);
          if (res.data.ok === 0) {
            this.$dialog.alert({
              message: res.data.message
            });
          } else {
            this.goodsdata = res.data.data;
          }
        });
      }
    },
    gettotal() {}
  },
  created() {
    this.getaddress();
    this.getGoodsData();
    let cart = JSON.parse(localStorage.getItem("cart"));
    this.carts = cart;
    let arrt = [];
    cart.forEach(v => {
      if (v != null) {
        arrt.push(v.count);
      }
    });
    // console.log(...arrt);
    let sum = 0;
    arrt.forEach(ele => {
      sum += ele;
    });
    // console.log(sum);
    this.nums = sum;
    let carta = JSON.parse(localStorage.getItem("totalAll"));
    // console.log(carta);
    this.cartb = carta / 100;
  }
};
</script>
<style lang="less" scoped>
.pay-top {
  position: relative;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: flex-start;
  //   background-color: aqua;
  .pay-top-left {
    width: 80px;
    height: 100%;
    // background-color: aqua;
  }
  .pay-top-right {
    width: 300px;
    height: 100%;
    // background-color: aqua;
  }
}
.pay-top::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10px;
  //   background-color: #000;
  background-image: url("https://js01.daoju.qq.com/zb/v2/ico-mall.png");
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 28.6rem 38rem;
}

.pay-top-left::after {
  content: "";
  position: absolute;
  top: 25px;
  left: 20px;
  width: 40px;
  height: 40px;
  //   background-color: aqua;
  background-image: url("https://js01.daoju.qq.com/zb/v2/ico-mall.png");
  background-repeat: no-repeat;
  background-position: -295px -251px;
  background-size: 41.6rem 46rem;
}
h4 {
  margin: 10px 0 0 0;
}
.moblie-top {
  position: relative;
  top: -21px;
  left: 52px;
  font-size: 14px;
}
.pay-top-right p {
  margin: 0;
  font-size: 12px;
  color: #808080;
}
.pay-top-right::after {
  content: "";
  position: absolute;
  top: 25px;
  right: 20px;
  width: 25px;
  height: 25px;
  //   background-color: aqua;
  background-image: url("https://js01.daoju.qq.com/zb/v2/ico-mall.png");
  background-repeat: no-repeat;
  background-position: -92px -93px;
  background-size: 41.6rem 46rem;
}
.payment {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  // background-color: aqua;
}
.payment-one {
  width: 140px;
  height: 35px;
  // background-color: aqua;
  text-align: center;
  font-size: 14px;
  padding: 10px 0;
}
.payment-two {
  width: 140px;
  height: 35px;
  // background-color: goldenrod;
  text-align: center;
  font-size: 14px;
  padding: 10px 0;
}
.payment-three {
  width: 132px;
  height: 100%;
  background-color: #ffd54f;
  text-align: center;
  font-size: 20px;
  line-height: 55px;
}
.payment-three a {
  text-decoration: none;
  color: #000;
}
p {
  margin: 0;
}
</style>