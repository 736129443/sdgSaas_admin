import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  // 定义状态
  state: {
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
  },
    mutations:{
      // 消息数量函数
      setCurrentPage(state,num) {
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


export default store
