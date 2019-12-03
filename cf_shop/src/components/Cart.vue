<template>
  <div class="cart">
    <!-- 商品结算 -->
    <div class="cart-top">
      <div>
        <!-- 商品数据 -->
        <van-checkbox
          :label-disabled="true"
          v-for="(item, index) in goodsdata"
          :key="index"
          v-model="cart[item.id].ischk"
        >
          <van-swipe-cell>
            <van-cell :border="true">
              <van-card
                :price="item.goods_price"
                :title="item.goods_name"
                :thumb="item.goods_image"
              >
                <div slot="footer">
                  <van-stepper v-model="cart[item.id].count" min="1" />
                  <van-tag type="primary">小计:￥{{item.goods_price*cart[item.id].count}}</van-tag>
                </div>
              </van-card>
            </van-cell>
            <template slot="right">
              <van-button square type="danger" text="删除" />
              <van-button square type="primary" text="收藏" />
            </template>
          </van-swipe-cell>
        </van-checkbox>

        <van-submit-bar :price="totalAllprice" button-text="提交订单" @submit="gopay">
          <van-checkbox v-model="allchk">全选</van-checkbox>
        </van-submit-bar>
      </div>
      <div></div>
    </div>
    <!-- 为你推荐 -->
    <div>
      <van-divider :style="{ color: '#000', borderColor: '#ffb222', padding: '0 20px'}">为你推荐</van-divider>
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in shuma" :key="index">
          <!-- {{item}} -->
          <img class="moxis" slot="icon" :src="item.goods_image" />
          <p slot="text" class="moxingone">{{item.goods_name}}</p>
          <span slot="text" class="moxingtwo">￥{{item.goods_price}}.00</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: "",
      shuma: [],
      goodsdata: [],
      cart: JSON.parse(localStorage.getItem("cart")) || []
    };
  },
  methods: {
    // 为你推荐
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
    //
    gopay() {
      this.$router.push("/pay");
      // console.log(this.totalAllprice);
      localStorage.setItem("totalAll", this.totalAllprice);
    }
  },
  computed: {
    // 总价
    totalAllprice: function() {
      let num = 0;
      this.goodsdata.forEach(v => {
        // console.log(v);
        if (this.cart[v.id].ischk) {
          num += v.goods_price * this.cart[v.id].count;
        }
      });
      return num * 100;
    },
    // 全选
    allchk: {
      get: function() {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i] === null) continue;
          if (this.cart[i].ischk === false) {
            return false;
          }
        }
        return true;
      },
      set: function(newcalue) {
        // console.log(newcalue);

        this.cart.forEach(v => {
          if (v !== null) {
            v.ischk = newcalue;
          }
        });
      }
    }
  },
  watch: {
    cart: {
      deep: true,
      handler: function() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    }
  },
  created() {
    this.getshumadata();
    this.getGoodsData();
  }
};
</script>
<style lang="less" scoped>
.van-submit-bar {
  position: relative;
}
.van-swipe-cell__right .van-button {
  margin-top: 40px;
}
.cart-top {
  min-height: 300px;
}
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
.cart {
  margin-bottom: 80px;
}
</style>