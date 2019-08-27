
export function regWarehouse(_this,name,userId){
  let regNam=/^[\u4e00-\u9fa5\w\-]{2,10}$/g;

  // let users=JSON.parse(Base64.decode(sessionStorage.getItem('user')));

    let users =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
    // this.token = user.result.token;

  let isName=JSON.stringify({
    depotName:name,
    token:users.result.token,
    userId:userId,
  });
  console.log(isName);
  _this.$http.post(_this.global.lightningUrl +"/companyv1/depotManage/depot/depot_exist",isName,{
      headers:{
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }
  ).then(function (response) {
    console.log(response);
    if(response.data.message==='该仓库名已存在'){
      _this.$message.error(response.data.message);
      _this.successWarehouse=false;
      return
    }
    _this.successWarehouse=true;
  }).catch(function (error) {
      console.log(error);
    });

  if(!regNam.test(name)){
    _this.successWarehouses=false;
  }else {
    _this.successWarehouses=true;
  }
}

//仓库编号.
export function regNum(_this,_num){
  let regNum=/^\d{3}$/;
  if (!regNum.test(_num)){
    _this.successWarehouseNum=false;
  }else {
    _this.successWarehouseNum=true;
  }
}

//仓库名称
export function newWareName(_this,name) {
  let regNam=/^[\u4e00-\u9fa5\w\-]{2,10}$/g;
  if(!regNam.test(name)){
    return false;
  }else {
    return true;
  }
}

//运输单编号.
export function regTransNum(_this,_num){
  let regNum=/^\d{12,14}$/;
  if (!regNum.test(_num)){
    _this.$message.error('运输单编号不正确!运输单号为数字且12-14位');
    _this.successTransNum=false;
  }else {
    _this.successTransNum=true;
  }
}

export function regOrderNum(_this,_num){
  let regNum=/^\d{11}$/;
  if (!regNum.test(_num)){
    return false;
  }else {
    return true;
  }
}

//出车单编号/加跑单编号.出车单16位 加跑单号16位
export function regNums(_this,_num,message){
  let regNum=/^\d{16,19}$/;
  if (!regNum.test(_num)){
    _this.$message.error(message);
    _this.successWarehouseNum=false;
  }else {
    _this.successWarehouseNum=true;
  }
}

export function regTrans(_this,_num,message){
  let regNum=/^\d{13,17}$/;
  if (!regNum.test(_num)){
    _this.$message.error(message);
    _this.successNum=false;
  }else {
    _this.successNum=true;
  }
}
//第三方联系人
export function contactsPeople(_this,name){
  let regNam=/^[\u4e00-\u9fa5\w]{2,10}$/g;
  if(!regNam.test(name)){
    return false;
  }else{
    return true;
  }
}
//第三方联系电话
export function regTelePhone(_this,_phone){
  let regPhone=/^1[3-9]\d{9}$/;
  if (!regPhone.test(_phone)){
    return false;
  }else {
    return true;
  }
}
//联系人.
export function contactsNames(_this,name){
  let regNam=/^[\u4e00-\u9fa5\w]{2,10}$/g;
  if(!regNam.test(name)){
    _this.successContactsNames=false;
  }else{
    _this.successContactsNames=true;
  }
}

//电话.
export function regPhones(_this,_phone){
    let regPhone=/^\d{7,12}$/;
    if (!regPhone.test(_phone)){
        return false;
    }else {
        return true;
    }
}

//电话.
export function regPhone(_this,_phone){
  let regPhone=/^1[3-9]\d{9}$/;
  if (!regPhone.test(_phone)){
    return false;
  }else {
    return true;
  }
}

//发布用车,收件人.
export function consigneeName(_this,name){
  let regNam=/^[\u4e00-\u9fa5\w\-]{2,10}$/g;
  if(!regNam.test(name)){
    _this.successConsigneeName=false;
  }else{
    _this.successConsigneeName=true;
  }

}
//发布用车,收件人电话.
export function consigneePhone(_this,_phone){
  let regPhone=/^1[3-9]\d{9}$/;
  if (!regPhone.test(_phone)){
    _this.successConsigneePhone=false;
  }else {
    _this.successConsigneePhone=true;
  }
}

export function regMoney(_this,_num){
  let regNum=/^\d+$/g;
  if (!regNum.test(_num)){
    return false
  }else {
    return true;
  }
}
export function regInts(_this,_num){
  let regNum=/^\d+(\.\d+)?$/g;
  if(!regNum.test(_num)){
    return false
  }else {
    return true;
  }
}
export function regIntt(_this,_num){
  let regNum=/^\d+$/g;
  if (!regNum.test(_num)){
    return false
  }else {
    return true;
  }
}
//发布用车,单趟预计总耗时.
export function regCarTime(_this,_num){
  let regNum=/^([1-9]|(1[0-5]))$/;
  if (!regNum.test(_num)){
    _this.$message.error('时间限制为1-15小时!');
    _this.successCarTime=false;
  }else {
    _this.successCarTime=true;
  }
}

//发布用车,货物名称.
export function goodsNames(_this,name){
  let regNam=/^[\u4e00-\u9fa5\w\-]{2,10}$/g;
  if(!regNam.test(name)){
    _this.$message.error('货物名称要求长度2-10位,或不能包含特殊字符!');
    _this.successGoodsNames=false;
  }else{
    _this.successGoodsNames=true;
  }
}

//发布用车,线路名称
export function regLineName(_this,_name){
  let regNam=/^[\u4e00-\u9fa5\w\-]{2,50}$/g;
  if (!regNam.test(_name)){
    _this.$message.error('线路名称要求长度2-20位,或不能包含特殊字符!');
    _this.successLineName=false;
  }else {
    _this.successLineName=true;
  }
}

//发布用车,配送地址
export function regAddress(_this,_name){
  let regNam=/^[\u4e00-\u9fa5\w()（）\- _]{2,50}$/g;
  if (!regNam.test(_name)){
    return false;
  }else {
    return true;
  }
}

//货物类型
export function regGoodType(_this,_name){
  let regNam=/^[\u4e00-\u9fa5\w\-]{2,20}$/g;
  if (!regNam.test(_name)){
    return false;
  }else {
    return true;
  }
}

//原因
export function regReason(_this,_name){
  let regNam=/^[\u4e00-\u9fa5_a-zA-Z0-9_!$()=|':;',?！…（）%——‘；：”“'。，、,.？]{5,225}$/;
  if (!regNam.test(_name)){
    return false;
  }else {
    return true;
  }
}

export function regReason1(_this,_name){
  let regNam=/^[\u4e00-\u9fa5_a-zA-Z0-9_!$()=|':;',?！…（）%——‘；：”“'。，、,.？]{5,128}$/;
  if (!regNam.test(_name)){
    return false;
  }else {
    return true;
  }
}

//新建仓库页面联系人.
export function contactsNewName(_this,name){
  let regNam=/^[\u4e00-\u9fa5\w]{2,10}$/g;
  if(!regNam.test(name)){
    return false
  }else{
    return true
  }
}

//新建仓库页面电话.
export function regNewPhone(_this,_phone){
  let regPhone=/^1[3-9]\d{9}$/;
  if (!regPhone.test(_phone)){
    return false
  }else {
    return true
  }
}


export function checkName(name){
  let regNam=/^[\u4e00-\u9fa5]{2,10}$/g;
  if(!regNam.test(name)){
    return false
  }else{
    return true
  }
}

export function checkPlateNum(num){
  let regNam=/^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/g;
  if(!regNam.test(num)){
    return false
  }else{
    return true
  }
}

export function checkCardNum(num){
  let regNam=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/g;
  if(!regNam.test(num)){
    return false
  }else{
    return true
  }
}

export function checkPassword(num){
  let regNam=/^[A-Za-z0-9]{6,16}$/g;
  if(!regNam.test(num)){
    return false
  }else{
    return true
  }
}
// 发布用车联系人电话
export function checkcontactsPhone(Phone){
    return Boolean(/^1[3-9]\d{9}$/.test(Phone));
}


// 发布用车联系人姓名
export function checkContactsName(name){
    return Boolean(/^[\u4e00-\u9fa5\w\-]{2,10}$/g.test(name));
}
