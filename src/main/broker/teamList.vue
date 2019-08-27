<template>
  <div class="driverList">
    <div>
      <Position :positions="positions" />
      <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions" />
    </div>
    <div class="common-content-detail">
      <button-list :buttons="buttonList" />
      <table-bar
        :tableData="teams"
        :columns="columns"
        :total="total"
        @onSearch="onSearch"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @action="action"
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
    SearchBar,
    TableBar,
    ButtonList
  },
  data() {
    return {
      positions: Window.getCurrentLocation("3-2"),
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
          cname: "车队编号",
          name: "organizationId",
          model: "input",
          default: "请填写车队编号"
        },
        {
          cname: "车队名称",
          name: "name",
          model: "input",
          default: "请填写车队名称"
        },
        {
          cname: "车队长编号",
          name: "leaderId",
          model: "input",
          default: "请填写车队长编号"
        },
        {
          cname: "物流交换码",
          name: "exchangeNum",
          model: "input",
          default: "请填写物流交换码"
        },
        {
          cname: "营业执照编号",
          name: "creditNum",
          model: "input",
          default: "请填写营业执照编号"
        },
        {
          cname: "区域",
          name: "address",
          model: "input",
          default: "请填写区域"
        },
        {
          cname: "经验",
          name: "experience",
          model: "input",
          default: "请填写司机电话"
        },
        {
          cname: "状态",
          name: "status",
          model: "select",
          default: "请选择状态",
          dataArr: [
            {
              label: "禁用中",
              value: 0
            },
            {
              label: "启用中",
              value: 1
            }
          ]
        },
        {
          cname: "加入日期",
          name: "createTime",
          model: "date",
          type: "daterange"
        }
      ],
      teams: [],
      columns: [
        {
          type: "selection",
          width: "50"
        },
        {
          label: "车队编号",
          prop: "organizationId",
          width: "200"
        },
        {
          label: "车队名称",
          prop: "name",
          width: "150"
        },
        {
          label: "车队长编号",
          prop: "leaderId",
          width: "150"
        },
        {
          label: "物流交换码",
          prop: "exchangeNum",
          width: "150"
        },
        {
          label: "营业执照编号",
          prop: "creditNum",
          width: "150"
        },
        {
          label: "区域",
          prop: "address",
          width: "150"
        },
        {
          label: "经验",
          prop: "scopeOfBusiness",
          width: "150"
        },
        {
          label: "状态",
          prop: "status",
          formatter: row => {
            if (row.status == 1) return "启用";
            return "禁用";
          }
        },
        {
          label: "创建日期",
          prop: "createTime",
          width: "150",
          formatter: row => {
            return formatDateTime(row.createTime);
          }
        },
        {
          label: "操作",
          prop: "",
          width: "200",
          fixed: "right",
          isOption: true,
          getOptionsArray: row => {
            return [
              { text: "查看", methods: "check" },
              { text: "删除", methods: "delete" }
            ];
          }
        }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.total = this.teams.length;
    this.bindListEvent();
    this.apiListFetch();
  },
  methods: {
    bindListEvent() {
      _event.on(
        "onListTeam",
        "com.lightningdog.rrq.organization",
        "list",
        (event, data) => {
          this.teams = [];
          if (data && data.list) {
            let arr = data.list;
            this.total = data.total;
            arr.map(item => {
              item.leaderId = "";
              if (item.organizationTable) {
                item.leaderId = item.organizationTable.leaderId;
                item.status = item.organizationTable.status;
              }
            });
            this.teams = arr;
          }
        }
      );
    },
    apiListFetch() {
      _organization.listTeam({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      });
    },
    action(val) {
      if (val.methods === "detail") {
        // console.log(val)
        this.$router.push({
          path: "/broker/driverDetail",
          query: {
            id: 1
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
      this.apiListFetch();
    },
    onConfirm(condition) {
      console.log(condition);
    },
    onButtonClick(method) {
      console.log(method);
    }
  }
};
</script>

<style scoped lang="scss">
</style>