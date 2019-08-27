<template>
    <div>
        <el-dialog
                width="50%"
                title="规则限制"
                center
                :visible.sync="innerVisible"
                :before-close="innerCancel"
                append-to-body>
            <el-form label-width="120px">
                <el-form-item label="规则限制">
                    <el-checkbox  v-for="(vals,index) in typeList"  v-model="vals.checked" :disabled="vals.disabled">{{vals.cname}}</el-checkbox>
                </el-form-item>
                <div v-if="typeList[0].checked || typeList[2].checked || typeList[3].checked || typeList[4].checked || typeList[5].checked || typeList[6].checked">
                    <el-form-item label="面值与数量" >
                        <el-button type="primary" @click="addPar" icon="el-icon-plus">新增</el-button>
                    </el-form-item>
                    <div v-for="(item,index) in parList" >
                        <el-form-item :label="'面值'+(index+1)">
                            <el-select v-model="item.value" placeholder="请选择面值">
                                <el-option
                                        v-for="item in parValues"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <span v-if="!typeList[6].checked">-</span>
                        <el-form-item :label="'数量'+(index+1)" v-if="!typeList[6].checked">
                            <el-input v-model="item.issueCount"></el-input>
                        </el-form-item>
                        <i class="el-icon-delete" @click="deleteParValue(index)"></i>
                    </div>
                </div>

                <div v-if="typeList[2].checked">
                    <el-form-item label="订单金额范围">
                        <el-input v-model="minOrderValue" placeholder="请填写最小金额"></el-input>
                        <span class="title">-</span>
                        <el-input v-model="maxOrderValue" placeholder="请填写最大金额"></el-input>
                    </el-form-item>
                </div>

                <div v-if="typeList[3].checked">
                    <el-form-item label="积分兑换">
                        <el-input v-model="integral" placeholder="请填写积分"></el-input>
                    </el-form-item>
                </div>

                <div v-if="typeList[4].checked">
                    <el-form-item label="连续登陆赠送">
                        <el-input v-model="continueLoginDays" placeholder="请填写连续登陆赠送天数"></el-input>
                    </el-form-item>
                </div>

                <div v-if="typeList[5].checked">
                    <el-form-item label="充值赠送">
                        <el-input v-model="rechargeAmount" placeholder="请填写充值赠送金额"></el-input>
                    </el-form-item>
                </div>

                <div v-if="typeList[1].checked">
                    <el-form-item label="区域" >
                        <el-cascader
                                @change="areaChange"
                                :options="options"
                                :props="{ multiple: true, checkStrictly: true }"
                                clearable></el-cascader>
                    </el-form-item>
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="innerCancel">取 消</el-button>
                <el-button type="primary"  @click="innerConfirm">保存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {message} from "../../assets/js/functionLibrary.js";
    export default {
        name: "checkbox",
        props:{
            innerVisible:{
                type: Boolean,
                default: false
            },
            grantTypes: {
                type: Array,
                default: ()=>[]
            },
            parValues: {
                type: Array,
                default: ()=>[]
            },
            trigger:String
        },
        watch: {
            trigger(newValue, oldValue) {
                // console.log(newValue, oldValue)
                this.typeList = JSON.parse(JSON.stringify(this.grantTypes));

                if(newValue != ''){
                    console.log(newValue)
                    this.showList(newValue);
                }
                console.log(this.typeList)
            }
        },
        data(){
          return {
              typeList:JSON.parse(JSON.stringify(this.grantTypes)),
              parList:[],
              minOrderValue:'',
              maxOrderValue:'',
              integral:'',
              areas:[],
              rechargeAmount:'',
              continueLoginDays:'',
              dateTime:'',
              options: [{
                  value: 'zhinan',
                  label: '指南',
                  children: [{
                      value: 'shejiyuanze',
                      label: '设计原则',
                      children: [{
                          value: 'yizhi',
                          label: '一致'
                      }, {
                          value: 'fankui',
                          label: '反馈'
                      }, {
                          value: 'xiaolv',
                          label: '效率'
                      }, {
                          value: 'kekong',
                          label: '可控'
                      }]
                  }, {
                      value: 'daohang',
                      label: '导航',
                      children: [{
                          value: 'cexiangdaohang',
                          label: '侧向导航'
                      }, {
                          value: 'dingbudaohang',
                          label: '顶部导航'
                      }]
                  }]
              }, {
                  value: 'zujian',
                  label: '组件',
                  children: [{
                      value: 'basic',
                      label: 'Basic',
                      children: [{
                          value: 'layout',
                          label: 'Layout 布局'
                      }, {
                          value: 'color',
                          label: 'Color 色彩'
                      }, {
                          value: 'typography',
                          label: 'Typography 字体'
                      }, {
                          value: 'icon',
                          label: 'Icon 图标'
                      }, {
                          value: 'button',
                          label: 'Button 按钮'
                      }]
                  }, {
                      value: 'form',
                      label: 'Form',
                      children: [{
                          value: 'radio',
                          label: 'Radio 单选框'
                      }, {
                          value: 'checkbox',
                          label: 'Checkbox 多选框'
                      }, {
                          value: 'input',
                          label: 'Input 输入框'
                      }, {
                          value: 'input-number',
                          label: 'InputNumber 计数器'
                      }, {
                          value: 'select',
                          label: 'Select 选择器'
                      }, {
                          value: 'cascader',
                          label: 'Cascader 级联选择器'
                      }, {
                          value: 'switch',
                          label: 'Switch 开关'
                      }, {
                          value: 'slider',
                          label: 'Slider 滑块'
                      }, {
                          value: 'time-picker',
                          label: 'TimePicker 时间选择器'
                      }, {
                          value: 'date-picker',
                          label: 'DatePicker 日期选择器'
                      }, {
                          value: 'datetime-picker',
                          label: 'DateTimePicker 日期时间选择器'
                      }, {
                          value: 'upload',
                          label: 'Upload 上传'
                      }, {
                          value: 'rate',
                          label: 'Rate 评分'
                      }, {
                          value: 'form',
                          label: 'Form 表单'
                      }]
                  }, {
                      value: 'data',
                      label: 'Data',
                      children: [{
                          value: 'table',
                          label: 'Table 表格'
                      }, {
                          value: 'tag',
                          label: 'Tag 标签'
                      }, {
                          value: 'progress',
                          label: 'Progress 进度条'
                      }, {
                          value: 'tree',
                          label: 'Tree 树形控件'
                      }, {
                          value: 'pagination',
                          label: 'Pagination 分页'
                      }, {
                          value: 'badge',
                          label: 'Badge 标记'
                      }]
                  }, {
                      value: 'notice',
                      label: 'Notice',
                      children: [{
                          value: 'alert',
                          label: 'Alert 警告'
                      }, {
                          value: 'loading',
                          label: 'Loading 加载'
                      }, {
                          value: 'message',
                          label: 'Message 消息提示'
                      }, {
                          value: 'message-box',
                          label: 'MessageBox 弹框'
                      }, {
                          value: 'notification',
                          label: 'Notification 通知'
                      }]
                  }, {
                      value: 'navigation',
                      label: 'Navigation',
                      children: [{
                          value: 'menu',
                          label: 'NavMenu 导航菜单'
                      }, {
                          value: 'tabs',
                          label: 'Tabs 标签页'
                      }, {
                          value: 'breadcrumb',
                          label: 'Breadcrumb 面包屑'
                      }, {
                          value: 'dropdown',
                          label: 'Dropdown 下拉菜单'
                      }, {
                          value: 'steps',
                          label: 'Steps 步骤条'
                      }]
                  }, {
                      value: 'others',
                      label: 'Others',
                      children: [{
                          value: 'dialog',
                          label: 'Dialog 对话框'
                      }, {
                          value: 'tooltip',
                          label: 'Tooltip 文字提示'
                      }, {
                          value: 'popover',
                          label: 'Popover 弹出框'
                      }, {
                          value: 'card',
                          label: 'Card 卡片'
                      }, {
                          value: 'carousel',
                          label: 'Carousel 走马灯'
                      }, {
                          value: 'collapse',
                          label: 'Collapse 折叠面板'
                      }]
                  }]
              }, {
                  value: 'ziyuan',
                  label: '资源',
                  children: [{
                      value: 'axure',
                      label: 'Axure Components'
                  }, {
                      value: 'sketch',
                      label: 'Sketch Templates'
                  }, {
                      value: 'jiaohu',
                      label: '组件交互文档'
                  }]
              }]
          }
        },
        methods:{
            areaChange(val){
                this.areas = val;
            },
            showList(val){
                switch (val) {
                    case 'register':
                        this.typeList[0].disabled = false;
                        this.typeList[1].disabled = false;
                        break;
                    case 'publishOne':
                    case 'publishPool':
                    case 'publish':
                    case 'order':
                        this.typeList[2].disabled = false;
                        this.typeList[1].disabled = false;
                        break;
                    case 'score':
                        this.typeList[3].disabled = false;
                        this.typeList[1].disabled = false;
                        break;
                    case 'login':
                        this.typeList[4].disabled = false;
                        this.typeList[1].disabled = false;
                        break;
                    case 'recharge':
                        this.typeList[5].disabled = false;
                        this.typeList[1].disabled = false;
                        break;
                    case 'compensate':
                        this.typeList[6].disabled = false;
                        this.typeList[1].disabled = false;
                        break;
                    default:
                        message(this,'网络问题,请稍后再试...','warning');
                }
            },
            addPar(){
                if(this.parValues.length < 1){
                    message(this,'请先填写面值','warning')
                }else{
                    let obj = {
                        value: '',
                        issueCount:''
                    }
                    this.parList.push(obj);
                    console.log(this.parList)
                }
            },
            deleteParValue(index){
                this.parList.splice(index, 1);
            },
            innerCancel(){
                this.$emit('onInnerCancel',this.innerVisible);
            },
            innerConfirm(){
                let arr = [];
                switch (this.trigger) {
                    case 'register':
                        this.addParams(0,'Register',arr);
                        this.areaArr(arr);
                        break;
                    case 'publishOne':
                    case 'publishPool':
                    case 'publish':
                    case 'order':
                        this.addParams(2,'Order',arr);
                        this.areaArr(arr);
                        break;
                    case 'score':
                        this.addParams(3,'Score',arr);
                        this.areaArr(arr);
                        break;
                    case 'login':
                        this.addParams(4,'Login',arr);
                        this.areaArr(arr);
                        break;
                    case 'recharge':
                        this.addParams(5,'Recharge',arr);
                        this.areaArr(arr);
                        break;
                    case 'compensate':
                        this.addParams(6,'Compensate',arr);
                        this.areaArr(arr);
                        break;
                    default:
                        message(this,'网络问题,请稍后再试...','warning');
                }

                console.log(arr)
                this.$emit('onInnerConfirm',arr);
                this.parList = [];
                this.areas = [];

            },
            addParams(index,name,arr){
                if(this.typeList[index].checked){
                    let obj = {
                        action: name,
                        params: {
                            kinds:this.parList
                        }
                    };

                    switch (name){
                        case 'Register':
                            break;
                        case 'Order':
                            obj.maxOrderValue = this.maxOrderValue == ''?0:Number(this.maxOrderValue);
                            obj.minOrderValue = this.minOrderValue == ''?0:Number(this.minOrderValue);
                            break;
                        case 'Score':
                            obj.score = Number(this.integral);
                            break;
                        case 'Login':
                            obj.continueLoginDays = Number(this.continueLoginDays);
                            break;
                        case 'Recharge':
                            obj.rechargeAmount = Number(this.rechargeAmount);
                            break;
                        case 'Compensate':
                            this.parList.forEach((v) => {
                                let obj1 = {
                                    action: name,
                                    params: {
                                        kinds:[]
                                    }
                                };
                                let obj2 = {};
                                obj2.value = Number(v.value);
                                obj2.issueCount = 0;
                                obj1.params.kinds.push(obj2);
                                obj1.compensateKind = Number(v.value);
                                arr.push(obj1);
                            });
                            console.log(arr);
                            break;
                        default:
                            message(this,'网络问题,请稍后再试...','warning');

                    }
                    if(name != 'Compensate'){
                        arr.push(obj)
                    }

                }
            },
            areaArr(arr){
                this.areas.forEach( v => {
                    let obj = {
                        action:"Area",
                        params: {
                            priovice:"",
                            city:"",
                            area:""
                        }
                    };
                    if(v.length == 1){
                        obj.params.priovice = v[0];
                    }else if(v.length == 2){
                        obj.params.priovice = v[0];
                        obj.params.city = v[1];
                    }else{
                        obj.params.priovice = v[0];
                        obj.params.city = v[1];
                        obj.params.area = v[2];
                    }
                    arr.push(obj);
                });
            }
        }
    }
</script>

<style scoped>

</style>