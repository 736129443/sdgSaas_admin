<template>
  <div class="app">
    <!--隐藏的二维码-->
    <div id="layer">
      <div class="code">
        <div class="erwm1">
          <div id="qrcode1"></div>
        </div>
        <div class="btnBottom">
          <el-button
            id="btn2"
            @click="erwm0"
            type="primary"
            v-if="rqCodeDisplay === 0?true:false"
          >关闭二维码</el-button>
        </div>
      </div>
    </div>
    <!-- 头部 -->
    <el-header id="header">
      <div class="logon">
        <img src="../assets/images/header_logo.png" alt="闪电狗" title="闪电狗" />
      </div>
      <div class="title">运营管理系统</div>
      <div class="-r">
        <span class="-t-text">
          {{arr}}
          <i>
            <img src="../assets/images/png/ic_down.png" alt />
          </i>
        </span>
        <div class="drop-down">
          <ul>
            <li>
              <span class="t-text">{{arr}}</span>
              <span class="t-text-top">
                <img src="../assets/images/png/ic_up.png" alt />
              </span>
            </li>
            <li>
              <i>
                <img src="../assets/images/png/ic_ewm.png" alt />
              </i>
              <span @click="erwm" v-show="rqCodeDisplay === 0?false:true">生成二维码</span>
            </li>
            <li>
              <i>
                <img src="../assets/images/png/ic_password.png" alt />
              </i>
              <span @click="password" class="-r-button">修改密码</span>
            </li>
            <li>
              <i>
                <img src="../assets/images/png/ic_quit.png" alt />
              </i>
              <span @click="quit">退出登录</span>
            </li>
          </ul>
        </div>
      </div>
    </el-header>
    <!-- 内容 -->
    <el-container class="contain">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="$route.path"
        router
        unique-opened
        :collapse="isCollapse"
        text-color="#cccecb"
        active-text-color="#2a7df7"
      >
        <el-menu-item index v-model="isCollapse" @click="menuShift" style="text-align: center">
          <i>
            <img src="../assets/images/png/ic_unfold.png" alt />
          </i>
          <span slot="title" v-show="!isCollapse">闪电狗科技</span>
        </el-menu-item>
        <div v-for="navItem in navItems">
          <router-link :to="navItem.path" v-if="!navItem.children">
            <el-menu-item :index="navItem.path">
              <i>
                <img :src="navItem.img" alt />
              </i>
              <span slot="title" v-show="!isCollapse">{{navItem.name}}</span>
            </el-menu-item>
          </router-link>
          <el-submenu v-if="navItem.children" :index="navItem.path">
            <template slot="title">
              <img :src="navItem.img" alt />
              <span v-show="!isCollapse">{{navItem.name}}</span>
            </template>
            <el-menu-item-group>
              <router-link :to="child.path" v-for="child in navItem.children">
                <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
      <router-view class="content" />
    </el-container>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      arr: "admin",
      isCollapse: false,
      rqCodeDisplay: false,
      navItems: Window.navConfig,
      user: ""
    };
  },
  mounted() {
    // let user = JSON.parse(Base64.decode(sessionStorage.getItem('users')));
    // this.token = user;
    // this.arr = 'admin';
    // // this.token = user.result.token;
    // let page = JSON.stringify({
    //     token : this.token
    // });
    // this.$http.post(  this.global.lightningUrl + '/companyv1/driverManage/matrix/info', page ,{
    //     headers: {
    //         'Content-Type': 'application/json;charset=UTF-8'
    //     }
    // }).then( (res)=>{
    //     this.code = res.body.result;
    //     function generateQRCode(rendermethod, picwidth, picheight, url) {
    //         new QRCode('qrcode1', {
    //             render: rendermethod, // 渲染方式有table方式（IE兼容）和canvas方式
    //             width: picwidth, //宽度
    //             height: picheight, //高度
    //             text: url, //内容
    //             typeNumber: -1, //计算模式
    //             correctLevel: 2, //二维码纠错级别
    //             background: "#ffffff", //背景颜色
    //             foreground: "#000000" //二维码颜色
    //         });
    //     }
    //     generateQRCode("table", 300, 300, this.code);
    // });
    this.$router.push("/statistic");
  },
  methods: {
    menuShift() {
      this.isCollapse = !this.isCollapse;
    },
    quit() {
      this.$confirm("确定要执行退出操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出!"
          });
          sessionStorage.clear();
          this.$router.push({ path: "/" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    password() {
      this.$router.push({ path: "/passworld" });
    },
    erwm() {
      this.over = 0;
      let qrcode1 = document.getElementById("qrcode1");
      qrcode1.style.display = "block";
      let ley = document.getElementById("layer");
      ley.style.display = "block";
      let btn = document.getElementById("btn2");
    },
    erwm0() {
      this.code = "";
      this.over = 1;
      qrcode1.style.display = "none";
      let ley = document.getElementById("layer");
      ley.style.display = "none";
    }
  }
};
</script>
<style lang="scss">
.app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  #header {
    width: 100%;
    background-color: #303539;
    color: #333;
    height: 61px !important;
    line-height: 61px;
    min-width: 750px;
    .logon {
      float: left;
      height: 51px;
      margin: 5px 0 5px 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      letter-spacing: 2px;
      float: left;
      font-size: 22px;
      color: #fff;
      padding-left: 5px;
      line-height: 60px;
    }
    .-r {
      float: right;
      width: 175px;
      height: 100%;
      cursor: pointer;
      position: relative;
      transition: background 1s;
      display: flex;
      justify-content: center;
      align-content: center;
      .-t-text {
        font-size: 16px;
        color: #fefefe;
        i {
          font-size: 14px;
        }
      }
      .drop-down {
        width: 174px;
        height: 64px;
        z-index: 99;
        position: absolute;
        opacity: 0;
        top: -300px;
        transition: top 0.3s;
        transition: opacity 0.2s;

        ul {
          width: 174px;
          background: white;
          li {
            border: 1px solid #dfdfdf;
            width: 174px;
            height: 60px;
            i {
              float: left;
              line-height: 60px;
              margin: 0 23px;
            }
            span {
              float: left;
            }
          }
          li:nth-child(1) {
            display: flex;
            justify-content: center;
            align-content: center;
            font-size: 16px;
          }
        }
      }
      .el-menu--inline {
        color: #f2f2f2;
      }
    }
    .-r:hover {
      .drop-down {
        top: 0px;
        opacity: 1;
      }
    }
  }
  //响应
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 225px;
    min-height: 400px;
  }
  .contain {
    width: 100%;
    height: 100%;
    margin-bottom: 50px;
  }
  .content {
    width: 100%;
    overflow-y: auto;
  }
  .el-menu {
    color: #b0b2b1;
    background-color: #333743;
    padding-left: 3px;
    border: 0;
    overflow: hidden;
    overflow-y: auto;
    .con {
      color: white;
    }
    .template {
      color: white;
    }
  }
  .main {
    float: left;
    padding: 30px;
    width: 100%;
    background: #eaedf2;
    overflow-y: auto;
    margin-bottom: 45px;
  }
  // .el-dialog--center {
  //   position: relative;
  //   img {
  //     position: absolute;
  //     top: 100px;
  //   }
  // }
  #layer {
    width: 100%;
    height: 100%;
    z-index: 10000;
    position: absolute;
    background-color: rgba(128, 128, 128, 0.4);
    display: none;
  }
  .code {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  #qrcode1 {
    z-index: 1000000;
    display: none;
    border: 1px solid #cccccc;
    width: 330px;
    height: 330px;
    background-color: #cccccc;
    padding-left: 15px;
    padding-top: 10px;
    box-sizing: border-box;
    box-shadow: 0 0 9px 10px #f2f6fc;
    overflow: hidden;
  }
  .btnBottom {
    text-align: center;
  }
  #btn2 {
    margin: 0 auto;
    text-align: center;
    margin: 0 auto;
    margin-top: 25px;
  }
  .el-icon-close {
    font-size: 18px;
  }

  .click_classOne {
    padding-left: 20px !important;
    color: rgb(42, 125, 247) !important;
  }
  .click_class {
    padding-left: 40px !important;
    color: rgb(42, 125, 247) !important;
  }
  .el-menu-vertical-demo {
    padding-bottom: 170px;
  }
}
</style>
