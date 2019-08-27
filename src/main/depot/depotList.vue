<template>
    <div class="common-content">
        <div>
            <position :positions="this.positions"/>
            <search-bar :selectors="selectors" @onConfirm="this.onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <button-list :buttons="buttonList" @onButtonClick="btn"/>
            <table-bar :tableData="goodsList"
                       :columns="columns"
                       :tableOption="tableOption"
                       :total="total"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @onSearch="onSearch"
                       @action="action"/>
            <dialog-bar :footShow="false" :editDialogShow="dialogShow" :dialogTitle="dialogTitle" @onCancel="onEditCancel">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                    <el-row>
                        <p>详细信息</p>
                        <el-col :span="8">
                            <el-form-item label="仓库名称" prop="depotName">
                                <el-input v-model.trim="ruleForm.depotName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="具体地址" prop="address">
                                <el-cascader
                                    v-model = "ruleForm.address"
                                    :options="options"
                                    change-on-select
                                    @change="areaChanges"
                                ></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="起租面积" prop="startRentArea">
                                <el-input v-model.trim="ruleForm.startRentArea" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="可租面积" prop="rentAvailableArea">
                                <el-input v-model.trim="ruleForm.rentAvailableArea" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="总面积" prop="totalArea">
                                <el-input v-model.trim="ruleForm.totalArea" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="租金" prop="rentPrice">
                                <el-input v-model.trim="ruleForm.rentPrice" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="付费方式" prop="payway">
                                <el-input v-model.trim="ruleForm.payway" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="发票" prop="invoice">
                                <el-input v-model.trim="ruleForm.invoice" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人" prop="contractor">
                                <el-input v-model.trim="ruleForm.contractor" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系电话" prop="contractorPhone">
                                <el-input v-model.trim="ruleForm.contractorPhone" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <p>基本信息</p>
                        <el-col :span="8">
                            <el-form-item label="仓库主干宽度" prop="depotWidth">
                                <el-input v-model.trim="ruleForm.depotWidth" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="卸货平台" prop="unloadPlatform">
                                <el-input v-model.trim="ruleForm.unloadPlatform"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="建筑结构" prop="buildingStructure">
                                <el-input v-model.trim="ruleForm.buildingStructure"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="地坪" prop="terrace">
                                <el-input v-model.trim="ruleForm.terrace"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" style="position: relative;">
                            <el-form-item label="库高" prop="depotHeight">
                                <el-input v-model.trim="ruleForm.depotHeight"></el-input>
                                <span style="position: absolute;top:0;right:0;color:#409EFF;">m</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" style="position: relative;">
                            <el-form-item label="层高" prop="flowHeight">
                                <el-input v-model.trim="ruleForm.flowHeight"></el-input>
                                <span style="position: absolute;top:0;right:0;color:#409EFF;">m</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8"style="position: relative;">
                            <el-form-item label="底层称重" prop="bearing">
                                <el-input v-model.trim="ruleForm.bearing"></el-input>
                                <span style="position: absolute;top:0;right:0;color:#409EFF;">t/m²</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" style="position: relative;">
                            <el-form-item label="二次称重" prop="bearingTwice">
                                <el-input v-model.trim="ruleForm.bearingTwice"></el-input>
                                <span style="position: absolute;top:0;right:0;color:#409EFF;">t/m²</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <p>园区信息</p>
                        <el-col :span="8">
                            <el-form-item label="园区出入口" prop="entrypointNum">
                                <el-input v-model.trim="ruleForm.entrypointNum" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="路面" prop="pavement">
                                <el-input v-model.trim="ruleForm.pavement"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <p>安防系统</p>
                        <el-col :span="8">
                            <el-form-item label="消防设备" prop="facilities">
                                <el-input v-model.trim="ruleForm.facilities"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="安防系统" prop="security">
                                <el-input v-model.trim="ruleForm.security"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </dialog-bar>
        </div>
    </div>
</template>

<script>
    import Position from '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import ButtonList from '../common/buttonList.vue';
    import DialogBar from '../common/dialogBar.vue';
    import {formatDateTime} from '../../assets/js/date.js';
    import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
    import "../../assets/json/citys.js";
    require('../../assets/module/depot.js');
    let com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};
    export default {
        data() {
            return {
                province:'',//省
                city:'',//市
                region:'',//区
                dialogTitle:'',
                options:[],
                depot: com.lightningdog.rrq.depot,
                event: com.lightningdog.rrq.event,
                token:'Zs7s8rzG4FcdHh7/BPohkGV0lmvXNFKkSmP/ckFbu37b4NeUrwIQKNflfnPmcl2fBLoLq700BPK7Y5xoAFs78w16+KKldWuy7X8SnyCfqsQbCCJqNlX9UqIQ/hqOUe0QQRO5QIcYkaQc3DXJXWL0flvfhD7NcrLyZMDCgNaVUAQ=',
                currentPage:1,
                pageSize:10,
                total:0,
                dialogShow:false,
                dialogTitle:'',
                ruleForm:{
                    buildingStructure:'',//建筑结构
                    depotWidth:'',//仓库主干宽
                    unloadPlatform:'',//卸货平台
                    terrace:'',//地坪
                    depotHeight:'',//库高
                    flowHeight:'',//层高
                    bearing:'',//底层称重
                    bearingTwice:'',//二次称重
                    security:'',//安防系统
                    pavement:'',//路面
                    entrypointNum:'',//入口
                    facilities:'',//消防设备
                    depotName:'',//仓库名称
                    address:'',//具体位置
                    startRentArea:'',//起租面积
                    rentAvailableArea:'',//可租面积
                    totalArea:'',//总面积
                    rentPrice:'',//租金
                    payway:'',//付费方式
                    invoice:'',//发票
                    contractor:'',//联系人
                    contractorPhone:'',//联系电话
                },
                rules:{
                    depotName:[//仓库名称
                        { required: true, message: '请输入仓库名称', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    address:[//详细地址
                        { required: true, message: '请选择详细地址', trigger: 'change' },
                    ],
                    startRentArea:[//起租面积
                        { required: true, message: '请输入起租面积', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){4}))?$/,  message: '请规范输入格式且保留4位小数', trigger: 'blur' }
                    ],
                    rentAvailableArea:[//可租面积
                        { required: true, message: '请输入可租面积', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){4}))?$/,  message: '请规范输入格式且保留4位小数', trigger: 'blur' }
                    ],
                    totalArea:[//总面积
                        { required: true, message: '请输入总面积', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){4}))?$/,  message: '请规范输入格式且保留4位小数', trigger: 'blur' }
                    ],
                    rentPrice:[//租金
                        { required: true, message: '请输入租金', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){4}))?$/,  message: '请规范输入格式且保留4位小数', trigger: 'blur' }
                    ],
                    payway:[//付费方式
                        { required: true, message: '请输付费方式', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    invoice:[//发票
                        { required: true, message: '请输发票', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    contractor:[//联系人
                        { required: true, message: '请输联系人', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    contractorPhone:[//联系电话
                        { required: true, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    depotWidth:[//仓库主干宽度
                        { required: true, message: '请输入仓库主干宽度', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '请规范输入格式', trigger: 'blur' }
                    ],
                    unloadPlatform:[//卸货平台
                        { required: true, message: '请输入卸货平台', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '请规范输入格式', trigger: 'blur' }
                    ],
                    buildingStructure:[//建筑结构
                        { required: true, message: '请输入建筑结构', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    terrace:[//地坪
                        { required: true, message: '请输入地坪', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    depotHeight:[//库高
                        { required: true, message: '请输入库高', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '请规范输入格式', trigger: 'blur' }
                    ],
                    flowHeight:[//层高
                        { required: true, message: '请输入层高', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '请规范输入格式', trigger: 'blur' }
                    ],
                    bearing:[//称重
                        { required: true, message: '请输入称重', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '请规范输入格式', trigger: 'blur' }
                    ],
                    bearingTwice:[//底层称重
                        { required: true, message: '请输入底层称重', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '请规范输入格式', trigger: 'blur' }
                    ],
                    pavement:[//路面
                        { required: true, message: '请输入路面', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    entrypointNum:[//园区入口
                        { required: true, message: '请输入园区入口', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '请规范输入格式', trigger: 'blur' }
                    ],
                    facilities:[//消防设备
                        { required: true, message: '请输消防设备', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    security:[//安防系统
                        { required: true, message: '请输安防系统', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ]
                },
                positions:Window.getCurrentLocation("6-1"),
                buttonList:[{
                    text:'新增仓库',
                    method:'new'
                },{
                    text:'批量上传',
                    method:'import'
                },{
                    text:'上线',
                    method:'online'
                },{
                    text:'下线',
                    method:'online'
                }],
                selectors:[{
                    model:'input',
                    name:'id',
                    cname:'仓库编号',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'name',
                    cname:'仓库名称',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'address',
                    cname:'仓库地址',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'area',
                    cname:'区域',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'type',
                    cname:'类型',
                    default:'',
                    value:''
                }],
                conditions:{},
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'编辑',methods:'detail'},
                        {text:'上线',methods:'online'},
                        {text:'下线',methods:'offline'}
                    ]
                },
                columns:[{
                    type:'selection',
                    width:'50'
                },{
                    label:'仓库编号',
                    prop:'depotId',
                    width:'200'
                },{
                    label:'仓库名称',
                    prop:'depotName'
                },{
                    label:'仓库类型',
                    prop:'depotType'
                },{
                    label:'仓库区域',
                    prop:'',
                    width:'150'
                },{
                    label:'仓库地址',
                    prop:'address',
                    width:'200'
                },{
                    label:'可租面积',
                    prop:'rentAvailableArea',
                    width:'150'
                },{
                    label:'起租面积',
                    prop:'startRentArea',
                    width:'150'
                },{
                    label:'责任人',
                    prop:'contractor',
                    width:'150'
                },{
                    label:'状态',
                    prop:'status',
                    width:'150'
                }, {
                    label:'发布时间',
                    prop:'createTime',
                    width:'200px',
                    formatter:(row)=>{
                        return formatDateTime(row.createTime);
                    }
                }],
                goodsList:[]//列表数据
            }
        },
        created() {
            this.event.on("onMore", "com.lightningdog.rrq.depot", "list", (event, data)=>{
                console.log(data);
                this.goodsList = data.rows;
                this.total = data.total;
                for (var i in data.rows){
                    this.goodsList[i].depotName = data.rows[i].details.depotName;
                }
            });
        },
        mounted() {
            this.$http.get("/citys").then(res=>{
                console.log(res.data.arr);
                this.options = res.data.arr;
            });
            this.data();
        },
        methods:{
            areaChanges(val){
                // console.log(CodeToText[val[0]],CodeToText[val[1]],CodeToText[val[2]],val);
                // CodeToText[val[2]];
                this.province = CodeToText[val[0]];
                this.city = CodeToText[val[1]];
                this.region = CodeToText[val[2]];
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let page = {
                            token:this.token,
                            depotDetails:{
                                buildingStructure: this.ruleForm.buildingStructure,//建筑结构
                                depotWidth: this.ruleForm.depotWidth,//仓库主干宽
                                unloadPlatform: this.ruleForm.unloadPlatform,//卸货平台
                                terrace: this.ruleForm.terrace,//地坪
                                depotHeight: this.ruleForm.depotHeight,//库高
                                flowHeight: this.ruleForm.flowHeight,//层高
                                bearing: this.ruleForm.bearing,//底层称重
                                bearingTwice: this.ruleForm.bearingTwice,//二次称重
                            },
                            depotPark:{
                                facilities: this.ruleForm.facilities,//消防设备
                                security: this.ruleForm.security,//安防系统
                                pavement: this.ruleForm.pavement,//路面
                                entrypointNum: this.ruleForm.entrypointNum,//入口
                            },
                            depotRent:{
                                depotName: this.ruleForm.depotName,//仓库名称
                                // address:'',//具体位置
                                province: this.province,//省
                                city: this.city,//市
                                region: this.region,//区
                                startRentArea: this.ruleForm.startRentArea,//起租面积
                                rentAvailableArea: this.ruleForm.rentAvailableArea,//可租面积
                                totalArea: this.ruleForm.totalArea,//总面积
                                rentPrice: this.ruleForm.rentPrice,//租金
                                payway: this.ruleForm.payway,//付费方式
                                invoice: this.ruleForm.invoice,//发票
                                contractor: this.ruleForm.contractor,//联系人
                                contractorPhone: this.ruleForm.contractorPhone,//联系电话
                            }
                        };
                        this.depot.publish(page);
                        this.event.on("onCreate", "com.lightningdog.rrq.depot", "detail", (event, data)=>{
                            console.log(data);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            data() {
                let condtion = {
                    token: this.token,
                    condition:{
                        pageNum:this.currentPage,
                        pageSize:this.pageSize
                    }
                };
                console.log(condtion);
                this.depot.list(condtion);
            },
            onConfirm (condition){
                console.log(condition);
            },
            onEditCancel(val){
                console.log(val);
                this.dialogShow = false;
            },
            btn(val) {
                console.log(val);
                if (val == 'new') {
                    this.resetForm('ruleForm');
                    this.dialogShow = true;
                    let page = {
                        buildingStructure:this.ruleForm.buildingStructure,//建筑结构
                        depotWidth:this.ruleForm.depotWidth,//仓库主干宽
                        unloadPlatform:this.ruleForm.unloadPlatform,//卸货平台
                        terrace:this.ruleForm.terrace,//地坪
                        depotHeight:this.ruleForm.depotHeight,//库高
                        flowHeight:this.ruleForm.flowHeight,//层高
                        bearing:this.ruleForm.bearing,//底层称重
                        bearingTwice:this.ruleForm.bearingTwice,//二次称重
                        security:this.ruleForm.security,//安防系统
                        pavement:this.ruleForm.pavement,//路面
                        entrypointNum:this.ruleForm.entrypointNum,//入口
                        facilities:this.ruleForm.facilities,//消防设备
                        depotName:this.ruleForm.depotName,//仓库名称
                        // address:'',//具体位置
                        province:this.province,//省
                        city:this.city,//市
                        region:this.region,//区
                        startRentArea:this.ruleForm.startRentArea,//起租面积
                        rentAvailableArea:this.ruleForm.rentAvailableArea,//可租面积
                        totalArea:this.ruleForm.totalArea,//总面积
                        rentPrice:this.ruleForm.rentPrice,//租金
                        payway:this.ruleForm.payway,//付费方式
                        invoice:this.ruleForm.invoice,//发票
                        contractor:this.ruleForm.contractor,//联系人
                        contractorPhone:this.ruleForm.contractorPhone,//联系电话
                    };

                }
            },
            action(val){
                if(val.methods === 'detail'){
                    console.log(val);
                    console.log('这里添加编辑函数');
                    this.dialogTitle = '编辑';
                    this.dialogShow=true;
                    let condtion = {
                        token:this.token,
                        condition:{
                            depotId:val.row.depotId,
                        }
                    };
                    this.depot.detail(condtion);
                    this.event.on("onDetail", "com.lightningdog.rrq.depot", "detail", (event, data)=>{
                        console.log(data);

                        var obj = {};
                        for (var i in data){
                            this.details = data[i].details;
                            this.depotPark = data[i].details.depotPark;
                            obj = Object.assign(data[i],this.details,this.depotPark)
                        }
                        this.ruleForm = obj
                    });
                }
                if(val.methods === 'online'){
                    console.log(val);
                    console.log('这里添加上线函数');

                    this.$confirm('此操作将提交 上线 表中该条信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let condtion = {
                            token:this.token,
                            id:val.row.id,
                            "status":"online"
                        };
                        this.depot.online(condtion);
                        this.event.on("online", "com.lightningdog.rrq.depot", "online", (event, data)=>{
                            console.log(data);
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消保存'
                        });
                    })
                }
                if (val.methods === 'offline') {
                    console.log(val);
                    console.log('这里添加下线函数')
                    this.$confirm('此操作将提交 下线 表中该条信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let condtion = {
                            token:this.token,
                            id:val.row.id,
                            "status":"offline"
                        };
                        this.depot.online(condtion);
                        this.event.on("online", "com.lightningdog.rrq.depot", "online", (event, data)=>{
                            console.log(data);
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消保存'
                        });
                    })
                }
            },
            onSearch(val){
                console.log(val);
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
            },
            onCurrentChange(val){
                console.log('当前页：'+val)
            },
            onSizeChange(val){
                console.log('页码：'+val)
            },
            onButtonClick(method){
                console.log(method);
                switch (method) {
                    case 'new':
                        break;
                    case 'offline':
                        break;
                    case 'online':
                        break;
                }
            }
        },
        components:{
            Position,
            SearchBar,
            TableBar,
            ButtonList,
            DialogBar
        }
    }
</script>

<style scoped lang="scss">

</style>