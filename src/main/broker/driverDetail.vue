<!--
 * @Description: In User Settings Edit
 * @Author: 王力
 * @Date: 2019-08-03 17:59:22
 * @LastEditTime: 2019-08-10 09:39:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-page-header class="m15" @back="goBack" content="司机详情"></el-page-header>
    <div class="driverDetail">
      <div class="pl30 pr30">
        <div class="info-box">
          <p>基础信息</p>
          <ul class="clear">
            <li>司机姓名：{{detail.idCard?(detail.idCard.name?detail.idCard.name:''):''}}</li>
            <li>司机电话：{{detail.user.phone?detail.user.phone:''}}</li>
            <li>身份证号：6101111111111111</li>
            <li>驾龄(年）：6</li>
            <li>道路运输许可证号：6101111111111111</li>
          </ul>
          <img src="https://img.tukuppt.com//ad_preview/00/18/48/5c99e8a9b311b.jpg!/fw/780" />
        </div>
        <div class="info-box">
          <p>驾驶证信息</p>
          <ul class="clear">
            <li>司机姓名：王老吉</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require("../../assets/module/organization.js");
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
var _organization = com.lightningdog.rrq.organization;
var _event = com.lightningdog.rrq.event;

export default {
  name: "driverDetail",
  data() {
    return {
      detail: {}
    };
  },
  mounted() {
    this.bindDetailEvent();
    this.apiDetailFetch();
  },
  methods: {
    bindDetailEvent() {
      _event.on(
        "onDetail",
        "com.lightningdog.rrq.organization",
        "list",
        (event, data) => {
          this.tableData = [];
          if (data && data.length) {
            this.detail = JSON.parse(data);
          }
        }
      );
    },
    apiDetailFetch() {
      if (!this.$route.query.id) return;
      _organization.detail(this.$route.query.id);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.driverDetail {
  .info-box {
    border-bottom: 1px solid #e5e5e5;
    &:last-child {
      border-bottom: none;
    }
    p {
      font-size: 18px;
      font-weight: 700;
    }
    .remarks {
      font-weight: normal;
      font-size: 16px;
    }
    padding: 20px 0;
  }
  ul {
    li {
      float: left;
      width: 33.33%;
      line-height: 40px;
      font-size: 16px;
    }
  }
}
</style>