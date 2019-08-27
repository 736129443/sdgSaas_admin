<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 16:28:41
 * @LastEditTime: 2019-08-14 09:20:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="containers" ref="login_bg">
    <!-- 头部 -->
    <div class="headers">
      <div class="logo">
        <img src="../assets/images/header_logo.png" alt />
      </div>
      <p class="headerTitle">后台运营管理系统</p>
    </div>
    <div class="content">
      <img src="../assets/images/main.png" alt />
      <div class="loginBox">
        <div class="top">
          <span class="title">账号登录</span>
        </div>
        <div class="LoginMain">
          <div class="t-text">
            <div class="user">
              <i class="iconfont icon-people"></i>
            </div>
            <input
              autofocus="autofocus"
              v-model.trim="phone"
              class="text"
              type="text"
              placeholder="请输入手机号..."
              @keyup.enter="login"
            />
          </div>
          <div class="t-pass">
            <div class="pass">
              <i class="iconfont icon-lock"></i>
            </div>
            <span v-show="!show" @click="sun">
              <i class="iconfont icon-close-eyes i-eyes"></i>
            </span>
            <span v-show="show" @click="sun">
              <i class="iconfont icon-eye i-eyes1"></i>
            </span>
            <input
              v-model.trim="qCode"
              :type="type"
              placeholder="请输入验证码..."
              class="password"
              @keyup.enter="loginApiFetch"
            />
            <el-button class="code-btn" v-if="countDown==60" @click="getCode" type="primary">获取验证码</el-button>
            <el-button type="info" class="code-btn" v-else plain>剩余{{countDown}}秒</el-button>
          </div>
          <el-button type="primary" class="submmit" @click="loginApiFetch">登录</el-button>
          <span class="num">忘记密码请与管理员联系！</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
require("../assets/module/account.js");
import AESUtil from "../assets/utils/aes_util.js";
import { regPhone } from "../assets/utils/commonReg.js";
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
var _event = com.lightningdog.rrq.event;
var _account = com.lightningdog.rrq.account;

export default {
  data() {
    return {
      qCode: "", // 验证码
      verifyRes: "",
      countDown: 60,
      phone: "",
      show: false,
      type: "password",
      admin: "admin",
      arr: [],
      bodyText: "",
      list: []
    };
  },
  created() {
    this.bindVerifyCodeEvent();
    this.bindLoginEvent();
  },
  mounted() {
    /// 开发期间直接进入页面  避免登录
    ///  token 和 userId  在config.js中 已暂时写死
    this.$router.push({ path: "/index" });
  },
  methods: {
    // <<<<<<< HEAD
    //     login() {
    //       let config = {
    //         headers: {
    //           "Content-Type": "application/json;charset=UTF-8"
    //         }
    //       };
    //       this.$http
    //         .post(
    //           this.global.lightningUrl + "/companyv1/security/user/login",
    //           JSON.stringify({
    //             userName: this.uname,
    //             userType: this.admin,
    //             password: sha256(this.upass)
    //           }),
    //           config
    //         )
    //         .then(run => {
    //           if (run.body.errcode === 0) {
    //             this.arr = run;
    //             this.bodyText = this.arr.bodyText;
    //             if (!window.sessionStorage) {
    //               return false;
    //             } else {
    //               sessionStorage.setItem("key", Base64.encode(this.bodyText));
    //               sessionStorage.setItem(
    //                 "jurisdictions",
    //                 run.body.result.currentUser.permission
    //               );
    //             }
    //             if (this.upass == 123456) {
    //               setTimeout(() => {
    //                 window.location.reload();
    //                 this.$router.push({ path: "/passworld" });
    //               }, 1500);
    //             } else {
    //               alert(1);
    //               // window.location.reload();
    //               //let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
    //               this.$router.push({ path: "/index" });
    //             }
    //           } else {
    //             if (this.uname == "" || this.upass == "") {
    //               this.$message({
    //                 message: "请输入用户名或密码",
    //                 type: "error"
    //               });
    //             } else {
    //               this.$message({
    //                 showClose: true,
    //                 message: run.body.message,
    //                 type: "error"
    //               });
    //             }
    // =======
    /**
     * @description: 绑定登录事件
     * @return: none
     */
    bindLoginEvent() {
      _event.on(
        "onLogin",
        "com.lightningdog.rrq.account",
        "login",
        (event, data) => {
          if (data) {
            sessionStorage.setItem(
              "users",
              Base64.encode(JSON.stringify(data))
            );
            this.$router.push({ path: "/index" });
          }
        }
      );
    },
    /**
     * @description: 绑定验证码获取事件
     * @return: none
     */
    bindVerifyCodeEvent() {
      _event.on(
        "onVerify",
        "com.lightningdog.rrq.account",
        "verify",
        (event, data) => {
          if (data) {
            this.verifyRes = data;
            this.countDown--;
            let timer = setInterval(() => {
              this.countDown--;
              if (this.countDown == 0) {
                this.countDown = 60;
                clearInterval(timer);
              }
            }, 1000);
          }
        }
      );
    },
    /**
     * @description: 登录请求
     * @return: none
     */
    loginApiFetch() {
      let uuid = AESUtil.uuid;
      console.log(uuid);
      if (!this.qCode.length) {
        this.$message({
          message: "请输入验证码",
          type: "warning"
        });
        return;
      }
      if (this.verifyRes.length) {
        let codeStr = this.qCode + this.verifyRes;
        let params = {
          deviceInfo: {
            randomKey: uuid
          },
          phone: this.phone,
          verifyCode: codeStr
        };
        let paramsJson = JSON.stringify(params);
        let ciphertext = AESUtil.AesEncrypt(paramsJson, codeStr);
        console.log("加密前数据为：" + paramsJson);
        console.log("加密后的密文是：" + ciphertext);
        this.loading = true;
        _account.login(this.phone, ciphertext);
      }
    },
    getCode() {
      if (!this.phone.length) {
        this.$message({
          message: "请输入手机号",
          type: "warning"
        });
        return;
      }
      if (!regPhone(this.phone)) {
        this.$message({
          message: "手机号格式错误",
          type: "warning"
        });
        return;
      }
      _account.verifyCode(this.phone);
    },
    sun() {
      this.show = !this.show;
      if (this.show) {
        this.show == !false;
        this.type = "text";
      } else {
        this.type = "password";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
body {
  height: 100%;
}
.containers {
  background-image: url("../assets/images/bg.png");
  width: 100%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  input:focus {
    border: 1px solid #409eff !important;
  }
  .headers {
    overflow: hidden;
    .logo {
      float: left;
      img {
        width: 143px;
        height: 51px;
        margin: 42px 0 0 120px;
      }
    }
    .headerTitle {
      float: left;
      margin: 42px 0 0 20px;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 3px;
      color: #fff;
      line-height: 60px;
    }
  }
  .content {
    overflow: hidden;
    img {
      position: absolute;
      top: 24%;
      left: 80px;
      width: 800px;
    }
    .loginBox {
      background: white;
      position: absolute;
      right: 200px;
      top: 24%;
      padding: 30px 22px 70px 22px;
      box-shadow: 0 2px 50px 5px rgba(0, 0, 0, 0.08);
      .top {
        width: 100%;
        height: 63px;
        .title {
          height: 63px;
          font-size: 20px;
          letter-spacing: 1px;
          opacity: 0.85;
        }
      }
      .LoginMain {
        width: 345px;
        .t-pass,
        .t-text {
          position: relative;
          margin: 0 0 20px 0;
          i {
            font-size: 26px;
            opacity: 0.45;
          }
          .user,
          .pass {
            position: absolute;
            left: 10px;
            top: 2px;
            height: 100%;
          }
          input {
            border: 1px solid rgba(0, 0, 0, 0.15);
            height: 45px;
            width: 100%;
            padding: 0 40px;
            box-sizing: border-box;
          }
          .password {
            width: 65%;
            float: left;
          }
          .code-btn {
            width: 32%;
            float: right;
          }
        }
        .t-pass .i-eyes,
        .t-pass .i-eyes1 {
          font-size: 18px;
          position: absolute;
          top: 10px;
          //   right: 18px;
          right: 38%;
        }
        .submmit {
          margin-top: 40px;
          border-radius: 0;
          width: 100%;
          height: 45px;
          overflow: hidden;
          color: #fff;
          font-size: 18px;
        }
        .num {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.5);
          position: relative;
          top: 30px;
          left: 30%;
        }
      }
    }
  }
}
</style>