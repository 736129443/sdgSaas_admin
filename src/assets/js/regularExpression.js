

//正则校验

//客户ID
export function customerId(id){
  return Boolean(/^\d{12}$/.test(id));
}

//用户账号
export function userAccount(account) {

}

//订单ID
export function orderId(id){
  return Boolean(/^\d{16,}$/.test(id));
}

//充值卡ID
export function rechargeableCardId(id){
  return Boolean(/^\d{12}$/.test(id));
}

//提交人
export function name(name){
  return Boolean(/^[\u4e00-\u9fa5]{2,4}$/.test(name));
}

//充值流水号
export function serialNumber(num){
  return Boolean(/^\d{12}$/.test(num));
}

//优惠券ID
export function couponId(id){
  return Boolean(/^\d{12}$/.test(id));
}

//原因,备注校验
export function regReason(reason){
  return Boolean(/^[\u4e00-\u9fa5_a-zA-Z0-9_!$()=|':;',?！…（）%——‘；：”“'。，、,.？]{5,225}$/.test(reason));
}

//价格校验
export function regPrice(price){
  return Boolean(/^\d+\.?\d{0,2}$/.test(price));
}
