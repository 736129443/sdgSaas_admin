<template>
    <div>
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <table-bar :tableData="orderList"
                       :columns="columns"
                       :total="total"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @onSearch="onSearch"
                       @action="action"/>
        </div>
    </div>
</template>

<script>
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
            return {
                finance: com.lightningdog.rrq.finance,
                event: com.lightningdog.rrq.event,
                token :"Zs7s8rzG4FcdHh7\/BPohkGV0lmvXNFKkSmP\/ckFbu37b4NeUrwIQKNflfnPmcl2fBLoLq700BPK7Y5xoAFs78w16+KKldWuy7X8SnyCfqsQbCCJqNlX9UqIQ\/hqOUe0QQRO5QIcYkaQc3DXJXWL0flvfhD7NcrLyZMDCgNaVUAQ=",
                currentPage: 1,
                pageSize: 10,
                total: 0,
                positions: Window.getCurrentLocation("8-2"),
                selectors: [{
                    model: 'input',
                    name: 'id',
                    cname: '任务编号',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                },
                //     {
                //     model: 'input',
                //     name: 'projectId',
                //     cname: '项目编号',
                //     default: '150xxxx3111',
                //     value: '150xxxx3111'
                // },
                    {
                    model: 'input',
                    name: 'userId',
                    cname: '客户编号',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                }],
                conditions: {},
                columns: [{
                    label: '调账编号',
                    prop: 'id',
                    width: '200'
                },{
                    label: '任务编号',
                    prop: 'taskId'
                },
                //     {
                //     label: '项目编号',
                //     prop: 'projectId',
                //     width: '150'
                // },
                    {
                    label: '承接人',
                    prop: 'userId',
                    width: '150'
                },{
                    label: '支付状态',
                    prop: 'status',
                    width: '200'
                }, {
                    label: '调账金额',
                    prop: 'optAdjustment',
                    width: '200px'
                },  {
                    label: '创建时间',
                    prop: 'createTime',
                    width: '200px',
                    formatter:(row)=>{
                        return formatDateTime(row.createTime);
                    }
                }],
                orderList:[],
                // orderList: [{
                //     id: 'TA_22222222222222',
                //     taskId: 'TK_22222222222222',
                //     projectId:'PRJ_1111111111',
                //     userId: 'UE_22222222222',
                //     accountStatus: '待支付',
                //     price: '21.00',
                //     adjustment:'-1.00',
                //     balance:'20.00',
                //     createTime:'2018-8-11 10:30:00',
                // }]
            }
        },
        created(){
            this.data();
            this. _event('task_adjustment');
        },
        methods: {
            data(){
                let condtion = {
                    token: this.token,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                };
                this.finance.list(condtion,'task_adjustment');
            },
            _event(info) {
                this.event.on('onMore', "com.lightningdog.rrq.finance", info, (event, data) => {
                    if (info == 'task_adjustment') {
                        if (data) {
                            console.log(data);
                            this.orderList = data.list;
                            this.total = data.total;
                        }
                    }
                });
            },
            onConfirm(condition) {
                if(condition.type="search"){
                    let condtion={
                        token: this.token,
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        taskId:condition.id,
                        userId:condition.userId
                    };
                    this.finance.list(condtion,'task_adjustment');
                    this._event('task_adjustment');
                }
                console.log(condition);
            },
            action(val) {
                if (val.methods === 'adjustment') {
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
            TableBar
        }
    }
</script>

<style scoped>

</style>