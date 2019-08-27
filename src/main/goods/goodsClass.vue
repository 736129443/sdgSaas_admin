<template>
    <div class="common-content">
        <div>
            <position :positions="this.positions"/>
        </div>
        <div class="common-content-detail">
            <button-list :buttons="buttonList" @onButtonClick="onButtonClick" />
            <table-bar :tableData="goodsClassList"
                       :columns="columns"
                       :tableOption="tableOption"
                       :total="total"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @onSearch="onSearch"
                       @action="action"/>
        </div>
        <dialog-bar :editDialogShow="dialogShow" :dialogTitle="dialogTitle" @onConfirm="onEditConfirm" @onCancel="onEditCancel" >
            <el-form ref="goodsClass" :model="goodsClass" label-width="80px">
                <!--<el-form-item label="类别等级">-->
                    <!--<p>{{goodsClass.level}}</p>-->
                <!--</el-form-item>-->
                <el-form-item label="类别名称">
                    <el-input v-model="goodsClass.name" />
                </el-form-item>
                <el-form-item label="序列">
                    <el-input v-model="goodsClass.order" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="goodsClass.status" placeholder="请选择状态" >
                        <el-option label="上线" value="online"></el-option>
                        <el-option label="下线" value="offline"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </dialog-bar>
    </div>
</template>

<script>

    import Position from '../common/position.vue';
    import ButtonList from '../common/buttonList.vue';
    import TableBar from '../common/tableBar.vue';
    import DialogBar from "../common/dialogBar.vue";

    export default {
        components:{
            DialogBar,
            Position,
            ButtonList,
            TableBar
        },
        data() {
            return {
                dialogShow:false,
                dialogTitle:'创建商品类别',
                goodsClass:{
                    name:'',
                    level:'1',
                    parent:'',
                    order:'',
                    status:'online'
                },
                currentPage: 1,
                pageSize:1,
                total:0,
                positions:Window.getCurrentLocation("6-2"),
                buttonList:[{
                    text:'新增',
                    method:'new'
                }, {
                    text:'上线',
                    method:'online'
                }, {
                    text:'下线',
                    method:'offline'
                }],
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'增加',methods:'new'},
                        {text:'编辑',methods:'edit'},
                        {text:'删除',methods:'delete'}
                    ]
                },
                columns:[{
                    type:'selection',
                    width:'50'
                },{
                    label:'分类ID',
                    prop:'id',
                    width:'200'
                },{
                    label:'类别名称',
                    prop:'name'
                },{
                    label:'分级',
                    prop:'level'
                }, {
                    label:'父类别',
                    prop:'parent',
                    width:'200px'
                },{
                    label:'序列',
                    prop:'order',
                    width:'200px'
                },{
                    label:'状态',
                    prop:'status',
                    width:'200px'
                },{
                    label:'变更时间',
                    prop:'lastTime',
                    width:'200px'
                },{
                    label:'发布时间',
                    prop:'createTime',
                    width:'200px'
                }],
                goodsClassList:[{
                    id:'GC_22222222222222',
                    name:'生鲜水果',
                    level:'1',
                    parent:'',
                    order:'01',
                    status:'下线',
                    lastTime:'2019-8-11',
                    createTime:'2019-8-11',
                }]
            }
        },
        methods:{
            action(val){
                if(val.methods === 'edit'){
                    // console.log(val)
                    console.log('这里添加详情函数')
                }
                if(val.methods === 'delete'){
                    // console.log(val)
                    console.log('这里添加删除函数')
                }
                if(val.methods === 'new'){
                    // console.log(val)
                    this.dialogShow = true;
                    console.log('这里添加删除函数')
                }
            },
            onSearch(val){
                console.log(val)
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
            },
            onButtonClick(method){
                console.log(method)
                this.dialogShow = true;
                switch (method) {
                    case 'new':
                        this.dialogShow = true;
                        break;
                }
            },
            onEditConfirm(val){//点击确定
                this.dialogShow = false;
            },
            onEditCancel(val) {//点击取消
                this.dialogShow = false;
            }
        }
    }
</script>

<style scoped>

</style>