<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 17:59:22
 * @LastEditTime: 2019-08-14 16:47:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="common-content broke-info">
    <div>
      <Position :positions="positions" />
    </div>
    <div class="pl30 pr30">
      <!-- <div class="info-box">
        <ul class="clear">
          <li>所属机构代码：201XW313C0</li>
          <li>承运商评分：100</li>
          <li>
            <el-tag class="vt" effect="dark">审核中</el-tag>
            <el-button class="vt" type="primary" size="small" @click="dialogShow = true;">编辑</el-button>
          </li>
        </ul>
      </div>-->
      <div class="info-box">
        <p>营业执照信息</p>
        <ul class="clear">
          <li>统一社会信用代码：{{registerInfo.creditNum}}</li>
          <li>企业注册地址：{{registerInfo.address}}</li>
          <li>
            <el-tag class="vt" effect="dark">审核中</el-tag>
            <el-button class="vt" type="primary" size="small" @click="dialogShow = true;">编辑</el-button>
          </li>
        </ul>
      </div>
      <div class="info-box">
        <p>道路运输许可证信息</p>
        <ul class="clear">
          <li>道路运输经营许可证号：{{registerInfo.transPermitNum}}</li>
          <li>经营范围：{{registerInfo.scopeOfBusiness}}</li>
        </ul>
        <ul class="clear">
          <li>道路运输经营许可证</li>
        </ul>
        <img src="https://img.tukuppt.com//ad_preview/00/18/48/5c99e8a9b311b.jpg!/fw/780" />
        <!-- <img :src="registerInfo.transPermitPic" alt /> -->
      </div>
      <div class="info-box">
        <p>业务信息</p>
        <ul class="clear">
          <li>承运商名称：{{registerInfo.name}}</li>
          <li>联系人：{{registerInfo.contact}}</li>
          <li>联系人电话：{{registerInfo.contactPhone}}</li>
          <li>承运商交换码：{{registerInfo.exchangeNum}}</li>
          <li>承运商密码：{{registerInfo.exchangePwd}}</li>
          <li>电子邮箱：{{registerInfo.email}}</li>
        </ul>
        <p class="remarks">备注：{{registerInfo.memo}}</p>
      </div>
    </div>
    <dialog-bar
      :editDialogShow.sync="dialogShow"
      dialogTitle="编辑"
      dialogWidth="60%"
      @onConfirm="onEditConfirm"
      @onCancel="onEditCancel"
    >
      <search-bar
        :needValidator.sync="needValidator"
        :showButtons="false"
        :inline="inline"
        :className="className"
        :selectors="selectors"
        :conditions="conditions"
        :rules="rules"
        @validateRes="validateRes"
      >
        <el-form-item :class="className" label="经营范围" slot="checkbox">
          <el-checkbox-group v-model="businessScope">
            <el-checkbox
              v-for="(vals,index) in businessScopeObj.dataArr"
              :key="index"
              :label="vals"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :class="className" label="道路运输经营许可证" slot="uploadFile">
          <upload-bar listType="picture-card" @getPicList="getPicList">
            <i class="el-icon-plus"></i>
          </upload-bar>
        </el-form-item>
      </search-bar>
    </dialog-bar>
  </div>
</template>

<script>
import Position from "../common/position.vue";
import DialogBar from "../common/dialogBar.vue";
import SearchBar from "../common/searchbar.vue";
import UploadBar from "../common/uploadBar.vue";
import { debuglog } from "util";
require("../../assets/module/organization.js");
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
var _organization = com.lightningdog.rrq.organization;
var _event = com.lightningdog.rrq.event;

export default {
  components: {
    Position,
    DialogBar,
    SearchBar,
    UploadBar
  },
  data() {
    return {
      needValidator: false,
      detail: {},
      registerInfo: {},
      inline: false,
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入输入企业注册地址", trigger: "blur" }
        ],
        creditNum: [
          { required: true, message: "请输入社会信用代码", trigger: "blur" }
        ],
        transPermitNum: [
          {
            required: true,
            message: "请输入道路运输经营许可证号",
            trigger: "blur"
          }
        ],
        contact: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur"
          }
        ],
        contactPhone: [
          {
            required: true,
            message: "请输入联系人号码",
            trigger: "blur"
          },
          {
            pattern: /^1[34578]\d{9}$/, //可以写正则表达式呦呦呦
            message: "请输入正确的号码",
            trigger: "blur"
          }
        ],
        exchangeNum: [
          {
            required: true,
            message: "请输入承运商交换码",
            trigger: "blur"
          }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱验证码",
            trigger: "blur"
          }
        ]
      },
      className: "fl w50",
      selectors: [
        {
          cname: "承运商名称",
          name: "name",
          model: "input",
          default: "请填写承运商评分"
        },
        {
          cname: "企业注册地址",
          name: "address",
          model: "input",
          default: "请填写企业注册地址"
        },
        {
          cname: "统一社会信用代码",
          name: "creditNum",
          model: "input",
          default: "请填社会信用代码"
        },
        {
          cname: "道路运输经营许可证号",
          name: "transPermitNum",
          model: "input",
          default: "请填写道路运输经营许可证号"
        },
        {
          cname: "联系人",
          name: "contact",
          model: "input",
          default: "请填写联系人"
        },
        {
          cname: "联系人电话",
          name: "contactPhone",
          model: "input",
          default: "请填写联系人电话"
        },
        {
          cname: "承运商交换码",
          name: "exchangeNum",
          model: "input",
          default: "请填写承运商交换码"
        },
        {
          cname: "承运商密码",
          name: "exchangePwd",
          model: "input",
          default: "请填写承运商密码"
        },
        {
          cname: "电子邮箱",
          name: "email",
          model: "input",
          default: "请填写电子邮箱"
        },
        {
          cname: "备注",
          name: "memo",
          model: "textarea",
          default: "请填写备注"
        }
      ],
      originalObj: {},
      conditions: {},
      businessScopeObj: {
        cname: "经营范围",
        name: "businessScope",
        dataArr: ["货运", "物流", "水产", "食品"]
      },
      businessScope: [],
      positions: Window.getCurrentLocation("3-1"),
      dialogShow: false,
      picList: []
    };
  },
  mounted() {
    this.bindInfoEvent();
    this.apiInfoFetch();
  },

  methods: {
    imageChange(val) {
      console.log(val);
    },
    bindInfoEvent() {
      _event.on(
        "onInfo",
        "com.lightningdog.rrq.organization",
        "info",
        (event, data) => {
          this.tableData = [];
          if (data) {
            this.detail = data;
            if (data.registerInfo) {
              this.registerInfo = data.registerInfo;
              this.conditions = Window.deepCopy(data.registerInfo);
              this.originalObj = Window.deepCopy(data.registerInfo);
              if (data.registerInfo.scopeOfBusiness.length) {
                this.businessScope = data.registerInfo.scopeOfBusiness.split(
                  ","
                );
              }
            }
          }
        }
      );
    },
    validateRes(val) {
      if (val) {
        console.log("验证成功");
        if (!this.businessScope.length) {
          this.$message({
            message: "请选择经营范围",
            type: "error"
          });
          return;
        }
        this.dialogShow = false;
        console.log(this.conditions);
        return;
      }
      console.log("验证失败");
    },
    apiInfoFetch() {
      _organization.info();
    },
    onEditConfirm(val) {
      // this.needValidator = true;
      if (this.picList.length) {
        let formData = new FormData();
        this.picList.forEach(item => {
          formData.append("file", item);
          formData.append("module", "organization");
        });
        _organization.uploadFile(formData);
      }
    },
    onEditCancel(val) {
      console.log(val);
      this.conditions = Window.deepCopy(this.originalObj);
      this.dialogShow = false;
    },
    getPicList(val) {
      console.log(val);
      this.picList = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.broke-info {
  .info-box {
    border-bottom: 1px solid #e5e5e5;
    padding: 20px 0;
    clear: both;
    // box-sizing: border-box;
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