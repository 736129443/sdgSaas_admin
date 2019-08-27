import Vue from 'vue'
let vm = new Vue();
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var callcenter = {
    _request: com.lightningdog.rrq.request,
    _global: com.lightningdog.rrq.global,
    _event: com.lightningdog.rrq.event,
    init: function () {
        return this;
    },
    list: function (condition, modName = "onCallList") {
        vm.$loading({
            text: '加载中'
        });
        // condition.token = this._global.token;
        this._request.post("callcenter", "history", condition).done((errorcode, result) => {
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
    download: function (condition, modName = "onDownloadUrl") {
        vm.$loading({
            text: '加载中'
        });
        // condition.token = this._global.token;
        this._request.post("callcenter", "downloadUrl", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger(modName, "com.lightningdog.rrq.downloadUrl", result);
                return;
            }
            vm.$message({
                message: '亲， 加载列表失败，请稍后',
                type: "error"
            });
        })
    }
};
(function (NS, callcenter) {
    NS.callcenter = callcenter;
})(com.lightningdog.rrq, callcenter);
