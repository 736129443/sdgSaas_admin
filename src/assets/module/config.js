/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 18:10:30
 * @LastEditTime: 2019-08-10 10:03:45
 * @LastEditors: Please set LastEditors
 */
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
let Base64 = require('js-base64').Base64;

function getUrlParam(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const urlObj = window.location;
    var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var rrq = {
    pattern: {
        regex: {
            phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
            string: /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/,
            money: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        },
        check: function (regex, data) {
            if (this.regex.test(data).val()) {
                return true;
            }
            return false;
        }
    },
    services: {
        collections: {
            account: {
                name: ":8021",
                funcs: {
                    verifycode: "user/verificationcode",
                    login: "user/login",
                    heartbeat: "user/heartbeat",
                    info: "user/info"
                }
            },
            mall: {
                name: `${com.baseURL == "http://192.168.50.88" ? ":8031" : ""}`,
                funcs: {
                    publish: "goods/publish",
                    list: "goods/list",
                    category: "goods/category/list",
                    detail: "goods/detail",
                    search: "goods/search"
                }
            },
            shoppingcart: {
                name: ':8031',
                funcs: {
                    sync: "shopcart/sync",
                    load: "shopcart/load",
                }
            },
            order: {
                name: ":8023",
                funcs: {
                    create: "order/create",
                    list: "order/list",
                    state: "order/state/change",
                    details: "order/detail",
                    project_list: "project/list",
                    project_detail: "project/detail",
                    project_delete: "project/delete",
                    project_add: "project/add"
                }
            },
            complaint: {
                name: ":8023",
                funcs: {
                    list: "complaint/list",
                    info: "complaint/info",
                }
            },
            evaluation: {
                name: ":8023",
                funcs: {
                    list: "evaluation/list",
                }
            },
            finance: {
                name: ":8027",
                funcs: {
                    list: "finance/order/list",
                    adjustment_list: "finance/order/adjustment/list",
                    task_list: 'finance/task/list',
                    task_adjustment: 'finance/task/adjustment/list',
                    invoice: 'invoice/list',
                    upload_image: 'invoice/upload',//上传图片
                    record: 'invoice/record',//登记表单信息
                    statistics: 'finance/statistics/info',//数据统计信息
                    invoiceOne: 'invoice/one'//回显信息展示
                }
            },
            depot: {
                name: ":8025",
                funcs: {
                    publish: "depot/publish",
                    list: "depot/list",
                    detail: "depot/detail",
                    online: "depot/online",

                }
            },
            oilCard: {
                name: ':8025',
                funcs: {
                    import: 'oil-card/import',
                    list: "oil-card/list",
                    issue: "oil-card/issue",
                    returnCard: "oil-card/return",
                    detail: "oil-card/detail",
                    recharge: "oil-card/recharge",
                    rechargeRecord: "oil-card/rechargeRecord",
                    assignRecord: "oil-card/assignRecord"
                }
            },
            wallet: {
                name: ":8033",
                funcs: {
                    recharge: "wallet/recharge",
                    info: "wallet/info",
                    listDetail: "wallet/balance/detail"
                }
            },
            coupon: {
                name: ":8025",
                funcs: {
                    lists: "coupon/list",
                    list: "coupon/coupon_pool/list",
                    create: "coupon/coupon_pool/create",
                    cancel: "coupon/coupon_pool/cancel",
                    online: "coupon/coupon_pool/issue",
                    upload: "coupon/coupon_pool/upload",
                    addCard:'/recharge-card/add',
                    cardList:'/recharge-card/list'
                }
            },
            organization: {
                name: ':8021',
                funcs: {
                    create: "organization/create",
                    info: "organization/info",
                    change: "organization/info/change",
                    list: "organization/group/listPartners",// 搬运工/司机列表接口
                    customerList: "organization/group/listPartnersMemory",//客户档案列表
                    detail: "user/info",
                    phone: "user/associate/info",
                    listTeam: "organization/group/listCarrier",
                    partnerExit: "organization/partnerExit",
                    upload: "user/image/upload"
                }
            },
            location: {
                name: ':8021',
                funcs: {
                    add: "location/personal/add",
                    search: "location/personal/query",
                    list: "location/personal/query",
                    del: "location/personal/del",
                    edit: "location/personal/edit"
                }
            },
            packages: {
                name: ':8029',
                funcs: {
                    all: "package/list/all",
                    action: "issueRule/list/action",
                    trigger: "issueRule/list/trigger"
                }
            },
            callcenter: {
                name: `${com.baseURL == "http://192.168.50.88" ? ":8035" : ""}`,
                funcs: {
                    history: "callcenter/call/history",
                    downloadUrl: "callcenter/call/downloadUrl"
                }
            },
            trunk: {
                name: `${com.baseURL == "http://192.168.50.88" ? ":8037" : ""}`,
                funcs: {
                    trackList: "trunk/track/list",//电子运单
                    trackReport: "trunk/track/report",//电子运单上报
                    capitalList: "trunk/capital/list",//资金流水
                    capitalReport: "trunk/capital/report"//资金流水上报
                }
            }
        },
        bind: (service, module) => {
            this.collections[service] = module;
        },
        unbind: (service) => {
            delete this.collections[service];
        },
    }
};

(function (NS, rrq) {
    if (NS.rrq) return;
    NS.rrq = rrq;
    console.log("install lightningdog....");
    //console.log("load token=" + getUrlParam("token"));
    rrq.global = {};
    rrq.global.token = "roDWDXIeZ3tb2nfsZ8tRXsix+eTklo6bploZnd2Re+CfHmQm9XqOSUuFubjw6yE8OdZjTX2DoQhhfD4+1S6SXSulh1+SgXkNOUruhDClLcZMbJdrkuB2w+zXcH7lkeuAHJugiOvnc2giaSxKFyDv2RzvULxgh57NodPdPdU54BI";
    rrq.global.userId = 'UE_1906211400012010919';

    if (sessionStorage.getItem('users')) {
        let users = JSON.parse(Base64.decode(sessionStorage.getItem('users')));
        // rrq.global.token = users.token || '';
        // rrq.global.userId = users.userId || '';
        /// 仅供调试使用
        rrq.global.token = "roDWDXIeZ3tb2nfsZ8tRXsix+eTklo6bploZnd2Re+CfHmQm9XqOSUuFubjw6yE8OdZjTX2DoQhhfD4+1S6SXSulh1+SgXkNOUruhDClLcZMbJdrkuB2w+zXcH7lkeuAHJugiOvnc2giaSxKFyDv2RzvULxgh57NodPdPdU54BI";
        rrq.global.userId = 'UE_1906211400012010919';
    }
})(com.lightningdog, rrq);
