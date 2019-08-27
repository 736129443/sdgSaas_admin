<template>
    <!--订单详情-->
    <div class="common-content">
        <div>
            <position :positions="positions"/>
        </div>
        <div>
            
        </div>
    </div>
</template>

<script>
    import Position from  '../common/position.vue';
    require('../../assets/module/order.js');

    var com = Window.com || {};
    com.lightningdog = com.lightningdog || {};
    com.lightningdog.rrq = com.lightningdog.rrq || {};

    export default {
        name: "order_details",
        data() {
            return{
                token:'',
                order: com.lightningdog.rrq.order,
                event: com.lightningdog.rrq.event,
                positions:Window.getCurrentLocation("2-3-1"),
                info:{},
            }
        },
        created() {
            this.data();
            this._event();
        },
        mounted() {

        },
        methods:{
            _event() {
                this.event.on('onDetail', "com.lightningdog.rrq.order", "details", (event, data) => {
                    if (data) {
                        this.info = data;
                        console.log(this.info);
                    }
                });
            },
            data() {
                let condtion = {
                    token: "Zs7s8rzG4FcdHh7\/BPohkGV0lmvXNFKkSmP\/ckFbu37b4NeUrwIQKNflfnPmcl2fBLoLq700BPK7Y5xoAFs78w16+KKldWuy7X8SnyCfqsQbCCJqNlX9UqIQ\/hqOUe0QQRO5QIcYkaQc3DXJXWL0flvfhD7NcrLyZMDCgNaVUAQ=",
                    orderId:Base64.decode(this.$route.query.orderId),
                };
                console.log(condtion);
                this.order.detail(condtion);
            }
        },
        components:{
            Position,
        }
    }
</script>

<style scoped lang="scss">
    .common-content{
        width: 100%;

    }
</style>