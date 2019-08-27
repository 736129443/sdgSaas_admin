import Vue from 'vue'
let vm = new Vue();
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var order = {
    _token: com.lightningdog.rrq.global,
    _request: com.lightningdog.rrq.request,
    _event: com.lightningdog.rrq.event,
    _order: {
        goodsList: [],
        roadLine: {},
        vehicleReqs: [],
        couponList: []
    },
    init: function () {
        return this;
    },
    use: function (coupon) {
        this._order.couponList.push(coupon);
    },
    cancel: function (couponId) {
        for (var i = 0; i < this._order.couponList.length; ++i) {
            if (_couponList[i].id == couponId) {
                delete _couponList[i];
            }
        }
    },
    choose: function (vehicleReq) {
        this._order.vehicleReqs = [];
        this._order.vehicleReqs.push(vehicleReq);
    },
    collectGoodsList: function (shopcart) {
        this._order.goodsList.push(shopcart.getGoodsList());
    },
    collectRoadLine: function (roadLine) {
        this._order.roadLine = roadLine.toObject();
    },
    settle: function () {
        if (this._order.goodsList.length > 0) {
            return settleGoods();
        }

        return settleVehicle();
    },
    settleGoods: function () {
        var price = 0.00;
        for (var i = 0; i < this._order.goodsList.length; ++i) {
            price += this._order.goodsList[i].price;
        }
        for (var i = 0; i < this._order.couponList.length; ++i) {
            settleCoupon(price, this._order.couponList[i]);
        }
    },
    settleVehicle: function () {

    },
    settleCoupon: function (price, coupon) {

        return price;
    },
    create: function () {
        var params = {
            token: _this._global.token
        }
        if (this._order.goodsList.length > 0) {
            params['goodsList'] = this._order.goodsList;
        }
        if (this._order.vehicleReqs.length > 0) {
            params['vehicleReqs'] = this._order.vehicleReqs;
        }
        if (this._order.couponList.length > 0) {
            params['couponList'] = this._order.couponList;
        }
        params['roadLine'] = this._order.roadLine;

        this._request.post("order", "create", params).done((errorcode, result) => {
            if (errorcode == 0) {
                this._event.trigger("onCreate", "com.lightningdog.rrq.order", {
                    type: "pool",
                    order: result
                });
                this._order.goodsList = [];
                this._order.roadLine = {};
                this._order.vehicleReqs = [];
                return;
            }
            wx.showToast({
                title: '亲，创建失败，请确认数据完整性!!!',
                duration: 2000
            })
        });
    },
    list: function (_condition,Interface) {
        this._request.post("order", Interface, _condition).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("order size=" + result.length);
                this._event.trigger("onMore", "com.lightningdog.rrq.order", result);
            }
        });
    },

    detail: function (condtion) {
        this._request.post("order", 'details', condtion).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("detail order=" + result);
                this._event.trigger("onMore", "com.lightningdog.rrq.order", result);
                return;
            }
        })
    },
    phone: function (phone,Interface) {
        this._request.post("organization", Interface, phone).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("detail organization=" + result);
                this._event.trigger("onMore", "com.lightningdog.rrq.order", result);
                return;
            }
        })
    },
    delete: function (_condition,Interface,info) {
        this._request.post("order", Interface, _condition).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("detail order=" + result);
                this._event.trigger("onMore", "com.lightningdog.rrq.order", result);
                this._request.post("order", 'project_list', info).done((errorcode, result) => {
                    if (errorcode == 0) {
                        vm.$message({
                            showClose: true,
                            message: '删除成功！',
                            type: 'success'
                        });
                    }
                });
                return;
            }
        })
    },
    listVehicleReq: function () {
        this._request.post("order", "vehicleReq", {
            token: this._global.token
        }).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("vehicleReq list=" + result);
                this._event.trigger("onVechileReq", "com.lightningdog.rrq.order", result);
                return;
            }
        });
    },
    cancel: function (_orderId) {
        this._request.post("order", "cancel", {
            token: this._global.token,
            orderId: _orderId
        }).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("succeed in cancel order... ...");
                this._event.trigger("onCancel", "com.lightningdog.rrq.order", null);
                return;
            }

            wx.showToast({
                title: '亲，网络异常，稍后重试！！！',
                duration: 2000
            })
        })
    }
};

(function (NS, order) {
    NS.order = order;
})(com.lightningdog.rrq, order);
  