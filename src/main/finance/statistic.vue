<template>
    <div>
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="本期统计" name="1">
                    <card-list :cards="accountIncomeStatistics"/>
                    <card-list :cards="accountOtherStatistic"/>
                </el-collapse-item>
                <el-collapse-item title="发票统计" name="2">
                    <card-list :cards="invoiceStatistics"/>
                </el-collapse-item>
                <!--<el-collapse-item title="余额统计" name="3">-->
                    <!--<card-list :cards="balanceStatistics"/>-->
                <!--</el-collapse-item>-->
                <el-collapse-item title="趋势" name="4">
                    <div id="finance_trend" style="width: 100%; height: 400px"></div>
                </el-collapse-item>
                <el-collapse-item title="饼图" name="5">
                    <div id="finance_pie_order" class="fl m10 pie" />
                    <div id="finance_pie_task" class="fl m10 pie"  />
                    <div id="finance_pie_bill" class="fl m10 pie" />
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import Position from '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import CardList from '../common/cardList.vue';
    import echarts from 'echarts'

    require("../../assets/module/finance.js");
    var com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};

    export default {
        components:{
            Position,
            SearchBar,
            CardList
        },
        data() {
            return {
                finance:com.lightningdog.rrq.finance,
                event:com.lightningdog.rrq.event,
                token :"Zs7s8rzG4FcdHh7\/BPohkGV0lmvXNFKkSmP\/ckFbu37b4NeUrwIQKNflfnPmcl2fBLoLq700BPK7Y5xoAFs78w16+KKldWuy7X8SnyCfqsQbCCJqNlX9UqIQ\/hqOUe0QQRO5QIcYkaQc3DXJXWL0flvfhD7NcrLyZMDCgNaVUAQ=",
                activeNames:['1','2','3','4','5'],
                positions:Window.getCurrentLocation("8-2"),
                orderList:[],
                list:{},
                keyList:[],
                selectors:[{
                    model: 'select',
                    name: 'id',
                    cname: '统计方式',
                    dataArr:[{
                        label:'日',
                        value:'day'
                    },{
                        label:'周',
                        value:'week'
                    },{
                        label:'月',
                        value:'month'
                    },{
                        label:'季度',
                        value:'quarter'
                    }],
                    default: '日',
                    value: 'day'
                }],
                conditions:{},
                accountIncomeStatistics:[],
                accountOtherStatistic:[],
                invoiceStatistics:[],
                trendEcharts:'',
                trendData:{
                    // xAxis:["星期一", '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                    xAxis:[],
                    series:[{
                        name:'应收总额',
                        // data:['1000.00', '2000.00', '3000.00', '4000.00','4000.00','4000.00','4000.00'],
                        data:[],
                        type:'line',
                    },{
                        name:'实收总额',
                        // data:['1000.00', '2000.00', '2890.00', '3600.00','4100.00','4000.00','3000.00'],
                        data:[],
                        type:'line',
                    },{
                        name:'应付总额',
                        // data:['1000.00', '2000.00', '2700.00', '3400.00','4200.00','3500.00','2000.00'],
                        data:[],
                        type:'line',
                    },{
                        name:'实付总额',
                        // data:['1000.00', '2000.00', '2600.00', '3200.00','4300.00','3000.00','1000.00'],
                        data:[],
                        type:'line',
                    },{
                        name:'充值流水',
                        // data:['1000.00', '2000.00', '2500.00', '3000.00','4400.00','2500.00','500.00'],
                        data:[],
                        type:'line',
                    }]
                },
                pieEcharts:'',
                orderPie:[{value:'1000.00', name:'整车'},
                    {value:'1000.00', name:'拼车'},
                    {value:'1000.00', name:'项目'}],
                taskPie:[{value:'1000.00', name:'搬运'},
                    {value:'1000.00', name:'运输'},
                    {value:'1000.00', name:'其他'}],
                billPie:[{value:'1000.00', name:'微信'},
                    {value:'1000.00', name:'支付宝'},
                    {value:'1000.00', name:'通联'}],
            }
        },

        created(){
            this._event('statistics');
            this.data();
            this.$nextTick(function(){
                // this.drawTrend(this.trendData);
                this.drawPie('finance_pie_order', '订单分类占比', this.orderPie);
                this.drawPie('finance_pie_task', '任务分类占比', this.taskPie);
                this.drawPie('finance_pie_bill', '支付方式占比', this.billPie);
            });
        },
        methods:{
            data(){
                let page = {
                    token: this.token,
                    dimension:this.selectors[0].dataArr[0].value
                };
                this.finance.statistics(page,'statistics');
            },
            _event(info){
                this.event.on('onMore', "com.lightningdog.rrq.finance", info, (event, data) => {
                    if (info == 'statistics') {
                        if (data) {
                            console.log(data);
                            this.accountIncomeStatistics = [];
                            this.accountOtherStatistic = [];
                            this.invoiceStatistics = [];
                            this.orderList=[];
                            this.trendData.xAxis=[];
                            this.trendData.series[0].data=[];
                            this.trendData.series[1].data=[];
                            this.trendData.series[2].data=[];
                            this.trendData.series[3].data=[];
                            this.trendData.series[4].data=[];
                            for(var k in data){
                                // console.log(data[k]);
                                this.orderList.push(data[k])//对应的纵坐标值
                                this.keyList=Object.keys(data)//对应的横坐标值
                            }
                            console.log(this.orderList)
                            for(var i=0;i<this.orderList.length;i++){
                                this.trendData.series[0].data.push(this.orderList[i].totalReceivable);
                                this.trendData.series[1].data.push(this.orderList[i].totalReceipt);
                                this.trendData.series[2].data.push(this.orderList[i].totalPayable);
                                this.trendData.series[3].data.push(this.orderList[i].totalPayment);
                                this.trendData.series[4].data.push(this.orderList[i].totalRecharge);
                            }
                            console.log(this.trendData.series[0].data)
                            // console.log(this.keyList)
                            for(var i=0;i<this.keyList.length;i++){
                                console.log(this.keyList[i])
                                this.trendData.xAxis.push(this.keyList[i]);
                            }
                            // console.log(this.trendData.xAxis)
                            // console.log(this.trendData)
                            this.drawTrend(this.trendData);
                            // console.log((this.orderList[this.orderList.length-1]).totalReceivable);
                            this.list=this.orderList[this.orderList.length-1];
                            this.accountIncomeStatistics.push(
                                {title:'应收总额',content: this.list.totalReceivable+'.00元'},
                                {title:'应付总额',content: this.list.totalPayable+'.00元'},
                                {title:'实收总额',content: this.list.totalReceipt+'.00元'},
                                {title:'实付总额',content: this.list.totalReceipt+'.00元'}
                                );
                            this.accountOtherStatistic.push(
                                {title:'调账总额', content: this.list.totalReconciliation+'.00元'} ,
                                {title:'活动总额', content: this.list.totalActivity+'.00元'},
                                {title:'充值流水', content: this.list.totalRecharge+'.00元'}
                            );
                            this.invoiceStatistics.push(
                                {title:'进项总额', content: this.list.totalInput+'.00元'},
                                {title:'销项总额', content: this.list.totalSale+'.00元'}
                            )
                            // console.log(this.accountIncomeStatistics);
                        }
                    }
                });
            },
            onConfirm (condition) {//判断是否是查询还是导出按钮
                console.log(condition);
              let page={
                  token:this.token,
                  dimension:condition.id,
              }
              this.finance.statistics(page,'statistics');
            },
            onCardClick(card) {
                console.log(card);
            },
            handleChange() {

            },
            drawTrend(trenData) {
                this.trendEcharts = echarts.init(document.getElementById('finance_trend'));
                this.trendEcharts.setOption({
                    legend: {
                        data:['应收总额', '实收总额', '应付总额', '实付总额', '充值流水'],
                    },
                    xAxis:{
                        type:'category',
                        name:'日期',
                        data:trenData.xAxis,
                    },
                    yAxis:{
                        type:'value',
                        name:'总额（元）'
                    },
                    tooltip: {
                        trigger: 'axis'   // axis   item   none三个值
                    },
                    series:trenData.series,
                })
            },
            drawPie(id, title, pieData) {
                this.pieEcharts = echarts.init(document.getElementById(id));
                this.pieEcharts.setOption({
                    tooltip: {
                        trigger:'item',
                        formatter: "{a} <br/>{b}: {c} <br/> ({d}%)"
                    },
                    series : [
                        {
                            name:title,
                            type: 'pie',
                            radius : '50%',
                            center: ['52%', '52%'],
                            avoidLabelOverlap: false,
                            data: pieData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 5,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                                }
                            }
                        }
                    ]
                });
            },
        },
        mounted(){

        }
    }
</script>


<style lang="scss" scoped>
    .pie {
        width: 300px;
        height: 300px;
        background-color: #E2E2E2;
    }
</style>