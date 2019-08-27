import Vue from 'vue'
let vm = new Vue();
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var trunk = {
    _request: com.lightningdog.rrq.request,
    _global: com.lightningdog.rrq.global,
    _event: com.lightningdog.rrq.event,
    init: function () {
        return this;
    },
    capitalList: function (condition, modName = "onCapitalList") {
        vm.$loading({
            text: '加载中'
        });
        // condition.token = this._global.token;
        this._request.post("trunk", "capitalList", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger(modName, "com.lightningdog.rrq.list", result);
                return;
            }
            vm.$message({
                message: '亲， 加载列表失败，请稍后',
                type: "error"
            });
        })
    },
    capitalReport: function (condition, modName = "onCapitalReport") {
        vm.$loading({
            text: '加载中'
        });
        // condition.token = this._global.token;
        this._request.post("trunk", "capitalReport", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger(modName, "com.lightningdog.rrq.report", result);
                return;
            }
            vm.$message({
                message: '亲， 加载列表失败，请稍后',
                type: "error"
            });
        })
    },
    trackList: function (condition, modName = "onTrackList") {
        vm.$loading({
            text: '加载中'
        });
        // condition.token = this._global.token;
        this._request.post("trunk", "trackList", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger(modName, "com.lightningdog.rrq.list", result);
                return;
            }
            vm.$message({
                message: '亲， 加载列表失败，请稍后',
                type: "error"
            });
        })
    },
    trackReport: function (condition, modName = "onTrackReport") {
        vm.$loading({
            text: '加载中'
        });
        // condition.token = this._global.token;
        this._request.post("trunk", "trackReport", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger(modName, "com.lightningdog.rrq.report", result);
                return;
            }
            vm.$message({
                message: '亲， 加载列表失败，请稍后',
                type: "error"
            });
        })
    }
};
(function (NS, trunk) {
    NS.trunk = trunk;
})(com.lightningdog.rrq, trunk);
