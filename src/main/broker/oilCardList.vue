<template>
  <div>
    <div>
      <Position :positions="positions" />
      <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions" />
    </div>
    <div class="common-content-detail">
      <button-list :buttons="buttonList" @onButtonClick="onButtonClick" />
      <table-bar
        :tableData="cards"
        :columns="columns"
        :total="total"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @onSearch="onSearch"
        @action="action"
      />
    </div>
    <dialog-bar
      :editDialogShow="dialogShow"
      dialogTitle="充值"
      @onConfirm="onEditConfirm"
      @onCancel="onEditCancel"
      v-if="operator==='recharge'"
    >
      <el-form ref="rechargeCard" :model="rechargeCard" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="rechargeCard.cardNo" disabled />
        </el-form-item>
        <el-form-item label="油卡ID">
          <el-input v-model="rechargeCard.id" disabled />
        </el-form-item>
        <el-form-item label="发卡方">
          <el-input v-model="rechargeCard.brand" disabled />
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="rechargeCard.money" />
        </el-form-item>
      </el-form>
    </dialog-bar>
    <dialog-bar
      :editDialogShow="dialogShow"
      dialogTitle="发放"
      @onConfirm="onEditConfirm"
      @onCancel="onEditCancel"
      v-if="operator==='issue'"
    >
      <el-form ref="issueCard" :model="issueCard" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="issueCard.cardNo" disabled />
        </el-form-item>
        <el-form-item label="油卡ID">
          <el-input v-model="issueCard.id" disabled />
        </el-form-item>
        <el-form-item label="发卡方">
          <el-input v-model="issueCard.brand" disabled />
        </el-form-item>
        <el-form-item label="司机">
          <el-autocomplete
            class="autocomplete-bg"
            popper-class="my-autocomplete"
            v-model="issueCard.driverId"
            :fetch-suggestions="querySearch"
            placeholder="请输入司机ID"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.nickName?item.nickName:'暂无姓名' }}</div>
              <span class="addr">{{ item.id }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="issueCard.phone" />
        </el-form-item>
      </el-form>
    </dialog-bar>
  </div>
</template>

<script>
import ButtonList from "../common/buttonList.vue";
import Position from "../common/position.vue";
import SearchBar from "../common/searchbar.vue";
import TableBar from "../common/tableBar.vue";
import DialogBar from "../common/dialogBar.vue";
import { formatDateTime } from "../../assets/js/date.js";
import { debuglog } from "util";
require("../../assets/module/oilCard.js");
require("../../assets/module/organization.js");

var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
var _oilCard = com.lightningdog.rrq.oilCard;
var _organization = com.lightningdog.rrq.organization;
var _event = com.lightningdog.rrq.event;

export default {
  components: {
    DialogBar,
    Position,
    SearchBar,
    TableBar,
    ButtonList
  },
  data() {
    return {
      positions: Window.getCurrentLocation("3-8"),
      dialogShow: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      serachCb: null,
      operator: "recharge",
      columns: [
        {
          type: "selection",
          width: "50"
        },
        {
          label: "编号",
          prop: "id",
          width: "200"
        },
        {
          label: "油卡号",
          prop: "cardNo",
          width: "200"
        },
        {
          label: "发卡方",
          prop: "brand",
          width: "200"
        },
        {
          label: "司机编号",
          prop: "driverId",
          width: "150"
        },
        {
          label: "状态",
          prop: "assignsStatus",
          width: "150",
          formatter: row => {
            if (row.assignStatus == "issued") return "已发放";
            if (row.assignStatus == "return") return "已返还";
            return "未发放";
          }
        },
        {
          label: "发放时间",
          prop: "lastTime",
          width: "200",
          formatter: row => {
            return formatDateTime(row.lastTime);
          }
        },
        {
          label: "发卡时间",
          prop: "createTime",
          width: "200",
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
            if (row.assignStatus == "issued") {
              return [
                { text: "充值", methods: "recharge" },
                { text: "回收", methods: "return" }
              ];
            }
            return [
              { text: "充值", methods: "recharge" },
              { text: "发放", methods: "issue" }
            ];
          }
        }
      ],
      cards: [],
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
          text: "充值记录",
          method: "rechargeRecord"
        },
        {
          text: "发放记录",
          method: "issueRecord"
        },
        {
          text: "回收记录",
          method: "returnRecord"
        }
      ],
      selectors: [
        {
          cname: "油卡编号",
          name: "id",
          model: "input",
          default: "请填写用户编号"
        },
        {
          cname: "司机ID",
          name: "driverId",
          model: "input",
          default: "请填写用户编号"
        }
      ],
      conditions: {},
      rechargeCard: {},
      issueCard: {}
    };
  },
  mounted() {
    this.bindListEvent();
    this.bindIssueEvent();
    this.bindRechargeEvent();
    this.bindDriverListEvent();
    this.bindReturnEvent();
    this.apiListFetch();
  },
  methods: {
    querySearch(queryString, cb) {
      this.serachCb = cb;
      let queryS = "";
      if (this.issueCard) {
        queryS = this.issueCard.nickName ? this.issueCard.nickName : "";
      }
      _organization.list({
        pageNum: 1,
        pageSize: 20,
        userName: queryS,
        userType: "driver",
        status: 1
      });
    },
    bindDriverListEvent() {
      _event.on(
        "onDriverList",
        "com.lightningdog.rrq.organization",
        "list",
        (event, data) => {
          if (data && data.list) {
            this.serachCb(data.list);
          }
        }
      );
    },
    bindListEvent() {
      _event.on(
        "onOilList",
        "com.lightningdog.rrq.oilCard",
        "list",
        (event, data) => {
          this.cards = [];
          if (data && data.list) {
            let arr = data.list;
            this.total = data.total;
            this.cards = arr;
          }
        }
      );
    },
    bindReturnEvent() {
      _event.on(
        "onReturn",
        "com.lightningdog.rrq.oilCard",
        "return",
        (event, data) => {
          this.apiListFetch();
        }
      );
    },
    bindRechargeEvent() {
      _event.on(
        "onRecharge",
        "com.lightningdog.rrq.oilCard",
        "recharge",
        (event, data) => {
          this.apiListFetch();
        }
      );
    },
    bindIssueEvent() {
      _event.on(
        "onOilIssue",
        "com.lightningdog.rrq.oilCard",
        "issue",
        (event, data) => {
          this.apiListFetch();
        }
      );
    },
    apiListFetch() {
      _oilCard.list({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        id: this.conditions.id ? this.conditions.id : "",
        driverId: this.conditions.driverId ? this.conditions.driverId : ""
      });
    },
    handleSelect(val) {
      this.issueCard.driverId = val.id;
      this.issueCard.phone = val.phone;
    },
    onButtonClick(val) {
      let url;
      switch (val) {
        case "new":
          break;
        case "export":
          break;
        case "rechargeRecord":
          url = "/broken/recharge-record";
          break;
        case "issueRecord":
          url = "/broken/issue-record";
          break;
        case "returnRecord":
          url = "/broken/return-record";
          break;
      }
      if (!url.length) return;
      this.$router.push({
        path: url
      });
    },
    action(val) {
      console.log(val);
      var _this = this;
      this.operator = val.methods;
      if (val.methods === "recharge") {
        console.log("这里充值");
        this.rechargeCard = val.row;
        this.dialogShow = true;
      }
      if (val.methods === "issue") {
        this.issueCard = val.row;
        this.dialogShow = true;
      }
      if (val.methods === "return") {
        this.$confirm(`此操作将收回"${val.row.brand}", 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _oilCard.return({
              cardIds: [val.row.id],
              assignedUserId: val.row.driverId
            });
          })
          .catch(() => {});
      }
    },
    onSearch(val) {
      console.log(val);
      this.pageSize = val.pageSize;
      this.currentPage = val.currentPage;
      this.apiListFetch();
    },
    onConfirm(condition) {
      console.log(this.conditions);
      this.apiListFetch();
    },
    onEditConfirm(val) {
      if (this.operator == "issue") {
        _oilCard.issue({
          cardIds: [this.issueCard.id],
          assignedUserId: this.issueCard.driverId
        });
      } else if (this.operator == "recharge") {
        _oilCard.recharge({
          oilCardId: this.rechargeCard.id,
          rechargeMoney: this.rechargeCard.money
        });
      }
      this.dialogShow = false;
    },
    onEditCancel(val) {
      this.dialogShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.common-content-detail {
  height: 100%;
}
.autocomplete-bg {
  width: 100%;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>