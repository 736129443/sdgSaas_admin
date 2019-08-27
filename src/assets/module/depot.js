import Vue from 'vue'
let vm = new Vue();
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var depot = {
    _page: null,
    _global: com.lightningdog.rrq.global,
    _request: com.lightningdog.rrq.request,
    _event: com.lightningdog.rrq.event,
    _depotList: [],
    init: function () {
        return this;
    },
    publish: function (info) {
        this._request.post("depot", "publish", info).done((errorcode, result) => {
            if (errorcode == 0) {
                this._event.trigger("onCreate", "com.lightningdog.rrq.depot", result);
                vm.$message({
                    showClose: true,
                    message: '新增成功！',
                    type: 'success'
                });
                return;
            }
        });
    },
    list: function (_condition) {
        this._request.post("depot", "list", _condition).done((errorcode, result) => {
            if (errorcode == 0) {
                this._depotList.push(result);
                this._event.trigger("onMore", "com.lightningdog.rrq.depot", result);
                return;
            }
        })
    },
    online: function (_condition) {
        this._request.post("depot", "online", _condition).done((errorcode, result) => {
            if (errorcode == 0) {
                vm.$message({
                    message: '操作成功！',
                    type: 'success'
                });
                this._event.trigger("online", "com.lightningdog.rrq.depot", result);
                return;
            }else{
                vm.$message.error('操作失败！');
            }
        })
    },
    detail: function (_condition) {
        this._request.post("depot", "detail", _condition).done((errorcode, result) => {
            if (errorcode == 0) {
                this._event.trigger("onDetail", "com.lightningdog.rrq.depot", result);
            }
        })
    },
};

(function (NS, depot) {
    NS.depot = depot;
})(com.lightningdog.rrq, depot);
