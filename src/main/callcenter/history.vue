<template>
    <div class="common-content">
        <div>
            <position :positions="this.positions"/>
            <search-bar :selectors="selectors"  :needValidator.sync="needValidator" :rules="rules" @validateRes="validateRes" @onInputChange="onInputChange" @onConfirm="onConfirm" :buttons="buttons" :conditions="conditions"/>
        </div>

        <div class="common-content-detail">
            <table-bar :tableData="calls"
                       :columns="columns"
                       :tableOption="tableOption"
                       :total="total"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @onSearch="onSearch"
                       @action="action"/>
        </div>
        <el-dialog
                title="音频播放"
                :visible.sync="centerDialogVisible"
                width="30%"
                @close="closeDialog"
                center>
            <audio ref="audio" style="width:100%;" controls> </audio>
        </el-dialog>
    </div>
</template>

<script>
    import Position from '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import {formatDateTime} from '../../assets/js/date.js';
    import TableBar from '../common/tableBar.vue';
    require("../../assets/module/callcenter.js");
    let com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};
    export default {
        data() {
            return {
                centerDialogVisible:false,
                global:com.lightningdog.rrq.global,
                event:com.lightningdog.rrq.event,
                callcenter:com.lightningdog.rrq.callcenter,
                positions:Window.getCurrentLocation("7"),
                needValidator:false, //开启验证
                rules: {
                    callerId: [
                        {
                            pattern: /^[\u4e00-\u9fa5\w]*$/g, //可以写正则表达式
                            message: "主叫编号格式不正确",
                            trigger: "change"
                        }
                    ],
                    caller: [
                        {
                            pattern: /^1[34578]\d{9}$/, //可以写正则表达式
                            message: "请输入正确的手机号码",
                            trigger: "change"
                        }
                    ],
                    calleeId: [
                        {
                        pattern:  /^[\u4e00-\u9fa5\w]*$/g, //可以写正则表达式
                        message: "被叫编号格式不正确",
                        trigger: "change"
                        }
                    ],
                    callee: [
                        {
                            pattern: /^1[34578]\d{9}$/, //可以写正则表达式
                            message: "请输入正确的手机号码",
                            trigger: "change"
                        }
                    ]
                },
                buttons:[{
                    text:"搜索",
                    method:"search"
                }],
                selectors:[{
                    model:'input',
                    name:'callerId',
                    cname:'主叫编号',
                    default:'请输入主叫编号',
                    value:'150xxxx3111'
                },
                {
                    model:'input',
                    name:'caller',
                    cname:'主叫号码',
                    default:'请输入主叫号码',
                    value:'150xxxx3111'
                },
                {
                    model:'input',
                    name:'calleeId',
                    cname:'被叫编号',
                    default:'请输入被叫编号',
                    value:'150xxxx3111'
                },
                {
                    model:'input',
                    name:'callee',
                    cname:'被叫号码',
                    default:'请输入被叫号码',
                    value:'150xxxx3111'
                } ],
                conditions:{},
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {text:'播放',methods:'audioPlay'}
                    ],
                    custom:true,
                    disabled:true
                },
                columns:[{
                    label:'编号',
                    prop:'sessionId',
                    width:'200'
                },{
                    label:'主叫编号',
                    prop:'callerId',
                    width:'220'
                },{
                    label:'主叫号',
                    prop:'caller',
                    width:'150',
                    formatter:(row)=>{
                        return this.substringPhone(row.caller);
                    }
                },{
                    label:'主叫昵称',
                    prop:'callerNickName',
                    width:'150'
                },{
                    label:'被叫编号',
                    prop:'calleeId',
                    width:'220'
                },{
                    label:'被叫号',
                    prop:'callee',
                    width:'150',
                    formatter:(row)=>{
                        return this.substringPhone(row.callee);
                    }
                },{
                    label:'被叫昵称',
                    prop:'calleeNickName',
                    width:'150'
                },{
                    label:'隐私号',
                    prop:'privateNum',
                    width:'150',
                    formatter:(row)=>{
                        return this.substringPhone(row.bindNum);
                    }
                },{
                    label:'绑定方式',
                    prop:'mode',
                    width:'150'

                },{
                    label:'发起时间',
                    prop:'callInTime',
                    width:'180',
                    formatter:(row)=>{
                        return formatDateTime(Number(row.callInTime))
                    },
                },{
                    label:'结束时间',
                    prop:'callEndTime',
                    width:'180',
                    formatter:(row)=>{
                        return formatDateTime(Number(row.callInTime))
                    }
                },
                {
                    label:'通话时长(分钟)',
                    label:'通话时长(分钟)',
                    prop:'callTime',
                    width:'180'
                },
                {
                    label:'话费(元)',
                    prop:'price',
                    width:'180'
                }
                ],
                calls:[],
                total:0,
                pageSize:10,
                currentPage:1
            }
        },
        mounted(){
            this._event();
            this._list();
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
            substringPhone(phone){
                if (phone==null||phone==undefined||phone=='') return;
                if(phone.charAt(0)=="+"&&phone.charAt(1)=="8"&&phone.charAt(2)=="6"){
                    return phone.substring(3);
                }
            },
            _list(val={}) {
                console.log(val);
                let condition = {
                    // token: this.global.token,
                    pageNum:this.currentPage ,
                    pageSize:this.pageSize,
                    callerId:val.callerId?val.callerId:undefined,   //主叫编号
                    calleeId:val.calleeId?val.calleeId:undefined,   //被叫编号
                    caller:val.caller?val.caller:undefined, //主叫号码
                    callee:val.callee?val.callee:undefined  //被叫号码
                };
                this.callcenter.list(condition);
            },
            _event() {
                this.event.on('onCallList', "com.lightningdog.rrq.list", "list", (event, data) => {
                    if (data) {
                        console.log(data);
                        this.calls=data.list;
                        this.total=data.total;
                    }
                });
                this.event.on('onDownloadUrl', "com.lightningdog.rrq.downloadUrl", "file", (event, data) => {
                    if(data){
                        this.centerDialogVisible=true;
                        setTimeout(() => {
                            this.audioPlay(this.$refs.audio,data);
                        },0)
                    }
                });
            },
            audioPlay(element,url){
                if (element){
                    element.src=url;
                    element.autoplay=true;
                    element.load();
                }
            },
            closeDialog(){
                this.$refs.audio.pause();
            },
            onConfirm (condition){
                if(condition.type==="search"){
                    this.conditions=condition;
                    this.needValidator = true;
                }
            },
            action(val){
                if(val.methods === 'audioPlay'){
                    let condition={ name:val.row.recordObjectName};
                    this.callcenter.download(condition);
                }
            },
            onSearch(val){
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
                this._list(this.conditions);
            },
            onCurrentChange(val){
                console.log('当前页：'+val)
            },
            onSizeChange(val){
                console.log('页码：'+val)
            }
        },
        components:{
            Position,
            SearchBar,
            TableBar
        }
    }
</script>

<style scoped>
</style>