<template>
    <el-form-item label="配送地址">
        <el-col :style="index>0?'margin-top:10px':''" v-for="location ,index in locations">
            <el-col>
                <el-input v-model="location.address" :placeholder="index===0?'起始点地址':'终点地址'" style="width:300px"/>
                <el-button type="primary" @click="onDelLocation(index)" style="margin-left:20px" v-if="index > 1 && index+1 === locations.length">删除</el-button>
                <el-button type="primary" @click="onAddLocation" style="margin-left:20px" v-if="index+1 === locations.length">增加</el-button>
            </el-col>
            <el-col>
                <el-input v-model="location.contractor" placeholder="联系人" style="width:300px"/>
                <el-input v-model="location.phone" placeholder="联系人电话" style="width:300px"/>
            </el-col>
        </el-col>
    </el-form-item>
</template>

<script>
    export default {
        props:{
            roadLine:{
                type:Object,
                default:()=>{}
            }
        },
        mounted(){
            this.roadLine.lineName = this.lineName;
            this.roadLine.direction = this.direction;
            this.roadLine.distance = this.distance;
            this.roadLine.locations = this.locations;
        },
        data() {
            return {
                lineName:'',
                direction:'',
                distance:0.0,
                locations:[{
                    contractor:'',
                    phone:'',
                    address:'',
                },{
                    contractor:'',
                    phone:'',
                    address:'',
                }]
            }
        }
    }
</script>

<style scoped>

</style>