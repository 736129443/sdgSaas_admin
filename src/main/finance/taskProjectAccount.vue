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
                    cname: '对账编号',
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
                    cname: '承接人',
                    default: '150xxxx3111',
                    value: '150xxxx3111'
                }],
                conditions: {},
                tableOption: {
                    width: '150',
                    label: '操作',
                    buttons: [
                        {text: '撤销', methods: 'cancel'},
                        {text: '修改', methods: 'change'},
                        {text: '确认', methods: 'confirm'}
                    ]
                },
                columns: [{
                    label: '对账单号',
                    prop: 'id',
                    width: '200'
                },{
                    label: '账期',
                    prop: 'period',
                    width: '200'
                },{
                    label: '项目编号',
                    prop: 'projectId',
                    width: '150'
                },{
                    label: '实际承运人',
                    prop: 'userId',
                    width: '150'
                },{
                    label: '支付状态',
                    prop: 'accountStatus',
                    width: '150px'
                },{
                    label: '项目收入',
                    prop: 'price',
                    width: '150'
                }, {
                    label: '其他扣款',
                    prop: 'adjustment',
                    width: '150px'
                }, {
                    label: '实际收入',
                    prop: 'balance',
                    width: '150px'
                }, {
                    label: '创建时间',
                    prop: 'createTime',
                    width: '200px'
                }],
                orderList: [{
                    id: 'TPA_22222222222222',
                    period: '2019-8-1至2019-10-1',
                    projectId:'PRJ_1111111111',
                    userId: 'UE_22222222222',
                    accountStatus: '待支付',
                    price: '21.00',
                    adjustment:'-1.00',
                    balance:'20.00',
                    createTime:'2018-8-11 10:30:00',
                }]
            }
        },
        methods: {
            onConfirm(condition) {
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