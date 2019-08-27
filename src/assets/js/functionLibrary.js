
/*时间戳转日期
  inputTime:时间戳
  type:date或者time(字符串)
  date eg:2018-12-13 12:00:00
  time eg:2018-12-13
   */

export function formatDateTime(inputTime,type) {
  let date = new Date(inputTime);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h=h < 10 ? ('0' + h) : h;
  let minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  let second=date.getSeconds();
  second=second < 10 ? ('0' + second) : second;
  if(type === 'date'){
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
  }else{
    return y + '-' + m + '-' + d;
  }
}

/*element消息提示
  msg:提示信息
  type: success(成功)
        warning(警告)
        error(失败)
   */

export function message(_this, msg, type) {
  _this.$message({
    showClose: true,
    message: msg,
    type: type
  });
}


/*两个对象做比较
  obj1:{}
  obj2:{}
   */
export function isObjectValueEqual(obj1, obj2) {
  console.log(obj1, obj2);

  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;
  if (!o1 || !o2) {/*  判断不是对象  */
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (let attr in obj1) {
    let t1 = obj1[attr] instanceof Object;
    let t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
}

//车型对象转字符串
export function toStringCarType(obj) {
  let str = '';
  str = obj.name + ' ' + obj.isElectric + ' ' + obj.length + ' ' + obj.isCertificate + ' ' + obj.isTailBoard + ' ' + obj.isCold;
  return str;
}

//车型数组转字符串
export function toStringCarTypeArr(arr) {
  let str = '';
  for(let i=0; i<arr.length; i++){
    if(i === arr.length-1){
      str += arr[i].name + ' ' + arr[i].isElectric + ' ' + arr[i].length + ' ' + arr[i].isCertificate + ' ' + arr[i].isTailBoard + ' ' + arr[i].isCold;
    }else{
      str += arr[i].name + ' ' + arr[i].isElectric + ' ' + arr[i].length + ' ' + arr[i].isCertificate + ' ' + arr[i].isTailBoard + ' ' + arr[i].isCold + '/ ';
    }
  }
  return str;
}

// 三级联动 获取  name
// arean  ---所有区域
// val    ---获取的区域id
// type:   province 返回省   city;//市  countys ;//区   不传返回为 [省,市,区]
export function onAreaname(arean, val, type) {
  let province;//省
  let city;//市
  var countys ;//区
  let arr;
  if (val.length == 3) {
    for (let i in arean) {
      if (val[val.length - 3] == arean[i].value) {

        province = arean[i].label;
        for (let j in arean[i].children) {
          if (val[val.length - 2] == arean[i].children[j].value) {
            city = arean[i].children[j].label;
          }
          for (let z in arean[i].children[j].children) {
            if (val[val.length - 1] == arean[i].children[j].children[z].value) {
              countys = arean[i].children[j].children[z].label;

            }
          }
        }
      }
    }
  }
  if (val.length == 2) {
    for (let i in arean) {
      if (val[val.length - 2] == arean[i].value) {
        province = arean[i].label;
        for (let j in arean[i].children) {
          if (val[val.length - 1] == arean[i].children[j].value) {
            city = arean[i].children[j].label;
          }
        }
      }
    }
  }
  if (val.length == 1) {
    for (let i in arean) {
      if (val[val.length - 1] == arean[i].value) {
        this.province = arean[i].label;
      }
    }
  }
  if (type == 'province') {
    return province
  } else if (type == 'city') {
    return city
  } else if (type == 'countys') {
    return countys
  }else {
    return arr = [province, city, countys]
  }
}
// 三级联动 获取id
// arean  ---所有区域
// val    ---获取的区域id
// arr --返回id
export function onAreaid(arean, val, type){
  let province;//省
  let city;//市
  var countys;//区
  let arr;
  if (val.length == 3) {
    for (let i in arean) {
      if (val[val.length - 3] == arean[i].label) {
        province = arean[i].value;
        for (let j in arean[i].children) {
          if (val[val.length - 2] == arean[i].children[j].label) {
            city = arean[i].children[j].value;
            for (let z in arean[i].children[j].children) {
              if (val[val.length - 1] == arean[i].children[j].children[z].label) {
                countys = arean[i].children[j].children[z].value;
              }
            }
          }
        }
      }
    }
    return arr = [province, city, countys]
  }
  if (val.length == 2) {
    for (let i in arean) {
      if (val[val.length - 2] == arean[i].label) {
        province = arean[i].value;
        for (let j in arean[i].children) {
          if (val[val.length - 1] == arean[i].children[j].label) {
            city = arean[i].children[j].value;
          }
        }
      }
    }
    return arr = [province, city]
  }
  if (val.length == 1) {
    for (let i in arean) {
      if (val[val.length - 1] == arean[i].label) {
        this.province = arean[i].value;
      }
    }
    return arr = [province]
  }

}
