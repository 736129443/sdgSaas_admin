<template>
    <div class="couponList">
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <table-bar :tableData="tableData" :columns="columns" :total="total" @onSearch="onSearch" :currentPage="currentPage" :pageSize="pageSize" @action="action" :tableOption="tableOption"></table-bar>
        </div>
    </div>
</template>

<script>
    import Position from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import {formatDateTime} from '../../assets/js/date.js';
    export default {
        name: "couponList.vue",
        components:{
            Position,
            SearchBar,
            TableBar,
        },
        data() {
            return {
                positions:Window.getCurrentLocation("4-5"),
                conditions:{},
                selectors:[
                    {
                        cname:'优惠券ID',
                        name:'couponId',
                        model:'input',
                        default:'请填写订单号'
                    },
                    {
                        cname:'类型',
                        name:'type',
                        model:'select',
                        default:'请选择优惠券类型',
                        dataArr:[
                            {
                                label:'全部',
                                value:''
                            },
                            {
                                label:'折扣券',
                                value:'折扣券'
                            },
                            {
                                label:'抵扣券',
                                value:'抵扣券'
                            }
                        ]
                    },
                    {
                        cname:'状态',
                        name:'type',
                        model:'select',
                        default:'请选择优惠券状态',
                        dataArr:[
                            {
                                label:'全部',
                                value:''
                            },
                            {
                                label:'已上线',
                                value:'已上线'
                            },
                            {
                                label:'已下线',
                                value:'已下线'
                            }
                        ]
                    }
                ],
                tableData: [{
                    id:'OD_123456789',
                    name:'新用户注册',
                    type:'抵扣券',
                    validity: '2019.2.1~2019.10.30',
                    createTime:1564974880000,
                    status:'发行中',
                }],
                columns:[{
                    label:'优惠券ID',
                    prop:'id',
                },{
                    label:'优惠券名称',
                    prop:'name',
                },{
                    label:'类型',
                    prop:'type',
                },{
                    label:'有效期',
                    prop:'validity',
                },{
                    label:'创建时间',
                    prop:'createTime',
                    formatter:(row)=>{
                        return formatDateTime(row.createTime);
                    }
                },{
                    label:'状态',
                    prop:'status',
                }],
                tableOption:{
                    width:'150',
                        label:'操作',
                        buttons:[
                        {text:'查看',methods:'detail'}
                    ]
                },
                currentPage: 1,
                pageSize:1,
                total:0
            };
        },
        methods:{
            action(val){
                if(val.methods === 'detail'){
                    console.log('处理详情');

                }
            },
            onSearch(val){
                console.log(val)
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
            },
            onConfirm(condition) {
                console.log(condition);
            }
        }
    }
</script>

<style scoped lang="scss">

</style>