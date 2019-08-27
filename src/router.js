/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 17:26:48
 * @LastEditTime: 2019-08-13 15:07:00
 * @LastEditors: Please set LastEditors
 */
import VueRouter from 'vue-router'
// 导入首页组件
import Index from './main/index.vue'
// 登陆组件导入
import Login from './star/login.vue'
//平台条款
import Statistic from './main/statistic/statistic.vue'//岗位

import Post from './main/clause/post.vue'//岗位
import Client from './main/clause/client.vue'//客户
import Serve from './main/clause/serve.vue'//服务

import CustomerList from './main/customer/customerList.vue'
import OrderList from './main/customer/orderList.vue'
import PublishOrder from './main/customer/publishOrder.vue'
import Project from './main/customer/project.vue'
import Details from './main/customer/order_details.vue'

import Truck from './main/trunkbroker/truck.vue'
import Capital from './main/trunkbroker/capital.vue'

import Info from './main/broker/info.vue'
import DriverList from './main/broker/driverList.vue'
import MoverList from './main/broker/moverList.vue'
import PartnerList from './main/broker/partnerList.vue'
import DriverDetail from './main/broker/driverDetail.vue'
import MyLocation from './main/broker/myLocation.vue'
import userDetail from './main/broker/userDetail.vue'
import TeamList from './main/broker/teamList.vue'
import TaskList from './main/broker/taskList.vue'
import OilCard from './main/broker/oilCardList.vue'
import RechargeRecord from "./main/broker/rechargeRecord.vue"
import IssueRecord from "./main/broker/issueRecord.vue"
import ReturnRecord from "./main/broker/returnRecord.vue"
import VehicleList from './main/broker/vehicleList.vue'

import GoodsList from './main/goods/goodsList.vue'
import GoodsClass from './main/goods/goodsClass.vue'

import DepotList from './main/depot/depotList.vue'

import CallCenterHistory from './main/callcenter/history.vue'

import CouponPool from './main/operation/couponPool.vue'
import CouponPoolNew from './main/operation/couponPoolNew.vue'
import CouponList from './main/operation/couponList.vue'
import ComplainOrder from './main/operation/complainOrder.vue'
import ValuationOrder from './main/operation/valuationOrder.vue'
import RechargeCard from './main/operation/rechargeCard.vue'
import RechargeRecords from './main/operation/rechargeRecord.vue'

import FinanceOrderList from './main/finance/orderList.vue'
import FinanceOrderAdjustment from './main/finance/orderAdjustment.vue'
import FinanceOrderProjectAdjustment from './main/finance/orderProjectAccount.vue'
import FinanceTaskList from './main/finance/taskList.vue'
import FinanceTaskAdjustment from './main/finance/taskAdjustment.vue'
import FinanceTaskProjectAdjustment from './main/finance/taskProjectAccount.vue'
import FinanceInvoiceList from './main/finance/invoiceList.vue'
import FinanceStatistic from './main/finance/statistic.vue'
import FinanceProjectAdjustment from './main/finance/orderProjectAdjustment.vue'
import FinanceOrderTaskAdjustment from './main/finance/orderTaskAdjustment.vue'



// 3. 创建路由对象
var router = new VueRouter({
    routes: [
        // 登陆组件
        {
            path: '/',
            component: Login
        },
        {
            path: '/index',
            // component: (resolve) => require(['./main/index.vue'], resolve),
            component: Index,
            // beforeEnter: (to, from, next) => {
            //     if (sessionStorage.getItem('users')) {
            //         next()
            //     } else {
            //         next({
            //             path: '/',
            //         });
            //     }
            // },
            children: [
                //数据大屏
                { path: '/statistic', component: Statistic },

                //承运商管理
                { path: '/broker/info', component: Info },
                { path: '/broker/driver', component: DriverList },
                { path: '/broker/mover', component: MoverList },
                { path: '/broker/partner', component: PartnerList },
                { path: '/broker/driverDetail', component: DriverDetail },
                { path: '/broker/address', component: MyLocation },
                { path: '/broker/team', component: TeamList },
                { path: '/broker/task', component: TaskList },
                { path: '/broker/oil-card', component: OilCard },
                { path: "/broken/recharge-record", component: RechargeRecord },
                { path: "/broken/issue-record", component: IssueRecord },
                { path: "/broken/return-record", component: ReturnRecord },
                { path: '/broker/vehicle', component: VehicleList },
                { path: '/broker/userDetail', component: userDetail },

                { path: '/goods/list', component: GoodsList },
                { path: '/goods/class', component: GoodsClass },

                { path: '/depot/list', component: DepotList },

                // 优惠券池
                { path: '/operation/coupon_pool', component: CouponPool },
                // 创建优惠券池
                { path: '/operation/coupon_pool_new', component: CouponPoolNew },
                // 充值卡
                { path: '/operation/recharge_card', component: RechargeCard },
                // 充值卡记录
                { path: '/operation/recharge_card_list', component: RechargeRecords },
                // 优惠券
                { path: '/operation/coupon', component: CouponList },
                // 投诉管理
                { path: '/operation/complain', component: ComplainOrder },
                // 评价管理
                { path: '/operation/customer_review', component: ValuationOrder },
                //平台条款
                { path: '/clause/client', component: Client },//客户
                { path: '/clause/post', component: Post },//岗位
                { path: '/clause/serve', component: Serve },//服务
                { path: '/customer/list', component: CustomerList },
                { path: '/customer/order', component: OrderList },
                { path: '/customer/publish-order', component: PublishOrder },
                { path: '/customer/project', component: Project },
                { path: '/customer/Details', component: Details },

                { path: '/callcenter/history', component: CallCenterHistory },

                { path: '/finance/order', component: FinanceOrderList },
                { path: '/finance/order-adjustment', component: FinanceOrderAdjustment },
                { path: '/finance/order-project-adjustment', component: FinanceOrderProjectAdjustment },
                { path: '/finance/task', component: FinanceTaskList },
                { path: '/finance/task-adjustment', component: FinanceTaskAdjustment },
                { path: '/finance/task-project-adjustment', component: FinanceTaskProjectAdjustment },
                { path: '/finance/invoice', component: FinanceInvoiceList },
                { path: '/finance/statistic', component: FinanceStatistic },
                { path: '/finance/order-project-adjustments', component: FinanceProjectAdjustment },//项目应付调账
                { path: '/finance/order-task-adjustment', component: FinanceOrderTaskAdjustment },//项目应收调账

                { path: '/truckbroker/truck', component: Truck },
                { path: '/truckbroker/capital', component: Capital },

                { path: '/clause/client', component: Client },//客户
                { path: '/clause/post', component: Post },//岗位
                { path: '/clause/serve', component: Serve },//服务
            ]
        }
    ]
});

export default router
