<template>
  <div class="address">
    <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="selectId"
    ></van-address-list>
    <!-- 弹框 -->
    <van-popup
      v-model="show"
      closeable
      close-icon="close"
      :style="{ height: '65%' , width: '100%' }"
      round
    >
      <van-nav-bar title="修改收货地址" />
      <van-address-edit
        :area-list="areaList"
        :address-info="addressinfo"
        show-delete
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>
<script>
import arers from "../address.js";

export default {
  data() {
    return {
      list: [],
      chosenAddressId: "",
      show: false,
      areaList: arers,
      searchResult: [],
      addressinfo: {}
    };
  },
  methods: {
    onClickLeft() {
      // console.log(12);
      this.$router.go(-1);
    },
    onAdd() {
      this.$router.push("/addressedit");
    },
    onEdit(item, index) {
      // console.log(item);
      // this.$router.push({ path: "/addressedit", id: item.id });
      this.show = true;
      this.$http.get("/getaddressedit?id=" + item.id).then(res => {
        // console.log(res);
        if (res.data.ok === 0) {
          this.$dialog.alert({
            message: res.data.error
          });
        } else {
          // isDefault
          if (res.data.results.isDefault === 0) {
            res.data.results.isDefault = true;
          } else {
            res.data.results.isDefault = false;
          }
          this.addressinfo = res.data.results;
          // console.log(this.addressinfo);
        }
      });
    },
    selectId(item, index) {
      // console.log(item);
      this.$http.put("/updatadata", item).then(res => {
        // console.log(res);
        if (res.data.ok === 0) {
          this.$dialog.alert({
            message: res.data.error
          });
        } else {
          this.$dialog.alert({
            message: res.data.message
          });
          this.getAddressData();
          this.chosenAddressId = "";
        }
      });
    },
    // 获取收货地址
    getAddressData() {
      this.$http.get("/getaddress").then(res => {
        // console.log(res);
        if (res.data.ok === 0) {
          this.$dialog.alert({
            message: res.data.error
          });
        } else {
          res.data.result.forEach(v => {
            if (v.addressId === 0) {
              this.chosenAddressId = v.id;
            }
          });
          this.list = res.data.result;
        }
      });
    },
    // 更新数据
    onSave(content) {
      // console.log(content.id);

      this.$http.put("/editaddres", content).then(res => {
        // console.log(res);
        if (res.data.ok === 0) {
          this.$dialog.alert({
            message: res.data.error
          });
        } else {
          this.$dialog.alert({
            message: res.data.message
          });
          this.getAddressData();
          // location.reload()
          this.chosenAddressId = "";
          this.show = false;
        }
      });
    },
    // 删除
    onDelete(content) {
      // console.log(content);
      this.$http.delete("/addressdelete?id=" + content.id).then(res => {
        // console.log(res);
        if (res.data.ok === 0) {
          this.$dialog.alert({
            message: res.data.error
          });
        } else {
          this.$dialog.alert({
            message: res.data.message
          });
          this.show = false;
          this.getAddressData();
        }
      });
    }
  },
  created() {
    this.getAddressData(); //获取收货地址
  }
};
</script>
<style lang="less" scoped>
</style>