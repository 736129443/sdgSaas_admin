<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 17:00:19
 * @LastEditTime: 2019-08-14 17:03:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
Window.com = {
  baseURL: "http://192.168.50.88"
  //  baseURL: "http://192.168.50.176"
};
require("./assets/module/config.js");
require("./assets/module/event_helper.js");
require("./assets/module/request_helper.js");

Window.deepCopy = function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        result[key] = deepCopy(obj[key]); //递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
};
Window.navConfig = [
  {
    index: "1",
    img: require("./assets/images/png/icon_todos_normal.png"),
    path: "/statistic",
    name: "数据大屏"
  },
  {
    index: "2",
    img: require("./assets/images/png/icon_todos_normal.png"),
    path: "/customer/list",
    name: "客户管理",
    children: [
      {
        index: "2-1",
        path: "/customer/list",
        name: "客户档案"
      },
      {
        index: "2-2",
        path: "/customer/project",
        name: "项目管理"
      },
      {
        index: "2-3",
        path: "/customer/order",
        name: "订单列表"
      },
      {
        index: "2-4",
        path: "/customer/publish-order",
        name: "在线发单"
      }
    ]
  },
  {
    index: "3",
    img: require("./assets/images/png/ic_rigional_normal.png"),
    path: "/broker",
    name: "承运商管理",
    children: [
        {
          index: "3-1",
          path: "/broker/info",
          name: "承运商信息"
        },
        {
            index: "3-9",
            path: "/broker/order-price",
            name: "竞标信息"
        },
        {
            index: "3-10",
            path: "/broker/order-price",
            name: "投标管理"
        },
        {
            index: "3-7",
            path: "/broker/task",
            name: "承接订单"
        },
        {
            index: "3-2",
            path: "/broker/team",
            name: "车队列表"
        },
       {
          index: "3-3",
          path: "/broker/driver",
          name: "司机列表"
        },
        {
          index: "3-4",
          path: "/broker/mover",
          name: "搬运工"
        },{
          index: "3-5",
          path: "/broker/partner",
          name: "合伙人"
       },
      {
        index: "3-6",
        path: "/broker/address",
        name: "常用地址"
      },
      {
        index: "3-8",
        path: "/broker/oil-card",
        name: "油卡发放",
        children: [
          {
            index: "3-8-1",
            path: "/broker/recharge-record",
            name: "充值记录"
          },
          {
            index: "3-8-2",
            path: "/broker/issue-record",
            name: "发放记录"
          },
          {
            index: "3-8-3",
            path: "/broker/return-record",
            name: "回收记录"
          }
        ]
      }
    ]
  },
  {
    index: "4",
    img: require("./assets/images/png/ic_rigional_normal.png"),
    path: "/market",
    name: "运营推广",
    children: [
      {
        index: "4-3",
        path: "/operation/coupon_pool",
        name: "优惠券池",
        children: [
          {
            index: "4-3-1",
            path: "/operation/coupon_pool_new",
            name: "优惠券池"
          }
        ]
      },
      {
        index: "4-1",
        path: "/operation/recharge_card",
        name: "充值卡"
      },
      {
        index: "4-2",
        path: "/operation/recharge_card_list",
        name: "充值记录"
      },
      {
        index: "4-5",
        path: "/operation/coupon",
        name: "优惠券"
      },
      {
        index: "4-7",
        path: "/operation/complain",
        name: "投诉管理"
      },
      {
        index: "4-8",
        path: "/operation/customer_review",
        name: "评价管理"
      }
    ]
  },
  {
    index: "5",
    img: require("./assets/images/png/ic_rigional_normal.png"),
    path: "/depot/list",
    name: "仓库管理"
  },
  {
    index: "6",
    img: require("./assets/images/png/ic_rigional_normal.png"),
    path: "/goods/list",
    name: "商品管理",
    children: [
      {
        index: "6-1",
        path: "/goods/list",
        name: "商品列表"
      },
      {
        index: "6-2",
        path: "/goods/class",
        name: "分类标签"
      }
    ]
  },
  {
    index: "7",
    img: require("./assets/images/png/ic_rigional_normal.png"),
    path: "/callcenter/history",
    name: "话务中心"
  },
  {
    index: "8",
    img: require("./assets/images/png/ic_rigional_normal.png"),
    path: "/finance",
    name: "财务中心",
    children: [
      {
        index: "8-1",
        path: "/finance/statistic",
        name: "财务统计"
      },
      {
        index: "8-2",
        path: "/finance/order",
        name: "应收账单"
      },
      {
        index: "8-3",
        path: "/finance/order-adjustment",
        name: "应收调账"
      },
      {
        index: "8-4",
        path: "/finance/order-project-adjustment",
        name: "项目应收账单"
      },
      {
        index: "8-5",
        path: "/finance/task",
        name: "应付账单"
      },
      {
        index: "8-6",
        path: "/finance/task-adjustment",
        name: "应付调账"
      },
      {
        index: "8-7",
        path: "/finance/task-project-adjustment",
        name: "项目应付账单"
      },
      {
        index: "8-8",
        path: "/finance/invoice",
        name: "票务管理"
      }
    ]
  },
  {
    index: "9",
    img: require("./assets/images/png/icon_organization_normal.png"),
    name: "无车承运人",
    path: "/trunkbroker",
    children: [
      {
        index: "9-1",
        path: "/truckbroker/truck",
        name: "电子运单"
      },
      {
        index: "9-2",
        path: "/truckbroker/capital",
        name: "资金流单"
      }
    ]
  }
];

Window.changeTableHeaderColor = function({
  row,
  column,
  rowIndex,
  columnIndex
}) {
  if (rowIndex === 0) {
    return "background-color: #E2E2E2;";
  }
};

function indexCompare(localIndexs, indexs, i) {
  for (var j = 0; j <= i; ++j) {
    if (indexs[j] != localIndexs[j]) return false;
  }
  return true;
}

function loopChild(children, i, indexs) {
  for (var j = 0; j < children.length; ++j) {
    var localIndexs = children[j].index.split("-");
    if (indexCompare(localIndexs, indexs, i)) {
      return {
        path: children[j].path,
        name: children[j].name,
        children: children[j].children
      };
    }
  }
}

Window.getCurrentLocation = function(index) {
  var indexs = index.split("-");
  var results = [];
  var i = 0;
  var children = Window.navConfig;
  while (true) {
    var child = loopChild(children, i, indexs);
    if (child == null) break;

    children = child.children;
    delete child.children;
    results.push(child);

    if (!children) break;
    ++i;
  }
  return results;
};
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  created() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
