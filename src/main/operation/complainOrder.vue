<template>
    <!--投诉管理-->
    <div class="complainOrder">
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <table-bar :tableData="tableData" :columns="columns" :total="total" @onSearch="onSearch" :currentPage="currentPage" :pageSize="pageSize" @action="action" :tableOption="tableOption"></table-bar>
        </div>
        <dialog-bar :editDialogShow="dialogShow" :dialogTitle="dialogTitle" @onConfirm="onEditConfirm" @onCancel="onEditCancel" >
            <el-form :model="form" v-if="dialogTitle == '投诉处理'">
                <!--<el-form-item label="反馈来源" :label-width="formLabelWidth">-->
                <!--<el-select v-model="form.feedbackObject" clearable placeholder="全部">-->
                <!--<el-option-->
                <!--v-for="item in feedbackObjects"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="反馈来源" :label-width="formLabelWidth">
                    <span>{{form.object | changeObject}}</span>
                </el-form-item>
                <el-form-item label="投诉类型" :label-width="formLabelWidth">
                    <span>{{form.type}}</span>
                </el-form-item>
                <el-form-item label="投诉内容" :label-width="formLabelWidth">
                    <span>{{form.context}}</span>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth1">
                    <el-checkbox v-model="form.driverDeduction" :disabled="form.driverDisabled">司机扣款</el-checkbox>
                </el-form-item>
                <div v-if="form.driverDeduction">
                    <el-form-item label="扣款原因" :label-width="formLabelWidth">
                        <el-input class="from-input" v-model="form.deductionReason" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="扣款金额" :label-width="formLabelWidth">
                        <el-radio-group v-model="form.deductionPrice">
                            <el-radio label="allPrice">当次运费全款</el-radio>
                            <el-radio label="partPrice">当次运费部分</el-radio>
                        </el-radio-group>
                        <div class="from-num-input" v-if="form.deductionPrice === 'partPrice'">
                            <el-input v-model="form.partPrice" clearable></el-input>
                            <span class="form-num">元</span>
                        </div>
                    </el-form-item>
                </div>
                <el-form-item label="" :label-width="formLabelWidth1">
                    <el-checkbox v-model="form.customerSubsidySelect" :disabled="form.customerDisabled">客户补贴</el-checkbox>
                </el-form-item>
                <!--<el-form-item label="处理结果" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.result">
                    <el-radio label="不予处理">不予处理</el-radio>
                    <el-radio label="司机扣款/客户补贴">司机扣款/客户补贴</el-radio>
                  </el-radio-group>
                </el-form-item>-->
                <!--<el-form-item label="扣款方式" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.deductionWay">
                    <el-radio label="预出账金额">预出账金额</el-radio>
                    <el-radio label="可提现金额">可提现金额</el-radio>
                  </el-radio-group>
                </el-form-item>-->
                <div v-if="form.customerSubsidySelect">
                    <el-form-item label="补贴原因" :label-width="formLabelWidth">
                        <el-input class="from-input" v-model="form.subsidyReason" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="客户补贴" :label-width="formLabelWidth">
                        <el-radio-group v-model="form.customerSubsidy">
                            <!--<el-radio label="coupon">抵扣券</el-radio>-->
                            <el-radio label="cash">返现</el-radio>
                        </el-radio-group>
                        <div class="from-num-input">
                            <el-input v-model="form.cashback" clearable></el-input>
                            <span class="form-num">元</span>
                        </div>
                    </el-form-item>
                    <!--<el-form-item label="选择抵扣券" :label-width="formLabelWidth">
                      <el-select v-model="form.couponPrice" clearable placeholder="请选择抵扣券金额">
                        <el-option
                          v-for="item in couponPrices"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <div class="from-num-input">
                        <el-input v-model="form.couponNum" clearable></el-input>
                        <span class="form-num">张</span>
                      </div>
                    </el-form-item>
                    <el-form-item label="有效期" :label-width="formLabelWidth">
                      <el-select v-model="form.validityDate" clearable placeholder="全部">
                        <el-option
                          v-for="item in validityDates"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      &lt;!&ndash;<div>
                        <span class="form-span">起</span>
                        <el-select class="form-select" v-model="form.startTime" clearable placeholder="请选择开始时间">
                          <el-option
                            v-for="item in startTimes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-date-picker
                          v-model="form.otherStartTime"
                          type="datetime"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </div>
                      <div class="block">
                        <span class="form-span">止</span>
                        <el-select class="form-select" v-model="form.endTime" clearable placeholder="请选择截止时间">
                          <el-option
                            v-for="item in endTimes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-date-picker
                          class="form-select"
                          v-model="form.otherEndTime"
                          type="datetime"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </div>&ndash;&gt;
                    </el-form-item>-->
                </div>
                <!--<el-form-item label="备注" :label-width="formLabelWidth">-->
                <!--<el-input class="form-textarea" type="textarea" :autosize="{ minRows: 4, maxRows: 10 }" v-model="form.remarks"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <el-form v-if="dialogTitle == '处理详情'">
                <el-form-item label="订单ID" :label-width="formLabelWidth">
                    <span>{{info.toId}}</span>
                </el-form-item>
                <el-form-item label="下单时间" :label-width="formLabelWidth">
                    <span>{{info.orderTime | dateFrm}}</span>
                </el-form-item>
                <el-form-item label="订单总金额" :label-width="formLabelWidth">
                    <span>{{info.orderPrice}}</span>
                </el-form-item>
                <el-form-item label="处理人" :label-width="formLabelWidth">
                    <span>{{info.handler}}</span>
                </el-form-item>
                <el-form-item label="处理时间" :label-width="formLabelWidth">
                    <span>{{info.handleTime}}</span>
                </el-form-item>
                <el-form-item label="处理结果" :label-width="formLabelWidth">
                    <span>{{info.handleResult}}</span>
                </el-form-item>
            </el-form>
        </dialog-bar>
    </div>
</template>

<script>
    import Position from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import DialogBar from '../common/dialogBar.vue';
    import {formatDateTime} from '../../assets/js/date.js';
    import {message} from "../../assets/js/functionLibrary";
    import {regReason,regPrice} from "../../assets/js/regularExpression";
    import moment from 'moment';
    require("../../assets/module/complaint.js");

    var com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};

    export default {
        name: "complainOrder.vue",
        components:{
            Position,
            SearchBar,
            TableBar,
            DialogBar
        },
        data(){
            return {
                info:{},
                token: "Zs7s8rzG4FcdHh7\/BPohkGV0lmvXNFKkSmP\/ckFbu37b4NeUrwIQKNflfnPmcl2fBLoLq700BPK7Y5xoAFs78w16+KKldWuy7X8SnyCfqsQbCCJqNlX9UqIQ\/hqOUe0QQRO5QIcYkaQc3DXJXWL0flvfhD7NcrLyZMDCgNaVUAQ=",
                complaint : com.lightningdog.rrq.complaint,
                event: com.lightningdog.rrq.event,
                dialogTitle:'',
                formLabelWidth: '120px',
                formLabelWidth1:'28px',
                form: {
                    orderId:'',
                    object:'',
                    orderPrice:'',
                    transportPrice:'',
                    context:'',
                    subsidyReason:'',
                    driverDisabled:false,
                    customerDisabled:false,
                    driverDeduction: false,
                    customerSubsidySelect: false,
                    // remarks: '',
                    deductionReason:'',
                    deductionPrice:'allPrice',
                    partPrice:'',
                    customerSubsidy:'cash',
                    couponPrice:'',
                    couponNum:'',
                    validityDate:'',
                    cashback:''
                },
                dialogShow:false,
                positions:Window.getCurrentLocation("4-7"),
                conditions:{},
                selectors:[
                    {
                        cname:'订单号',
                        name:'orderId',
                        model:'input',
                        default:'请填写订单号'
                    },
                    {
                        cname:'客户编号',
                        name:'userAccount',
                        model:'input',
                        default:'请填写用户账号'
                    },
                    {
                        cname:'投诉类型',
                        name:'type',
                        model:'select',
                        default:'请选择投诉类型',
                        dataArr:[
                            {
                                label:'全部',
                                value:''
                            },
                            {
                                label:'运费争议',
                                value:'运费争议'
                            },
                            {
                                label:'服务',
                                value:'服务'
                            },
                            {
                                label:'货损',
                                value:'货损'
                            },
                            {
                                label:'少货',
                                value:'少货'
                            }
                        ]
                    },
                    {
                        cname:'处理状态',
                        name:'handleStatus',
                        model:'select',
                        default:'请选择处理状态',
                        dataArr:[
                            {
                                label:'全部',
                                value:''
                            },
                            {
                                label:'处理中',
                                value:0
                            },
                            {
                                label:'已处理',
                                value:1
                            }
                        ]
                    },
                ],
                tableData: [],//list数据
                columns:[{
                        label:'订单号',
                        prop:'toId',
                        width:'200'
                    },{
                        label:'客户编号',
                        prop:'userAccount',
                        width:'250'
                    },{
                        label:'投诉类型',
                        prop:'type',
                        width:'150'
                    },{
                        label:'投诉内容',
                        prop:'content',
                        width:'150'
                    },{
                        label:'处理进度',
                        prop:'handleStatus',
                        width:'150',
                        formatter :(row)=>{
                            return this.analysis(row.handleStatus);
                        }
                    },{
                        label:'处理结果',
                        prop:'handleResult',
                    },{
                        label:'处理人',
                        prop:'handler',
                    },{
                        label:'处理时间',
                        prop:'handleTime',
                        formatter:(row)=>{
                            return formatDateTime(row.handleTime);
                        }
                    }],
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'处理',methods:'handle'},
                        {text:'详情',methods:'detail'}
                    ]
                },
                currentPage: 1,
                pageSize:10,
                total:0,
            }
        },
        created() {
            // let user = JSON.parse(Base64.decode(sessionStorage.getItem('users')));
            // this.token = user.token;
            this._event('list');
        },
        mounted() {
            this.data();
        },
        filters:{
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            },
            changeObject(val){
                if(val === "customer"){
                    return '客户';
                }
                if(val === "client"){
                    return '商户';
                }
            },
        },
        methods:{
            analysis(row) {
                if(row == 0){
                    return '处理中';
                }
                if(row == 1){
                    return '已处理';
                }
            },
            data() {
                let condtion = {
                    token: "XlAYJ8DhBLKFgm43hp3pa7P5bFmZwIXmRq2ZVJvy8XpE/iCKEWnxIGuI205y+GdfKbhDcnBnh441DW5OidPDCzKi10aFNlWSZGx0unqtHhrSakeGOu8VcHqHTBfRN9hObQNgMQuwoyZJWZBfH3myWE0YIvuF0jMORyP4wHyFtOA=",
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                };
                this.complaint.list(condtion,'list');
            },
            //监听列表
            _event(Interface) {
                this.event.on('onMore', "com.lightningdog.rrq.complaint", Interface, (event, data) => {
                    console.log(data);
                    if (Interface == 'list') {
                        if (data) {
                            this.tableData = data.list;
                            this.total = data.total;
                        }
                    }
                    if (Interface == 'info') {
                        if (data) {
                           console.log(data);
                            this.info = data;
                        }
                    }
                });
            },
            //详情
            detailed() {
                this._event('info');
                let param =  {
                    "token":"XlAYJ8DhBLKFgm43hp3pa7P5bFmZwIXmRq2ZVJvy8XpE/iCKEWnxIGuI205y+GdfKbhDcnBnh441DW5OidPDCzKi10aFNlWSZGx0unqtHhrSakeGOu8VcHqHTBfRN9hObQNgMQuwoyZJWZBfH3myWE0YIvuF0jMORyP4wHyFtOA=",
                    "id":"CPL_1907261500012899242"
                };
                this.complaint.info(param,'info');
            },
            //处理

            //处理
            onEditConfirm(val){
                console.log(val);
                // this.dialogFormVisible = false;
                // if(this.form.remarks != ''){
                //   if(!regReason(this.form.remarks)){
                //     message(this,'备注填写5-228位字符','warning');
                //     return;
                //   }
                // }
                let obj = {
                    // token:this.token,
                    // trackId:this.form.orderId,
                    type:"",
                    optMoney:"",
                    adjustmentReason:"",
                    adjustmentReasonCustomer:"",
                    optMoneyCustomer:"",
                    customerType:"",
                    productId:"",
                    count:"",
                    validityTime:"",
                    // remark:this.form.remarks
                };

                if(this.form.driverDeduction && this.form.customerSubsidySelect){
                    if(this.form.deductionReason === ""){
                        message(this,'扣款原因不能为空','warning');
                        return;
                    }
                    if(!regReason(this.form.deductionReason)){
                        message(this,'扣款原因填写5-228位字符','warning');
                        return;
                    }
                    if(this.form.subsidyReason === ""){
                        message(this,'补贴原因不能为空','warning');
                        return;
                    }
                    if(!regReason(this.form.subsidyReason)){
                        message(this,'补贴原因填写5-228位字符','warning');
                        return;
                    }
                    if(this.form.cashback === ""){
                        message(this,'返现金额不能为空','warning');
                        return;
                    }
                    if(!regPrice(this.form.cashback)){
                        message(this,'返现金额为数字最多保留两位小数','warning');
                        return;
                    }
                    if(Number(this.form.cashback) > Number(this.form.orderPrice)){
                        message(this,'返现金额不能大于订单总金额','warning');
                        return;
                    }
                    obj.type = 'all';
                    obj.adjustmentReason = this.form.deductionReason;
                    if(this.form.deductionPrice === 'allPrice'){
                        obj.optMoney = this.form.transportPrice;
                    }
                    if(this.form.deductionPrice === 'partPrice'){
                        if(this.form.partPrice === ""){
                            message(this,'当此运费部分金额不能为空','warning');
                            return;
                        }
                        if(!regPrice(this.form.partPrice)){
                            message(this,'当此运费部分金额最多保留两位小数','warning');
                            return;
                        }
                        if(Number(this.form.partPrice) > Number(this.form.transportPrice)){
                            message(this,'当此运费部分金额不能大于订单总金额','warning');
                            return;
                        }
                        obj.optMoney = this.form.partPrice;
                    }
                    obj.adjustmentReasonCustomer = this.form.subsidyReason;
                    obj.optMoneyCustomer = this.form.cashback;
                    obj.customerType = this.form.customerSubsidy;
                }else if(this.form.driverDeduction && this.form.customerSubsidySelect === false){
                    if(this.form.deductionReason === ""){
                        message(this,'扣款原因不能为空','warning');
                        return;
                    }
                    if(!regReason(this.form.deductionReason)){
                        message(this,'扣款原因填写5-228位字符','warning');
                        return;
                    }
                    obj.type = 'driver';
                    obj.adjustmentReason = this.form.deductionReason;
                    if(this.form.deductionPrice === 'allPrice'){
                        obj.optMoney = this.form.transportPrice;
                    }
                    if(this.form.deductionPrice === 'partPrice'){
                        if(this.form.partPrice === ""){
                            message(this,'当此运费部分金额不能为空','warning');
                            return;
                        }
                        if(!regPrice(this.form.partPrice)){
                            message(this,'当此运费部分金额最多保留两位小数','warning');
                            return;
                        }
                        if(Number(this.form.partPrice) > Number(this.form.transportPrice)){
                            message(this,'当此运费部分金额不能大于订单总金额','warning');
                            return;
                        }
                        obj.optMoney = this.form.partPrice;
                    }
                }else if(this.form.customerSubsidySelect && this.form.driverDeduction === false){
                    if(this.form.subsidyReason === ""){
                        message(this,'补贴原因不能为空','warning');
                        return;
                    }
                    if(!regReason(this.form.subsidyReason)){
                        message(this,'补贴原因填写5-228位字符','warning');
                        return;
                    }
                    if(this.form.cashback === ""){
                        message(this,'返现金额不能为空','warning');
                        return;
                    }
                    if(!regPrice(this.form.cashback)){
                        message(this,'返现金额为数字最多保留两位小数','warning');
                        return;
                    }
                    if(Number(this.form.cashback) > Number(this.form.orderPrice)){
                        message(this,'返现金额不能大于订单总金额','warning');
                        return;
                    }
                    obj.type = 'customer';
                    obj.adjustmentReasonCustomer = this.form.subsidyReason;
                    obj.optMoneyCustomer = this.form.cashback;
                    obj.customerType = this.form.customerSubsidy;
                }else{
                    message(this,'司机扣款,客户补贴至少选一个','warning')
                    return;
                }
                // console.log(obj)                                                                                         this.$http.post('https://'+process.env.API_HOST+'/companyv1/finance/business/adjust',obj,{
                //         headers: {
                //             'Content-Type': 'application/json;charset=UTF-8'
                //         }
                //     }).then((res) => {
                //         console.log(res);
                //         if(res.data.errcode === 0){
                //         message(this,'处理成功','success');
                //         this.dialogFormVisible = false;
                //         this.init();
                //     }else{
                //         message(this,'处理失败','error');
                //     }
                // }).catch((error) => {
                //         console.log(error);
                // });
                // this.dialogShow = false;
            },
            //详情
            onEditCancel(val){
                console.log(val);
                this.dialogShow = false;
            },
            action(val){
                if(val.methods === 'detail'){
                    this.dialogTitle = '处理详情';
                    this.dialogShow = true;
                    this.detailed();
                }
                if(val.methods === 'handle'){
                    // console.log(val)
                    this.dialogTitle = '投诉处理';
                    this.dialogShow = true;
                }

            },
            onSearch(val){
                console.log(val);
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
                this.data();
            },
            onConfirm(condition) {
                console.log(condition);
                this.currentPage = 1;
                let condtion = {
                    token: "XlAYJ8DhBLKFgm43hp3pa7P5bFmZwIXmRq2ZVJvy8XpE/iCKEWnxIGuI205y+GdfKbhDcnBnh441DW5OidPDCzKi10aFNlWSZGx0unqtHhrSakeGOu8VcHqHTBfRN9hObQNgMQuwoyZJWZBfH3myWE0YIvuF0jMORyP4wHyFtOA=",
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    userAccount: condition.userAccount,  //-- 客户编号
                    type: condition.type,    //-- 投诉类型
                    handleStatus: condition.handleStatus,    // -- 处理状态 {0:处理中，1:已处理}
                    // toType: "order",     // -- 投诉对象 {order:订单,task:任务}
                    toId: condition.orderId    //-- 投诉对象ID 订单号或者任务号
                };
                this.complaint.list(condtion);
                this._event('list');
            }
        }
    }
</script>

<style scoped lang="scss">
    .complainOrder{

    }
</style>