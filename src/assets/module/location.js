
import Vue from 'vue'
let vm = new Vue();
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var location = {
    _request: com.lightningdog.rrq.request,
    _global: com.lightningdog.rrq.global,
    _event: com.lightningdog.rrq.event,
    init: function () {
        return this;
    },
    list: function (condition, modName = "onAddressList") {
        vm.$loading({
            text: '加载中'
        })
        condition.token = this._global.token;
        this._request.post("location", "list", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger(modName, "com.lightningdog.rrq.location", result);
                return;
            }
            vm.$message({
                message: '亲， 加载列表失败，请稍后',
                type: "error"
            });
        })
    },
    add: function (condition) {
        vm.$loading({
            text: '加载中'
        })
        condition.token = this._global.token;
        this._request.post("location", "add", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger("addAddress", "com.lightningdog.rrq.location", result);
                return;
            }
            vm.$message({
                message: '亲， 添加失败，请稍后',
                type: "error"
            });
        })
    },
    del: function (id) {
        vm.$loading({
            text: '加载中'
        })
        this._request.post("location", "del", {
            token: this._global.token,
            id: id
        }).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger("delAddress", "com.lightningdog.rrq.location", result);
                return;
            }
            vm.$message({
                message: '亲， 删除失败，请稍后',
                type: "error"
            });
        })
    },
    edit: function (condition) {
        vm.$loading({
            text: '加载中'
        })
        condition.token = this._global.token;
        this._request.post("location", "edit", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger("editAddress", "com.lightningdog.rrq.location", result);
                return;
            }
            vm.$message({
                message: '亲， 编辑失败，请稍后',
                type: "error"
            });
        })
    },
};

(function (NS, location) {
    NS.location = location;
})(com.lightningdog.rrq, location)
