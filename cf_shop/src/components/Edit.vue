<template>
  <div class="edit">
    <!-- 导航条 -->
    <van-nav-bar title="个人资料" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-field :value="name" label="手机号码" left-icon="contact" disabled />
    </van-cell-group>
    <van-cell-group>
      <van-uploader
        :after-read="afterRead"
        v-model="fileList"
        :max-count="1"
        upload-text="头像上传"
        result-type="dataUrl"
      />
    </van-cell-group>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="logoutUsers">退出当前用户</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      fileList: []
    };
  },
  methods: {
    // 图片上传
    afterRead(file, detail) {
      // console.log(file.file);
      // console.log(detail);
      // let path = file.content;
      // console.log(path);

      let formData = new FormData();
      formData.append("avatar", file.file);
      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }

      this.$http.post("/profile", formData).then(res => {
        // console.log(res);
        if (res.data.ok === 1) {
          this.$dialog.alert({
            message: res.data.message
          });
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取用户信息
    getUserData() {
      this.$http.get("/userdata").then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$dialog.alert({
            message: res.data.message
          });
        } else {
          let user = res.data.data[0].cf_username;
          //   console.log(user);
          this.name = user;
          //   console.log(this.userdata[this.num].cf_username);
        }
      });
    },
    // 退出用户
    logoutUsers() {
      localStorage.clear();
      this.$router.push("/home");
    }
  },
  created() {
    this.getUserData();
  }
};
</script>
<style lang="less" scoped>
.van-button {
  margin-top: 100px;
  margin-left: 140px;
}
</style>