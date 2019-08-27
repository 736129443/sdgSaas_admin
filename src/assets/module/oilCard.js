
import Vue from 'vue'
let vm = new Vue();
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var oilCard = {
    _request: com.lightningdog.rrq.request,
    _global: com.lightningdog.rrq.global,
    _event: com.lightningdog.rrq.event,
    init: function () {
        return this;
    },
    list: function (conditions) {
        vm.$loading({
            text: '加载中'
        })
        conditions.token = this._global.token;
        this._request.post("oilCard", "list", conditions).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger("onOilList", "com.lightningdog.rrq.oilCard", result);
                return;
            }
            vm.$message({
                message: '亲， 加载列表失败，请稍后',
                type: "error"
            });
        })
    },
    /// 充值/回收/发放记录请求
    recordsList: function (conditions, pathName = "rechargeRecord", modName = "onIssueList") {
        vm.$loading({
            text: '加载中'
        })
        conditions.token = this._global.token;
        this._request.post("oilCard", pathName, conditions).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger(modName, "com.lightningdog.rrq.oilCard", result);
                return;
            }
            vm.$message({
                message: '亲， 加载列表失败，请稍后',
                type: "error"
            });
        })
    },
    issue: function (conditions) {
        vm.$loading({
            text: '发放中'
        })
        conditions.token = this._global.token;
        this._request.post("oilCard", "issue", conditions).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                vm.$message({
                    message: "发放成功",
                    type: "success"
                })
                this._event.trigger("onOilIssue", "com.lightningdog.rrq.oilCard", result);
                return;
            }
            vm.$message({
                message: '亲， 发放失败，请稍后',
                type: "error"
            });
        })
    },
    recharge: function (conditions) {
        vm.$loading({
            text: '充值中'
        })
        conditions.token = this._global.token;
        this._request.post("oilCard", "recharge", conditions).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                vm.$message({
                    message: "充值成功",
                    type: "success"
                })
                this._event.trigger("onRecharge", "com.lightningdog.rrq.oilCard", result);
                return;
            }
            vm.$message({
                message: '亲， 充值失败，请稍后',
                type: "error"
            });
        })
    },
    return: function (conditions) {
        vm.$loading({
            text: '回收中'
        })
        conditions.token = this._global.token;
        this._request.post("oilCard", "returnCard", conditions).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                vm.$message({
                    message: "已回收",
                    type: "success"
                })
                this._event.trigger("onReturn", "com.lightningdog.rrq.oilCard", result);
                return;
            }
            vm.$message({
                message: '亲， 回收失败，请稍后',
                type: "error"
            });
        })
    }
};

(function (NS, oilCard) {
    NS.oilCard = oilCard;
})(com.lightningdog.rrq, oilCard)
