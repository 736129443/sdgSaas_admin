<template>
    <div class="common-content">
        <div>
            <position :positions="positions"/>
        </div>
        <div class="common-content-detail">
            <div class="couponPoolNew">
                <search-bar :inline="inline" :selectors="selectors" :conditions="conditions" :buttons="button" :rules="rules" label-width="120px" @onConfirm="submitData">

                    <el-form-item slot="addParValue" label="面值">
                        <el-button type="primary" @click="addParValues" icon="el-icon-plus">添加面值</el-button>
                    </el-form-item>
                    <el-form-item v-for="(item,index) in parValues" :key="index" slot="parValue" :label="'面值'+(index+1)">
                        <el-input v-model="item.value"></el-input>
                        <i class="el-icon-delete" @click="deleteParValue(index)"></i>
                    </el-form-item>
                    <el-form-item slot="addGrantRule" label="发放规则">
                        <el-button type="primary" @click="addGrantRules" icon="el-icon-plus">添加发放规则</el-button>
                    </el-form-item>

                    <el-form-item slot="useRule" label="使用规则">
                        <el-button type="primary" @click="addUseRules" icon="el-icon-plus">添加使用规则</el-button>
                    </el-form-item>

                    <dialog-bar slot="grantRule" :editDialogShow="dialogShow" :dialogTitle="dialogTitle" @onConfirm="onAddConfirm" @onCancel="onAddCancel" >
                        <div v-if="isShow == 'grant'">
                            <el-button type="primary" @click="addGrantRules" icon="el-icon-plus">{{dialogTitle}}</el-button>
                            <div v-for="(item,index) in grantRule" :key="index">
                                <el-form-item :label="'发放规则'+(index+1)">
                                    <i class="el-icon-delete" @click="deleteGrantRule(index)"></i>
                                </el-form-item>

                                <el-form-item label="规则名称">
                                    <el-input v-model="item.name" placeholder="请输入规则名称"></el-input>
                                </el-form-item>

                                <el-form-item label="规则种类">
                                    <el-select v-model="item.trigger" placeholder="请选择规则种类">
                                        <el-option
                                                v-for="val in grantRuleType"
                                                :key="val.name"
                                                :label="val.cname"
                                                :value="val.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="规则限制">
                                    <el-button type="primary" @click="addRuleLimit(index)" icon="el-icon-plus">添加规则限制</el-button>
                                </el-form-item>

                                <el-form-item label="优惠券领取时间">
                                    <el-date-picker
                                            v-model="item.rangetime"
                                            value-format="timestamp"
                                            type="datetimerange"
                                            @change="dateChange(index)"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>

                            </div>

                            <checkbox-bar :grantTypes="grantTypes" @onInnerConfirm="getChechked" :trigger="trigger" :parValues="parValues" :innerVisible="innerVisible" @onInnerCancel="onInnerCancel"></checkbox-bar>
                        </div>

                        <div v-if="isShow == 'use'">
                            <el-button type="primary" @click="addUseRules" icon="el-icon-plus">{{dialogTitle}}</el-button>
                            <el-form label-width="200px">
                                <el-form-item label="是否与其他优惠券叠加">
                                    <el-switch
                                            v-model="checked"
                                            active-value="1"
                                            inactive-value="0"
                                    >
                                    </el-switch>
                                </el-form-item>
                            </el-form>
                            <div v-for="(item,index) in useRuleList">
                                <el-form-item :label="'使用规则'+(index+1)">
                                    <i class="el-icon-delete" @click="deleteUseRule(index)"></i>
                                </el-form-item>

                                <el-form-item label="规则描述">
                                    <el-input type="textarea" v-model="item.describe"></el-input>
                                </el-form-item>

                                <el-form-item label="使用金额范围">
                                    <el-input v-model="item.minOrderValue" placeholder="请填写最小金额"></el-input>
                                    <span class="title">-</span>
                                    <el-input v-model="item.maxOrderValue" placeholder="请填写最大金额"></el-input>
                                </el-form-item>

                                <el-form-item label="最大使用面值">
                                    <el-input v-model="item.params.maxKind" placeholder="请填写最小金额"></el-input>
                                </el-form-item>

                                <el-form-item label="优惠券使用张数">
                                    <el-input v-model="item.params.useCount" placeholder="请填写最小金额"></el-input>
                                </el-form-item>

                                <el-form-item label="是否与其他优惠券叠加">
                                    <el-switch
                                            v-model="item.kindsOverlap"
                                            active-value="1"
                                            inactive-value="0"
                                    >
                                    </el-switch>
                                </el-form-item>

                            </div>
                        </div>
                    </dialog-bar>

                    <el-form-item label="上传图片">
                        <upload-bar :limit="limit" listType="picture-card" @getPicList="getPicLists"><i class="el-icon-plus"></i></upload-bar>
                    </el-form-item>
                </search-bar>
            </div>
        </div>
    </div>
</template>

<script>
require('../../assets/module/packages.js');
require('../../assets/module/coupon.js');
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
import {message} from "../../assets/js/functionLibrary.js";
import SearchBar from '../common/searchbar.vue';
import DialogBar from '../common/dialogBar.vue';
import checkboxBar from '../common/checkbox.vue';
import uploadBar from "../common/uploadBar.vue";
import Position from '../common/position.vue'
export default {
    name: "couponPoolNew.vue",
    components:{
        Position,
        SearchBar,
        DialogBar,
        checkboxBar,
        uploadBar
    },
    data() {
        return {
            positions:Window.getCurrentLocation("4-3-1"),
            picList:[],
            trigger:'',
            limit:3,
            checked: '0',
            useRuleList:[],
            dialogTitle:'',
            isShow:null,
            trigger:null,
            oIndex:0,
            innerVisible:false,
            grantTypes:[],
            grantRuleType:[],
            grantRule:[],
            parValues:[],
            dialogShow:false,
            packages:com.lightningdog.rrq.packages,
            coupon:com.lightningdog.rrq.coupon,
            inline:false,
            conditions:{},
            selectors:[
                {
                    cname:'活动名称',
                    name:'name',
                    model:'input',
                    default:'请填写活动名称'
                },
                {
                    cname:'活动描述',
                    name:'adIntro',
                    model:'textarea',
                    default:'请填写活动描述'
                },
                {
                    cname:'活动时间',
                    name:'activityDate',
                    model:'date',
                    format:'yyyy-MM-dd HH:mm:ss',
                    type:'datetimerange',
                    default:'请选择活动时间'
                },
                {
                    cname:'优惠类型',
                    name:'type',
                    model:'select',
                    default:'请选择优惠券类型',
                    dataArr:[
                        {
                            label:'折扣券',
                            value:'DISCOUNT'
                        },
                        {
                            label:'抵扣券',
                            value:'SUBTRACT'
                        }
                    ]
                },
                {
                    cname:'优惠券持续时间(天)',
                    name:'durationDate',
                    model:'input',
                    default:'请填写优惠券持续时间'
                },
                {
                    cname:'总成本',
                    name:'amountCost',
                    model:'input',
                    default:'请填写总成本'
                },
                {
                    cname:'优惠券总数',
                    name:'amountCount',
                    model:'input',
                    default:'请填写优惠券总数'
                }
            ],
            button:[{
                method:"submit",
                text:"提交"
            }],
            rules: {
                // name: [
                //     { required: true, message: '请输入活动名称', trigger: 'blur' },
                //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                // ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                // type: [
                //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                // ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        };
    },
    created(){
        this.packages._event.on("onTrigger", "com.lightningdog.rrq.packages", "getTrigger", (event, data)=>{
            console.log(data);
            this.grantRuleType = data;
        });
        this.packages._event.on("onAction", "com.lightningdog.rrq.packages", "getAction", (event, data)=>{
            console.log(data);
            this.grantTypes = data;
        });
        this.coupon._event.on("onCreate", "com.lightningdog.rrq.coupon", "createCoupon", (event, data)=>{
            console.log(data);
            let forFn =  async () => {
                try {
                    let formdata = new FormData();
                    formdata.append('token','JD0ybf1SB6j6JQTRR8NPRUnzbk0Ur1swpm/HErRb+c9blCnjpGqE8/ymTTQR0EwOpm2EQGShSk6tWB7QvubkEGBunCmA7ZGh6Rbm9tjy0hsmfUV95vnKm9icUIulcPrsB2udIdoPSEvY9DSKjT/4ANe6/iEQis4IRtpKC8rY7ro=');
                    for (let i = 0; i < this.picList.length; i++) {
                        formdata.append('files',this.picList[i].raw);
                    }
                    formdata.append('module','coupon');
                    formdata.append('id',data);
                    this.upLoadPic(formdata);
                }catch (e) {
                    console.log(e)
                }
            }
            forFn();
    });
        this.coupon._event.on("onUpload", "com.lightningdog.rrq.coupon", "uploadPic", (event, data)=>{
            console.log(data);
    });

        this.packages.trigger();
        this.packages.action();
    },
    methods: {
        upLoadPic(formdata){
            this.$http.post('http://192.168.50.88:8025/coupon/coupon_pool/upload', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                }
            }).then((res) => {
                console.log(res);
            })
        },
        submitData(val){
            val.beginDate = val.activityDate != ''&& val.activityDate != null?val.activityDate[0]:'';
            val.endDate =  val.activityDate != ''&& val.activityDate != null?val.activityDate[1]:'';
            val.kinds = this.parValues;
            val.issueRule = this.grantRule;
            val.useRule = {
                activityOverlap:this.checked,
                constraint:this.useRuleList
            };
            console.log(val)
            this.coupon.create({
                token:'JD0ybf1SB6j6JQTRR8NPRUnzbk0Ur1swpm/HErRb+c9blCnjpGqE8/ymTTQR0EwOpm2EQGShSk6tWB7QvubkEGBunCmA7ZGh6Rbm9tjy0hsmfUV95vnKm9icUIulcPrsB2udIdoPSEvY9DSKjT/4ANe6/iEQis4IRtpKC8rY7ro=',
                couponPoolConfig:val
            });
        },
        dateChange(index){
            console.log(index)

            this.grantRule[index].startDate = this.grantRule[index].rangetime != ''&& this.grantRule[index].rangetime != null?this.grantRule[index].rangetime[0]:'';
            this.grantRule[index].endDate = this.grantRule[index].rangetime != ''&& this.grantRule[index].rangetime != null?this.grantRule[index].rangetime[1]:'';
        },
        getPicLists(val){
            console.log(val);
            this.picList = val;
        },
        deleteUseRule(index){
            this.useRuleList.splice(index, 1);
        },
        addUseRules(){
            this.isShow = 'use';
            this.dialogTitle  = '添加使用规则';
            this.dialogShow = true;
            let obj = {
                // name:'',
                // action:'',
                params:{
                    maxKind:'',
                    useCount:''
                },
                describe:'',
                maxOrderValue:'',
                minOrderValue:'',
                kindsOverlap:'0'
            };
            this.useRuleList.push(obj)
            console.log(this.useRuleList)
        },
        getChechked(val){
            console.log(val);
            this.grantRule[this.oIndex].constraint = val;
            this.innerVisible = false;
        },
        deleteGrantRule(index){
            this.grantRule.splice(index, 1);
        },
        onAddConfirm(){
            if(this.isShow == 'grant'){
                console.log(this.grantRule)
                this.dialogShow = false;
            }

            if(this.isShow == 'use'){
                // let obj =
                // console.log(obj)
                this.dialogShow = false;
            }

        },
        onAddCancel(){
            this.dialogShow = false;
        },
        addGrantRules(){
            console.log(this.grantRule);

            if(this.parValues.length == 0){
                message(this,'请先创建面值','warning')
                return;
            };
            this.isShow = 'grant';
            this.dialogTitle  = '添加发放规则';
            this.dialogShow = true;
            // if(this.grantRule.length == 0){
                let obj = {
                    name:'',
                    trigger:'',
                    rangetime:'',
                };

                this.grantRule.push(obj);
                console.log(this.grantRule)
            // }
        },
        deleteParValue(index){
            this.parValues.splice(index, 1);
        },
        addParValues(){

            let obj = {
                type: this.conditions.type,
                value: '',
                price: 0.00,
                fee: 0.00
            };
            console.log(obj)
            this.parValues.push(obj);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onInnerCancel(val){
            this.innerVisible = false;
        },
        addRuleLimit(index){
            this.oIndex = index;

            if(this.grantRule[index].trigger == ''){
                message(this,'请先选择规则种类','warning')
            }else{
                this.trigger = this.grantRule[index].trigger;
                this.innerVisible = true;
            }

        }
    }
}
</script>

<style lang="scss">
    .couponPoolNew{
        .el-form-item__content{
            width:400px;
        }
    }
</style>