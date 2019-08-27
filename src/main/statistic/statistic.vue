<template>
    <div class="statistic">

        <div id="container" class="map"></div>
        <div class="search-box">
            <div class="iblock f14 p10 select-address">选择区域</div>
            <el-input
                placeholder="输入关键字搜索地址"
                prefix-icon="el-icon-search"
                v-model="searchVal"
                id="search"
                clearable>
            </el-input>
            <el-button type="primary" icon="el-icon-search"></el-button>
        </div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div class="tc f16" @click="dataShow = !dataShow">今日数据</div>
                <div class="tr ">
                    <span>{{nowDate | dateFormat}}</span>
                    <span>{{weekDay | weekDayFormat}}</span>
                    <i class="el-icon-date f16"></i>
                </div>
            </div>
            <!--<el-collapse-transition>-->
                <div class="text clear" v-show="dataShow">
                    <div class="fl w50">
                        <p><span class="s-width tr mr10">订单总数</span><span>10000单</span></p>
                        <p><span class="s-width tr mr10">交易数</span><span>10000单</span></p>
                        <p><span class="s-width tr mr10">在跑数</span><span>60单</span></p>
                        <p><span class="s-width tr mr10">取消数</span><span>10单</span></p>
                        <p><span class="s-width tr mr10">投诉数</span><span>1单</span></p>
                    </div>
                    <div class="fr w50">
                        <p><span class="s-width1 tr mr10">今日累计交易总金额</span><span>10000元</span></p>
                        <p><span class="s-width1 tr mr10">今日退单总金额</span><span>1000元</span></p>
                    </div>
                </div>
                <span>{{address}}</span>
            <!--</el-collapse-transition>-->
        </el-card>
    </div>
</template>

<script>
    import {formatDateTime} from '../../assets/js/date.js';
    let map;
export default {
    name: "statistic",
    data(){
        return {
            address:'',
            searchVal:'',
            dataShow:false,
            nowDate: new Date(),
            temp:null,
            weekDay:new Date().getDay()
        };
    },
    mounted(){
        this.initMap();
        this.temp = setInterval(() => {
            this.nowDate = new Date();
        }, 1000);
    },
    beforeDestroy() {
        if (this.temp) {
            clearInterval(this.temp);
        }
    },
    filters:{
        dateFormat(dateVal){
            return formatDateTime(dateVal,'years');
        },
        weekDayFormat(val){
            return '星期'+'日一二三四五六'.charAt(val);
        }
    },
    methods:{
        initMap(){
            let _this = this;
            let lat,lng;
            AMapUI.loadUI(['misc/PositionPicker','misc/PoiPicker','misc/MarkerList'], function(PositionPicker,PoiPicker,MarkerList) {
                map = new AMap.Map('container', {
                    zoom:14,
                    scrollWheel: true
                });

                // 搜索
                let poiPicker = new PoiPicker({
                    input: 'search',
                    placeSearchOptions: {
                        map: map,
                        pageSize: 6 //关联搜索分页
                    }

                });

                // 加载定位插件，实现定位功能

                AMap.plugin('AMap.Geolocation', function () {

                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野s内可见，默认：false
                    });
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', function (data) {
                        // map.setCenter(data.position)
                        // data.position.getLng() //定位成功返回的经度
                        // data.position.getLat() //定位成功返回的纬度
                        // _this.creatMarkerList();
                        _this.creatMarkerList(MarkerList);
                    });//返回定位信息
                    AMap.event.addListener(geolocation, 'error', function (data) {
                        console.log('定位出错')
                    });      //返回定位出错信息
                });


                // 搜索选址

                poiPicker.on('poiPicked', function(poiResult) {
                    poiPicker.hideSearchResults();

                    lat=poiResult.item.location.lat;

                    lng=poiResult.item.location.lng;

                    _this.address = poiResult.item.address;

                    map.panTo([lng,lat]);
                });

                let positionPicker = new PositionPicker({
                    mode: 'dragMap',
                    map: map ,
                    iconStyle: {//自定义外观
                        url: 'assets/images/asd.png',//图片地址
                        size: [33, 50],  //要显示的点大小，将缩放图片
                        ancher: [17, 45],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
                    },
                });

                // 拖拽选址

                positionPicker.on('success', function(positionResult) {
                    _this.address = positionResult.address;
                });
                positionPicker.on('fail', function(positionResult) {
                    _this.address = '';
                });
                let onModeChange = function(e) {
                    positionPicker.setMode(e.target.value)
                };
                positionPicker.start();
                map.panBy(0, 1);
                map.addControl(new AMap.ToolBar({
                    liteStyle: true
                }))
                // new AMap.Marker({
                //     map: map,
                //     position: [108.969892,34.247526],
                //     icon: new AMap.Icon({
                //         size: new AMap.Size(100, 150),  //图标大小
                //         image: "assets/images/positione.png",
                //     }),
                //     animation: "AMAP_ANIMATION_DROP",
                // });
            });
        },
        creatMarkerList(MarkerList){
            let markerList = new MarkerList({
                //关联的map对象
                map: map,

                // onSelected:null,
                //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                getPosition: function(dataItem) {
                    return dataItem.position;
                },
                getMarker: function(dataItem, context, recycledMarker) {
                    // 返回一个新的Marker
                    return new AMap.Marker({
                        icon: 'http://192.168.50.88/uploadfile/mall/sdg.png',
                        animation:"AMAP_ANIMATION_DROP",
                    });

                },
                getInfoWindow: function(dataItem, context, recycledInfoWindow) {
                    console.log(dataItem)
                    console.log(context)

                    let tpl = '<p>地址：<%- dataItem.adress %><p>';

                    let content = MarkerList.utils.template(tpl, {
                        dataItem: dataItem,
                        dataIndex: context.index
                    });

                    if (recycledInfoWindow) {
                        //存在可回收利用的infoWindow, 直接更新内容返回
                        recycledInfoWindow.setContent(content);
                        return recycledInfoWindow;
                    }

                    //返回一个新的InfoWindow
                    return new AMap.InfoWindow({
                        offset: new AMap.Pixel(0, -23),
                        content: content
                    });
                }
            });

            //监听选中改变
            markerList.on('selectedChanged', function(event, info) {
                console.log(info);

            });
            markerList.on('markerClick', function(event, record) {
                console.log(record);

            });

            //构建一个数据项数组，数据项本身没有格式要求，但需要支持getDataId和getPosition
            let position1 = [{
                position: [108.97239,34.18901],
                adress:'11111111111'
            },{
                position: [108.97339,34.18921],
                adress:'2222222222'
            },{
                position: [108.97439,34.18941],
                adress:'333333333'
            },{
                position: [108.97539,34.18951],
                adress:'444444444'
            }];

            // for(let i = 0;i < data.length;i++){
            //     position1.push({
            //         position:[data[i].longitude,data[i].latitude],
            //         type:data[i].type
            //     })
            // }

            //展示该数据
            markerList.render(position1);
        }
    }
}
</script>

<style scoped lang="scss">
    .statistic{
        height:100%;
        width: 100%;
        position: relative;
        .map{
            height:100%;
            width: 100%;
        }
        .search-box{
            position: absolute;
            left: 20px;
            top: 20px;
            font-size: 0;
            .el-input{
                width: 215px;
            }
            .select-address{
                background-color: lightblue;
            }
        }

        .box-card{
            position: absolute;
            left: 50%;
            top: 20px;
            transform: translateX(-50%);
        }

        .s-width{
            width: 50px;
        }

        .s-width1{
            width: 110px;
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }

        .box-card {
            width: 480px;
        }
    }
</style>