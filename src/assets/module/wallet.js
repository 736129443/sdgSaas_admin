var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var wallet = {
  _page: null,
  _global: com.lightningdog.rrq.global,
  _request: com.lightningdog.rrq.request,
  _event: com.lightningdog.rrq.event,
  _wallet:null,
  init:function(page) {
    _page = page;
    return this;
  },
  info:function() {
    var param = {
      token:_global.token
    }
    _request.post("wallet", "info", param).done((errorcode, result)=>{
      if(errorcode == 0) {
        this._wallet = result;
        this._event.trigger("onLoad", "com.lightningdog.rrq.wallet", this._wallet)
        return;
      }
      wx.showToast({
        title: '亲， 网络繁忙，等一会儿访问!!!',
        duration:2000
      })
    });
  },
  pay:function(_orderId) {
    var param = {
      token: _global.token,
      orderId:_orderId,
      channel:'wechat'
    }
    this._request.post("wallet", "pay", param).done((errorcode, result)=>{
      if(errorcode == 0) {
        wx.requestPayment({
          timeStamp: result.timeStamp,
          nonceStr: result.nonceStr,
          package: result.package,
          signType: result.signType,
          paySign: result.paySign,
          success:function(res) {
            if(res) {
              console.log("支付成功");
              if(res.errMsg == "requestPayment:ok") {
                this._event.trigger("onPay", "com.lightningdog.rrq.wallet", {
                  orderId: _orderId
                })
              }
            }
          }
        })
        return;
      }
      wx.showToast({
        title: '亲，发起支付失败，请重新尝试',
        duration:2000
      })
    })
  },
  recharge:function(_money) {
    this._request.post(wallet, "pay", {
      token:_global.token,
      money:_money,
      channel:'wechat'
    }).done((errorcode, result)=>{
      if(errorcode == 0) {
        console.log("succeed in recharging, moeny=" + moeny);
        this._event.trigger("onPay", "com.lightningdog.rrq.wallet", result);
        return;
      }
    })
  }
}

(function (NS, wallet) {
  NS.wallet = wallet;
})(com.lightning.rrq, wallet)
