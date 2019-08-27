<template>
    <!--评价管理-->
    <div class="valuationOrder">
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <table-bar :tableData="tableData" :columns="columns" :total="total"  :currentPage="currentPage" :pageSize="pageSize" @onSearch="onSearch"/>
        </div>
    </div>
</template>

<script>
import Position from  '../common/position.vue';
import SearchBar from '../common/searchbar.vue';
import TableBar from '../common/tableBar.vue';
import {formatDateTime} from '../../assets/js/date.js';
require("../../assets/module/complaint.js");
var com = Window.com || {};
com.lightningdog = com.lightningdog || {};
com.lightningdog.rrq = com.lightningdog.rrq || {};
export default {
    name: "valuationOrder.vue",
    components:{
        Position,
        SearchBar,
        TableBar
    },
    data(){
        return {
            token: "Zs7s8rzG4FcdHh7\/BPohkGV0lmvXNFKkSmP\/ckFbu37b4NeUrwIQKNflfnPmcl2fBLoLq700BPK7Y5xoAFs78w16+KKldWuy7X8SnyCfqsQbCCJqNlX9UqIQ\/hqOUe0QQRO5QIcYkaQc3DXJXWL0flvfhD7NcrLyZMDCgNaVUAQ=",
            complaint : com.lightningdog.rrq.complaint,
            event: com.lightningdog.rrq.event,
            positions: Window.getCurrentLocation("4-8"),
            conditions: {},
            currentPage: 1,
            pageSize:10,
            total:0,
            tableOption:{},
            selectors: [
                {
                    cname: '订单号',
                    name: 'toId',
                    model: 'input',
                    default: '请填写订单号'
                }
            ],
            tableData: [],//评价管理列表
            columns: [{
                label: '编号',
                prop: 'id',
                method: true
            }, {
                label: '客户编号',
                prop: 'userId',

            },{
                label: '订单号',
                prop: 'toId',

            }, {
                label: '评分',
                prop: 'score',
            }, {
                label: '评价内容',
                prop: 'content',
            }, {
                label: '评价时间',
                prop: 'createTime',
                formatter: (row) => {
                    return formatDateTime(row.createTime);
                }
            }],

        }
    },
    created() {
        this._event('list');
    },
    mounted() {
        this.data();
    },
    methods:{
        data() {
            let condtion = {
                token: "XlAYJ8DhBLKFgm43hp3pa7P5bFmZwIXmRq2ZVJvy8XpE/iCKEWnxIGuI205y+GdfKbhDcnBnh441DW5OidPDCzKi10aFNlWSZGx0unqtHhrSakeGOu8VcHqHTBfRN9hObQNgMQuwoyZJWZBfH3myWE0YIvuF0jMORyP4wHyFtOA=",
                pageNum:this.currentPage,
                pageSize:this.pageSize,
            };
            this.complaint.evaluation_list(condtion,'list');
        },
        _event(Interface) {
            this.event.on('onMore', "com.lightningdog.rrq.complaint", Interface, (event, data) => {
                console.log(data);
                if (Interface == 'list'){
                    if (data){
                        this.tableData = data.list;
                        this.total = data.total;
                    }
                }
            })
        },
        onSearch(val){//分页
            console.log(val);
            this.pageSize = val.pageSize;
            this.currentPage = val.currentPage;
            this.data();
            this._event('list');
        },
        onConfirm(condition) {//查询
            console.log(condition);
            let condtion = {
                token: "XlAYJ8DhBLKFgm43hp3pa7P5bFmZwIXmRq2ZVJvy8XpE/iCKEWnxIGuI205y+GdfKbhDcnBnh441DW5OidPDCzKi10aFNlWSZGx0unqtHhrSakeGOu8VcHqHTBfRN9hObQNgMQuwoyZJWZBfH3myWE0YIvuF0jMORyP4wHyFtOA=",
                pageNum:this.currentPage,
                pageSize:this.pageSize,
                toId:condition.toId,
            };
            this.complaint.evaluation_list(condtion,'list');
            this._event('list');
        }
    }
}
</script>

<style scoped lang="scss">
    .valuationOrder{

    }
</style>