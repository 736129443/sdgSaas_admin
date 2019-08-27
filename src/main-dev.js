// 入口文件
// 导入vue
import Vue from 'vue';
import Vuex from 'vuex';
// Vue.use(Vuex);
// 导入路由模块
import VueRouter from 'vue-router';
// 导入APP模块
import App from './App.vue';
// 导入element-ui
import ElementUI from 'element-ui';
// 导入vue-resource插件
import VueResource from 'vue-resource';
// 安装VueResource
Vue.use(VueResource);
// 安装element-ui
Vue.use(ElementUI);
// 安装VueRouter
Vue.use(VueRouter);
Vue.use(Vuex);

//图片相册查看
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
//引入公共样式
import './assets/css/common.css'

// 导入字体图标样式
import './assets/font/iconfont.css'
import './assets/font/iconfont1.css'
import "./assets/font/iconfont2.css"
import "./assets/font/iconfont3.css"
// 导入路径模块
import router from './router.js'
// 导入Element-UI样式
import 'element-ui/lib/theme-chalk/index.css'
// import Base64 from 'js-base64';
// 引入echa
import echarts from 'echarts'

//加密
import Base64 from 'js-base64'
import { login } from "./assets/js/login";
Vue.prototype.global = { lightningUrl: "https://www.sdgwl.com" };

// Vue.prototype.global = {lightningUrl:"http://192.168.50.202:8080"};
// Vue.prototype.global = {lightningUrl:"http://192.168.50.33:8099"};

Vue.prototype.$echarts = echarts;

// 导入mock.js
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})
Vue.use(Vuex);
var vuexState = {
    // 消息数量
    orderNum: 0,
    // 计价方式
    index: null,
    // 起步价页面
    arr: [],
    // 整车页面数组
    arr1: [],
    // 件数组
    arr2: [],
    // 票数组
    arr3: [],
    // 小时数组
    arr4: []
};

Vue.prototype.$vuexState = vuexState;
var vuexStore = new Vuex.Store({
    // 定义状态
    state: vuexState,
    mutations: {
        // 消息数量函数
        setCurrentPage(state, num) {
            state.orderNum += -num;
        },
        // 选择计价方式
        selectValuationMethod(state, index) {
            state.index = index;
            console.log(state.index)
        },
        // 添加起步价页面
        add(state, arr) {
            console.log(arr)
            arr.data.push(arr.obj);
            console.log(arr.data)
        },
        // 删除某行数据
        delectRow(state, arr) {
            arr.data.splice(arr.index, 1);
        }
    }
});
Vue.prototype.$store = vuexStore;
console.log(Vue.prototype.$vuexStore);

var vu = new Vue({
    el: '#dv',
    Base64,
    router,
    methods: {
        handleChange(index) {
        }
    },
    render: function (run) {
        return run(App);
    },
});
