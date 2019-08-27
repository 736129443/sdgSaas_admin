<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:38:53
 * @LastEditTime: 2019-08-13 09:56:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="driverList">
    <div>
      <Position :positions="positions" />
      <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions" />
    </div>
    <div class="common-content-detail">
      <button-list :buttons="buttonList" />
      <table-bar
        :tableData="tableData"
        :columns="columns"
        :total="total"
        @onSearch="onSearch"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @action="action"
        :tableOption="tableOption"
      ></table-bar>
    </div>
  </div>
</template>

<script>
import Position from "../common/position.vue";
import SearchBar from "../common/searchbar.vue";
import TableBar from "../common/tableBar.vue";
import ButtonList from "../common/buttonList.vue";

import { formatDateTime } from "../../assets/js/date.js";
require("../../assets/module/organization.js");
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
var _organization = com.lightningdog.rrq.organization;
var _event = com.lightningdog.rrq.event;
var listModName = "onMoverList";

export default {
  name: "moverList",
  components: {
    Position,
    SearchBar,
    TableBar,
    ButtonList
  },
  data() {
    return {
      positions: Window.getCurrentLocation("3-4"),
      buttonList: [
        {
          text: "新增",
          method: "new"
        },
        {
          text: "导入",
          method: "export"
        },
        {
          text: "启用",
          method: "enable"
        },
        {
          text: "停用",
          method: "disable"
        }
      ],
      conditions: {},
      selectors: [
        {
          cname: "搬运工姓名",
          name: "name",
          model: "input",
          default: "请填写用户编号"
        },
        {
          cname: "电话",
          name: "phone",
          model: "input",
          default: "请填写司机电话"
        },
        {
          cname: "状态",
          name: "active",
          model: "select",
          default: "请选择状态",
          dataArr: [
            {
              label: "禁用中",
              value: 1
            },
            {
              label: "启用中",
              value: 2
            }
          ]
        },
        {
          cname: "加入日期",
          name: "date",
          model: "date",
          type: "daterange"
        }
      ],
      tableData: [],
      columns: [
        {
          type: "selection",
          width: "50"
        },
        {
          label: "搬运工姓名",
          prop: "nickName",
          width: "200"
        },
        {
          label: "搬运工ID",
          prop: "id",
          width: "150"
        },
        {
          label: "电话",
          prop: "phone",
          width: "150"
        },
        {
          label: "司机状态",
          prop: "status",
          formatter: row => {
            if (!row.status) return "";
            if (row.status == 0) return "禁用";
            if (row.status == 1) return "启用";
          }
        },
        {
          label: "创建日期",
          prop: "creatTime",
          width: "150",
          formatter: row => {
            return formatDateTime(row.createTime);
          }
        }
      ],
      tableOption: {
        width: "150",
        label: "操作",
        buttons: [
          { text: "查看", methods: "detail" },
          { text: "删除", methods: "delete" }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.total = this.tableData.length;
    this.bindListEvent();
    this.apiListFetch();
  },
  methods: {
    bindListEvent() {
      _event.on(
        listModName,
        "com.lightningdog.rrq.organization",
        "list",
        (event, data) => {
          this.tableData = [];
          if (data && data.list) {
            let arr = data.list;
            this.total = data.total;
            this.tableData = arr;
          }
        }
      );
    },
    apiListFetch() {
      let params = {
        userType: "mover",
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        userName: this.conditions.name || "",
        userPhone: this.conditions.phone || ""
      };
      if (this.conditions.date && this.conditions.date.length) {
        params.joinStartTime = this.conditions.date[0];
        params.joinEndTime = this.conditions.date[1];
      }
      _organization.list(params, listModName);
    },
    action(val) {
      if (val.methods === "detail") {
        // console.log(val)
        this.$router.push({
          path: "/broker/userDetail",
          query: {
            location: "3-4-1"
          }
        });
        console.log("这里添加详情函数");
      }
      if (val.methods === "delete") {
        // console.log(val)
        console.log("这里添加删除函数");
      }
    },
    onSearch(val) {
      console.log(val);
      this.pageSize = val.pageSize;
      this.currentPage = val.currentPage;
    },
    onConfirm(condition) {
      console.log(condition);
      if (!Object.keys(condition).length) return;
      this.conditions = condition;
      this.apiListFetch();
    },
    onButtonClick(method) {
      console.log(method);
    }
  }
};
</script>

<style scoped lang="scss">
.driverList {
}
</style>