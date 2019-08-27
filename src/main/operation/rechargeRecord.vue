<template>
    <div clas="rechargeRecord">
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <table-bar :tableData="tableData" :columns="columns" :total="total" :currentPage="currentPage" :pageSize="pageSize"></table-bar>
        </div>
    </div>
</template>

<script>
    import {formatDateTime} from '../../assets/js/date.js';
    import Position from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    export default {
        name: "rechargeRecord.vue",
        components:{
            Position,
            SearchBar,
            TableBar
        },
        data() {
            return {
                buttonList:[{
                    text:'新增充值卡',
                    method:'add'
                }],
                positions:Window.getCurrentLocation("4-2"),
                conditions:{},
                selectors:[
                    {
                        cname:'充值流水号',
                        name:'id',
                        model:'input'
                    },
                    {
                        cname:'状态',
                        name:'status',
                        model:'select',
                        dataArr:[
                            {
                                label:'全部',
                                value:''
                            },
                            {
                                label:'普通会员',
                                value:'普通会员'
                            },
                            {
                                label:'会员充值',
                                value:'会员充值'
                            }
                        ]
                    },
                    {
                        cname:'用户账号',
                        name:'userAccount',
                        model:'input'
                    },
                    {
                        cname:'交易状态',
                        name:'status',
                        model:'select',
                        dataArr:[
                            {
                                label:'全部',
                                value:''
                            },
                            {
                                label:'成功',
                                value:'success'
                            },
                            {
                                label:'失败',
                                value:'fail'
                            }
                        ]
                    },
                    {
                        cname:'交易时间',
                        name:'time',
                        model:'date',
                        type:'daterange'
                    },

                ],
                tableData: [{
                    id:'23456789',
                    type:'普通充值',
                    price:1000,
                    preferenceContent:'9.5',
                    paymentPrice:1000,
                    userAccount:13652456987,
                    balance:1500.00,
                    transactionTime:'2018-12-1 09：32',
                    transactionMode:'微信',
                    transactionStatus:'交易成功'
                }],
                columns:[{
                    label:'充值流水号',
                    prop:'id',
                },{
                    label:'类型',
                    prop:'type',
                },{
                    label:'充值金额(元)',
                    prop:'price',
                },{
                    label:'折扣',
                    prop:'preferenceContent',
                },{
                    label:'实付金额(元)',
                    prop:'paymentPrice',
                },{
                    label:'用户账号',
                    prop:'userAccount',
                },{
                    label:'余额(元)',
                    prop:'balance',
                },{
                    label:'交易时间',
                    prop:'transactionTime',
                },{
                    label:'交易方式',
                    prop:'transactionMode',
                },{
                    label:'交易状态',
                    prop:'transactionStatus',
                }],
                currentPage: 1,
                pageSize:1,
                total:0
            };
        },
        methods:{
            onConfirm(condition){
                console.log(condition);
            }
        }
    }
</script>

<style scoped lang="scss">
    .rechargeRecord{

    }
</style>