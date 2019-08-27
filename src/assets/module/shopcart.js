var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var shopcart = {
  _global: com.lightningdog.rrq.global,
  _request: com.lightningdog.rrq.request,
  _event: com.lightningdog.rrq.event,
  _goodsList:[],
  _money:null,
  init: function () {
    return this;
  },
  add:function(goods) {
    this._goodsList.push(goods);
  },
  del:function(goods) {
    for(var i=0; this._goodsList.length; ++i) {
      if(goods.id==this._goodsList[i].id){
        delete this._goodsList[i];
      }
    }
  },
  getGoodsList: function () {
    return this._goodsList;
  },
  sync:function(num,arr,name="onSync") {
    var params = {
      token:this._global.token,
	  flag:num,
      goods:arr,
    }
		console.log(params)
    this._request.post("shoppingcart", "sync", params).done((errorcode, result)=>{
			if(errorcode == 0) {
				this._event.trigger(name, "com.lightningdog.rrq.shopcart", result);
				// this._goodsList = [];
				// this._goodsList.push(result)
				return;
			}
			uni.showToast({
				title: '亲，网络不佳，请重试...',
				duration: 2000
			});
    });
  },
  load:function(name="onLoad") {
	  console.log(name)
    this._request.post("shoppingcart", "load", {
      token:this._global.token
    }).done((errorcode, result)=>{
      if(errorcode==0) {
		console.log(name) 
		this._event.trigger(name, "com.lightningdog.rrq.shopcart", result)	
      } else {
        uni.showToast({
          title: '亲，网络不佳，请重试...',
          duration:2000
        })
      }
    });
  },
  settle:function() {
    var price = 0.00;
    for(var i=0; i<this._goodsList.length; ++i) {
      price += this._goodsList[i].price;
    }
    return price;
  }
};

(function (NS, shopcart) {
  NS.shopcart = shopcart;
	
})(com.lightningdog.rrq, shopcart)
