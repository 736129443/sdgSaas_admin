//投诉管理
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var complaint = {
    _token: com.lightningdog.rrq.global,
    _request: com.lightningdog.rrq.request,
    _event: com.lightningdog.rrq.event,

    list: function (_condition,Interface) {
        this._request.post("complaint", Interface, _condition).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("order size=" + result.length);
                this._event.trigger("onMore", "com.lightningdog.rrq.complaint", result);
            }
        });
    },
    evaluation_list: function (_condition,Interface) {
        this._request.post("evaluation", Interface, _condition).done((errorcode, result) => {
            if (errorcode == 0) {
                console.log("order size=" + result.length);
                this._event.trigger("onMore", "com.lightningdog.rrq.complaint", result);
            }
        });
    },
    info:function(param) {
        this._request.post("complaint", "info", param).done((errorcode, result)=>{
            if(errorcode == 0) {
                this._event.trigger("onMore", "com.lightningdog.rrq.complaint", result);
            }
        });
    },

};

(function (NS, complaint) {
    NS.complaint = complaint;
})(com.lightningdog.rrq, complaint);
