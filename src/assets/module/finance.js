
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var finance = {
    _token: com.lightningdog.rrq.global,
    _request: com.lightningdog.rrq.request,
    _event: com.lightningdog.rrq.event,

    list: function (_condition,info,) {
        this._request.post("finance", info, _condition,).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("order size=" + result.length);
                this._event.trigger("onMore", "com.lightningdog.rrq.finance", result);
            }
        });
    },
    upload:function (_condition) {//上传图片
        this._request.file("finance",'upload_image',_condition,).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("order size=" + result.length);
                this._event.trigger("upload", "com.lightningdog.rrq.finance", result);
            }
        });
    },
    records:function (_condition,list_data) {//登记表单信息
        this._request.post("finance",'record',_condition,).done((errorcode, result) => {
            if (errorcode == 0) {
                // console.log("order size=" + result.length);
                this._event.trigger("record", "com.lightningdog.rrq.finance", result);
                this.list(list_data,'invoice');
            }
        });
    },
    statistics:function (_condition) {//数据统计信息
        this._request.post("finance",'statistics',_condition,).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("order size=" + result.length);
                this._event.trigger("onMore", "com.lightningdog.rrq.finance", result);
            }
        });
    },
    invoiceOne:function (_condition) {//回显信息
        this._request.post("finance",'invoiceOne',_condition,).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("order size=" + result.length);
                this._event.trigger("onMore", "com.lightningdog.rrq.finance", result);
            }
        });
    },
};
(function (NS, finance) {
    NS.finance = finance;
})(com.lightningdog.rrq, finance);
