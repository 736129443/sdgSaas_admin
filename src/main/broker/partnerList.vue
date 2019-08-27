<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:38:53
 * @LastEditTime: 2019-08-13 09:59:07
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
export default {
  components: {
    Position,
    SearchBar,
    TableBar,
    ButtonList
  },
  data() {
    return {
      positions: Window.getCurrentLocation("3-5"),
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
          cname: "合伙人编号",
          name: "id",
          model: "input",
          default: "请填写合伙人编号"
        },
        {
          cname: "合伙人姓名",
          name: "name",
          model: "input",
          default: "请填写合伙人姓名"
        },
        {
          cname: "电话",
          name: "phone",
          model: "input",
          default: ""
        },
        {
          cname: "状态",
          name: "status",
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
      tableData: [
        {
          name: "尚博",
          id: "9527",
          phone: "185xxxx0962",
          status: "禁用中",
          creatTime: 1564480281000,
          work: "城市配运、干线配运",
          workArea: "山西省、陕西省-西安市-莲湖区",
          score: "90",
          creater: "自行创建"
        }
      ],
      columns: [
        {
          type: "selection",
          width: "50"
        },
        {
          label: "合伙人姓名",
          prop: "name",
          width: "200"
        },
        {
          label: "合伙人ID",
          prop: "id",
          width: "150"
        },
        {
          label: "电话",
          prop: "phone",
          width: "150"
        },
        {
          label: "状态",
          prop: "status"
          // formatter:(row)=>{
          //     return formatDateTime(row.registerTime);
          // }
        },
        {
          label: "创建日期",
          prop: "creatTime",
          width: "150",
          formatter: row => {
            return formatDateTime(row.creatTime);
          }
        },
        {
          label: "意向工作类型",
          prop: "work",
          width: "150"
        },
        {
          label: "意向工作区域",
          prop: "workArea",
          width: "150"
        },
        {
          label: "信用评分",
          prop: "score"
        },
        {
          label: "创建人",
          prop: "creater"
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
      pageSize: 1,
      total: 0
    };
  },
  mounted() {
    this.total = this.tableData.length;
  },
  methods: {
    action(val) {
      if (val.methods === "detail") {
        // console.log(val)
        this.$router.push({
          path: "/broker/userDetail",
          query: {
            location: "3-5-1"
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