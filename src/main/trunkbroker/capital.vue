<template>
    <div class="common-content">
        <div>
            <position :positions="this.positions"/>
            <search-bar :selectors="selectors" :needValidator.sync="needValidator" :rules="rules" @validateRes="validateRes" @onConfirm="onConfirm" @onInputChange="onInputChange" :buttons="buttons" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <table-bar :tableData="capitals"
                       :columns="columns"
                       :tableOption="tableOption"
                       :total="total"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @onSearch="onSearch"
                       @onSelectionChange="onSelectionChange"
                       @action="action"/>
        </div>
    </div>
</template>
<script>
    import Position     from  '../common/position.vue';
    import SearchBar    from '../common/searchbar.vue';
    import moment       from 'moment';
    import TableBar from '../common/tableBar.vue';
    require("../../assets/module/trunk.js");
    let com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};
    export default {
        name: "capital",
        data() {
            return {
                global:com.lightningdog.rrq.global,
                event:com.lightningdog.rrq.event,
                trunk:com.lightningdog.rrq.trunk,
                positions:Window.getCurrentLocation("9-2"),
                needValidator:false, //开启验证
                rules: {
                    document_number: [
                        {
                            pattern: /^[\u4e00-\u9fa5\w]*$/g, //可以写正则表达式
                            message: "单证号格式不正确",
                            trigger: "change"
                        }
                    ],
                    shippingNoteNumber: [
                        {
                            pattern: /^[\u4e00-\u9fa5\w]*$/g, //可以写正则表达式
                            message: "托运单号格式不正确",
                            trigger: "change"
                        }
                    ],
                    name_of_person: [
                        {
                            pattern:  /^[\u4e00-\u9fa5\w]*$/g, //可以写正则表达式
                            message: "承运人格式不正确",
                            trigger: "change"
                        }
                    ],
                    vehicle_number: [
                        {
                            pattern: /^[\u4e00-\u9fa5\w]*$/g, //可以写正则表达式
                            message: "车牌号格式不正确",
                            trigger: "change"
                        }
                    ],
                    sequence_code: [
                        {
                            pattern: /^[\u4e00-\u9fa5\w]*$/g, //可以写正则表达式
                            message: "流水号格式不正确",
                            trigger: "change"
                        }
                    ]
                },
                buttons:[{
                    text:"搜索",
                    method:"search"
                },
                {
                    text:"上报",
                    method:"reported"
                }
                ],
                selectors:[{
                    model:'input',
                    name:'document_number',
                    cname:'单证号',
                    default:'请输入单证号',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'shippingNoteNumber',
                    cname:'托运单号',
                    default:'请输入托运单号',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'name_of_person',
                    cname:'承运人',
                    default:'请输入承运人',
                    value:'150xxxx3111'
                },{
                    model:'select',
                    name:'reportStatus',
                    cname:'上报状态',
                    dataArr:[{
                        label:'全部',
                        value:''
                    },{
                        label:'上报成功',
                        value:'success'
                    },{
                        label:'待上报',
                        value:'waiting'
                    },{
                        label:'上报失败',
                        value:'fail'
                    }],
                    default:'全部',
                    value:''
                },{
                    model:'input',
                    name:'vehicle_number',
                    cname:'车牌号',
                    default:'请输入车牌号',
                    value:''
                },{
                    model:'input',
                    name:'sequence_code',
                    cname:'流水号',
                    default:'请输入流水号',
                    value:''
                }],
                conditions:{},
                capitals:[],
                columns:[{
                    width:'60',
                    type:"selection"
                },{
                    label:'单证号',
                    prop:'documentNumber',
                    width:'200'
                },{
                    label:'承运人',
                    prop:'carrier',
                    width:'220'
                },{
                    label:'车辆牌照号',
                    prop:'vehicleNumber',
                    width:'150'
                },{
                    label:'牌照类型',
                    prop:'licensePlateTypeName',
                    width:'200'
                },{
                    label:'托运单号',
                    prop:'shippingNoteNumber',
                    width:'150'
                },{
                    label:'付款方式',
                    prop:'paymentMeansName',
                    width:'150'
                },{
                    label:'转账银行',
                    prop:'bankName',
                    width:'150'
                },{
                    label:'流水号/序列号',
                    prop:'sequenceCode',
                    width:'200'

                },{
                    label:'货币金额(元)',
                    prop:'monetaryAmount',
                    width:'180'
                },{
                    label:'日期时间',
                    prop:'dateTime',
                    width:'180',
                    formatter:(row)=>{
                        return moment(row.dateTime).format("YYYY-MM-DD HH:mm:ss");
                    }
                },{
                    label:'上报状态',
                    prop:'reportStatus',
                    width:'180' ,
                    formatter:(row)=>{
                        return row.reportStatus=="success"?"上报成功":row.reportStatus=="waiting"?"待上报":row.reportStatus=="fail"?"上报失败":"";
                    }
                }],
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'上报',methods:'onReport'},
                        {text:'删除',methods:'onDelete'}
                    ]
                },
                selectedArr:[],
                currentPage:1,
                pageSize:10,
                total:0
            }
        },
        mounted(){
            this._event();
            this._list();
        },
        components:{
            Position,
            SearchBar,
            TableBar
        },
        methods:{
            validateRes(val){
                if(val){
                    this._list(this.conditions);
                    return;
                }
                console.log('验证失败，不执行搜索');
            },
            onInputChange(val){
                this.conditions=val;
            },
            action(val){
                if(val.methods === 'onDelete'){

                }else if(val.methods === 'onReport'){
                    this._report([{id:val.row.id}]);
                }
            },
            onSearch(val){
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
                this.needValidator = true;
                // this._list(this.conditions);
            },
            _list(val={}) {
                let condition = {
                    token: this.global.token,
                    document_number:val.document_number?val.document_number:undefined,//单证号
                    shippingNoteNumber:val.shippingNoteNumber?val.shippingNoteNumber:undefined,//托运单号
                    name_of_person:val.name_of_person?val.name_of_person:undefined,//承运人
                    reportStatus:val.reportStatus?val.reportStatus:undefined,//上报状态
                    vehicle_number:val.vehicle_number?val.vehicle_number:undefined,//车辆牌照号
                    sequence_code:val.sequence_code?val.sequence_code:undefined,//流水号
                    pageNum:this.currentPage ,
                    pageSize:this.pageSize
                };
                this.trunk.capitalList(condition);
            },
            _report(val=[]){
                if(!val.length){
                    this.$message({
                        message: '亲， 请勾选列表选项！',
                        type: "warning"
                    });
                    return;
                }
                let condition = {
                    token:this.global.token,
                    ids:val//资金流水单id的list
                };
                this.trunk.capitalReport(condition);
            },
            _event() {
                this.event.on('onCapitalList', "com.lightningdog.rrq.list", "list", (event, data) => {
                    if (data) {
                        this.capitals=data;
                    }
                });
                this.event.on('onCapitalReport', "com.lightningdog.rrq.report", "report", (event, data) => {
                    this.$message({
                        message: '上报成功',
                        type: "success"
                    });
                });
            },
            onConfirm(condition) {
                if(condition.type==="search"){
                    this.conditions=condition;
                    this.needValidator = true;
                    return;
                }
                if(condition.type==="reported"){
                  this._report(this.filterData(this.selectedArr));
                }
            },
            filterData(arr){
                return arr.map((row,index)=>{
                    return {
                        id:row.id
                    };
                });
            },
            onSelectionChange(arr){
                this.selectedArr=arr.selectData;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>