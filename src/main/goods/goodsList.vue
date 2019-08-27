<template>
    <div class="common-content">
        <div>
            <position :positions="this.positions"/>
            <search-bar :selectors="selectors" :needValidator.sync="needValidator" :rules="rules" @validateRes="validateRes"  @onConfirm="this.onConfirm" @onInputChange="onInputChange" :conditions="conditions">
                <el-form-item label="所属区域" slot="linkage">
                    <el-cascader
                            clearable
                            v-model="areaVal"
                            :options="options"
                            @change="areaChanges"></el-cascader>
                </el-form-item>
            </search-bar>
        </div>
        <div class="common-content-detail">
            <button-list :buttons="buttonList" />
            <table-bar :tableData="goodsList"
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
    import ButtonList from '../common/buttonList.vue';
    import moment       from 'moment';
    import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
    require("../../assets/module/mall.js");
    let com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};
    export default {
        data(){
            return {
                global:com.lightningdog.rrq.global,
                event:com.lightningdog.rrq.event,
                mall:com.lightningdog.rrq.mall,
                currentPage: 1,
                pageSize:5,
                total:0,
                positions:Window.getCurrentLocation("6-1"),
                needValidator:false, //开启验证
                rules: {
                    id: [
                        {
                            pattern: /^[\u4e00-\u9fa5\w()（）]*$/g, //可以写正则表达式
                            message: "商品编号格式不正确",
                            trigger: "change"
                        }
                    ],
                    name: [
                        {
                            pattern: /^[\u4e00-\u9fa5\w()（）]*$/g, //可以写正则表达式
                            message: "商品名称格式不正确",
                            trigger: "change"
                        }
                    ]
                },
                buttonList:[{
                    text:'新增',
                    method:'new'
                },{
                    text:'上架',
                    method:'online'
                },{
                    text:'下架',
                    method:'offline'
                }],
                selectors:[{
                    model:'input',
                    name:'id',
                    cname:'商品编号',
                    default:'请输入商品编号',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'name',
                    cname:'商品名称',
                    default:'请输入商品名称',
                    value:'150xxxx3111'
                },{
                    model:'select',
                    name:'goodsStatus',
                    cname:'商品状态',
                    dataArr:[{
                        label:'全部',
                        value:''
                    },{
                        label:'已上架',
                        value:'1'
                    },{
                        label:'已下架',
                        value:'0'
                    }],
                    default:'全部',
                    value:''
                }
                    // {
                    //     model:'input',
                    //     name:'name',
                    //     cname:'区域',
                    //     default:'150xxxx3111',
                    //     value:'150xxxx3111'
                    // }
                ],
                areaVal:'',
                options:regionData,
                conditions:{},
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'编辑',methods:'detail'},
                        {text:'上架',methods:'online'},
                        {text:'下架',methods:'offline'}
                    ]
                },
                columns:[{
                    type:'selection',
                    width:'50'
                },{
                    label:'商品编号',
                    prop:'id',
                    width:'220'
                },{
                    label:'商品名称',
                    width:'200',
                    prop:'name'
                },{
                    label:'商品分类',
                    prop:'type',
                    width:'150'
                },{
                    label:'供货区域',
                    prop:'district',
                    width:'150'
                },{
                    label:'供货地址',
                    prop:'address',
                    width:'200'
                },{
                    label:'打包方式',
                    prop:'packageWay',
                    width:'150'
                },{
                    label:'批发价格(元)',
                    prop:'price',
                    width:'150'
                },{
                    label:'所在市场',
                    prop:'market',
                    width:'150'
                },{
                    label:'状态',
                    prop:'verifyStatus',
                    width:'150',
                    formatter:(row)=>{
                        return row.verifyStatus=="0"?"未审核":row.verifyStatus=="1"?"已审核":row.verifyStatus=="2"?"审核未通过":"";
                    }
                }, {
                    label:'发布时间',
                    prop:'createTime',
                    width:'200px',
                    formatter:(row)=>{
                        return moment(row.createTime).format("YYYY-MM-DD HH:mm:ss");
                    }
                }],
                goodsList:[],
                district:""
            }
        },
        mounted(){
            this._event();
            this._list();
        },
        methods:{
            validateRes(val){
                if(val){
                    this._search(this.conditions);
                    return;
                }
                console.log('验证失败，不执行搜索');
            },
            onInputChange(val){
                this.conditions=val;
            },
            onSearch(val){
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
                this.needValidator = true;
            },
            onConfirm(condition) {
                if(condition.type==="search"){
                    this.conditions=condition;
                    this.needValidator = true;
                }
            },
            areaChanges(val){
                // console.log(CodeToText[val[0]],CodeToText[val[1]],CodeToText[val[2]],val,this.areaVal);
                this.district=CodeToText[val[2]];
            },
            _event() {
                this.event.on('onMallList', "com.lightningdog.rrq.mall", "list", (event, data) => {
                    if (data) {
                        this.goodsList=data.rows;
                        this.total=data.total;
                    }
                });
                this.event.on('onMallSearch', "com.lightningdog.rrq.mall", "list", (event, data) => {
                    if (data) {
                        console.log(data);
                        this.goodsList=data.result;
                        this.total=data.total;
                    }
                });
            },
            _search(val={}) {
                let condition = {
                    id:val.id?val.id:undefined,//商品名称,
                    name:val.name?val.name:undefined,//商品名称,
                    goodsStatus:val.goodsStatus?val.goodsStatus:undefined,//商品状态,
                    district:this.district?this.district:undefined,//商品状态,
                    pageNum:this.currentPage,
                    pageSize:this.pageSize
                };
                this.mall.search(condition);
            },
            _list(val={}) {
                let condition = {
                    pageNum:this.currentPage,
                    pageSize:this.pageSize
                };
                this.mall.list(condition);
            },
            action(val){
                if(val.methods === 'detail'){

                    return;
                }
                if(val.methods === 'online'){

                    return;
                }
                if(val.methods === 'offline'){

                }
            }
        },
        components:{
            Position,
            SearchBar,
            TableBar,
            ButtonList
        }
    }
</script>

<style scoped>
</style>