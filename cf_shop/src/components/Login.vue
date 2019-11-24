<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="userdata.mobile"
        required
        clearable
        label="用户名"
        type="text"
        placeholder="请输入用户名"
        left-icon="manager"
      />
      <van-field
        v-model="userdata.password"
        required
        clearable
        type="password"
        label="密码"
        placeholder="请输入密码"
        left-icon="lock"
      />
    </van-cell-group>
    <van-row type="flex" justify="center">
      <van-col span="18">
        <van-button color="#7232dd" size="large" style="margin-bottom:60px" @click="userlogin">登录</van-button>
        <van-button type="primary" size="large" to="/register">没有账号？点击注册</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userdata: { mobile: "", password: "" }
    };
  },
  methods: {
    //   用户登录
    userlogin() {
      let mobileRe = /^1(3|4|5|6|7|8|9)\d{9}$/;
      // 密码校验
      let passwordRe = /^[0-9a-zA-Z_]{6,20}$/;
      if (!mobileRe.test(this.userdata.mobile)) {
        this.$toast.fail("用户格式为11位数字");
        return;
      }
      if (!passwordRe.test(this.userdata.password)) {
        this.$toast.fail("密码格式为6~20 以数字、字母、下划线");
        return;
      }

      this.$http.post("/login", this.userdata).then(res => {
        // console.log(res);
        if (res.data.ok == 0) {
          this.$toast.fail(res.data.error);
        } else {
          this.$dialog.alert({
            message: res.data.message
          });
          localStorage.setItem("token", res.data.token);
          this.$router.push("/home");
        }
      });

      //   console.log(12);

      //   if (this.userdata.mobile == "" || this.userdata.password == "") {
      //     this.$toast.fail("内容不可以为空");
      //   } else {
      //     this.$http.post("/login", this.userdata).then(res => {
      //       console.log(res);
      //       if (res.data.code == 400) {
      //         this.$toast.fail("登录失败,请注册");
      //       } else {
      //         sessionStorage.setItem("username", this.userdata.username);
      //         sessionStorage.setItem("token", res.data.token);
      //         this.$toast.success(res.data.message);
      //         this.$router.push("/home");
      //       }
      //     });
      //   }
    }
  }
};
</script>
<style lang="less" scoped>
.van-cell-group {
  margin-top: 100px;
  margin-bottom: 80px;
}

</style>