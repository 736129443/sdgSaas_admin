<template>
    <div class="current-position">
        <el-breadcrumb separator="&gt;" class="current-location-box">
            <el-breadcrumb-item class="current-location-title" :to="position.path" v-for="position in currentPositions">
                {{position.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                currentPositions:[]
            }
        },
        props:{
            positions:Array
        },
        mounted(){
            this.currentPositions=this.positions
        }
    }
</script>
<style lang="scss" scoped>
    .current-position{
        background-color: #E2E2E2;
        height: 30px;
        width:100%;
        padding-left: 20px;
        padding-top: 10px;
        .current-location-box{
            height: 20px;
            width: auto;
            align-content: center;
            .current-location-title{
                font-size:16px;
            }
        }
    }
</style>

