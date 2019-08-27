<template>
    <div>
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="searchSelectors" @onConfirm="onConfirm" :conditions="conditions" :buttons="searchButtons"/>
            <dialog-bar :editDialogShow="dialogShows" :dialogTitle="dialogTitles" @onCancel="onEditCancels"  dialogWidth="20%"/>
        </div>
        <div>
            <table-bar :tableData="orderList"
                       :columns="columns"
                       :tableOption="tableOption"
                       :total="total"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @onSearch="onSearch"
                       @action="action"/>
                <dialog-bar :editDialogShow="dialogShow" :dialogTitle="dialogTitle" @onCancel="onEditCancel('ruleForm')" dialogWidth="50%">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
                    <el-form-item label="运单" prop="id">
                        <el-input v-model="ruleForm.id" style="width:300px" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="调帐前应收金额" prop="price">
                        <el-input v-model="ruleForm.price"  style="width:300px" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="调帐类型" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择调帐类型" style="width:300px">
                        <el-option label="客户扣款" value="solve" ></el-option>
                        <el-option label="奖励" value="give" ></el-option>
                        <el-option label="补贴" value="allowance" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="调帐金额" prop="sum" >
                        <el-input v-model="ruleForm.sum" style="width:300px" @change="handle(val)"></el-input>
                    </el-form-item>
                    <el-form-item label="调帐后应收金额" prop="result" >
                        <el-input v-model="ruleForm.result" style="width:300px" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="调帐原因" prop="cause">
                      <el-input type="textarea" v-model="ruleForm.cause" style="width:500px"></el-input>
                    </el-form-item>
                </el-form>
                </dialog-bar>
        </div>
    </div>
</template>
<script>
    import DialogBar from '../common/dialogBar.vue';
    import Position from '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import {formatDateTime} from '../../assets/js/date.js';

    require("../../assets/module/finance.js");

    var com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};

    export default {
        data() {
            var checkeSum = (rule, value, cb) => {
            const regSum = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

            if (regSum .test(value)) {
                return cb()
            }
            cb(new Error("请输入正确格式的调帐金额"))
            }
             return {
                finance: com.lightningdog.rrq.finance,
                event: com.lightningdog.rrq.event,
                token :"Zs7s8rzG4FcdHh7\/BPohkGV0lmvXNFKkSmP\/ckFbu37b4NeUrwIQKNflfnPmcl2fBLoLq700BPK7Y5xoAFs78w16+KKldWuy7X8SnyCfqsQbCCJqNlX9UqIQ\/hqOUe0QQRO5QIcYkaQc3DXJXWL0flvfhD7NcrLyZMDCgNaVUAQ=",
                currentPage: 1,
                pageSize: 10,
                total: 0,
                dialogShows:false,
                dialogShow:false,
                dialogTitle:'',
                dialogTitles:'',
                positions: Window.getCurrentLocation("8-2"),
                searchSelectors: [{
                    model: 'input',
                    name: 'id',
                    cname: '订单编号',
                    default: '请填写订单编号',
                    value: '请填写订单编号'
                }, {
                    model: 'select',
                    name: 'billWay',
                    cname: '计价方式',
                    default: '请选择计价方式',
                    value: '请选择计价方式'
                }, {
                    model: 'input',
                    name: 'business',
                    cname: '所在市场',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                },{
                    model: 'input',
                    name: 'projectId',
                    cname: '项目编号',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                },{
                    model: 'input',
                    name: 'userId',
                    cname: '客户编号',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                }
                ],
                searchButtons:[{
                    text: '查询',
                    method:'search'
                },{
                    text: '导出',
                    method:'export'
                },{
                    text: '创建对账单',
                    method:'add'
                }],
                ruleForm:{
                    id:"",
                    price:'',
                    region:'',
                    sum:'',
                    result:'',
                    cause:''
                },
                
                rules:{
                  region: [
                  { required: true, message: '请选择调帐类型', trigger: 'change' }
                  ],
                  sum: [
                  { required: true, message: '请输入调帐金额', trigger: 'blur' },
                  { validator: checkeSum, trigger: "blur" }
                  ],
                  cause: [
                  { required: true, message: '请输入调帐原因', trigger: 'blur' },
                  { min: 5, max: 200, message: '长度在 5 到 200 个字符', trigger: 'blur' }
                  ],
                },
                conditions: {},
                tableOption: {
                    width: '200',
                    label: '操作',
                    buttons: [ 
                        {text: '调账', methods: 'adjustment'},
                        {text: '确认出账', methods: 'commit'},
                        {text: '实收', methods: 'real'},
                        {text: '开票', methods: 'openfile'},
                    ]
                },
                columns: [{
                    label: '订单编号',
                    prop: 'id',
                    width: '150px',
                }, {
                    label: '订单类型',
                    prop: 'types',
                }, {
                    label: '所在市场',
                    prop: 'market',
                }, {
                    label: '订单状态',
                    prop: 'status',
                }, {
                    label: '计价方式',
                    prop: 'billWay',
                },{
                    label: '客户编号',
                    prop: 'userId',
                    width: '150px',
                },{
                    label: '项目编号',
                    prop: 'projectId',
                    width: '200px',
                },{
                    label: '订单价格',
                    prop: 'optBeforeBalance',
                }, {
                    label: '调账金额',
                    prop: 'optMoney',
                }, {
                    label: '实际价格',
                    prop: 'optAfterBalance',
                }, {
                    label: '创建时间',
                    prop: 'createTime',
                    width: '200px',
                    formatter:(row)=>{
                        return formatDateTime(row.createTime);
                    }
                }],
                orderList: []
            }
        },
        created() {
            this.data();
            this._event('list');
        },
        mounted() {

        },
        methods: {
            data() {
                let condtion = {
                    token: this.token,
                    pageNum: this.currentPage,
                };
                console.log(condtion);
                this.finance.list(condtion,'list');
            },
            _event(info) {
                this.event.on('onMore', "com.lightningdog.rrq.finance", info, (event, data) => {
                    if (info === 'list') {
                        if (data) {
                            console.log(data);
                            this.orderList = data.list;
                            this.total = data.total;
                        }
                    }
                });
            },
            onConfirm(condition) {
                //点击查询按钮
                if (condition.type === "search") {
                    console.log(condition)
                    let condtion = {
                        token: this.token,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        id:condition.id,//订单id
                        ownerId:condition.userId, //客户ID
                        market:condition.business, //所在市场
                        type:condition.types,
                        billWay:condition.billWay //计价方式
                    };
                    this.finance.list(condtion,'list');
                    this._event('list');
                }
                if(condition.type === "create"){
                  this.dialogShows=true,
                  this.dialogTitles='确认创建对账单'
                }

            },
            onEditCancels(){
                this.dialogShows = false;
            },
            onEditCancel(formName){
                console.log(formName)
                this.dialogShow = false;
                 this.$refs[formName].resetFields();
            },
            action(val) {
                if (val.methods === 'adjustment') {
                    // console.log(val)
                    // console.log('这里添加详情函数')
                    this.dialogShow = true;
                    this.dialogTitle = '调帐';
                    this.ruleForm.id=this.orderList[0].id;
                    this.ruleForm.price=this.orderList[0].optBeforeBalance;
                    this.ruleForm.sum=this.orderList[0].optMoney;
                }
                if(val.methods === 'commit'){
                    console.log('这里添加详情函数')
                }

            },
            handle(val){
                this.ruleForm.result=parseInt(this.ruleForm.price)+parseInt(this.ruleForm.sum)  
            },
            onSearch(val) {
                console.log(val);
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
                this.data();
                this._event('list');
            },
            onCurrentChange(val) {
                console.log('当前页：' + val)
            },
            onSizeChange(val) {
                console.log('页码：' + val)
            }
        },
        components: {
            Position,
            SearchBar,
            TableBar,
            DialogBar,
        }
    }
</script>

<style scoped lang="scss">


</style>