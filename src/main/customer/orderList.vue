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
    import {formatDateTime} from '../../assets/js/date.js';
    import Position from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    require('../../assets/module/order.js');

    let com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};

    export default {
        data(){
            return {
                token:'',
                order: com.lightningdog.rrq.order,
                event: com.lightningdog.rrq.event,
                positions:Window.getCurrentLocation("2-3"),
                selectors:[{
                    model:'input',
                    name:'orderId',
                    cname:'订单编号',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'business',
                    cname:'市场',
                    default:'',
                    value:''
                },{
                    model:'input',
                    name:'scene',
                    cname:'类型',
                    default:'',
                    value:'pool'
                },{
                    model:'input',
                    name:'status',
                    cname:'状态',
                    default:'',
                    value:''
                }],
                conditions:{},
                orderList: [],//list数据
                currentPage: 1,
                pageSize:1,
                total:0,
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'详情',methods:'detail'},
                    ]
                },
                columns:[{
                    prop:"id",
                    label:"订单编号",
                },{
                    prop:"business",
                    label:"类型",
                    width:"150"
                },{
                    label:'所在市场',
                    prop:'business',
                    width:'150'
                },{
                    label:'状态',
                    prop:'status',
                },{
                    label:'备注',
                    prop:'remark',
                    width:'300'
                }, {
                    label: '变更时间',
                    width: '200',
                    formatter:(row)=>{
                        return formatDateTime(row.lastTime);
                    }
                },{
                    label:'创建时间',
                    width:'200px',
                    formatter:(row)=>{
                        return formatDateTime(row.createTime);
                    }
                }],

            }
        },
        created() {
            // let user = JSON.parse(Base64.decode(sessionStorage.getItem('users')));
            // this.token = user.token;
            this._event();
        },
        mounted(){
            this.data();
        },
        methods:{
            data() {
                let condtion = {
                    token: "Zs7s8rzG4FcdHh7\/BPohkGV0lmvXNFKkSmP\/ckFbu37b4NeUrwIQKNflfnPmcl2fBLoLq700BPK7Y5xoAFs78w16+KKldWuy7X8SnyCfqsQbCCJqNlX9UqIQ\/hqOUe0QQRO5QIcYkaQc3DXJXWL0flvfhD7NcrLyZMDCgNaVUAQ=",
                    condition:{
                        pageNum:this.currentPage ,
                        pageSize:this.pageSize
                    }
                };
                console.log(condtion);
                this.order.list(condtion,'list');
            },
            _event() {
                this.event.on('onMore', "com.lightningdog.rrq.order", "list", (event, data) => {
                    if (data) {
                        console.log(data);
                        this.orderList = data;
                        this.total = data.length;
                    }
                });
            },
            handleClick(row) {
                console.log(row);
            },
            changeBackgroundColor({ row, column, rowIndex, columnIndex }) {
                if(rowIndex === 0) {
                    return 'background-color: #E2E2E2;'
                }
            },
            onConfirm(condition) {
                let condtion = {
                    token: "Zs7s8rzG4FcdHh7\/BPohkGV0lmvXNFKkSmP\/ckFbu37b4NeUrwIQKNflfnPmcl2fBLoLq700BPK7Y5xoAFs78w16+KKldWuy7X8SnyCfqsQbCCJqNlX9UqIQ\/hqOUe0QQRO5QIcYkaQc3DXJXWL0flvfhD7NcrLyZMDCgNaVUAQ=",
                    condition:{
                        pageNum:this.currentPage ,
                        pageSize:this.pageSize
                    },
                    business:condition.business,
                    nickName:condition.nickName,
                    orderId:condition.orderId,
                    phone:condition.phone,
                    scene:condition.scene,
                    status:condition.status,
                    type:condition.type
                };
                this.order.list(condtion,'list');
            },
            action(val){
                if(val.methods === 'detail'){
                    console.log('这里添加详情函数');
                    this.$router.push({ path:'/customer/Details',
                        query:{
                            orderId: Base64.encode(val.row.id),
                    }});
                }
            },
            onSearch(val){
                console.log(val);
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
                this.data();
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