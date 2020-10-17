<template>
  <div class="login">
    <div class="box">
      <h1 class="center">登录</h1>
      <div class="line">
        <el-input
          v-model="form.username"
          clearable
          placeholder="请输入账户"
        ></el-input>
        <el-input
          v-model="form.password"
          clearable
          show-password
          placeholder="请输入密码"
        ></el-input>
      </div>
      <div class="center line">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction"
    }),

    login() {
      reqLogin(this.form).then(res => {
        if (res.data.code == 200) {
          //登录成功
          successAlert("登录成功");
          // res.data.list  用户信息 存起来，供很多组件使用
          this.changeUserInfoAction(res.data.list)
          this.$router.push("/");
          // 跳转页面
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
  position: relative;
}
.box {
  width: 400px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 20px;
}
.center {
  text-align: center;
}
.line {
  margin-top: 20px;
}
</style>
