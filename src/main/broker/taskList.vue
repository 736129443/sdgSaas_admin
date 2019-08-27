<template>
    <div class="common-content">
        <div>
            <position :positions="positions"/>
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
    import Position  from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar  from '../common/tableBar.vue';

    export default {
        data(){
            return {
                positions:Window.getCurrentLocation("3-7"),
                selectors:[{
                    model:'input',
                    name:'id',
                    cname:'编号',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'type',
                    cname:'类型',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'nickName',
                    cname:'承接人昵称',
                    default:'',
                    value:''
                },{
                    model:'input',
                    name:'phone',
                    cname:'承接人电话',
                    default:'',
                    value:''
                },{
                    model:'input',
                    name:'business',
                    cname:'市场',
                    default:'',
                    value:''
                },{
                    model:'input',
                    name:'status',
                    cname:'状态',
                    default:'',
                    value:''
                }],
                conditions:{},
                orderList: [{
                    id:'TK_11111111111',
                    type:'运输',
                    business:'方欣批发市场',
                    billWay:'一口价',
                    status:'配送中',
                    nickName:'rongzhigang',
                    phone:'185xxxx0962',
                    price:'21.00',
                    lastTime:'2019-08-02',
                    createTime:'2019-08-01',
                    remark:'配送及时'
                }],
                currentPage: 1,
                pageSize:1,
                total:0,
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'详情',methods:'detail'},
                        {text:'指派',methods:'dispatch'},
                        {text:'取消',methods:'cancel'},
                    ]
                },
                columns:[{
                    prop:"id",
                    label:"编号",
                    width:"200"
                },{
                    prop:"type",
                    label:"类型",
                    width:"150"
                },{
                    label:'所在市场',
                    prop:'business',
                    width:'150'
                },{
                    label:'支付方式',
                    prop:'billWay',
                    width:'150'
                },{
                    label:'状态',
                    prop:'status',
                    width:'150'
                },{
                    label:'承接人昵称',
                    prop:'nickName',
                    width:'150'
                },{
                    label:'承接人电话',
                    prop:'phone',
                    width:'150'
                },{
                    label:'价格',
                    prop:'price',
                    width:'300'
                }, {
                    label: '变更时间',
                    prop: 'lastTime',
                    width: '150'
                },{
                    label:'创建时间',
                    prop:'createTime',
                    width:'200px'
                }],
            }
        },
        methods:{
            handleClick(row) {
                console.log(row);
            },
            changeBackgroundColor({ row, column, rowIndex, columnIndex }) {
                if(rowIndex === 0) {
                    return 'background-color: #E2E2E2;'
                }
            },
            onConfirm(condition) {
                console.log(condition);
            },
            action(val){
                if(val.methods === 'detail'){
                    // console.log(val)
                    console.log('这里添加详情函数')
                }
            },
            onSearch(val){
                console.log(val)
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
            },
            onCurrentChange(val){
                console.log('当前页：'+val)
            },
            onSizeChange(val){
                console.log('页码：'+val)
            }
        },
        components:{
            Position,
            SearchBar,
            TableBar
        }
    }
</script>

<style lang="scss" scoped>

</style>