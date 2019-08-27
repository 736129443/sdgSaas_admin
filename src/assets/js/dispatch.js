
export function regCollectionName(_this,name){
  let regNam=/^[\u4e00-\u9fa5\w]{2,10}$/g;
  if(!regNam.test(name)){
    _this.$message.error('仓库名要求2-10位,或不能包含特殊字符');
    _this.successCollectionName=false;
  }else {
    _this.successCollectionName=true;
    // _this.$message({
    //   message: '仓库名正确!',
    //   type: 'success'
    // });
  }
}
