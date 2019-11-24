<template>
  <!-- 分类页面 -->
  <div class="classdata">
    <!-- 搜索 -->
    <div class="dropdown">
      <van-search v-model="value" @focus="searchs" />
      <!-- 下拉排序 -->
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" title="默认"></van-dropdown-item>
        <van-dropdown-item v-model="value2" :options="option1" @change="sortingOptions"></van-dropdown-item>
        <van-dropdown-item v-model="value3" title="默认排序" :options="option2" />
        <van-dropdown-item v-model="value4" title="全部" :options="option3" />
      </van-dropdown-menu>
    </div>
    <!-- 数据 -->
    <div class="listdata">
      <van-list v-model="loading" :finished="finished" finished-text="已经加载所有数据" @load="onLoad">
        <van-grid :column-num="2">
          <van-grid-item
            v-for="(item, index) in classData"
            :key="index"
            icon="photo-o"
            text="文字"
            @click="todetail(item.id)"
          >
            <!-- {{item}} -->
            <img class="moxis" slot="icon" :src="item.goods_image" />
            <p slot="text" class="moxingone">{{item.goods_name}}</p>
            <span slot="text" class="moxingtwo">￥{{item.goods_price}}.00</span>
          </van-grid-item>
        </van-grid>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      value: "",
      value1: "",
      value2: 1,
      value3: 0,
      value4: 0,
      option1: [],
      option2: [
        { text: "默认排序", value: 0 },
        { text: "新品优先", value: 1 },
        { text: "人气优先", value: 2 },
        { text: "销量排序", value: 3 },
        { text: "价格降序", value: 4 },
        { text: "价格升序", value: 5 }
      ],
      option3: [
        { text: "全部", value: 0 },
        { text: "有货", value: 1 },
        { text: "包邮", value: 2 }
      ],
      classData: [],
      page: 1,
      pagenum: 10
    };
  },
  methods: {
    // 搜索
    searchs() {
      this.$router.push("/search");
    },
    // 分类
    getClassdata() {
      this.$http.get("/classes").then(res => {
        // console.log(res);
        this.option1 = res.data.data;
        // console.log(this.option1);
      });
    },
    // //默认数据
    // getMorenshuju() {
    //   // this.$http.get("/moren").then(res => {
    //   //   // console.log(res);
    //   //   this.classData = res.data.result;
    //   // });
    // },
    //列表请求数据
    onLoad() {
      // console.log(123);
      this.$http
        .get(`/moren?page=${this.page}&pagenum=${this.pagenum}`)
        .then(res => {
          // console.log(res);
          if (res.data.ok == 0) {
            this.$dialog.alert({
              message: res.data.message
            });
          } else {
            this.classData.push(...res.data.result);
            this.loading = false;
            if (this.classData.length >= 76) {
              this.finished = true;
            } else {
              this.page++;
            }
          }
        });
    },
    // 分类选项
    sortingOptions() {
      // console.log(1);

      this.$http.get(`/optios?id=` + this.value2).then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$dialog.alert({
            message: res.data.message
          });
        } else {
          this.classData = res.data.data;
        }
      });
    },
    // 点击跳转页面
    todetail(id) {
      // console.log(id);
      this.$router.push({
        path: `/detail/${id}`
      });
    }
  },
  created() {
    this.getClassdata(); //分类
    // this.getMorenshuju(); //默认数据
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
.dropdown {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 10000;
  // margin-bottom: 100px;
}
.van-grid {
  margin-top: 100px;
  // margin-bottom: 50px;
}
.van-list {
  margin-bottom: 50px;
}
</style>