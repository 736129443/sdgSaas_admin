import Vue from 'vue'
let vm = new Vue();
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
var mall = {
  _request: com.lightningdog.rrq.request,
  _global:com.lightningdog.rrq.global,
  _event: com.lightningdog.rrq.event,
  init: function(){
    return this;
  },
//   detail:function(_goodsId) {
//     var params = {
//       token:this._global.token,
//       goodsId:_goodsId
//     }
//     this._request.post('mall', 'detail', params).done((errorcode, result)=>{
//       if(errorcode != 0) {
//         return;
//       }
// 
//       this._event.trigger("onDetail", "com.lightningdog.rrq.mall", result);
//     });
//     return this;
//   },
	detail:function(info){
        vm.$loading({
            text: '加载中'
        });
		// var param = {
		//   token:this._global.token,
		//   id:info
		// }
		this._request.post("mall", 'detail', info).done((errorcode, result)=>{
          vm.$loading().close();
		  if(errorcode == 0) {
		    this._event.trigger("onDetail", "com.lightningdog.rrq.mall", result);
		    return;
		  }
		  vm.showToast({
		    title: '亲, 网络异常。',
		    icon: 'fail',
		    duration: 2000
		  });
		});
		return this;
	},
  publish:function(info) {
    vm.$loading({
        text: '加载中'
    });
    var param = {
      token:this._global.token,
      goods:info
    }
    this._request.post("mall", 'publish', param).done((errorcode, result)=>{
      vm.$loading().close();
      if(errorcode == 0) {
        console.log("mall goods publish")
        this._event.trigger("onCreate", "com.lightningdog.rrq.mall", result);
        return;
      }
      vm.showToast({
        title: '发布失败! 亲, 请重新提交一次。',
        icon: 'fail',
        duration: 2000
      });
    });
    return this;
  },
  list:function(condition) {
    vm.$loading({
        text: '加载中'
    });
    var params = {
      token:this._global.token,
      condition:condition
    };
    this._request.post("mall", "list", params).done((errorcode, result)=>{
      console.log("mall list, errorcode=" + errorcode + ", result=" + result);
      vm.$loading().close();
      if(errorcode == 0) {
        this._event.trigger("onMallList", "com.lightningdog.rrq.mall", result);
        return;
      }
      vm.showToast({
        title: '亲，没有其他商品可选了！！！',
        duration:2000
      })
    });
    return this;
  },
  category:function(condition,name="onCategory") {
    vm.$loading({
        text: '加载中'
    });
    var params = {
      token:this._global.token,
      condition:condition
    }
    this._request.post("mall", "category", params).done((errorcode, result)=>{
      vm.$loading().close();
      if(errorcode == 0) {
        this._event.trigger(name, "com.lightningdog.rrq.mall", result);
        return;
      }
      vm.showToast({
        title: '亲，没有其他商品可选了！！！',
        duration:2000
      })
    });
    return this;
  },
  search:function(_keywords){
    vm.$loading({
        text: '加载中'
    });
    this._request.post("mall", "search", _keywords).done((errorcode, result)=>{
      vm.$loading().close();
      if(errorcode == 0 ) {
        // console.log("match goods.size=" + result.length);
        this._event.trigger("onMallSearch", "com.lightningdog.rrq.mall", result)
        return;
      }
      vm.showToast({
        title: '亲，没有匹配商品！！！',
        duration:2000
      })
    });
		return this;
  }
};

  (function (NS, mall){
    NS.mall = mall;
	  
  })(com.lightningdog.rrq, mall);
