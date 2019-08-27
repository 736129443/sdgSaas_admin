import Vue from 'vue'
let vm = new Vue();
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var _global = com.lightningdog.rrq.global;

var account = {
  _request: com.lightningdog.rrq.request,
  _event: com.lightningdog.rrq.event,
  init: function () {
    return this;
  },
  verifyCode: function (_telephone) {
    vm.$loading({
      text: '验证码发送中...',
    })
    this._request.post("account", "verifycode", {
      telephone: _telephone
    }).done((errorcode, result) => {
      vm.$loading().close();
      if (errorcode == 0) {
        Window.vm.$message({
          message: '验证码已发送',
          type: 'success'
        })
        console.log("return verifycode=" + result);
        this._event.trigger("onVerify", "com.lightningdog.rrq.account", result);
        return;
      }
      vm.$message({
        message: '亲，网络错误，请稍后...',
        type: 'warning'
      });
    })
  },
  invite: function (condition) {
    wx.showLoading({
      title: '请稍等...'
    })
    this._request.post("account", "invite", condition).done((errorcode, result) => {
      if (errorcode == 0) {
        this._event.trigger("onInvite", "com.lightningdog.rrq.account", result);
      } else {
        wx.showToast({
          title: result
        })
      }
      wx.hideLoading({})
    })
  },
  login: function (_telephone, _ciphertext) {
    vm.$loading({
      text: '登录中...'
    })
    let params = {
      encodeData: _ciphertext,
      phone: _telephone
    }
    this._request.post("account", "login", params).done((errorcode, result) => {
      vm.$loading().close();
      if (errorcode == 0 && result) {
        vm.$message({
          message: '登录成功',
          type: 'success'
        })
        console.log(result);
        _global.token = result.token;
        _global.userId = result.id;
        this._event.trigger("onLogin", "com.lightningdog.rrq.account", result)
      } else {
        vm.$message({
          message: '登录失败',
          type: 'error'
        });
      }
    })
    return this;
  },
  user: function () {
    wx.showLoading({
      title: '加载中'
    })
    this._request.post("account", "info", {
      token: _global.token,
      userId: _global.userId
    }).done((errorcode, result) => {
      wx.hideLoading({})
      if (errorcode == 0) {
        this._event.trigger("onUser", "com.lightningdog.rrq.account", result);
        return;
      }
      wx.showToast({
        title: result
      })
    })
  },
  rsa: function () {
    let body = {
      money: 60,
      channel: "wechat",
      category: 3,
      spbillCreateIp: "192.168.50.228",
      code: "061ohR2B0VlHxi2EKd6B0BW73B0ohR2S"
    }
    let userInfo = wx.getStorageSync('users');
    if (!userInfo) return;
    let ciphertext = jsencrypt.encryptByRsa(JSON.stringify(body), userInfo.publicKey);
    let params = {
      message: ciphertext
    }
    console.log('加密后数据是：' + ciphertext);
    this._request.post("account", "rsa", params).done((errorcode, result) => {
      wx.hideLoading({})
      if (errorcode == 0) {
      }
      wx.showToast({
        title: result
      })
    })
  },
  getIp: function () {
    this._request.gget("account", "ip", null).done((errorcode, result) => {
      if (errorcode == 0) {
        _global.ip = result.ipAddr;
        return;
      }
      wx.showToast({
        title: result
      })
    })
  },
  heartbeat: function () {
    console.log("account heartbeat....")
    // _myAmap.getRegeo({
    //   success: (res) => {
    //     let desc = res[0].desc;
    //     //去掉附近
    //     if (res[0].desc.indexOf('附近') >= 0) {
    //       desc = desc.split("附近").join("");
    //     }
    //     let obj = {
    //       province: res[0].regeocodeData.addressComponent.province,
    //       city: res[0].regeocodeData.addressComponent.city,
    //       district: res[0].regeocodeData.addressComponent.district,
    //       address: desc,
    //       longitude: `${res[0].longitude}`,
    //       latitude: `${res[0].latitude}`,
    //       timestamp: `${Date.parse(new Date())}`
    //     };
    //     _global.location = obj;
    //     let jsonStr = JSON.stringify(obj);
    //     var param = {
    //       token: _global.token,
    //       location: jsonStr
    //     }
    //     this._request.post("account", "heartbeat", param).done((errorcode, result) => {
    //       console.log("heartbeat errorcode=" + errorcode + ", result=" + result);
    //     })
    // },
    //   fail: (err) => {
    //   }
    // })
    // wx.getLocation({
    //   success: res => {
    //     if (res) {
    //       let jsonStr = JSON.stringify({
    //         longitude: `${res.longitude}`,
    //         latitude: `${res.latitude}`,
    //         timestamp: `${Date.parse(new Date())}`
    //       });
    //       var param = {
    //         token: _global.token,
    //         location: jsonStr
    //       }
    //       this._request.post("account", "heartbeat", param).done((errorcode, result) => {
    //         console.log("heartbeat errorcode=" + errorcode + ", result=" + result);
    //       })
    //     }
    //   },
    // })
  }
};

(function (NS, account) {
  NS.account = account;
  var looper = function () {
    console.log("looper ....")
    var _global = NS.global;
    var _account = NS.account;
    if (_global.token) {
      _account.heartbeat();
    }
    setTimeout(looper, 60000)
  }

  // setTimeout(looper, 60000)
})(com.lightningdog.rrq, account)
