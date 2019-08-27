<template>
    <div class="rechargeCard">
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <button-list :buttons="buttonList"  @onButtonClick="onButtonClick"/>
            <table-bar :tableData="tableData" :columns="columns" :total="total" @onSearch="onSearch" :currentPage="currentPage" :pageSize="pageSize" @action="action" :tableOption="tableOption"></table-bar>
        </div>
        <dialog-bar
            :editDialogShow.sync="dialogShow"
            class="add"
            dialogTitle="添加充值卡"
            dialogWidth="50%"
            @onConfirm="onAddConfirm"
            @onCancel="onAddCancel"
        >
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="100px">
                 <el-form-item label="充值卡描述">
                  <el-input v-model="form.desc"></el-input>
                </el-form-item>
                 <el-form-item label="充值卡面值">
                  <el-input v-model="form.kindValue"></el-input>
                </el-form-item>
                <!-- <el-form-item label="充值卡ID">
                  <el-input v-model="form.name" disabled></el-input>
                </el-form-item>-->
                <!--<el-form-item label="适应区域">
                    <el-radio v-model="form.radio9" label="*">不限</el-radio>
                    <el-radio v-model="form.radio9" label="2">设置</el-radio>
                    <el-cascader
                            v-if="form.radio9==2"
                            v-model="form.useArea"
                            :options="dropoptions"
                            change-on-select
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="充值卡金额">
                    <el-input v-model="form.price" placeholder="请输入充值卡金额" @change="ondiscount_p"></el-input>
                    <span class="gold">元</span>
                </el-form-item>
                <el-form-item label="充值折扣">
                    <el-select v-model="form.discount" placeholder="请选择充值折扣" @change="ondiscount_p">
                        <el-option
                                v-for="item in discount"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">折</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price2" disabled></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-radio v-model="form.radio" label>无上限</el-radio>
                    <el-radio v-model="form.radio" label="2">设置</el-radio>
                    <el-input v-model="form.amount" v-if="form.radio==2"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="有效期">
                    <el-radio v-model="form.radio1" label="4070880000000">永久</el-radio>
                    <el-radio v-model="form.radio1" label="2">设置</el-radio>
                    <div>
                        <el-date-picker
                                v-model="form.startTime"
                                v-if="form.radio1==2"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="timestamp"
                        ></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="附加优惠">
                    <el-checkbox v-model="form.checked">抵扣券</el-checkbox>&nbsp;&nbsp;
                    <br v-if="!form.checked">
                    <el-button type="success" size="small" v-if="form.checked" @click="ondiscount">选择抵扣券</el-button>

                    <el-input
                            v-if="form.checked"
                            type="textarea"
                            :rows="4"
                            v-model="form.textarea"
                            resize="none"
                            disabled
                            style="max-height:120px"
                    ></el-input>
                    <el-checkbox v-model="form.checked0">折扣券</el-checkbox>&nbsp;&nbsp;
                    <br v-if="!form.checked0">
                    <el-button type="success" size="small" v-if="form.checked0" @click="ondiscount0">选择折扣券</el-button>
                    <el-input
                            v-if="form.checked0"
                            type="textarea"
                            :rows="4"
                            v-model="form.textarea1"
                            resize="none"
                            disabled
                            style="max-height:120px"
                    ></el-input>
                    <el-checkbox v-model="form.checked2">浮动优惠</el-checkbox>&nbsp;&nbsp;
                    <br v-if="!form.checked2">
                    <el-button type="success" size="small" v-if="form.checked2" @click="ondiscount1">选择折扣券</el-button>
                    <el-input
                            v-if="form.checked2"
                            type="textarea"
                            :rows="4"
                            v-model="form.textarea2"
                            resize="none"
                            disabled
                            style="max-height:120px"
                    ></el-input>
                    &lt;!&ndash; <el-checkbox v-model="form.checked1">会员赠送</el-checkbox>&nbsp;&nbsp;
                    <br>
                    <el-select v-model="form.region1" placeholder="请选择会员类型" v-if="form.checked1">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>&ndash;&gt;
                    &lt;!&ndash; <el-checkbox v-model="form.checked2">赠送套餐</el-checkbox>&nbsp;&nbsp; &ndash;&gt;
                </el-form-item>-->
            </el-form>
        </dialog-bar>
    </div>
</template>

<script>
    require('../../assets/module/coupon.js');
    var com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};
    import {formatDateTime} from '../../assets/js/date.js';
    import Position from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import ButtonList from "../common/buttonList.vue";
    import DialogBar from "../common/dialogBar.vue";
    export default {
        name: "rechargeCard.vue",
        components:{
            Position,
            SearchBar,
            TableBar,
            ButtonList,
            DialogBar
        },
        data() {
            return {
                coupon:com.lightningdog.rrq.coupon,
                dropoptions: [],
                options: [
                    {
                        value: "不限",
                        label: "不限"
                    },
                    {
                        value: "3",
                        label: "3天"
                    },
                    {
                        value: "5",
                        label: "5天"
                    },
                    {
                        value: "10",
                        label: "10天"
                    },
                    {
                        value: "15",
                        label: "15天"
                    },
                    {
                        value: "20",
                        label: "20天"
                    },
                    {
                        value: "30",
                        label: "一个月"
                    },
                    {
                        value: "60",
                        label: "两个月"
                    },
                    {
                        value: "90",
                        label: "三个月"
                    },
                    {
                        value: "180",
                        label: "六个月"
                    },
                    {
                        value: "365",
                        label: "一年"
                    }
                ],
                discount: [
                    {
                        value: "10",
                        label: "10"
                    },
                    {
                        value: "9.9",
                        label: "9.9"
                    },
                    {
                        value: "9.8",
                        label: "9.8"
                    },
                    {
                        value: "9.7",
                        label: "9.7"
                    },
                    {
                        value: "9.5",
                        label: "9.5"
                    },
                    {
                        value: "9",
                        label: "9"
                    },
                    {
                        value: "8.5",
                        label: "8.5"
                    },
                    {
                        value: "8",
                        label: "8"
                    }
                ],
                form: {
                    desc:'',
                    kindValue:'',
                    radio9: "*",
                    price: "",
                    discount: "",
                    price2: "",
                    radio: "",
                    amount: "",
                    useArea: "",
                    radio1: "4070880000000",
                    startTime: [],
                    checked: false,
                    checked0: false,
                    checked2: false
                },
                dialogShow:false,
                buttonList:[{
                    text:'新增充值卡',
                    method:'add'
                }],
                positions:Window.getCurrentLocation("4-1"),
                conditions:{},
                selectors:[
                    {
                        cname:'充值卡ID',
                        name:'id',
                        model:'input'
                    },
                    {
                        cname:'金额',
                        name:'kindValue',
                        model:'input'
                    },
                    {
                        cname:'提交人',
                        name:'createAdmin',
                        model:'input'
                    },
                    {
                        cname:'状态',
                        name:'status',
                        model:'select',
                        dataArr:[
                            {
                                label:'全部',
                                value:''
                            },
                            {
                                label:'有效',
                                value:'using'
                            },
                            {
                                label:'已下线',
                                value:'stop'
                            }
                        ]
                    }
                ],
                tableData: [],
                columns:[{
                    label:'充值卡ID',
                    prop:'id',
                },{
                    label:'充值卡描述',
                    prop:'desc',
                },{
                    label:'充值卡金额(元)',
                    prop:'kindValue',
                },
                //     {
                //     label:'有效期',
                //     prop:'time',
                // },{
                //     label:'折扣',
                //     prop:'preferenceContent',
                // },{
                //     label:'价格(元)',
                //     prop:'paymentPrice',
                // },{
                //     label:'提交人',
                //     prop:'createAdmin',
                // },
                    {
                    label:'提交时间',
                    prop:'createTime',
                    formatter:(row)=>{
                        return formatDateTime(row.createTime);
                    }
                },{
                    label:'数量',
                    prop:'amount',
                },{
                    label:'状态',
                    prop:'status',
                    formatter:(row)=>{
                        return row.status == 'ISSUED'?'成功':'失败';
                    }
                }],
                tableOption:{
                    width:'150',
                    label:'操作',
                    buttons:[
                        {
                          text:'上线',
                          methods:'online'
                        },
                        {
                          text:'下线',
                          methods:'Offline'
                        },
                        {
                          text:'编辑',
                          methods:'edit'
                        }
                    ]
                },
                currentPage: 1,
                pageSize:1,
                total:0
            };
        },
        created(){
            this.coupon._event.on("onAddCard", "com.lightningdog.rrq.coupon", "addCards", (event, data)=>{
                console.log(data);

            });
            this.coupon._event.on("onCardList", "com.lightningdog.rrq.coupon", "addCards", (event, data)=>{
                console.log(data);
                this.total = data.total;
                this.tableData = data.rows;
            });
        },
        mounted(){
            let obj = {
                kindValue: "",
                desc: "",
                status: "",
                userId:""
            };
            this.coupon.cardList(obj);
        },
        methods:{
            // 抵扣券请求
            ondiscount() {
                //       "parentProductId":2,  如果是编辑的时候获取优惠券需要传充值卡id
                // "type":"recharge_card:充值卡/coupon:优惠券/discountCoupons:折扣卡"
                console.log(this.Added);

                if (this.Added == 2) {
                    let page = JSON.stringify({
                        type: "coupon"
                    });
                    this.$http
                        .post(
                            "http://192.168.50.33:8080/finance/rechargeCard/getCoupon",
                            page,
                            {
                                headers: {
                                    "Content-Type": "application/json;charset=UTF-8"
                                }
                            }
                        )
                        .then(res => {
                            // console.log(res);
                            if (
                                res.data.result != [] ||
                                res.data.result != undefined ||
                                res.data.result != ""
                            ) {
                                // this.link = res.data.result;
                                this.buttonNum = 1;
                                this.dialogVisible2 = true;
                                if (this.mylink == undefined) {
                                    this.link = res.data.result;
                                } else {
                                    this.link == this.mylink;
                                }
                            }
                        });
                } else {
                    // this.uparr = []
                    this.coupon = [];
                    console.log(this.ids);

                    let page = JSON.stringify({
                        id: this.ids,
                        type: "coupon"
                    });
                    this.$http
                        .post(
                            "http://192.168.50.33:8080/finance/rechargeCard/getCoupon",
                            page,
                            {
                                headers: {
                                    "Content-Type": "application/json;charset=UTF-8"
                                }
                            }
                        )
                        .then(res => {
                            // console.log(res);
                            if (
                                res.data.result != [] ||
                                res.data.result != undefined ||
                                res.data.result != ""
                            ) {
                                // this.link = res.data.result;
                                this.buttonNum = 1;
                                this.dialogVisible2 = true;
                                if (this.mylink == undefined) {
                                    this.link = res.data.result;
                                } else {
                                    this.link = this.mylink;
                                }
                            }
                        });
                }
                // console.log(this.mylink);
            },
            // 折扣券请求
            ondiscount0() {
                this.buttonNum = 2;
                //       "parentProductId":2,  如果是编辑的时候获取优惠券需要传充值卡id
                // "type":"recharge_card:充值卡/coupon:优惠券/discountCoupons:折扣卡"
                if (this.Added == 2) {
                    let page = JSON.stringify({
                        type: "discountCoupons"
                    });
                    this.$http
                        .post(
                            "http://192.168.50.33:8080/finance/rechargeCard/getCoupon",
                            page,
                            {
                                headers: {
                                    "Content-Type": "application/json;charset=UTF-8"
                                }
                            }
                        )
                        .then(res => {
                            // console.log(res);
                            if (
                                res.data.result != [] ||
                                res.data.result != undefined ||
                                res.data.result != ""
                            ) {
                                // this.link = res.data.result;
                                this.dialogVisible2 = true;
                                if (this.mylink1 == undefined) {
                                    this.link = res.data.result;
                                } else {
                                    this.link == this.mylink1;
                                }
                            }
                        });
                } else {
                    this.discountCoupons = [];
                    let page = JSON.stringify({
                        type: "discountCoupons",
                        id: this.ids
                    });
                    this.$http
                        .post(
                            "http://192.168.50.33:8080/finance/rechargeCard/getCoupon",
                            page,
                            {
                                headers: {
                                    "Content-Type": "application/json;charset=UTF-8"
                                }
                            }
                        )
                        .then(res => {
                            // console.log(res);
                            if (
                                res.data.result != [] ||
                                res.data.result != undefined ||
                                res.data.result != ""
                            ) {
                                // this.link = res.data.result;
                                this.dialogVisible2 = true;
                                if (this.mylink1 == undefined) {
                                    this.link = res.data.result;
                                } else {
                                    this.link == this.mylink1;
                                }
                            }
                        });
                }
            },
            // 浮动优惠
            ondiscount1() {
                this.buttonNum = 3;
                //       "parentProductId":2,  如果是编辑的时候获取优惠券需要传充值卡id
                // "type":"recharge_card:充值卡/coupon:优惠券/discountCoupons:折扣卡"
                if (this.Added == 2) {
                    let page = JSON.stringify({
                        id: this.ids,
                        type: "floatingDiscount"
                    });
                    this.$http
                        .post(
                            "http://192.168.50.33:8080/finance/rechargeCard/getCoupon",
                            page,
                            {
                                headers: {
                                    "Content-Type": "application/json;charset=UTF-8"
                                }
                            }
                        )
                        .then(res => {
                            // console.log(res);
                            if (
                                res.data.result != [] ||
                                res.data.result != undefined ||
                                res.data.result != ""
                            ) {
                                // this.link = res.data.result;
                                this.dialogVisible2 = true;
                                if (this.mylink2 == undefined) {
                                    this.link = res.data.result;
                                } else {
                                    this.link == this.mylink1;
                                }
                            }
                        });
                } else {
                    this.floatingDiscount = [];
                    let page = JSON.stringify({
                        type: "floatingDiscount",
                        id: this.ids
                    });
                    this.$http
                        .post(
                            "http://192.168.50.33:8080/finance/rechargeCard/getCoupon",
                            page,
                            {
                                headers: {
                                    "Content-Type": "application/json;charset=UTF-8"
                                }
                            }
                        )
                        .then(res => {
                            // console.log(res);
                            if (
                                res.data.result != [] ||
                                res.data.result != undefined ||
                                res.data.result != ""
                            ) {
                                // this.link = res.data.result;
                                this.dialogVisible2 = true;
                                if (this.mylink2 == undefined) {
                                    this.link = res.data.result;
                                } else {
                                    this.link == this.mylink1;
                                }
                            }
                        });
                }
            },
            // 计算价格
            ondiscount_p() {
                if (
                    this.form.price != "" &&
                    this.form.discount != "" &&
                    this.form.discount != undefined &&
                    this.form.price != undefined
                ) {
                    this.form.price = Math.floor(this.form.price * 100) / 100;
                    let i = this.form.discount / 10;
                    let j = Math.floor(i * 100) / 100;
                    this.form.price2 = this.form.price * j;
                    this.form.price2 = Math.floor(this.form.price2 * 100) / 100;
                }
            },
            onAddConfirm(val) {
                let obj = {
                    desc:this.form.desc,
                    kindValue:this.form.kindValue
                };
                this.coupon.addCard(obj);
                this.dialogShow = false;
            },
            onAddCancel(val) {

                this.dialogShow = false;
            },
            onButtonClick(method){
                if(method === 'add') {
                    this.dialogShow = true;
                }
            },
            action(val){
                if(val.methods === 'online'){
                    console.log('上线逻辑');
                }
                if(val.methods === 'Offline'){
                    console.log('下线逻辑');
                }
                if(val.methods === 'edit'){
                    console.log('编辑逻辑');
                }
            },
            onConfirm(condition){
                console.log(condition);
            },
            onSearch(val){
                console.log(val)
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
            }
        }
    }
</script>

<style lang="scss">
.rechargeCard{
    .add {
        .el-form-item {
            width: 100%;
            .el-form-item__content {
                width: 50%;
                .el-select {
                    width: 100%;
                }
                .el-textarea {
                    width: 100%;
                }
            }
        }

        .el-dialog__title {
            font-size: 17px;
            font-weight: bold;
            letter-spacing: 2px;
        }
    }
    .rule {
        padding: 20px 30px;
        overflow: hidden;
        line-height: 40px;
        span {
            text-align: right;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
        .el-input {
            width: 47%;
        }
        .w-select {
            .el-input {
                width: 100%;
            }
        }
    }
    .gold {
        width: 20px;
        position: absolute;
        top: 0;
        right: 3px;
        color: rgb(132, 146, 166);
    }
}
</style>