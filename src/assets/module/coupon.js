var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var coupon = {
  _request:com.lightningdog.rrq.request,
  _global:com.lightningdog.rrq.global,
  _event:com.lightningdog.rrq.event,
  init:function() {
    return this;
  },
  list:function(obj) {
    this._request.post("coupon", "list", {
      token:this._global.token,
      couponPoolDisplay:obj
    }).done((errorcode, result)=>{
      if(errorcode == 0) {
        console.log("coupon list OK");
        this._event.trigger("onMore", "com.lightningdog.rrq.coupon", result);
        return;
      }

      uni.showToast({
        title: '亲， 优惠券同步失败， 请稍后',
      })
    })
  },
  lists:function(obj,type) {
    this._request.post("coupon", "lists", {
      token:this._global.token,
      condition:obj,
	  coupon:{
		  status:type
	  }
    }).done((errorcode, result)=>{
      if(errorcode == 0) {
        this._event.trigger("onLists", "com.lightningdog.rrq.coupon", result);
        return;
      }

      uni.showToast({
        title: '亲，获取优惠券列表， 请重视...',
      })
    })
  },
  create:function(obj) {
    this._request.post("coupon", "create", obj).done((errorcode, result)=>{
      if(errorcode == 0) {
        this._event.trigger("onCreate", "com.lightningdog.rrq.coupon", result);
        return;
      }

    })
  },
  upload:function(obj) {
      this._request.file("coupon", "upload", obj).done((errorcode, result)=>{
          if(errorcode == 0) {
          this._event.trigger("onUpload", "com.lightningdog.rrq.coupon", result);
          return;
      }

    })
  },
  online:function(num) {
    this._request.post("coupon", "online", {
      token:this._global.token,
      id:num
    }).done((errorcode, result)=>{
      if(errorcode == 0) {
		 uni.showToast({
		   title: '优惠券活动上线成功!',
		 }) 
        this._event.trigger("goOnline", "com.lightningdog.rrq.coupon", result);
        return;
      }
	  
      uni.showToast({
        title: '亲， 优惠券上线失败， 请重试...',
      })
    })
  },
  cancel:function(num) {
    this._request.post("coupon", "cancel", {
      token:this._global.token,
      id:num
    }).done((errorcode, result)=>{
      if(errorcode == 0) {
		 uni.showToast({
		   title: '优惠活动取消成功!',
		 }) 
        this._event.trigger("onCancel", "com.lightningdog.rrq.coupon", result);
        return;
      }
	  
      uni.showToast({
        title: '亲， 取消优惠券失败， 请重试...',
      })
    })
  },
  addCard:function(obj) {
      this._request.post("coupon", "addCard", {
          token:this._global.token,
          card:obj
      }).done((errorcode, result)=>{
          if(errorcode == 0) {
          this._event.trigger("onAddCard", "com.lightningdog.rrq.coupon", result);
          return;
        }
    })
  },
  cardList:function(obj) {
      this._request.post("coupon", "cardList", {
          token:this._global.token,
          card:obj
          }).done((errorcode, result)=>{
            if(errorcode == 0) {
            this._event.trigger("onCardList", "com.lightningdog.rrq.coupon", result);
            return;
          }
      })
  },
};

(function(NS, coupon){
  NS.coupon = coupon;
})(com.lightningdog.rrq, coupon)
