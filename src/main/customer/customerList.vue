<template>
    <!--客户档案-->
    <div class="common-content">
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <table-bar :tableData="customers"
                       :columns="columns"
                       :tableOption="tableOption"
                       :total="total"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @onSearch="onSearch"
                       @action="action" />
        </div>
        <div>
            <dialog-bar :footShow="false" :editDialogShow="dialogShow" :dialogTitle="dialogTitle">
            </dialog-bar>
        </div>
    </div>
</template>

<script>
    import Position from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import DialogBar from '../common/dialogBar.vue';
    import {formatDateTime} from '../../assets/js/date.js';
    require('../../assets/module/organization.js');
    let com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};
    export default {
        data(){
            return {
                dialogShow:false,
                dialogTitle:'详情',
                arr:[],
                Array:[],
                token:'',
                organization: com.lightningdog.rrq.organization,
                event: com.lightningdog.rrq.event,
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'查看',methods:'detail'},
                        {text:'删除',methods:'delete'}
                    ]
                },
                currentPage: 1,
                pageSize:10,
                total:0,
                conditions:{},
                selectors:[
                    {
                        cname:'用户编号',
                        name:'userId',
                        model:'input',
                        default:'请填写用户编号'
                    },
                    {
                        cname:'昵称',
                        name:'nickName',
                        model:'input',
                        default:'请填写昵称'
                    },
                    {
                        cname:'电话',
                        name:'phone',
                        model:'input',
                        default:'请填写电话'
                    },
                    {
                        cname:'邀请人',
                        name:'inviter',
                        model:'input',
                        default:'请填写邀请人'
                    }
                ],
                positions:Window.getCurrentLocation("2-1"),
                customers: [],//列表数据
                columns:[{
                    label:'用户编号',
                    prop:'invitedUserId',
                    width:'200'
                },{
                    label:'昵称',
                    prop:'invitedNickName',
                    width:'150'
                },{
                    label:'电话',
                    prop:'phone',
                    width:'150'
                },{
                    label:'注册时间',
                    prop:'createTime',
                    formatter:(row)=>{
                        return formatDateTime(row.createTime);
                    }
                },{
                    label:'注册方式',
                    prop:'regiestWay',
                    width:'150'
                },{
                    label:'角色',
                    prop:'userType',
                    width:'150',
                    formatter: row => {
                        if (row.userType == 'endCustomer') return "终端客户";
                        if (row.userType == 'customer') return "客户";
                    }
                },{
                    label:'邀请人',
                    prop:'inviteUserName',

                }]
            }
        },
        created() {
            this._event('customerList');
        },
        mounted(){
            this.data();
        },
        methods:{
            onEditCancel(val){
                console.log(val);
                this.dialogShow = false;
            },
            data() {
                let condtion = {
                    token: "roDWDXIeZ3tb2nfsZ8tRXsix+eTklo6bploZnd2Re+CfHmQm9XqOSUuFubjw6yE8OdZjTX2DoQhhfD4+1S6SXSulh1+SgXkNOUruhDClLcZMbJdrkuB2w+zXcH7lkeuAHJugiOvnc2giaSxKFyDv2RzvULxgh57NodPdPdU54BI",
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                };
                console.log(condtion);
                this.organization.customerList(condtion,'customerList');
            },
            _event(Interface) {
                console.log(Interface);
                this.event.on('customerList', "com.lightningdog.rrq.organization", Interface, (event, data) => {
                    if (Interface == 'customerList'){
                        this.arr = [];
                        if (data) {
                            for (var i in data) {
                                this.arr.push(eval("(" + data[i] + ")"));
                            }
                            console.log(this.arr);
                            this.customers = this.arr;
                            this.total = this.arr.length;
                        }
                    }
                    if (Interface == 'partnerExit') {
                        this.$message({
                            showClose: true,
                            message: '删除成功！',
                            type: 'success'
                        });
                    }
                    if (Interface == "detail") {
                        if (data) {
                            this.Array.push(eval("(" + data + ")"));
                            console.log(this.Array);
                        }
                    }
                });
            },
            action(val){
                if(val.methods === 'detail'){//详情
                    // console.log(val)
                    console.log('这里添加详情函数');
                    // this.dialogShow = true;
                    let condtion = {
                        token:"roDWDXIeZ3tb2nfsZ8tRXsix+eTklo6bploZnd2Re+CfHmQm9XqOSUuFubjw6yE8OdZjTX2DoQhhfD4+1S6SXSulh1+SgXkNOUruhDClLcZMbJdrkuB2w+zXcH7lkeuAHJugiOvnc2giaSxKFyDv2RzvULxgh57NodPdPdU54BI",
                        userId:val.row.invitedUserId,
                    };
                    this.organization.customerList(condtion,'detail');
                    this._event('detail');
                }
                if(val.methods === 'delete'){//删除
                    console.log(val);
                    console.log('这里添加删除函数');
                    let condtion = {
                        token:"roDWDXIeZ3tb2nfsZ8tRXsix+eTklo6bploZnd2Re+CfHmQm9XqOSUuFubjw6yE8OdZjTX2DoQhhfD4+1S6SXSulh1+SgXkNOUruhDClLcZMbJdrkuB2w+zXcH7lkeuAHJugiOvnc2giaSxKFyDv2RzvULxgh57NodPdPdU54BI",
                        userId:val.row.invitedUserId,
                    };
                    this.organization.list(condtion,'partnerExit');
                    this._event('partnerExit');
                    setTimeout(()=>{
                        this.data();
                        this._event('list');
                    },1000)
                }
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
                let condtion ={
                    token: "roDWDXIeZ3tb2nfsZ8tRXsix+eTklo6bploZnd2Re+CfHmQm9XqOSUuFubjw6yE8OdZjTX2DoQhhfD4+1S6SXSulh1+SgXkNOUruhDClLcZMbJdrkuB2w+zXcH7lkeuAHJugiOvnc2giaSxKFyDv2RzvULxgh57NodPdPdU54BI",
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    userId:condition.userId,     //-- 用户编号
                    nickName:condition.nickName,                     //-- 昵称
                    phone:condition.phone,                 //-- 电话号码
                    inviator:condition.inviter,                    //-- 邀请人
                }
                this.organization.list(condtion,'list');
                this._event('list');
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
<style lang="scss" scoped>

</style>