//项目应收调账
<template>
    <div>
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
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
        </div>
    </div>
</template>

<script>
    import Position from '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 1,
                total: 0,
                positions: Window.getCurrentLocation("8-2"),
                selectors: [{
                    model: 'input',
                    name: 'id',
                    cname: '项目编号',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                },
                    {
                        model: 'input',
                        name: 'userId',
                        cname: '客户编号',
                        default: '150xxxx3111',
                        value: '150xxxx3111',
                    }],
                conditions: {},
                columns: [{
                    label: '调账编号',
                    prop: 'id',
                    width: '250'
                },
                    {
                        label: '项目编号',
                        prop: 'orderId',
                        width: '200'
                    },
                    {
                        label: '客户编号',
                        prop: 'userId',
                        width: '300'
                    },{
                        label: '支付状态',
                        prop: 'status',
                        width: '250'
                    },
                    {
                        label: '调账金额',
                        prop: 'optAdjustment',
                        width: '200'
                    },
                    {
                        label: '创建时间',
                        prop: 'createTime',
                        width: '400',

                    }],
                orderList: [{
                    id: 'TA_22222222222222',
                    orderId: 'OR_22222222222222',
                    projectId:'PRJ_1111111111',
                    userId: 'UE_22222222222',
                    status: '待支付',
                    optAdjustment:'-1.00',
                    createTime:'2018-8-11 10:30:00',
                }]
            }
        },
        methods: {
            // onConfirm(condition) {
            //     if(condition.type=='search'){
            //         let condtion={
            //             token: this.token,
            //             pageNum: this.currentPage,
            //             pageSize: this.pageSize,
            //             orderId:condition.id,//订单ID
            //             userId:condition.userId,//客户编号
            //         };
            //         this.finance.list(condtion,'adjustment_list');
            //         this._event('adjustment_list');
            //     }
            //
            // },
            action(val) {
                if (val.methods === 'adjustment') {
                    // console.log(val)
                    console.log('这里添加详情函数')
                }
            },
            onSearch(val) {
                // console.log(val)
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