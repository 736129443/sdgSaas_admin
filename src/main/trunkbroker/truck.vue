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
    import moment from 'moment'
    import Position from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    let com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};
    export default {
        name: "truck",
        data() {
            return {
                global:com.lightningdog.rrq.global,
                event:com.lightningdog.rrq.event,
                trunk:com.lightningdog.rrq.trunk,
                positions:Window.getCurrentLocation("9-1"),
                needValidator:false, //开启验证
                rules: {
                    shippingNoteNumber: [
                        {
                            pattern: /^[\u4e00-\u9fa5\w]*$/g, //可以写正则表达式
                            message: "托运单号格式不正确",
                            trigger: "change"
                        }
                    ],
                    originalDocumentNumber: [
                        {
                            pattern: /^[\u4e00-\u9fa5\w]*$/g, //可以写正则表达式
                            message: "原始单号格式不正确",
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
                    name:'shippingNoteNumber',
                    cname:'托运单号',
                    default:'请输入托运单号',
                    value:''
                },{
                    model:'input',
                    name:'originalDocumentNumber',
                    cname:'原始单号',
                    default:'请输入原始单号',
                    value:''
                },{
                    model:'input',
                    name:'name_of_person',
                    cname:'承运人',
                    default:'请输入承运人',
                    value:''
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
                    model:'select',
                    name:'business_type_code',
                    cname:'业务类型',
                    dataArr:[{
                        label:'全部',
                        value:''
                    },{
                        label:'干线普货运输',
                        value:'1002996'
                    },{
                        label:'城市配送',
                        value:'1003997'
                    },{
                        label:'农村配送',
                        value:'1003998'
                    },{
                        label:'集装箱运输',
                        value:'1002998'
                    },{
                        label:'其他',
                        value:'1003999'
                    }],
                    default:'全部',
                    value:''
                },
                {
                    model:'input',
                    name:'vehicle_number',
                    cname:'车辆牌照号',
                    default:'请输入车辆牌照号',
                    value:''
                },
                {
                    model:'select',
                    name:'vehicle_classification_code',
                    cname:'车辆分类',
                    dataArr:[{
                        label:'全部',
                        value:''
                    },{
                        label:'普通货车',
                        value:'H01'
                    },{
                        label:'厢式货车',
                        value:'H02'
                    },{
                        label:'罐式货车',
                        value:'H04'
                    },{
                        label:'牵引车',
                        value:'Q00'
                    },{
                        label:'普通挂车',
                        value:'G01'
                    },{
                        label:'罐式挂车',
                        value:'G03'
                    },{
                        label:'集装箱挂车',
                        value:'G05'
                    },{
                        label:'仓栅式货车',
                        value:'H09'
                    },{
                        label:'封闭货车',
                        value:'H03'
                    },{
                        label:'平板货车',
                        value:'H05'
                    },{
                        label:'集装箱车',
                        value:'H06'
                    },{
                        label:'自卸货车',
                        value:'H07'
                    },{
                        label:'特殊结构货车',
                        value:'H08'
                    },{
                        label:'专项作业车',
                        value:'Z00'
                    },{
                        label:'厢式挂车',
                        value:'G02'
                    },{
                        label:'仓栅式挂车',
                        value:'G07'
                    },{
                        label:'平板挂车',
                        value:'G04'
                    },{
                        label:'自卸挂车',
                        value:'G06'
                    },{
                        label:'专项作业挂车',
                        value:'G09'
                    },{
                        label:'车辆运输车',
                        value:'X91'
                    },{
                        label:'车辆运输车(单排)',
                        value:'X92'
                    }],
                    default:'全部',
                    value:''
                    }
                ],
                conditions:{},
                capitals:[],
                columns:[{
                    width:'60',
                    type:"selection"
                },{
                    label:'原始单号',
                    prop:'shippingNoteNumber',
                    width:'200'
                },{
                    label:'托运单号',
                    prop:'shippingNoteNumber',
                    width:'220'
                },{
                    label:'承运人',
                    prop:'carrier',
                    width:'150'
                },{
                    label:'托运日期时间',
                    prop:'consignmentDateTime',
                    width:'200',
                    formatter:(row)=>{
                        return moment(row.consignmentDateTime).format("YYYY-MM-DD HH:mm:ss");
                    }
                },{
                    label:'业务类型',
                    prop:'businessTypeName',
                    width:'150'
                },{
                    label:'货币总金额(元)',
                    prop:'totalMonetaryAmount',
                    width:'150'
                },{
                    label:'牌照类型代码',
                    prop:'licensePlateTypeCode',
                    width:'150'
                },{
                    label:'车辆牌照号',
                    prop:'vehicleNumber',
                    width:'200'
                },
                {
                    label:'车辆分类',
                    prop:'vehicleClassificationName',
                    width:'180'
                },
                {
                    label:'道路运输证号',
                    prop:'roadTransportCertificateNumber',
                    width:'180'
                },
                {
                    label:'货物名称',
                    prop:'descriptionOfGoods',
                    width:'180'
                },
                {
                    label:'货物分类',
                    prop:'cargoTypeClassificationName',
                    width:'180'
                },
               {
                    label:'上报时间',
                    prop:'reportTime',
                    width:'180',
                    formatter:(row)=>{
                        return moment(row.reportTime).format("YYYY-MM-DD HH:mm:ss");
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
            _list(val={}) {
                let condition = {
                    token: this.global.token,
                    originalDocumentNumber:val.originalDocumentNumber?val.originalDocumentNumber:undefined,//原始单号
                    shippingNoteNumber:val.shippingNoteNumber?val.shippingNoteNumber:undefined,//托运单号
                    name_of_person:val.name_of_person?val.name_of_person:undefined,//承运人
                    reportStatus:val.reportStatus?val.reportStatus:undefined,//上报状态
                    vehicle_number:val.vehicle_number?val.vehicle_number:undefined,//车辆牌照号
                    vehicle_classification_code:val.vehicle_classification_code?val.vehicle_classification_code:undefined,//车辆分类
                    business_type_code:val.business_type_code?val.business_type_code:undefined,//业务类型
                    pageNum:this.currentPage,
                    pageSize:this.pageSize
                };
                this.trunk.trackList(condition);
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
                this.trunk.trackReport(condition);
            },
            _event() {
                this.event.on('onTrackList', "com.lightningdog.rrq.list", "list", (event, data) => {
                    if (data) {
                        this.capitals=data;
                    }
                });
                this.event.on('onTrackReport', "com.lightningdog.rrq.report", "report", (event, data) => {
                    this.$message({
                        message: '上报成功',
                        type: "success"
                    });
                });
            },
            action(val){
                if(val.methods === 'onDelete'){

                }else if(val.methods === 'onReport'){
                    this._report([{id:val.row.id}]);
                }
            },
            onSelectionChange(arr){
                this.selectedArr=arr.selectData;
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
            onSearch(val){
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
                this.needValidator = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
