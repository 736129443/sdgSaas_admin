export function  code(_this,time) {
    const TIME_COUNT = time;
    if (!_this.timer) {
      _this.count = TIME_COUNT;
      _this.show = false;
      //发送请求---
      _this.$http.get("../../mock/tree.json")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      //计时器---
      _this.timer = setInterval(() => {
        if (_this.count > 0 && _this.count <= TIME_COUNT) {
          _this.count--;
          _this.getTimeCode=true
      //判断
        }else{
          _this.show = true;
          clearInterval(_this.timer);
          _this.timer = null;
          _this.getTimeCode=false;
        }
      }, 1000);
    }
  }
  export function regName(_this){
    let regNam=/(^[A-Za-z0-9]{6,16}$)/;
    if(!regNam.test(_this.userName)){
      _this.$message.error('格式错误,用户名必须字母或数字,长度不能小于6位或大于16位');
    }else {
      _this.$http.post("../../mock/tree.json",{ "name":_this.userName},
      )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      _this.successUser=true;
      _this.$message({
        message: '用户名正确!',
        type: 'success'
      });
    }
  }
  export function regPhone(_this){
    let regPhone=/^[1][3,4,5,7,8][0-9]{9}$/
    if (!regPhone.test(_this.userPhone)){
      _this.$message.error('手机格式不正确!');
      _this.successPhone=false;
    }else {
      _this.successPhone=true;
      _this.$message({
        message: '手机格式正确!',
        type: 'success'
      });
    }
  }
  //角色名称消校验
  export function roleName( _this,_name){
    let roleName = /^([A-Za-z]|[\u4E00-\u9FA5]){2,10}$/;
    if ( !roleName.test(_name) ){
      // _this.$message.error('命名重复或格式不规范');
      _this.verify=false;
    }else {
      _this.verify=true;
      // _this.$message({
      //     message: '格式正确',
      //     type: 'success'
      // })
    }
  }

  // CRM闪电狗物流管理系统设置
// 用户名
export function sdgName( _this , _name ){
  let roleName = /^([A-Za-z]|[0-9]){2,16}$/;
  if (!roleName.test(_name)){
      _this.verify=false;
  }else {
      _this.verify=true;
  }
}
// 手机  0?(13|14|15|17|18|19)[0-9]{9}
export function sdgphone( _this , _name ){
    let roleName = /^0?(13|14|15|17|18|19)[0-9]{9}$/;
    if (!roleName.test(_name)){
        _this.verify=false;
    }else {
        _this.verify=true;
    }
}


export function regPass(_this){
    let regPass=/^[a-zA-Z\d]{8,}$/;
    if(!regPass.test(_this.newPass)){
      _this.$message.error('格式错误,密码必须字母或数字,长度不能小于8位');
    }else {
      _this.successPass=true;
      _this.$message({
        message: '密码格式正确!',
        type: 'success'
      });
    }
  }
  export function regConfirmPass(_this,sucPass,sucConfPass){
    if(sucPass!=sucConfPass){
      _this.$message.error('密码不一致,请重新输入');
    }else {
      _this.successConfirmPass=true;
      _this.$message({
        message: '密码相同!',
        type: 'success'
      });
    }
  }
  export function submit(_this,codes){
      if(!_this.getTimeCode){
        _this.$message.error('请先获取验证码');
      }else {
        if(codes==1234){
            _this.successCode=true;
            if(_this.successCode&&_this.successConfirmPass&&_this.successPass&&_this.successPhone&&_this.successUser){
              _this.$message({
                message: '修改成功!',
                type: 'success'
              });
              setTimeout(()=>{
                _this.$router.push({path:'/'});
              },1500)
            }else{
              _this.$message.error('资料有误,不完善');
            }
        }else {
          _this.$message.error('验证码不匹配,或者已经超时');
        }
      }
    }
  