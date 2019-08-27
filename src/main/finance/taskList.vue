<template>
    <div>
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="searchSelectors" @onConfirm="onConfirm" :conditions="conditions" :buttons="searchButtons"/>
            <!--<search-bar :selectors="projectSelectors" @onConfirm="onConfirm" :conditions="conditions" />-->
            <dialog-bar :editDialogShow="dialogShows" :dialogTitle="dialogTitles" @onCancel="onEditCancels"  width="20%">
            </dialog-bar>
        </div>
        <div class="common-content-detail">
            <table-bar :tableData="orderList"
                       :columns="columns"
                       :tableOption="tableOption"
                       :total="total"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @onSearch="onSearch"
                       @action="action"/>
            <dialog-bar :editDialogShow="dialogShow" :dialogTitle="dialogTitle" @onCancel="onEditCancel('ruleForm')" >
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
                    <el-form-item label="调帐后应收金额" prop="result">
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
    import Position from '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import DialogBar from '../common/dialogBar.vue';

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
                dialogTitles:'',
                dialogShow:false,
                dialogTitle:'',
                positions: Window.getCurrentLocation("8-2"),
                searchSelectors: [{
                    model: 'input',
                    name: 'id',
                    cname: '任务编号',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                }, {
                    model: 'input',
                    name: 'types',
                    cname: '类型',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                },{
                    model: 'input',
                    name: 'billWay',
                    cname: '计价方式',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                },
                    {
                        model: 'input',
                        name: 'userId',
                        cname: '承接人',
                        default: '150xxxx3111',
                        value: '150xxxx3111'
                    }],
                searchButtons:[{
                    text: '查询',
                    method:'search'
                },{
                    text: '创建对账单',
                    method:'create'
                },{
                   text: '导出',
                   method:'out'
               }],
                projectSelectors:[
                //     {
                //     model: 'input',
                //     name: 'projectId',
                //     cname: '项目编号',
                //     default: '150xxxx3111',
                //     value: '150xxxx3111'
                // }
                ],
                conditions: {},
                tableOption: {
                    width: '150',
                    label: '操作',
                    buttons: [
                        {text: '调账', methods: 'adjustment'},
                        // {text: '确认出账', methods: 'commit'}
                    ]
                },
                columns: [{
                    label: '任务编号',
                    prop: 'id',
                    width: '200'
                }, {
                    label: '类型',
                    prop: 'type',
                    width: '150'
                },
                    {
                    label: '状态',
                    prop: 'status',
                    width: '150'
                }, {
                    label: '计价方式',
                    prop: 'billWay',
                    width: '150'
                },{
                    label: '承接人',
                    prop: 'userId',
                    width: '150'
                },
                //     {
                //     label: '项目编号',
                //     prop: 'projectId',
                //     width: '150'
                // },
                    {
                    label: '价格',
                    prop: 'optBeforeBalance',
                    width: '150'
                }, {
                    label: '调账金额',
                    prop: 'optMoney',
                    width: '150'
                }, {
                    label: '实际价格',
                    prop: 'optBeforeBalance',
                    width: '150'
                }, {
                    label: '创建时间',
                    prop: 'createTime',
                    width: '200px',
                    formatter:(row)=>{
                         return formatDateTime(row.createTime);
                     }
                }],
                ruleForm:{
                    id:'',
                    price:'',
                    region:'',
                    sum:'',
                    result:'',
                    cause:'',

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
                orderList:[],
                // orderList: [{
                //     id: 'OR_22222222222222',
                //     type: '运输',
                //     business: '方欣市场',
                //     status: '待支付',
                //     billWay:'一口价',
                //     userId: 'UE_22222222222',
                //     projectId:'PRJ_1111111111',
                //     price: '21.00',
                //     adjustment:'-1.00',
                //     balance:'20.00',
                //     createTime:'2018-8-11 10:30:00',
                // }]
            }
        },
        created(){
         this.data();
         this._event('task_list')
        },
        methods: {
            data(){
                let condtion = {
                    token: this.token,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                };
                this.finance.list(condtion,'task_list');
           },
            _event(info) {
                this.event.on('onMore', "com.lightningdog.rrq.finance", info, (event, data) => {
                    if (info == 'task_list') {
                        if (data) {
                            console.log(data);
                            this.orderList = data.list;
                            this.total = data.total;
                        }
                    }

                });
            },
            onConfirm(condition) {
                if( condition.type === "search" ) {
                    let condtion={
                        token: this.token,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        id:condition.id,//订单ID
                        ownerId:condition.userId,//承接人编号
                        type:condition.types,//类型
                        billWay:condition.billWay//计价方式
                    };
                    this.finance.list(condtion,'task_list');
                    this._event('task_list');
                }
                if( condition.type === "create"){
                    this.dialogShows=true,
                    this.dialogTitles='确认创建对账单'
                }
                console.log(condition)
            },
            onEditCancels(){
                this.dialogShows = false;
            },
            onEditCancel(formName){
                console.log(formName)
                this.dialogShow = false;
                this.$refs[formName].resetFields();
            },
            handle(val){
                this.ruleForm.result=parseInt(this.ruleForm.price)+parseInt(this.ruleForm.sum)
            },
            action(val) {
                if (val.methods === 'adjustment') {
                    this.dialogShow=true;
                    this.dialogTitle = '调帐';
                    this.ruleForm.id=this.orderList[0].id;
                    this.ruleForm.price=this.orderList[0].optBeforeBalance;
                    this.ruleForm.sum=this.orderList[0].optMoney;
                    // console.log(val)
                    console.log('这里添加详情函数')
                }
            },

            onSearch(val) {
                console.log(val)
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
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
            DialogBar

        }
    }
</script>

<style scoped>

</style>