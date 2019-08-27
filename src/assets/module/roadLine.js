var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

var roadLine = {
  _direction:"",
  _distance:0.0,
  _locations:[],
  _request:com.lightningdog.rrq.request,
  _global:com.lightningdog.rrq.global,
  _event:com.lightningdog.rrq.event,
  init:function() {
    return this;
  },
  setDirection:function(direction) {
    this._direction = direction;
  },
  add:function(obj) {
    // this._locations.push(_location);
    this._request.post("location", "add", obj).done((errorcode, result)=>{
      if(errorcode == 0) {
        console.log("succeed in collect personal location");
				this._event.trigger("onAdd", "com.lightningdog.rrq.roadline", result);
      } else {
        uni.showToast({
          title: '亲，网络异常，请检查网络状态，稍后再使用...',
          duration:2000
        })
      }
    });
  },
  search:function(_keywords) {
    this._request.post("location", "search", {
      token:this._global.token,
      keywords:_keywords
    }).done((errorcode, result)=>{
      var params = _locations
      if(errorcode==0) {
        params = result;
      }
      _event.trigger("onLoad", "com.lightningdog.rrq.roadline", params);
    })
  },
  list:function(obj) {
    this._request.post("location", "list", obj).done((errorcode, result)=>{
      if(errorcode == 0) {
				this._event.trigger("onMore", "com.lightningdog.rrq.roadline", result);
				return;
      }
			uni.showToast({
			  title: '亲, 网络异常。',
			  icon: 'fail',
			  duration: 2000
			});
    });
  },
	deleteLine:function(obj) {
    this._request.post("location", "deleteLine", obj).done((errorcode, result)=>{
      if(errorcode == 0) {
				this._event.trigger("onDelete", "com.lightningdog.rrq.roadline", result);
        return;
      }
			uni.showToast({
			  title: '亲, 网络异常。',
			  icon: 'fail',
			  duration: 2000
			});
    });
  },
	edit:function(obj) {
    this._request.post("location", "edit", obj).done((errorcode, result)=>{
      if(errorcode == 0) {
				this._event.trigger("onEdit", "com.lightningdog.rrq.roadline", result);
        return;
      }
			uni.showToast({
			  title: '亲, 网络异常。',
			  icon: 'fail',
			  duration: 2000
			});
    });
  },
  toObject:function() {
    return {
      direction:this._direction,
      distance:this._distance,
      locations:this._locations
    }
  }
};

(function (NS, roadLine) {
  NS.roadLine = roadLine;
	
})(com.lightningdog.rrq, roadLine)
