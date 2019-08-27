export function allScreen (node) {
    let h = document.documentElement.clientHeight || document.body.clientHeight|| window.innerHeight;
    node.style.height=h+'px';
  }
  
  export function  login(_this,_name,_pass,_path){
      
      if (_this.uname==_name&&_this.upass==_pass){
        _this.$message({
          message: '登陆成功',
          type: 'success'
        });
        setTimeout(()=>{
          _this.$router.push({path:_path});
        },1500)
  
      }else (
        _this.$message.error('用户名不存在或密码错误,')
      )
    }
  
  
  
  
  
  