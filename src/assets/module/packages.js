var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
import Vue from 'vue';
let vm = new Vue();

var packages = {
  _request: com.lightningdog.rrq.request,
  _global:com.lightningdog.rrq.global,
  _event: com.lightningdog.rrq.event,
  init: function(){
    return this;
  },
  all:function(info){
  	this._request.post("packages", 'all', info).done((errorcode, result)=>{
  	  if(errorcode == 0) {
  		this._event.trigger("onAll", "com.lightningdog.rrq.packages", result);
  		return;
  	  }
  	  uni.showToast({
  		title: '亲, 网络异常。',
  		icon: 'fail',
  		duration: 2000
  	  });
  	});
  	return this;
  },
  action:function(info){
  	this._request.post("packages", 'action', info).done((errorcode, result)=>{
  	  if(errorcode == 0) {
  		this._event.trigger("onAction", "com.lightningdog.rrq.packages", result);
  		return;
  	  }
      vm.$message.error('亲, 网络异常! 请稍后再试...');
  	});
  	return this;
  },
  trigger:function(info){
  	this._request.post("packages", 'trigger', info).done((errorcode, result)=>{
  	  if(errorcode == 0) {
  		this._event.trigger("onTrigger", "com.lightningdog.rrq.packages", result);
  		return;
  	  }
      vm.$message.error('亲, 网络异常! 请稍后再试...');
  	});
  	return this;
  }
};

  (function (NS, packages){
    NS.packages = packages;
	
  })(com.lightningdog.rrq, packages)