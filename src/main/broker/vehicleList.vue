<template>
    <div>
        <div>
            <Position :positions="positions"/>
            <search-bar :selectors="selectors" @onConfirm="onConfirm" :conditions="conditions"/>
        </div>
        <div class="common-content-detail">
            <button-list :buttons="buttonList" />
            <table-bar :tableData="vehicles"
                       :columns="columns"
                       :tableOption="options"
                       :total="total"
                       @onSearch="onSearch"
                       :currentPage="currentPage"
                       :pageSize="pageSize"
                       @action="action"/>
        </div>
    </div>
</template>

<script>
    import Position from  '../common/position.vue';
    import SearchBar from '../common/searchbar.vue';
    import TableBar from '../common/tableBar.vue';
    import ButtonList from '../common/buttonList.vue';

    export default {
        name: "vehicleList.vue",
        positions:Window.getCurrentLocation("3-9"),
        components:{
            Position,
            SearchBar,
            TableBar,
            ButtonList
        },
        data () {
            return {
                buttonList:[{
                    text:'新增车辆',
                    method:'new'
                },{
                    text:'批量导入',
                    method:'export'
                }],
                conditions:{},
                selectors:[{
                    cname:'车队编号',
                    name:'id',
                    model:'input',
                    default:'请填写车辆编号'
                },{
                    cname:'车辆类型',
                    name:'vehicleType',
                    model:'input',
                    default:'请填写车辆类型'
                },{
                    cname:'车牌',
                    name:'vehicleNum',
                    model:'input',
                    default:'请填写车牌'
                }],
                currentPage: 1,
                pageSize:1,
                total:0,
                columns:[
                    {
                        type:'selection',
                        width:'50'
                    },{
                        label:'车辆编号',
                        prop:'id',
                        width:'200'
                    },{
                        label:'车辆类型',
                        prop:'vehicleType',
                        width:'200'
                    },{
                        label:'车牌',
                        prop:'vehicleNum',
                        width:'200'
                    },{
                        label:'车牌类型',
                        prop:'vehicleNumType',
                        width:'200'
                    },{
                        label:'车长',
                        prop:'length',
                        width:'200'
                    },{
                        label:'载重',
                        prop:'capacity',
                        width:'200'
                    },{
                        label:'责任人',
                        prop:'userId',
                        width:'200'
                    },{
                        label:'分配时间',
                        prop:'lastTime',
                        width:'200'
                    },{
                        label:'创建时间',
                        prop:'lastTime',
                        width:'200'
                    }
                ],
                options:{
                    width:'200',
                    label:'操作',
                    buttons:[
                        {text:'详情',methods:'detail'},
                        {text:'指派',methods:'dispatch'},
                        {text:'删除', methods:'cancel'}
                    ]
                },
                vehicles:[{

                }]
            }
        },
        methods:{
            action(val){
                if(val.methods === 'detail'){
                    // console.log(val)
                    this.$router.push({
                        path: '/broker/driverDetail',
                        query: {
                            id: 1
                        }
                    })
                    console.log('这里添加详情函数')
                }
                if(val.methods === 'delete'){
                    // console.log(val)
                    console.log('这里添加删除函数')
                }
            },
            onSearch(val){
                console.log(val)
                this.pageSize = val.pageSize;
                this.currentPage = val.currentPage;
            }
        }
    }
</script>

<style scoped>

</style>