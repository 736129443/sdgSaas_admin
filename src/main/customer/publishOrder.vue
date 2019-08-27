<template>
    <!--在线发单-->
    <div class="common-content">
        <div>
            <position :positions="this.positions"/>
        </div>
        <div class="common-content-detail">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="整车" name="one">
                    <el-form ref="order" :model="order" :rules="rules" label-width="80px" style="overflow-y:auto; height: 800px;">
                        <el-form-item label="车型选择">
                            <el-select v-model="order.vehicleReq" placeholder="请选择车型">
                                <el-option label="小面" value="shanghai"></el-option>
                                <el-option label="金杯" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <road-line-bar :road-line="order.roadLine"/>
                        <el-form-item   label="货物信息">
                            <goods-list :logistic-param="order.params"/>
                        </el-form-item>
                        <order-param-bar :order="order"/>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="拼车" name="pool">
                    <el-form ref="order" :model="order" :rules="rules" label-width="80px" style="overflow-y:auto; height: 800px;">
                        <el-form-item label="配送地址">
                            <el-col :style="index>0?'margin-top:10px':''" v-for="location ,index in order.roadLine.locations">
                                <el-col>
                                    <el-input v-model="location.address" :placeholder="index===0?'起始点地址':'终点地址'" style="width:300px"/>
                                </el-col>
                                <el-col>
                                    <el-input v-model="location.contractor" placeholder="联系人" style="width:300px"/>
                                    <el-input v-model="location.phone" placeholder="联系人电话" style="width:300px"/>
                                </el-col>
                            </el-col>
                        </el-form-item>
                        <el-form-item   label="货物信息">
                            <goods-list :logistic-param="order.params"/>
                        </el-form-item>
                        <order-param-bar :order="order"/>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="城配" name="city">
                    <el-form ref="order" :model="order" :rules="rules" label-width="80px" style="overflow-y:auto; height: 800px;">
                        <el-form-item label="车型选择" prop="vehicleReq">
                            <el-select v-model="order.vehicleReq" placeholder="请选择车型">
                                <el-option label="小面" value="shanghai"></el-option>
                                <el-option label="金杯" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item   label="货物信息">
                            <goods-list :logistic-param="order.params"/>
                        </el-form-item>
                        <order-param-bar :order="order"/>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="干线" name="line">
                    <el-form ref="order" :model="order" :rules="rules" label-width="80px" style="overflow-y:auto; height: 800px;">
                        <el-form-item label="车型选择" prop="vehicleReq">
                            <el-select v-model="order.vehicleReq" placeholder="请选择车型">
                                <el-option label="小面" value="shanghai"></el-option>
                                <el-option label="金杯" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <road-line-bar :road-line="order.roadLine"/>
                        <el-form-item   label="货物信息">
                            <goods-list :logistic-param="order.params"/>
                        </el-form-item>
                        <order-param-bar :order="order"/>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Position from '../common/position.vue';
    import GoodsList from '../common/goodListBar.vue';
    import RoadLineBar from '../common/roadlineBar.vue';
    import OrderParamBar from '../common/orderParamBar.vue';

    export default {
        data() {
            return {
                activeName:'one',
                positions:Window.getCurrentLocation("2-4"),
                order: {
                    volume:'',//货物体积
                    weight:'',//重量
                    Number:'',//货物数量件
                    type_goods:[],
                    beginTime:[],
                    scene: '整车',
                    params:{},
                    vehicleReq: '',//车型选择
                    inTime:true,
                    time:'',
                    roadLine: {
                        locations:[{
                            contractor:'',
                            phone:'',
                            address:'',
                        },{
                            contractor:'',
                            phone:'',
                            address:'',
                        }]
                    },
                    Receipt:'是',//是否回单
                    price:'',//价格
                    remark: '',
                    driver:''
                },
                rules: {
                    scene: [
                        {required: true, message: '请选择类型', trigger: 'change'}
                    ],
                    vehicleReq:[
                        { required: true, message: '请选择车型', trigger: 'change' }
                    ],
                    type_goods:[//货物类型
                        { type: 'array', required: true, message: '请至少选择一个货物类型', trigger: 'change' }
                    ],
                    volume:[
                        { required: true, message: '请输入货物体积', trigger: 'change' },
                        {pattern:  /^\d+\.?\d{0,2}$/,  message: '输入的价格保留最后两位小数', trigger: 'blur' }
                    ],
                    weight:[
                        { required: true, message: '请输入货物重量', trigger: 'change' },
                        {pattern:  /^\d+\.?\d{0,2}$/,  message: '输入的价格保留最后两位小数', trigger: 'blur' }
                    ],
                    Number:[
                        { required: true, message: '请输入货物数量', trigger: 'change' },
                        {pattern:  /^\d+\.?\d{0,2}$/,  message: '输入的价格保留最后两位小数', trigger: 'blur' }
                    ],
                    Receipt:[//是否回单
                        {required: true, message: '请选择是否回单', trigger: 'change'}
                    ],
                    driver:[//指定司机
                        { required: true, message: '请选择指定司机', trigger: 'change' }
                    ],
                    remark:[//备注
                        { required: true, message: '请填写备注', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    price:[
                        { required: true, message: '请输入价格', trigger: 'change' },
                        {pattern:  /^\d+\.?\d{0,2}$/,  message: '输入的价格保留最后两位小数', trigger: 'blur' }
                    ]
                },
                shoppingCart:[{},{}]
            }
        },
        methods:{
            onAddLocation() {//增加
                this.order.roadLine.locations.push({
                    contractor:'',
                    phone:'',
                    address:'',
                });
            },
            onDelLocation(index) {//删除
                this.order.roadLine.locations.splice(index,1)
            },
            onSubmit(order) {//发布用车
                this.$refs[order].validate((valid) => {
                    if (valid) {

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        },
        components:{
            Position,
            GoodsList,
            RoadLineBar,
            OrderParamBar
        }
    }
</script>

<style scoped lang="scss">
    .el-form-item .el-form-item {
        margin-bottom: 28px;
    }
</style>