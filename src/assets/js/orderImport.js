export function orderDownload(_this,a,src){
  try{
    if(_this.value===''){
      _this.$message('请先选择仓库');
      return;
    }
    window.location.href=src+_this.value
    // a.setAttribute('href',src+_this.value);
    // a.setAttribute('download',_this.value+'仓库-订单信息表');
    // a.click()
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }headers:{'Content-Type':'application/vnd.ms-excel'},
    // _this.$http.get("../../static/order.xls",{},{responseType:'arraybuffer'})
    //   .then(function (res) {
    //     let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8;'});
    //     console.log(blob);
    //     let downloadElement = document.createElement('a');
    //     let href = window.URL.createObjectURL(blob); //创建下载的链接
    //     downloadElement.href = href;
    //     downloadElement.download = '订单信息表'; //下载后文件名
    //     document.body.appendChild(downloadElement);
    //     downloadElement.click(); //点击下载
    //     console.log(res);
    //     document.body.removeChild(downloadElement); //下载完成移除元素
    //     window.URL.revokeObjectURL(href); //释放掉blob对象
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }catch(e){
   alert("下载异常！");
  }
}

