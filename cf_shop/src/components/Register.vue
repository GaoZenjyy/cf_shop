<template>
  <div class="login">
    <van-nav-bar title="注册" />
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
      <van-field
        v-model="userdata.password1"
        required
        clearable
        type="password"
        label="确认密码"
        placeholder="确认密码"
        left-icon="lock"
      />
    </van-cell-group>
    <van-row type="flex" justify="center">
      <van-col span="18">
        <van-button
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          size="large"
          style="margin-bottom:60px"
          @click="registers"
        >注册</van-button>
        <van-button color="#7fffd4" size="large" to="/login">已有账号?点击登录</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userdata: { mobile: "", password: "", password1: "" }, //表单数据
      messages: "两次输入密码不一致"
    };
  },
  methods: {
    registers() {
      //   console.log(123);
      //   this.messages = true;
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
      if (!this.userdata.password == this.userdata.password1) {
        this.$dialog.alert({
          message: "两次输入的密码不一样"
        });
      } else {
        this.$http.post("/register", this.userdata).then(res => {
          console.log(res);
          if (res.data.ok == 0) {
            this.$toast.fail(res.data.error);
          } else {
            this.$dialog.alert({
              message: res.data.message
            });
            this.$router.push("/login");
          }
        });
      }
      // if (this.userdata.password == this.userdata.password1) {
      //   if (this.userdata.mobile == "" || this.userdata.password == "") {
      //     this.$toast.fail("内容不可以为空");
      //   } else {
      //     this.$http.post("/register", this.userdata).then(res => {
      //       console.log(res);
      //       if (res.data.ok == 0) {
      //         this.$toast.fail(res.data.error);
      //       }
      //     });
      //   }
      // } else {
      //   this.$dialog.alert({
      //     message: "两次输入的密码不一样"
      //   });
      // }
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.van-cell-group {
  margin-top: 100px;
  margin-bottom: 80px;
  color: blue;
}
</style>