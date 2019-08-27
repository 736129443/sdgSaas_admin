<template>
  <div>
    <div>
      <Position :positions="positions" />
      <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions" />
    </div>
    <div class="common-content-detail">
      <!-- <button-list :buttons="buttonList" /> -->
      <table-bar
        :tableData="records"
        :columns="columns"
        :total="total"
        @onSearch="onSearch"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @action="action"
      />
    </div>
  </div>
</template>

<script>
import Position from "../common/position.vue";
import SearchBar from "../common/searchbar.vue";
import TableBar from "../common/tableBar.vue";
import ButtonList from "../common/buttonList.vue";
import { formatDateTime } from "../../assets/js/date.js";

require("../../assets/module/oilCard.js");

var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
var _oilCard = com.lightningdog.rrq.oilCard;
var _event = com.lightningdog.rrq.event;
let listModName = "onRechargeList";
export default {
  name: "recordList.vue",
  components: {
    Position,
    SearchBar,
    TableBar,
    ButtonList
  },
  data() {
    return {
      positions: Window.getCurrentLocation("3-8-1"),
      currentPage: 1,
      pageSize: 10,
      total: 0,
      conditions: {},
      selectors: [
        {
          cname: "充值编号",
          name: "id",
          model: "input",
          default: "请填写充值记录Id"
        },
        {
          cname: "油卡编号",
          name: "cardNum",
          model: "input",
          default: "请填写油卡编号"
        },
        {
          cname: "司机Id",
          name: "driverId",
          model: "input",
          default: "请填写司机Id"
        }
      ],
      columns: [
        {
          label: "充值编号",
          prop: "id",
          width: "200"
        },
        {
          label: "油卡编号",
          prop: "cardNum",
          width: "200"
        },
        {
          label: "司机Id",
          prop: "driverId",
          width: "200"
        },
        {
          label: "充值金额",
          prop: "rechargeMoney",
          width: "200"
        },
        {
          label: "状态",
          prop: "status",
          width: "200",
          formatter: row => {
            if (row.status == "accounted") return "已充值";
            if (row.status == "unaccounted") return "未充值";
            if (row.status == "accountedFail") return "充值失败";
            return "";
          }
        },
        {
          label: "充值时间",
          prop: "createTime",
          width: "200",
          formatter: row => {
            return formatDateTime(row.createTime);
          }
        }
      ],
      records: []
    };
  },
  mounted() {
    this.bindListEvent();
    this.apiListFetch();
  },
  methods: {
    bindListEvent() {
      _event.on(
        listModName,
        "com.lightningdog.rrq.oilCard",
        "list",
        (event, data) => {
          this.records = [];
          if (data && data.list) {
            this.records = data.list;
            this.total = data.total;
          }
        }
      );
    },
    apiListFetch() {
      _oilCard.recordsList(
        {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          id: this.conditions.id ? this.conditions.id : "",
          cardNum: this.conditions.cardNum ? this.conditions.cardNum : "",
          driverId: this.conditions.driverId ? this.conditions.driverId : ""
        },
        "rechargeRecord",
        listModName
      );
    },
    onConfirm(condition) {
      this.apiListFetch();
    },
    action(val) {},
    onSearch(val) {
      console.log(val);
      this.pageSize = val.pageSize;
      this.currentPage = val.currentPage;
      this.apiListFetch();
    }
  }
};
</script>

<style scoped lang="scss">
</style>