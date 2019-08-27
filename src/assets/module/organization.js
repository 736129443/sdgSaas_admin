/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 11:15:51
 * @LastEditTime: 2019-08-09 18:08:52
 * @LastEditors: Please set LastEditors
 */

import Vue from 'vue'
import { format } from 'url';
let vm = new Vue();
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var organization = {
    _request: com.lightningdog.rrq.request,
    _global: com.lightningdog.rrq.global,
    _event: com.lightningdog.rrq.event,
    init: function () {
        return this;
    },

    customerList: function (_condition,Interface) {
        this._request.post("organization", Interface, _condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger('customerList', "com.lightningdog.rrq.organization", result);
                return;
            }
        })
    },
    list: function (condition, modName = "onDriverList") {
        vm.$loading({
            text: '加载中'
        })
        condition.token = this._global.token;
        this._request.post("organization", "list", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger(modName, "com.lightningdog.rrq.organization", result);
                return;
            }
            vm.$message({
                message: '亲， 加载列表失败，请稍后',
                type: "error"
            });
        })
    },
    create: function (condition) {
        vm.$loading({
            text: '创建中...'
        })
        condition.token = this._global.token;
        this._request.post("organization", "create", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger("onCreate", "com.lightningdog.rrq.organization", result);
                return;
            }
            vm.$message({
                message: '亲， 创建失败，请稍后',
                type: "error"
            });
        })
    },
    info: function () {
        vm.$loading({
            text: '加载中'
        })
        this._request.post("organization", "info", {
            token: this._global.token
        }).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger("onInfo", "com.lightningdog.rrq.organization", result);
                return;
            }
            vm.$message({
                message: '亲， 加载失败，请稍后',
                type: "error"
            });
        })
    },
    detail: function (userId) {
        vm.$loading({
            text: '加载中'
        })
        let params = {
            token: this._global.token,
            userId
        }
        this._request.post("organization", "detail", params).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger("onDetail", "com.lightningdog.rrq.organization", result);
                return;
            }
            vm.$message({
                message: '亲， 加载失败，请稍后',
                type: "error"
            });
        })
    },
    uploadFile: function (formData) {
        vm.$loading({
            text: "上传中..."
        });
        formData.append('token', this._global.token);
        this._request.file("organization", "upload", formData).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                debugger
                this._event.trigger("onUpload", "com.lightningdog.rrq.organization", result);
                return;
            }
            vm.$message({
                message: '亲， 上传失败，请稍后',
                type: "error"
            });
        })
    },
    listTeam: function (condition) {
        vm.$loading({
            text: "加载中"
        })
        condition.token = this._global.token;
        this._request.post("organization", "listTeam", condition).done((errorcode, result) => {
            vm.$loading().close();
            if (errorcode == 0) {
                this._event.trigger("onListTeam", "com.lightningdog.rrq.organization", result);
                return;
            }
            vm.$message({
                message: '亲， 加载失败，请稍后',
                type: "error"
            });
        })
    }
};

(function (NS, organization) {
    NS.organization = organization;
})(com.lightningdog.rrq, organization);
