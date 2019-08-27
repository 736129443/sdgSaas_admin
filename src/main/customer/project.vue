<template>
    <!---->
    <div class="common-content">
        <div>
            <position :positions="this.positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions" :add="true"/>
        </div>
        <div class="common-content-detail">
            <table-bar :tableData="projects"
                       :columns="columns"
                       :tableOption="tableOption"
                       :total="total"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @onSearch="onSearch"
                       @action="action"/>
        </div>
        <div>
            <dialog-bar :footShow="false" :editDialogShow="dialogShow" :dialogTitle="dialogTitle" @onConfirm="onEditConfirm" @onCancel="onEditCancel" >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="项目编号" prop="id">
                                <el-input v-model.trim="ruleForm.id" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="项目名称" prop="name">
                                <el-input v-model.trim="ruleForm.name" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="项目类型" prop="type">
                                <el-select v-model="ruleForm.type" placeholder="请选择项目类型" :disabled="disabled">
                                    <el-option label="标准项目" value="Standard"></el-option>
                                    <el-option label="临时项目" value="Interim"></el-option>
                                    <el-option label="背靠背项目" value="BackToBack"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="10">
                            <el-form-item label="用户ID" prop="userId">
                                <el-input v-model.trim="ruleForm.userId" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="用户姓名" prop="userName">
                                <el-input v-model.trim="ruleForm.userName" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="客户ID" prop="customerId">
                                <el-input v-model.trim="ruleForm.customerId" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="客户名称" prop="customerName">
                                <el-input v-model.trim="ruleForm.customerName" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="组织ID" prop="organizationId">
                                <el-input v-model.trim="ruleForm.organizationId" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="组织名称" prop="organizationName">
                                <el-input v-model.trim="ruleForm.organizationName" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="负责人编号" prop="responsibleNo">
                                <el-input v-model.trim="ruleForm.responsibleNo" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="负责人昵称" prop="responsibleNickname">
                                <el-input v-model.trim="ruleForm.responsibleNickname" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="订单数" prop="orderNum">
                                <el-input v-model.trim="ruleForm.orderNum" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="联系人方式" prop="contact">
                                <el-input v-model.trim="ruleForm.contact" @change="datas" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="项目状态" prop="status">
                                <el-select v-model="ruleForm.status" placeholder="请选择项目状态" :disabled="disabled">
                                    <el-option label="正常" value="Normal"></el-option>
                                    <el-option label="冻结" value="Freeze"></el-option>
                                    <el-option label="已删除" value="Deleted"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item v-if="show">
                        <el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
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
    import DialogBar from '../common/dialogBar.vue';
    require('../../assets/module/order.js');
    let com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};
    export default {
        data() {
            return {
                disabled:true,
                show:false,
                ruleForm: {
                    id:'',//项目编号
                    name:'',//项目名称
                    type:'',//项目类型
                    userId:'', //用户id
                    userName:'',//用户姓名
                    customerId:'',//客户id,
                    customerName:'',// 客户名称
                    organizationId:'', //组织id
                    organizationName:'',// 组织名称
                    responsibleNo:'',//负责人编号
                    responsibleNickname:'',//负责人昵称
                    orderNum:'',//订单数
                    contact: '',//联系人方式
                    status:'',// 项目状态  Normal-正常 Freeze-冻结 Deleted-已删除
                },
                orderList:[],
                rules: {
                    id:[
                        { required: true, message: '请输入项目编号', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\(|\)|（|）){2,50}$/,  message: '客户名称不合规，仅能包含简体中文、英文字母，长度2-50字符 ', trigger: 'blur' }
                    ],
                    name:[
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\(|\)|（|）){2,50}$/,  message: '客户名称不合规，仅能包含简体中文、英文字母，长度2-50字符 ', trigger: 'blur' }
                    ],
                    type:[
                        { required: true, message: '请选择活项目类型', trigger: 'change' }
                    ],
                    userId:[
                        { required: true, message: '请输入用户id', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    userName:[
                        { required: true, message: '请输入用户姓名', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\(|\)|（|）){2,50}$/,  message: '客户名称不合规，仅能包含简体中文、英文字母，长度2-50字符 ', trigger: 'blur' }
                    ],
                    customerId:[
                        { required: true, message: '请输入客户id', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    customerName:[
                        { required: true, message: '请填写客户名称', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    organizationId:[
                        { required: true, message: '请输入组织id', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    organizationName:[
                        { required: true, message: '请填写组织名称', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\(|\)|（|）){2,50}$/,  message: '组织名称不合规，仅能包含简体中文、英文字母，长度2-50字符 ', trigger: 'blur' }
                    ],
                    responsibleNo:[
                        { required: true, message: '请填写负责人编号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    responsibleNickname:[
                        { required: true, message: '请填写负责人昵称', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\(|\)|（|）){2,50}$/,  message: '负责人昵称不合规，仅能包含简体中文、英文字母，长度2-50字符 ', trigger: 'blur' }
                    ],
                    orderNum:[
                        { required: true, message: '订单数格式不正确', trigger: 'blur' },
                        {pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,  message: '请输入数字,小数点保留两位小数', trigger: 'blur' }
                    ],
                    contact: [
                        { required: true, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    status:[
                        { required: true, message: '请选择活项目状态', trigger: 'change' }
                    ]
                },
                dialogShow:false,
                dialogTitle:'',
                token:'bsGUlBtOAFyGKYJtSOGOzc+JbVHyqIiA1Wtj6ljdd5C40PdSoY8wMqufd8/qlxQUXewpw7UzUzBtWEmw+fouVj/Ecq1tWAereQfwl+fZXLkS+QbjKIJBhd60z/zAdcj5BaOKzi03RbdwhDxkHD8mJGvkp3lqPEqEKiuil+ALyxA=',
                order: com.lightningdog.rrq.order,
                event: com.lightningdog.rrq.event,
                currentPage: 1,
                pageSize:10,
                total:0,
                positions:Window.getCurrentLocation("2-2"),
                selectors:[{
                    model:'input',
                    name:'id',
                    cname:'项目编号',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                },{
                    model:'input',
                    name:'name',
                    cname:'项目名称',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                },{
                    cname:'项目类型',
                    name:'types',
                    model:'select',
                    default:'请选择项目类型',
                    dataArr:[
                        {
                            label:'临时',
                            value:'Interim'
                        },
                        {
                            label:'标准',
                            value:'Standard'
                        },{
                            label:'背靠背',
                            value:'BackToBack'
                        }
                    ]
                },{
                    model:'input',
                    name:'contact',
                    cname:'联系方式',
                    default:'150xxxx3111',
                    value:'150xxxx3111'
                }],
                conditions:{},
                tableOption:{
                    width:'200',
                    label:'操作',
                    buttons:[
                        {text:'详情',methods:'detail'},
                        {text:'标书',methods:'detail'},
                        {text:'投标',methods:'detail'},
                        {text:'删除',methods:'delete'}
                    ]
                },
                columns:[{
                    label:'项目编号',
                    prop:'id',
                    width:'200'
                },{
                    label:'项目名称',
                    prop:'name',
                    width:'120'
                },{
                    label:'项目类型',
                    prop:'type',
                    width:'150'
                },{
                    label:'责任人编号',
                    prop:'responsibleNo',
                    width:'200'
                },{
                    label:'责任人昵称',
                    prop:'responsibleNickname',
                    width:'150'
                },{
                    label:'联系方式',
                    prop:'contact',
                    width:'150'
                },{
                    label:'订单数',
                    prop:'orderNum',
                    width:'150'
                },{
                    label:'项目状态',
                    prop:'status',
                    width:'150'
                }, {
                    label:'创建时间',
                    prop:'createTime',
                    width:'200px'
                }],
                projects:[{
                    id:'PRJ_22222222222222',
                    name:'海速商贸',
                    type:'标准项目',
                    userId:'UE_22222222222',
                    nickName:'rongzhigang',
                    phone:'',
                    orderCount:'',
                    status:'正常',
                    createTime:'2019-8-11',
                }],
                formName:[],
            }
        },
        created() {
            this._event('project_list');

        },
        mounted() {
            this.data();
        },
        methods:{
            datas() {//通过电话查看用户信息
                if (!this.ruleForm.contact == ''){
                    console.log(this.ruleForm.contact);
                    let condtion = {
                        phone:this.ruleForm.contact,
                        // token:"bsGUlBtOAFyGKYJtSOGOzc+JbVHyqIiA1Wtj6ljdd5C40PdSoY8wMqufd8/qlxQUXewpw7UzUzBtWEmw+fouVj/Ecq1tWAereQfwl+fZXLkS+QbjKIJBhd60z/zAdcj5BaOKzi03RbdwhDxkHD8mJGvkp3lqPEqEKiuil+ALyxA=",
                    };
                    this.order.phone(condtion,'phone');
                    this._event("phone");
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let page = {
                            token:"bsGUlBtOAFyGKYJtSOGOzc+JbVHyqIiA1Wtj6ljdd5C40PdSoY8wMqufd8/qlxQUXewpw7UzUzBtWEmw+fouVj/Ecq1tWAereQfwl+fZXLkS+QbjKIJBhd60z/zAdcj5BaOKzi03RbdwhDxkHD8mJGvkp3lqPEqEKiuil+ALyxA=",
                            display:{
                                name: this.ruleForm.name, //必输
                                type: this.ruleForm.type, //必输
                                responsibleNo: this.ruleForm.responsibleNo,//必输
                                responsibleNickname: this.ruleForm.responsibleNickname,//必输
                                contact: this.ruleForm.contact,//必输
                                status: this.ruleForm.status,//必输
                                orderNum: this.ruleForm.orderNum,
                                userId: this.ruleForm.userId,
                                organizationId: this.ruleForm.organizationId,
                                customerId: this.ruleForm.customerId
                            }
                        };
                        this.order.list(page,'project_add');
                        this._event('15384546814')
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            onEditCancel(val){
                console.log(val);
                this.dialogShow = false;
            },
            onEditConfirm(val){
                console.log(val);
            },
            data() {
                let condtion = {
                    token: "bsGUlBtOAFyGKYJtSOGOzc+JbVHyqIiA1Wtj6ljdd5C40PdSoY8wMqufd8/qlxQUXewpw7UzUzBtWEmw+fouVj/Ecq1tWAereQfwl+fZXLkS+QbjKIJBhd60z/zAdcj5BaOKzi03RbdwhDxkHD8mJGvkp3lqPEqEKiuil+ALyxA=",
                    display:{
                        pageNum:this.currentPage,
                        pageSize:this.pageSize
                    }
                };
                this.condtion = condtion;
                console.log(condtion);
                this.order.list(condtion,'project_list');
            },
            _event(Interface) {
                this.event.on('onMore',"com.lightningdog.rrq.order", Interface, (event, data) => {
                    console.log(data);
                    if (Interface == 'project_list') {
                        if (data) {
                            this.projects = data.rows;
                            this.total = data.total;
                        }
                    }
                    if (Interface == 'project_delete') {
                        this.$message({
                            showClose: true,
                            message: '删除项目成功！',
                            type: 'success'
                        })
                    }
                    if (Interface == "project_detail") {
                        this.ruleForm = data;
                    }
                    if (Interface == 'phone') {
                        this.ruleForm = data;
                        console.log(data);
                    }
                    if (Interface == "project_add") {
                        if (data) {
                            this.$message({
                                showClose: true,
                                message: '新增项目成功！',
                                type: 'success'
                            })
                        }
                    }
                });
            },
            info(id) {//详情接口
                let condtion = {
                    token: this.token,
                    id:id,
                };
                console.log(condtion);
                this.order.detail(condtion,"project_detail");
                this._event("project_detail");
            },
            action(val){
                if(val.methods === 'detail'){
                    console.log(val);
                    this.disabled = true;
                    this.dialogShow = true;
                    this.show = false;
                    this.dialogTitle = '查看详情';
                    let id = val.row.id;
                    this.info(id);
                    this.resetForm('ruleForm');
                }
                if(val.methods === 'delete'){
                    // console.log(val)
                    console.log('这里添加删除函数');
                    let page = {
                        token:"bsGUlBtOAFyGKYJtSOGOzc+JbVHyqIiA1Wtj6ljdd5C40PdSoY8wMqufd8/qlxQUXewpw7UzUzBtWEmw+fouVj/Ecq1tWAereQfwl+fZXLkS+QbjKIJBhd60z/zAdcj5BaOKzi03RbdwhDxkHD8mJGvkp3lqPEqEKiuil+ALyxA=",
                        id:val.row.id,
                    };
                    this.order.delete(page,'project_delete',this.condtion);
                    this._event('project_delete');
                    this._event('project_list');
                }
            },
            onConfirm (conditions){
                if (conditions.type == 'add'){//新增加项目
                    this.dialogTitle = '新增项目';
                    this.show = true;
                    this.disabled = false;
                    this.dialogShow = true;
                    this.ruleForm = {};
                }
                if (conditions.type == 'search') {//查询
                    let condtion = {
                        token: this.token,
                        display:{
                            pageNum:this.currentPage,
                            pageSize:this.pageSize,
                            name:conditions.name,//项目名称
                            type:conditions.types,//项目类型
                            contact:conditions.contact,//联系方式
                            // "responsibleNo":"NO_001",//责任人编号
                            // "responsibleNickname":"闪电狗科技公司",//责任人昵称
                            // "projectState":"Normal",//项目状态  Normal-正常 Freeze-冻结
                            // "orderNum":100//订单数
                        }
                    };
                    this.order.list(condtion,'project_list');
                    this._event('project_list');
                }
                console.log(conditions);
            },
            onSearch(val){//分页
                console.log(val);
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
            }
        },
        components:{
            Position,
            SearchBar,
            TableBar,
            DialogBar
        }
    }
</script>

<style scoped lang="scss">
    .el-form-item {
        margin-bottom: 30px;
    }
</style>