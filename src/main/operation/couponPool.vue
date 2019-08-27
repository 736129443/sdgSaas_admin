<template>
    <div class="couponPool">
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <button-list :buttons="buttonList"  @onButtonClick="onButtonClick"/>
            <table-bar :tableData="tableData" :columns="columns" :total="total" @onSearch="onSearch" :currentPage="currentPage" :pageSize="pageSize" @action="action" :tableOption="tableOption"></table-bar>
        </div>
    </div>
</template>

<script>
    import Position from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import ButtonList from "../common/buttonList.vue";
    import {formatDateTime} from '../../assets/js/date.js';

    export default {
        components:{
            ButtonList,
            Position,
            SearchBar,
            TableBar,
        },
        data() {
            return {
                positions:Window.getCurrentLocation("4-3"),
                buttonList:[{
                    text:'新增券池',
                    method:'new'
                }],
                conditions:{},
                selectors:[
                    {
                        cname:'发行时间',
                        name:'date',
                        model:'date',
                        type:'daterange'
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
                    }
                ],
                tableData: [{
                    id:'OD_123456789',
                    name:'新用户注册',
                    type:'抵扣券',
                    price:'10元,20元,30元,8折',
                    total:'1000',
                    exchangeNum:'500',
                    surplusNum:'500',
                    grantTime:1564974880000
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
                    label:'金额/折扣',
                    prop:'price',
                },{
                    label:'总数量',
                    prop:'total',
                },{
                    label:'已兑换数量',
                    prop:'exchangeNum',
                },{
                    label:'剩余数量',
                    prop:'surplusNum',
                },{
                    label:'发放时间',
                    prop:'grantTime',
                    formatter:(row)=>{
                        return formatDateTime(row.grantTime);
                    }
                }],
                tableOption:{
                    width:'150',
                        label:'操作',
                        buttons:[
                        {text:'上线',methods:'online'},
                        {text:'下线',methods:'Offline'},
                        {text:'编辑',methods:'edit'}
                    ]
                },
                currentPage: 1,
                pageSize:1,
                total:0
            }
        },
        methods:{
            action(val){
                if(val.methods === 'online'){
                    console.log('上线逻辑');
                }
                if(val.methods === 'Offline'){
                    console.log('下线逻辑');
                }
                if(val.methods === 'edit'){
                    console.log('编辑逻辑');
                }
            },
            onSearch(val){
                console.log(val)
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
            },
            onConfirm(condition) {
                console.log(condition);
            },
            onButtonClick(method) {
                if(method === 'new') {
                    this.$router.push('/operation/coupon_pool_new');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .couponPool{

    }
</style>