import axios from 'axios';
import QS from 'qs';
import Vue from 'vue';
let vm = new Vue();
//设置超时时间
axios.defaults.timeout = 30000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';

var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};

function request(method, url, params, callback) {
	if (method == 'get') {
		return getMethod(url, params, callback);
	} else if (method == 'post') {
		return postMethod(url, params, callback);
	} else if (method == 'file') {
		return fileMethod(url, params, callback);
	}
}
// 封装get方法
function getMethod(url, params, callback) {
	return new Promise((resolve, reject) => {
		axios.get(url, params).then(res => {
			resolve({ data: res.data, callback });
		}).catch(err => {
			reject({ data: err.data, callback });
		})
	});
}
// 封装post方法
function postMethod(url, params, callback) {
	return new Promise((resolve, reject) => {
		axios.post(url, JSON.stringify(params)).then(res => {
			resolve({ data: res.data, callback });
		}).catch(err => {
			reject({
				data: err.data,
				callback: callback
			});
		})
	});
}
function fileMethod(url, params, callback) {
	return new Promise((resolve, reject) => {
		axios.post(url, params).then(res => {
			resolve({ data: res.data, callback });
		}).catch(err => {
			reject({
				data: err.data,
				callback: callback
			});
		})
	});
}
// 响应拦截器（处理响应数据）
axios.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			//这个地方可以由后台编辑状态码区分不同情况，做不同的逻辑处理
			return Promise.reject(response);
		}
	},
	error => {
		return Promise.reject(error.response);
	}
)

function RequestHelper(baseURI, services) {
	this._baseURI = baseURI;
	this._services = services;

	this.resolve = (data) => {
		console.log("resolve, data=" + data);
		if (data.callback) {
			data.callback(data.data.errcode, data.data.result);
			// this._done(data.errcode, data.result);
		}
	}
	this.reject = (data) => {
		console.log("reject data=" + data);
		if (data.data.callback && data.data.errcode) {
			data.callback(data.data.errcode, data.data.message);
			return;
		}
		vm.$message({
			message: '网络错误',
			type: "error"
		});
	}
	this.done = (callback) => {
		// this._done = callback;
		request(this._method, this._url, this._data, callback).then(this.resolve, this.reject);
		return this;
	}
	this.post = (module, funcName, data) => {
		this._method = "post";
		this._data = data;
		this._url = this._baseURI + this._services[module]['name'] + "/" + this._services[module]['funcs'][funcName];
		return this;
	}
	this.file = (module, funcName, data) => {
		this._method = "file";
		this._data = data;
		this._url = this._baseURI + this._services[module]['name'] + "/" + this._services[module]['funcs'][funcName];
		console.log(this._url)
		return this;
	}
	this.get = (module, funcName, data) => {
		this._method = "get";
		this._data = data;
		this._url = this._baseURI + this._services[module]['name'] + "/" + this._services[module]['funcs'][funcName];
		return this;
	}
}

var _baseURI = com.baseURL;
var _services = com.lightningdog.rrq.services.collections;
(function (NS, request) {
	NS.request = request;
})(com.lightningdog.rrq, new RequestHelper(_baseURI, _services))
