<template>
    <div>
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%; overflow:auto">
                <el-tab-pane label="销项" name="sales">
                    <table-bar :tableData="inputInvoices"
                               :columns="columns"
                               :tableOption="invoiceOption"
                               :total="total"
                               :currentPage="currentPage"
                               :pageSize="pageSize"
                               @onSearch="onSearch"
                               @action="action"/>
                </el-tab-pane>
                <el-tab-pane label="进项" name="income">
                    <table-bar index="output-invoice" :tableData="outputs"
                               :columns="columns"
                               :tableOption="invoiceOption"
                               :total="total"
                               :currentPage="currentPage"
                               :pageSize="pageSize"
                               @onSearch="onSearch"
                               @action="action"/>
                </el-tab-pane>
            </el-tabs>
        </div>

        <dialog-bar :editDialogShow="dialogShow" :dialogTitle="dialogTitle" @onConfirm="onEditConfirm('invoiceRecord')" @onCancel="onEditCancel('invoiceRecord')" dialogWidth="60%">
            <div>
                <el-form ref="invoiceRecord" :model="invoiceRecord" :rules="rules" label-width="180px" class="demo-ruleForm">
                    <el-form-item label="编号" prop="id">
                        <p>{{invoiceRecord.id}}</p>
                    </el-form-item>
                    <el-form-item label="类型" class="fl w50" prop="from">
                        <p>{{invoiceRecord.from}}</p>
                    </el-form-item>
                    <el-form-item label="关联编号" class="fl w50" prop="fromId">
                        <p>{{invoiceRecord.fromId}}</p>
                    </el-form-item>
                    <el-row>
                            <el-form-item label="发票号码" prop="invoiceId" >
                                <el-input v-model="invoiceRecord.invoiceId" style="width:272px" disabled></el-input>
                            </el-form-item>
                        <el-col :span="10">
                            <el-form-item label="服务项目" prop="content" >
                                <el-input v-model="invoiceRecord.content" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="费用" prop="price">
                                <el-input v-model="invoiceRecord.price" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="税率" prop="taxRate">
                                <el-input v-model="invoiceRecord.taxRate" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="税额" prop="tax">
                                <el-input v-model="invoiceRecord.price*invoiceRecord.taxRate" disabled ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="购买方"  prop="buyer">
                                <el-input v-model="invoiceRecord.buyer" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="购买方纳税人识别号"  prop="buyerId">
                                <el-input v-model="invoiceRecord.buyerId" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="销售方"  prop="seller">
                                <el-input v-model="invoiceRecord.seller" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="销售方纳税人识别号"  prop="sellerId">
                                <el-input v-model="invoiceRecord.sellerId" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="发票照片">
                        <upload-bar :limit="limit" @getPicList="getPicLists" :drag="true" >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </upload-bar>
                        <el-button type="primary" @click="upload_image">确认上传</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </dialog-bar>
        <dialog-bar :editDialogShow="dialogShows" :dialogTitle="dialogTitles" @onConfirm="onEditConfirms" @onCancel="onEditCancels" dialogWidth="60%">
            <div>
                <el-form  :model="seeForm"  label-width="180px">
                    <el-row>
                        <el-form-item label="编号" prop="id">
                            <p>{{id}}</p>
                        </el-form-item>
                        <el-form-item label="类型" class="fl w50" prop="from">
                            <p>{{from}}</p>
                        </el-form-item>
                        <el-form-item label="关联编号" class="fl w50" prop="fromId">
                            <p>{{fromId}}</p>
                        </el-form-item>
                        <el-form-item label="发票号码" prop="invoiceId" >
                            <el-input v-model="seeForm.invoiceId" style="width:272px" disabled></el-input>
                        </el-form-item>
                        <el-col :span="10">
                            <el-form-item label="服务项目" prop="content" >
                                <el-input v-model="seeForm.content" disabled ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="费用" prop="price">
                                <el-input v-model="seeForm.price" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="税率" prop="taxRate">
                                <el-input v-model="seeForm.taxRate" disabled ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="税额" prop="tax">
                                <el-input v-model="seeForm.price*seeForm.taxRate" disabled ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="购买方"  prop="buyer">
                                <el-input v-model="seeForm.buyer" disabled ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="购买方纳税人识别号"  prop="buyerId">
                                <el-input v-model="seeForm.buyerId" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="销售方"  prop="seller">
                                <el-input v-model="seeForm.seller" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="销售方纳税人识别号"  prop="sellerId">
                                <el-input v-model="seeForm.sellerId" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="发票照片" prop="fileName">
                        <p>{{fileName}}</p>
                        <el-button type="primary" size="mini" @click="handle">查看</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </dialog-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    let vm = new Vue();
    import Position from '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import DialogBar       from "../common/dialogBar.vue";
    import {formatDateTime} from '../../assets/js/date.js';
    import {computTimeHorizon} from '../../assets/js/dates.js';

    import uploadBar from "../common/uploadBar.vue";

    require("../../assets/module/finance.js");
    var com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};



    export default {
        components: {
            DialogBar,
            Position,
            SearchBar,
            TableBar,
            uploadBar
        },
        data() {
            return {
                id:'',
                from:'',
                fromId:'',
                // fileName:'',
                url:com.baseURL,
                orderList:[],
                Url:'',
                limit:6,
                finance: com.lightningdog.rrq.finance,
                event: com.lightningdog.rrq.event,
                token:"XlAYJ8DhBLKFgm43hp3pa7P5bFmZwIXmRq2ZVJvy8XpE/iCKEWnxIGuI205y+GdfKbhDcnBnh441DW5OidPDCzKi10aFNlWSZGx0unqtHhrSakeGOu8VcHqHTBfRN9hObQNgMQuwoyZJWZBfH3myWE0YIvuF0jMORyP4wHyFtOA=",
                activeName: 'sales',
                positions:Window.getCurrentLocation("8-8"),
                dialogShow: false,
                dialogShows: false,
                dialogTitle:'票务登记',
                dialogTitles:'查看',
                operateType:'sales',
                currentPage: 1,
                pageSize: 1,
                total: 0,
                seeForm:{},
                selectors:[
                    {
                        cname:'统计方式',
                        name:'active',
                        model:'select',
                        default:'请选择',
                        dataArr:[
                            {
                                label:'周',
                                value:'1'
                            },
                            {
                                label:'月',
                                value:'2'
                            },
                            {
                                label:'季度',
                                value:'3'
                            },
                            {
                                label:'年',
                                value:'4'
                            }
                        ]
                    },
                    {
                        cname:'日期',
                        name:'date',
                        model:'date',
                        default:'请选择',
                    },
                    {
                        cname:'状态',
                        name:'states',
                        model:'select',
                        default:'请选择',
                        dataArr:[
                            {
                                label:'recode',
                                value:'recode'
                            },
                            {
                                label:'waiting',
                                value:'waiting'
                            },
                        ]
                    },
                ],
                conditions:{},
                invoiceOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'登记',methods:'record'},
                        {text:'查看',methods:'check'}
                    ]
                },
                columns:[{
                    label:'编号',
                    prop:'id',
                    width:'200'
                },{
                    label:'类型',
                    prop:'from',
                    width:'150'
                },{
                    label:'关联项编号',
                    prop:'fromId',
                    width:'200'
                },{
                    label:'服务项',
                    prop:'content',
                    width:'200'
                },{
                    label:'责任人',
                    prop:'userId',
                    width:'200'
                },{
                    label:'发票号码',
                    prop:'invoiceId',
                    width:'200'
                },{
                    label:'金额',
                    prop:'price',
                    width:'200'
                },{
                    label:'税率',
                    prop:'taxRate',
                    width:'200'
                },{
                    label:'税额',
                    prop:'tax',
                    width:'200'
                },{
                    label:'状态',
                    prop:'status',
                    width:'150'
                },{
                    label:'操作人',
                    prop:'operatorId',
                    width:'200'
                },{
                    label:'登记日期',
                    prop:'lastTime',
                    width:'200px',
                    formatter:(row)=>{
                        return formatDateTime(row.lastTime);
                    }
                },{
                    label:'创建日期',
                    prop:'createTime',
                    width:'200px',
                    formatter:(row)=>{
                        return formatDateTime(row.createTime);
                    }
                }],
                inputInvoices:[],
                outputs:[],
                invoiceRecord:{
                    id:'',//编号
                    from:'',//类型
                    fromId:'',//关联项编号
                    content:'',//服务项
                    userId:'',//责任人
                    invoiceId:'',//发票号
                    price:'',//金额
                    taxRate:'',//税率
                    tax:'',//税额
                    buyer:'',//购买方
                    buyerId:'',//购买方纳税人识别号
                    seller:'',//销售方
                    sellerId:'',//销售方纳税人识别号
                },
                rules:{
                    content:[
                        { required: true, message: '请输入服务项目', trigger: 'blur' },
                    ],
                    taxRate:[
                        {required: true, message: '请输入税率', trigger: 'blur' },
                    ],
                    buyer:[
                        {required: true, message: '请输入购买方', trigger: 'blur' },
                    ],
                    buyerId:[
                        {required: true, message: '请输入购买方纳税人识别号', trigger: 'blur' },
                    ],
                    seller:[
                        {required: true, message: '请输入销售方', trigger: 'blur' },
                    ],
                    sellerId:[
                        {required: true, message: '请输入销售方纳税人识别号', trigger: 'blur' },
                    ]
                },
                fileName:'',//图片路径
                seeForm:{
                    id:'',//编号
                    from:'',//类型
                    fromId:'',//关联项编号
                    content:'',//服务项
                    userId:'',//责任人
                    invoiceId:'',//发票号
                    price:'',//费用
                    taxRate:'',//税率
                    tax:'',//税额
                    buyer:'',//购买方
                    buyerId:'',//购买方纳税人识别号
                    seller:'',//销售方
                    sellerId:'',//销售方纳税人识别号
                },
                fileArray:[],
                page:{}
            };
        },
        created(){
            this.data();
            this._event('invoice');
        },
        methods: {
            getPicLists(val){
                console.log(val);
                this.fileArray = val;
            },
            data(){
                let page = {
                    token: this.token,
                    condition: {
                        pageNum: this.currentPage,
                        pageSize: this.pageSize,
                        option:this.operateType,
                    }
                };
                this.page = page;
                console.log(page);
                this.finance.list(page,'invoice');
            },
            _event(info) {
                this.event.on('onMore', "com.lightningdog.rrq.finance", info, (event, data) => {
                    if (info == 'invoice') {
                        if (data) {
                            // console.log(data);
                            this.inputInvoices = data.list;
                            this.outputs=data.list;
                            this.total = this.inputInvoices.length;
                        }
                    };
                    if(info == 'invoiceOne'){
                       if(data){
                           console.log(data)
                           for(var k in data){
                               this.orderList.push(data[k])
                           }
                           console.log(this.orderList);
                           // this.seeForm=this.orderList[0];
                           console.log(this.orderList[1].from);
                           this.id = this.orderList[1].id;
                           this.from = this.orderList[1].from;
                           this.fromId = this.orderList[1].fromId;
                           this.seeForm.fileName=this.orderList[0].fileName
                       }
                    }
                    // if (info == 'record') {
                    //     // console.log(data);
                    //     console.log('123123');
                    // }
                });
            },
            handleClick(tab, event) {//控制销项或者进项
                this.operateType = tab.name;
                // console.log(this.operateType)
            },
            action(val){
                var _this = this;
                if(val.methods === 'check'){//点击查看
                    console.log(val)
                    console.log('查看');
                    this.dialogShows = true;
                    this.seeForm=val.row;
                    let page={
                        id:val.row.id,
                    };
                    this.finance.invoiceOne(page,'invoiceOne');
                    this._event('invoiceOne');
                }
                if(val.methods === 'record'){//点击登记
                    // console.log(val)
                    this.dialogShow = true;
                    console.log('登记');
                    this.invoiceRecord = val.row;
                }
            },
            onSearch(val){
                console.log(val);
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
            },
            onConfirm(condition) {//点击是查询或者导出按钮
                if(condition.type === "search" ){
                    console.log(condition.date);
                    var timeHorizon = computTimeHorizon(condition.date, condition.active);
                    // console.log(timeHorizon.startTime + "接口入参 startTime");
                    // console.log(timeHorizon.endTime + "接口入参 endTime");
                    let condtion={
                            pageNum: this.currentPage,
                            pageSize: this.pageSize,
                            option:this.operateType,
                            status:condition.states,
                            startTime:timeHorizon.startTime,
                            endTime:timeHorizon.endTime
                    };

                    this.finance.list(condtion,'invoice');
                    this._event('invoice');

                }
                console.log(condition);
            },
            //上传图片
            upload_image(){
                let formdata = new FormData();
                for (let i = 0; i <  this.fileArray.length; i++) {
                    formdata.append('file',this.fileArray[i].raw);
                }
                formdata.append('module', "invoice");
                formdata.append('token', this.token);
                // for (var value of formdata.values()) {
                //     console.log(value);
                // }
                // console.log(formdata.get('module'));
                console.log(formdata.get('file'));
                this.$http.post(this.url+ ':8027/invoice/upload', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                    }
                }).then((res) => {
                    // console.log(res);
                    // console.log(res.body.result);
                    this.Url= res.body.result;
                    if (res.body.errcode == 0) {

                    }
                })
            },
            onEditConfirm(formName){//点击确定
                // this.dialogShow = false;
                console.log(this.Url);
                if (this.Url == ''){
                    vm.$message({
                        showClose: true,
                        message: '请上传发票照片！',
                        type: 'error'
                    });
                    return
                }
                this.$refs[formName].validate(valid=>{
                    if(valid){
                        let page={
                            token:this.token,
                            id:this.invoiceRecord.id,
                            invoice:{
                                content:this.invoiceRecord.content,
                                // price:this.invoiceRecord.price,
                                taxRate:parseFloat(this.invoiceRecord.taxRate),
                                tax:this.invoiceRecord.price*this.invoiceRecord.taxRate,
                                seller:this.invoiceRecord.seller,
                                buyer:this.invoiceRecord.buyer,
                                sellerTaxNumber:this.invoiceRecord.sellerId,
                                buyerTaxNumber:this.invoiceRecord.buyerId,
                                fileName:this.Url
                            }
                        };
                        this.finance.records(page,this.page);
                        this._event('record');
                        this.dialogShow=false;
                        this._event('invoice');
                    }
                })

            },
            handle(){//点击查看图片按钮
                console.log(this.seeForm.fileName)
                let url = this.seeForm.fileName;
                window.open(url);
            },
            onEditCancel(formName) {//点击取消
                this.dialogShow = false;
                this.$refs[formName].resetFields();
            },
            onEditConfirms(val){//查看确定按钮
                this.dialogShows=false;
            },
            onEditCancels(val) {//查看取消按钮
                this.dialogShows=false;

            }
        }
    }
</script>

<style scoped>
#box{
    width: 300px;
    height: 200px;
    border :1px dashed #ccc;
}
</style>