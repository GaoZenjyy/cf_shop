<template>
  <div class="addressedit">
    <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>
<script>
import arers from "../address.js";
export default {
  data() {
    return {
      areaList: arers,
      searchResult: []
    };
  },
  methods: {
    onClickLeft() {
      // console.log(12);
      this.$router.go(-1);
    },
    onSave(content) {
      //   console.log(content);
      this.$http.post("/addresses", content).then(res => {
        // console.log(res);
        if (res.data.ok === 0) {
          this.$dialog.alert({
            message: res.data.error
          });
        } else {
          this.$dialog.alert({
            message: res.data.message
          });
          this.$router.push("/address");
        }
      });
    }
  },
  created() {
    
  }
};
</script>
<style lang="less" scoped>
</style>