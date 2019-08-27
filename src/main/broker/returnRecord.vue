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
let listModName = "onReturnList";

export default {
  components: {
    Position,
    SearchBar,
    TableBar,
    ButtonList
  },
  data() {
    return {
      positions: Window.getCurrentLocation("3-8-3"),
      conditions: {},
      selectors: [],
      currentPage: 1,
      pageSize: 1,
      total: 0,
      conditions: {},
      selectors: [
        {
          cname: "编号",
          name: "id",
          model: "input",
          default: "请填写回收记录编号"
        },
        {
          cname: "司机编号",
          name: "driverId",
          model: "input",
          default: "请填写司机编号"
        }
      ],
      columns: [
        {
          label: "回收编号",
          prop: "id",
          width: "200"
        },
        {
          label: "油卡编号",
          prop: "oilCardId",
          width: "200"
        },
        {
          label: "司机Id",
          prop: "ownerId",
          width: "200"
        },
        {
          label: "状态",
          prop: "status",
          width: "200",
          formatter: row => {
            if (row.status == "return") return "已返还";
            if (row.status == "issued") return "已发放";
            return "";
          }
        },
        {
          label: "发放时间",
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
            let arr = data.list;
            this.records = data.list;
            this.total = data.total;
            this.records = arr.map(item => {
              item.oilCardId = "";
              if (item.oilCard) {
                item.oilCardId = item.oilCard.id;
              }
            });
          }
        }
      );
    },
    apiListFetch() {
      _oilCard.recordsList(
        {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          status: "return",
          id: this.conditions.id ? this.conditions.id : "",
          driverId: this.conditions.driverId ? this.conditions.driverId : ""
        },
        "assignRecord",
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
    }
  }
};
</script>

<style scoped lang="scss">
</style>